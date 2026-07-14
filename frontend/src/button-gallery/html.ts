// pure html generation for the button gallery: a validated manifest slice ->
// one complete exhibition page. every witnessed string (filenames, hosting
// urls) is untrusted evidence and is escaped for its exact html context here;
// the browser script reads the page-local json island, never raw markup.

import page from "@/page.ts"
import type { ButtonFormat, GalleryButton } from "@/button-gallery/manifest.ts"
import { BUTTON_COUNT, BUTTONS_PER_PAGE, PAGE_COUNT } from "@/button-gallery/manifest.ts"

// the page-local data island: one entry per button, in page order, indexed by
// data-button-index. only what the shared browser script actually uses -- the
// hover window lines and the random-host destinations.
export type PageButtonData = {
  rank: number          // global rank (manifest index + 1)
  name: string | null   // bestName, raw evidence
  hosts: number
  sightings: number
  firstSeen: string     // utc date, YYYY-MM-DD
  animated: boolean
  format: ButtonFormat
  hash16: string        // first 16 hash chars; the full hash lives in the caption
  pages: string[]       // hostingPages -- the random-travel destinations
}

export const GALLERY_PATH = "/88x31/pages/"
export const pageFileName = (p: number): string =>
  `${String(p).padStart(4, "0")}.html`

const pageUrl = (p: number): string =>
  `https://catson.wiki${GALLERY_PATH}${pageFileName(p)}`

const ESCAPES: Record<string, string> = {
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
}
const escapeHtml = (s: string): string =>
  s.replace(/[&<>"']/g, (c) => ESCAPES[c]!)

// json destined for an inline <script> element: escape the characters that
// could terminate the element or create markup, as \uXXXX inside the json
// strings, so the payload parses back to the intended values exactly.
const SCRIPT_JSON_ESCAPES: Record<string, string> = {
  "<": "\\u003c", ">": "\\u003e", "&": "\\u0026",
  "\u2028": "\\u2028", "\u2029": "\\u2029",
}
const jsonForScriptElement = (v: unknown): string =>
  JSON.stringify(v).replace(/[<>&\u2028\u2029]/g, (c) => SCRIPT_JSON_ESCAPES[c]!)

const count = (n: number, singular: string, plural: string): string =>
  `${n.toLocaleString("en-US")} ${n === 1 ? singular : plural}`

// the factual caption backing each button for readers without the hover
// window. states evidence only; never describes what the image depicts.
const buttonCaption = (b: GalleryButton, rank: number): string => {
  const parts = [
    `ranked ${rank.toLocaleString("en-US")} of ${BUTTON_COUNT.toLocaleString("en-US")}`,
    ...(b.bestName !== null ? [`best observed filename ${b.bestName}`] : []),
    `seen on ${count(b.hostCount, "distinct site", "distinct sites")} across ${count(b.sightingCount, "sighting", "sightings")}`,
    `first seen ${b.firstSeen.slice(0, 10)} utc`,
    `${b.animated ? "animated" : "static"} ${b.format}`,
    `sha256 ${b.hash}`,
    b.hostingPages.length > 0
      ? "activating this button visits one of the sites that displayed it"
      : "activating this button opens the archived image",
  ]
  return parts.join(". ") + "."
}

// one button: the image is the whole visible area; the caption is the
// screen-reader evidence; the href is the no-javascript fallback -- the first
// (already sorted) hosting page, or the archived image when none exists.
const renderButton = (b: GalleryButton, rank: number, localIndex: number): string => {
  const fallback = b.hostingPages.length > 0 ? b.hostingPages[0]! : b.archiveUrl
  const alt = b.bestName ?? `archived 88x31 button #${rank}`
  return (
    `<figure class="gallery-button">` +
    `<a class="gallery-button-link" href="${escapeHtml(fallback)}" data-button-index="${localIndex}" aria-describedby="button-caption-${rank}">` +
    `<img src="${escapeHtml(b.archiveUrl)}" alt="${escapeHtml(alt)}" width="88" height="31" loading="lazy" decoding="async">` +
    `</a>` +
    `<figcaption id="button-caption-${rank}" class="visually-hidden">${escapeHtml(buttonCaption(b, rank))}</figcaption>` +
    `</figure>`
  )
}

const pageData = (slice: GalleryButton[], start: number): PageButtonData[] =>
  slice.map((b, i) => ({
    rank: start + i + 1,
    name: b.bestName,
    hosts: b.hostCount,
    sightings: b.sightingCount,
    firstSeen: b.firstSeen.slice(0, 10),
    animated: b.animated,
    format: b.format,
    hash16: b.hash.slice(0, 16),
    pages: b.hostingPages,
  }))

// footer navigation: on the first/last page the unavailable direction is
// plain text, never a dead or self-referential link.
const renderNav = (p: number): string => {
  const link = (n: number, label: string): string =>
    `<a href="${GALLERY_PATH}${pageFileName(n)}">${label}</a>`
  const first = p > 1 ? link(1, "first") : "first"
  const prev = p > 1 ? link(p - 1, "previous") : "previous"
  const next = p < PAGE_COUNT ? link(p + 1, "next") : "next"
  const last = p < PAGE_COUNT ? link(PAGE_COUNT, "last") : "last"
  return `${first} * ${prev} * ${p} / ${PAGE_COUNT} * ${next} * ${last}`
}

// page p (1-based) of the exhibition: buttons[(p-1)*100 .. p*100), complete
// html document body via the shared page layout.
export function renderGalleryPage(buttons: GalleryButton[], p: number): string {
  const start = (p - 1) * BUTTONS_PER_PAGE
  const slice = buttons.slice(start, start + BUTTONS_PER_PAGE)

  const body = `
<header class="gallery-header"><a href="/">catson wiki</a> * <a href="/88x31/">button gallery</a> * page ${p} / ${PAGE_COUNT}</header>

<main class="gallery-field">
${slice.map((b, i) => renderButton(b, start + i + 1, i)).join("\n")}
</main>

<nav class="gallery-nav">${renderNav(p)}</nav>

<aside id="button-gallery-window" hidden aria-hidden="true"></aside>

<script type="application/json" id="button-gallery-data">${jsonForScriptElement(pageData(slice, start))}</script>
`

  return page({
    title: `88x31 button gallery · page ${p} / ${PAGE_COUNT}`,
    body,
    description:
      `page ${p} of ${PAGE_COUNT} in catson.wiki's exhibition of 100,000 archived 88x31 web buttons ` +
      `ranked by distinct hosting sites — buttons ${(start + 1).toLocaleString("en-US")} to ${(start + slice.length).toLocaleString("en-US")}.`,
    canonical: pageUrl(p),
    prev: p > 1 ? pageUrl(p - 1) : undefined,
    next: p < PAGE_COUNT ? pageUrl(p + 1) : undefined,
    styles: ["/88x31/button-gallery.css"],
    scripts: ["/scripts/button-gallery.js"],
  })
}
