// app.js — the soul of the wall: camera, the analytic pick, the animation clock,
// input, and the raf loop. gl.js (the agent's renderer) does the drawing; this
// file owns everything it deliberately doesn't.
//
// pick() is the EXACT inverse of gl.js's vertex transform. if you touch one,
// touch the other. the forward transform (in gl.js) is:
//
//   col = floor(i % C) ; row = floor(i / C)
//   tileTL = margin + (col*(cellW+gx), row*(cellH+gy))
//   world  = tileTL + corner*cell
//   screen = (world - center)*zoom + viewport*0.5      (drawing-buffer px, y-down)
//
// so the inverse, screen->world, is just:  world = (screen - viewport/2)/zoom + center
// and screen (drawing-buffer px) = mouseCSS * devicePixelRatio.

import { createGLWall } from "./wall/gl.js"

const canvas = document.getElementById("wall")
const wall = createGLWall(canvas)

// ── live state ────────────────────────────────────────────────────────────────
const grid = { gx: 6, gy: 6, margin: 24, C: 40 }   // C is a LIVE uniform (slider)
const cam = { center: [0, 0], zoom: 1 }
let M = null        // manifest
let anim = null     // per-button animation tables
let cells = null    // Int32Array, current atlas cell per button (reused each frame)

const dpr = () => window.devicePixelRatio || 1

// ── coordinate duals (CSS px <-> world px) ───────────────────────────────────
function screenToWorld(mxCss, myCss) {
  const d = dpr()
  const sx = mxCss * d, sy = myCss * d        // drawing-buffer px, y-down
  return [
    (sx - canvas.width * 0.5) / cam.zoom + cam.center[0],
    (sy - canvas.height * 0.5) / cam.zoom + cam.center[1],
  ]
}
function worldToScreenCss(wx, wy) {
  const d = dpr()
  return [
    ((wx - cam.center[0]) * cam.zoom + canvas.width * 0.5) / d,
    ((wy - cam.center[1]) * cam.zoom + canvas.height * 0.5) / d,
  ]
}

// ── THE PICK — screen px -> button index, or null (gutter / off-grid) ─────────
function pick(mxCss, myCss) {
  if (!M) return null
  const [wx, wy] = screenToWorld(mxCss, myCss)
  const pitchX = M.cellW + grid.gx
  const pitchY = M.cellH + grid.gy
  const gx = wx - grid.margin
  const gy = wy - grid.margin
  if (gx < 0 || gy < 0) return null
  const c = Math.floor(gx / pitchX)
  const r = Math.floor(gy / pitchY)
  if (c < 0 || c >= grid.C) return null
  if (gx - c * pitchX >= M.cellW) return null   // landed in the horizontal gutter
  if (gy - r * pitchY >= M.cellH) return null   // …or the vertical gutter
  const i = r * grid.C + c
  return i >= 0 && i < M.count ? i : null
}

// ── animation clock: per-button, walk its frame delays, pick the live cell ───
function buildAnim(buttons) {
  return buttons.map((b) => {
    if (b.frames <= 1) return { cell: b.cell, frames: 1, cum: null, total: 0 }
    const cum = []
    let total = 0
    for (let k = 0; k < b.frames; k++) {
      const cs = b.delays[k] | 0
      total += (cs > 0 ? cs : 10) * 10       // centiseconds -> ms; 0 -> 100ms (gif convention)
      cum.push(total)
    }
    return { cell: b.cell, frames: b.frames, cum, total }
  })
}
const startMs = performance.now()
function fillCells(out, nowMs) {
  const t = nowMs - startMs
  for (let i = 0; i < anim.length; i++) {
    const a = anim[i]
    if (a.total <= 0) { out[i] = a.cell; continue }
    const m = t % a.total
    let f = 0
    while (f < a.cum.length - 1 && m >= a.cum[f]) f++
    out[i] = a.cell + f
  }
}

// ── framing: drop the camera so the whole wall is in view ────────────────────
function frameAll() {
  const rows = Math.ceil(M.count / grid.C)
  const gw = grid.C * (M.cellW + grid.gx) - grid.gx + grid.margin * 2
  const gh = rows * (M.cellH + grid.gy) - grid.gy + grid.margin * 2
  cam.center = [gw * 0.5, gh * 0.5]
  cam.zoom = Math.min(canvas.width / gw, canvas.height / gh) * 0.96
}

// ── input ─────────────────────────────────────────────────────────────────────
const hud = document.getElementById("hud")
const hl = document.getElementById("hl")

let dragging = false, lastX = 0, lastY = 0
canvas.addEventListener("mousedown", (e) => { dragging = true; lastX = e.clientX; lastY = e.clientY })
addEventListener("mouseup", () => { dragging = false })

canvas.addEventListener("mousemove", (e) => {
  if (dragging) {
    const d = dpr()
    cam.center[0] -= (e.clientX - lastX) * d / cam.zoom
    cam.center[1] -= (e.clientY - lastY) * d / cam.zoom
    lastX = e.clientX; lastY = e.clientY
    hl.style.display = "none"
    return
  }
  const rect = canvas.getBoundingClientRect()
  const i = pick(e.clientX - rect.left, e.clientY - rect.top)
  if (i == null) { hud.textContent = ""; hl.style.display = "none"; return }
  const b = M.buttons[i]
  hud.textContent = `#${b.rank} · ${b.name}` + (b.frames > 1 ? ` · ${b.frames}f` : "")
  // highlight box over the hovered tile (positioned in CSS px via the dual)
  const pitchX = M.cellW + grid.gx, pitchY = M.cellH + grid.gy
  const c = i % grid.C, r = (i / grid.C) | 0
  const tlx = grid.margin + c * pitchX, tly = grid.margin + r * pitchY
  const [sx, sy] = worldToScreenCss(tlx, tly)
  hl.style.display = "block"
  hl.style.left = sx + "px"
  hl.style.top = sy + "px"
  hl.style.width = M.cellW * cam.zoom / dpr() + "px"
  hl.style.height = M.cellH * cam.zoom / dpr() + "px"
})

canvas.addEventListener("wheel", (e) => {
  e.preventDefault()
  const rect = canvas.getBoundingClientRect()
  const mx = e.clientX - rect.left, my = e.clientY - rect.top
  const before = screenToWorld(mx, my)
  const factor = Math.exp(-e.deltaY * 0.0015)
  cam.zoom = Math.min(40, Math.max(0.02, cam.zoom * factor))
  const after = screenToWorld(mx, my)
  cam.center[0] += before[0] - after[0]      // pin the world point under the cursor
  cam.center[1] += before[1] - after[1]
}, { passive: false })

// controls (the page provides the inputs)
function bindSlider(id, key, onChange) {
  const el = document.getElementById(id)
  if (!el) return
  el.addEventListener("input", () => {
    grid[key] = parseFloat(el.value)
    const out = document.getElementById(id + "-val")
    if (out) out.textContent = el.value
    onChange && onChange()
  })
}
bindSlider("ctl-C", "C")
bindSlider("ctl-gx", "gx")
bindSlider("ctl-gy", "gy")
const resetBtn = document.getElementById("ctl-reset")
if (resetBtn) resetBtn.addEventListener("click", () => frameAll())

addEventListener("resize", () => { wall.resize(); })

// ── boot ──────────────────────────────────────────────────────────────────────
async function boot() {
  M = await fetch("/88x31/manifest.json").then((r) => r.json())
  anim = buildAnim(M.buttons)
  cells = new Int32Array(M.count)

  const img = new Image()
  img.src = "/88x31/atlas.png"
  await img.decode()

  wall.resize()
  wall.setAtlas(img, M.atlasCols, M.cellW, M.cellH)
  wall.setCount(M.count)
  frameAll()

  function frame(now) {
    fillCells(cells, now)
    wall.setCells(cells)
    wall.setGrid(grid)
    wall.setCamera(cam)
    wall.render()
    requestAnimationFrame(frame)
  }
  requestAnimationFrame(frame)
}

boot().catch((err) => {
  const h = document.getElementById("hud")
  if (h) h.textContent = "boot failed: " + err.message
  console.error(err)
})
