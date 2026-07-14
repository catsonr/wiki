// compiles the button gallery: reads the manifest build input, validates it,
// then emits the exhibition as 1,000 flat pages (0001.html .. 1000.html) into
// the build directory. the manifest is generated data transferred from the
// crawler -- an absent or invalid artifact fails the whole build loudly, and
// no gallery page is written before validation passes.

import { mkdir, readFile, writeFile } from "node:fs/promises"

import { HTML_HEADER } from "@/config.ts"
import { PAGE_COUNT, validateManifest } from "@/button-gallery/manifest.ts"
import type { Manifest } from "@/button-gallery/manifest.ts"
import { GALLERY_PATH, pageFileName, renderGalleryPage } from "@/button-gallery/html.ts"

// canonical build-input path, relative to frontend/. not source, not deployed,
// not committed (see .gitignore); regenerate on the crawler and transfer here.
export const MANIFEST_PATH = "data/88x31-gallery-manifest.json"

export async function loadGalleryManifest(path: string = MANIFEST_PATH): Promise<Manifest> {
  let raw: string
  try {
    raw = await readFile(path, "utf8")
  } catch {
    throw new Error(
      `button gallery: manifest missing at ${path}\n` +
      `it is generated data, not source: produce it on the crawler side\n` +
      `(button-pipeline --manifest) and transfer it to that exact path.`,
    )
  }
  let parsed: unknown
  try {
    parsed = JSON.parse(raw)
  } catch (e) {
    throw new Error(`button gallery: manifest at ${path} is not valid json: ${e}`)
  }
  return validateManifest(parsed)
}

export async function buildButtonGallery(buildDir: string): Promise<void> {
  const manifest = await loadGalleryManifest()

  const outDir = buildDir + GALLERY_PATH.slice(1) // "dist/" + "88x31/pages/"
  await mkdir(outDir, { recursive: true })
  for (let p = 1; p <= PAGE_COUNT; p++) {
    const html = `<!DOCTYPE html>\n` + HTML_HEADER + renderGalleryPage(manifest.buttons, p)
    await writeFile(outDir + pageFileName(p), html)
  }
  console.log(`built ${PAGE_COUNT} button gallery pages under ${GALLERY_PATH}`)
}
