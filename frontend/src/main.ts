import { writeFile, mkdir, cp, readdir } from "node:fs/promises"
import { dirname } from "node:path"
import { build } from "esbuild"

import { PAGE_ROOT, BUILD_DIR, HTML_HEADER } from "@/config.ts"

const pagesUrl = new URL(PAGE_ROOT, import.meta.url)

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
    await writeFile(out, `<!DOCTYPE html>\n` + HTML_HEADER + render()) // mega simple header
    console.log("built", out)
  }

  /*
  // 4. bundle the client-side shader-gallery engine (src/gallery/) into one script.
  // it lives OUTSIDE pages/ on purpose: it isn't a page module, it's browser code.
  // iife so the page can load it with a plain <script src> (no type=module).
  await build({
    entryPoints: ["src/gallery/main.ts"],
    bundle: true,
    format: "iife",
    target: "es2020",
    minify: true,
    outfile: BUILD_DIR + "shaders/gallery.js",
  })
  console.log("built", BUILD_DIR + "shaders/gallery.js")
  */
}

main()
