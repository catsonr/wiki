import { writeFile, mkdir, cp, readdir } from "node:fs/promises"
import { dirname } from "node:path"
import { build } from "esbuild"

import { PAGE_ROOT, BUILD_DIR, HTML_HEADER } from "@/config.ts"
import page from "@/page.ts"
import { MANIFEST } from "@/gallery/manifest.ts"
import { buildButtonGallery } from "@/button-gallery/build.ts"

const pagesUrl = new URL(PAGE_ROOT, import.meta.url)

// doctype + the ascii-art header comment, prepended to every emitted page.
const wrap = (html: string) => `<!DOCTYPE html>\n` + HTML_HEADER + html

// a page module lives at pages/<route>/<name>.ts and is emitted as dist/<route>/index.html.
// the root page (pages/index.ts) is emitted as dist/index.html.
// everything else under pages/ — css, js, images — is a colocated asset, copied verbatim.
function outFor(rel: string): string {
  let dir = dirname(rel)                            // "." | "index" | "breathe" | "breathe/breathe2"
  if (dir === "index") dir = "."                    // the homepage folder maps to the site root
  return dir === "." ? "index.html" : `${dir}/index.html`
}

async function main() {
  await mkdir(BUILD_DIR, { recursive: true })

  // 1. global, cross-page assets (favicon, the 88x31 library, lib/, ...)
  await cp("public/", BUILD_DIR, { recursive: true })

  // 2. colocated assets: mirror the pages/ tree into dist, MINUS the .ts page modules
  await cp(pagesUrl, BUILD_DIR, {
    recursive: true,
    filter: (src) => !src.endsWith(".ts"),
  })

  // 3. build every page module -> its dir's index.html (overwrites any stray copied html)
  for (const rel of await readdir(pagesUrl, { recursive: true })) {
    if (!rel.endsWith(".ts")) continue

    const render = (await import(new URL(rel, pagesUrl).href)).default
    const out = BUILD_DIR + outFor(rel)

    await mkdir(dirname(out), { recursive: true })
    await writeFile(out, wrap(render())) // doctype + ascii header
    console.log("built", out)
  }

  // 4. one full-screen page per shader, generated from the gallery manifest.
  // route: /shaders/gallery/<name>/. up/down walks the manifest order, baked in
  // here as prev/next (wrapping). the shared renderer (src/scripts/shader-page.ts)
  // reads the frag url + neighbours off the canvas data-attrs, so there's no
  // per-shader bundle -- one script, 79 pages.
  const GALLERY = "shaders/gallery/"
  const shaderName = (frag: string) => frag.split("/").pop()!.replace(/\.frag$/, "")
  const names = MANIFEST.map((d) => d.label ?? shaderName(d.frag_url))
  for (let i = 0; i < MANIFEST.length; i++) {
    const name = names[i]
    const prev = names[(i - 1 + names.length) % names.length]
    const next = names[(i + 1) % names.length]
    const body =
      `<canvas id="shader" data-frag="/${GALLERY}${MANIFEST[i].frag_url}"` +
      ` data-prev="${prev}" data-next="${next}"></canvas>` +
      `<a class="shader-name" href="../">${name}</a>`
    const out = `${BUILD_DIR}${GALLERY}${name}/index.html`
    await mkdir(dirname(out), { recursive: true })
    await writeFile(out, wrap(page({
      title: `shaders · ${name}`,
      body,
      styles: ["/shader-page.css"],
      scripts: ["/scripts/shader-page.js"],
    })))
  }
  console.log(`built ${MANIFEST.length} shader pages under /${GALLERY}`)

  // 5. the 88x31 button gallery: 1,000 flat pages (0001..1000) of 100 archived
  // buttons each, compiled from the crawler's manifest artifact in data/.
  // the manifest is build input, not source -- absent or invalid, the build fails.
  await buildButtonGallery(BUILD_DIR)

  // 6. bundle every browser-script in src/scripts/ -> dist/scripts/<name>.js.
  // these live OUTSIDE pages/ because they aren't pages: they're standalone
  // client code a page opts into via Page.scripts (or page.ts's globals, e.g. hit).
  // bundle + iife so a plain <script src> works (no type=module) AND imports like
  // @/config.ts get inlined -- that's how hit.ts shares the one real API url.
  const scriptsUrl = new URL("./scripts/", import.meta.url)
  const scriptEntries = (await readdir(scriptsUrl))
    .filter((f) => f.endsWith(".ts"))
    .map((f) => `src/scripts/${f}`)

  if (scriptEntries.length) {
    await build({
      entryPoints: scriptEntries,
      bundle: true,
      format: "iife",
      target: "es2020",
      minify: true,
      outdir: BUILD_DIR + "scripts",
    })
    for (const e of scriptEntries) console.log("bundled", e)
  }
}

main()
