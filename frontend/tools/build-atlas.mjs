// build-atlas.mjs — decode 1000 ranked 88x31 gifs into ONE texture atlas + manifest.
//
// why an atlas and not a TEXTURE_2D_ARRAY: animation. across the 1000 gifs there
// are ~14k frames, and MAX_ARRAY_TEXTURE_LAYERS is commonly ~2048 — an array
// literally can't hold them. a single 2D atlas (size budget 8192+) can.
//
// the atlas is a flush grid of 88x31 cells, packed row-major, ATLAS_COLS per row.
// every frame of every button, in rank order, gets the next global cell index.
// the page animates by, per button, picking which of its cells to show this tick.
//
// GRID gaps (gx/gy) and margin are a RENDER concern — the atlas itself is flush.
//
// usage:  node build-atlas.mjs <inputDir-of-NNNN-slug.gifs> <outDir>
// writes: <outDir>/atlas.png   (~8184 x 4743)
//         <outDir>/manifest.json
//
// deps: imagemagick (magick/convert/identify) on PATH. no npm packages.

import { execFileSync } from "node:child_process"
import { readdirSync, mkdirSync, writeFileSync, rmSync, existsSync } from "node:fs"
import { join, basename } from "node:path"

const CELL_W = 88
const CELL_H = 31
// max texture width budget = 8192 (safe floor across GPUs). 8192/88 -> 93 cols.
// 93*88 = 8184 <= 8192. rows grow downward; ~14184/93 -> 153 rows -> 4743px tall.
const ATLAS_COLS = 93

const [, , inputDir, outDir] = process.argv
if (!inputDir || !outDir) {
  console.error("usage: node build-atlas.mjs <inputDir> <outDir>")
  process.exit(1)
}

const log = (...a) => console.error("[atlas]", ...a)
const sh  = (cmd, args) => execFileSync(cmd, args, { encoding: "utf8", maxBuffer: 1 << 28 })

// ── 1. collect + rank-sort the gifs ──────────────────────────────────────────
// filenames look like 0010-blinkiesCafe-badge.gif ; rank = the NNNN prefix.
const RANKED = /^(\d+)-(.+)\.(gif|GIF)$/
const files = readdirSync(inputDir)
  .map((f) => {
    const m = f.match(RANKED)
    return m ? { file: f, rank: parseInt(m[1], 10), name: m[2] } : null
  })
  .filter(Boolean)
  .sort((a, b) => a.rank - b.rank)

if (!files.length) {
  console.error(`no NNNN-slug gifs found in ${inputDir}`)
  process.exit(1)
}
log(`${files.length} ranked gifs, #${files[0].rank} … #${files.at(-1).rank}`)

// ── 2. explode every frame to a globally-indexed cell png ────────────────────
const tmp = join(outDir, ".frames")
if (existsSync(tmp)) rmSync(tmp, { recursive: true })
mkdirSync(tmp, { recursive: true })
mkdirSync(outDir, { recursive: true })

const buttons = []
let cell = 0 // running global cell index

for (const { file, rank, name } of files) {
  const src = join(inputDir, file)

  // per-frame delays in centiseconds; frame count = token count.
  const delays = sh("magick", ["identify", "-format", "%T ", src])
    .trim().split(/\s+/).filter((s) => s.length).map((s) => parseInt(s, 10) || 0)
  const frames = Math.max(1, delays.length)

  // coalesce (resolve gif disposal) -> one full 88x31 png per frame, numbered
  // globally via -scene so the filenames sort straight into atlas order.
  sh("magick", [
    src, "-coalesce",
    "-scene", String(cell),
    join(tmp, "cell_%06d.png"),
  ])

  buttons.push({ rank, name, cell, frames, delays })
  cell += frames
  if (rank % 100 === 0) log(`…#${rank} (cells so far: ${cell})`)
}

const totalCells = cell
const rows = Math.ceil(totalCells / ATLAS_COLS)
log(`exploded ${totalCells} frames -> atlas ${ATLAS_COLS * CELL_W} x ${rows * CELL_H}`)

// ── 3. montage every cell into one atlas ─────────────────────────────────────
// ordered list -> @file so we never blow the shell arg limit at ~14k inputs.
// -limit memory makes IM spill its pixel cache to disk past the cap, so this
// can't OOM on a smaller box — it just gets slower. flush packing: +0+0.
const list = []
for (let k = 0; k < totalCells; k++) {
  list.push(join(tmp, `cell_${String(k).padStart(6, "0")}.png`))
}
const listFile = join(outDir, ".cells.txt")
writeFileSync(listFile, list.join("\n"))

log("montaging…")
sh("magick", [
  "montage",
  `@${listFile}`,
  "-limit", "memory", "1GiB",
  "-limit", "map", "2GiB",
  "-tile", `${ATLAS_COLS}x`,
  "-geometry", `${CELL_W}x${CELL_H}+0+0`,
  "-background", "none",
  join(outDir, "atlas.png"),
])

// ── 4. manifest (the Button[] the page renders) ──────────────────────────────
const manifest = {
  atlas: "atlas.png",
  atlasCols: ATLAS_COLS,
  cellW: CELL_W,
  cellH: CELL_H,
  atlasW: ATLAS_COLS * CELL_W,
  atlasH: rows * CELL_H,
  totalCells,
  count: buttons.length,
  delayUnit: "centiseconds",
  buttons,
}
writeFileSync(join(outDir, "manifest.json"), JSON.stringify(manifest))

// ── 5. tidy ──────────────────────────────────────────────────────────────────
rmSync(tmp, { recursive: true })
rmSync(listFile)
log(`done. atlas.png + manifest.json (${buttons.length} buttons, ${totalCells} cells)`)
