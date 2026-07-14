// shared browser behavior for every button gallery page (bundled once as
// dist/scripts/button-gallery.js, opted into via Page.scripts). two duties:
//
//   1. the single floating metadata window, shown on hover / keyboard focus;
//   2. random travel -- an ordinary primary click on a button picks uniformly
//      from that button's witnessed hosting pages at activation time.
//
// this is enhancement only: without it every button still follows its
// deterministic fallback href and all evidence stays in the hidden captions.
// all listeners are delegated through the field; nothing is installed
// per-button.

import type { PageButtonData } from "@/button-gallery/html.ts"

const WINDOW_ID = "button-gallery-window"
const DATA_ID = "button-gallery-data"
const POINTER_OFFSET = 12 // px between the cursor and the window
const VIEWPORT_MARGIN = 8 // px the window keeps from every viewport edge

// parse and re-validate the page-local json island. the script only ever
// navigates to strings that survive this check.
function readPageData(): PageButtonData[] | null {
  const el = document.getElementById(DATA_ID)
  if (!el?.textContent) return null
  let parsed: unknown
  try {
    parsed = JSON.parse(el.textContent)
  } catch {
    return null
  }
  if (!Array.isArray(parsed)) return null
  const ok = parsed.every((d: unknown) =>
    typeof d === "object" && d !== null &&
    Array.isArray((d as PageButtonData).pages) &&
    (d as PageButtonData).pages.every(
      (u: unknown) => typeof u === "string" && /^https?:\/\//.test(u),
    ),
  )
  return ok ? (parsed as PageButtonData[]) : null
}

function windowLines(d: PageButtonData): string[] {
  const plural = (n: number, word: string): string =>
    `${n} ${word}${n === 1 ? "" : "s"}`
  return [
    `#${String(d.rank).padStart(6, "0")}`,
    ...(d.name !== null && d.name !== "" ? [d.name] : []),
    `seen on ${plural(d.hosts, "site")} * ${plural(d.sightings, "sighting")}`,
    `first seen ${d.firstSeen}`,
    `${d.animated ? "animated" : "static"} ${d.format}`,
    //`sha256 ${d.hash16}...`,
    //d.pages.length > 0 ? "click -> random host" : "click -> archived image",
  ]
}

function main(): void {
  const field = document.querySelector<HTMLElement>(".gallery-field")
  const win = document.getElementById(WINDOW_ID)
  const data = readPageData()
  if (!field || !win || !data) return

  // the hovered/focused gallery link the window currently describes
  let current: HTMLAnchorElement | null = null

  const linkFor = (target: EventTarget | null): HTMLAnchorElement | null =>
    target instanceof Element
      ? target.closest<HTMLAnchorElement>("a.gallery-button-link")
      : null

  const dataFor = (a: HTMLAnchorElement): PageButtonData | null => {
    const i = Number(a.getAttribute("data-button-index"))
    return Number.isInteger(i) && i >= 0 && i < data.length ? data[i]! : null
  }

  // untrusted names go in via textContent, one div per line -- never markup
  const populate = (d: PageButtonData): void => {
    win.replaceChildren(...windowLines(d).map((text) => {
      const line = document.createElement("div")
      line.textContent = text
      return line
    }))
  }

  // place the (already populated, visible) window near an anchor point,
  // clamped fully inside the viewport
  const placeAt = (x: number, y: number): void => {
    const w = win.offsetWidth
    const h = win.offsetHeight
    const maxLeft = window.innerWidth - w - VIEWPORT_MARGIN
    const maxTop = window.innerHeight - h - VIEWPORT_MARGIN
    win.style.left = `${Math.min(Math.max(x + POINTER_OFFSET, VIEWPORT_MARGIN), Math.max(maxLeft, VIEWPORT_MARGIN))}px`
    win.style.top = `${Math.min(Math.max(y + POINTER_OFFSET, VIEWPORT_MARGIN), Math.max(maxTop, VIEWPORT_MARGIN))}px`
  }

  const show = (a: HTMLAnchorElement): boolean => {
    const d = dataFor(a)
    if (!d) return false
    current = a
    populate(d)
    win.hidden = false
    return true
  }

  const hide = (): void => {
    current = null
    win.hidden = true
  }

  // --- hover ---
  field.addEventListener("pointerover", (e) => {
    const a = linkFor(e.target)
    if (!a) return
    if (a !== current && !show(a)) return
    placeAt(e.clientX, e.clientY)
  })
  field.addEventListener("pointermove", (e) => {
    if (current && linkFor(e.target) === current) placeAt(e.clientX, e.clientY)
  })
  field.addEventListener("pointerout", (e) => {
    if (!current) return
    const from = linkFor(e.target)
    const to = linkFor(e.relatedTarget)
    if (from === current && to !== current) hide()
  })

  // --- keyboard focus ---
  field.addEventListener("focusin", (e) => {
    const a = linkFor(e.target)
    if (!a) return
    if (show(a)) {
      const r = a.getBoundingClientRect()
      placeAt(r.left, r.bottom)
    }
  })
  field.addEventListener("focusout", (e) => {
    if (current && linkFor(e.relatedTarget) !== current) hide()
  })

  window.addEventListener("pagehide", hide)

  // --- random travel ---
  // only an ordinary, unmodified primary activation is intercepted; middle
  // clicks, modified clicks, and other browser link semantics keep the
  // deterministic fallback href. a button with no hosting pages is never
  // intercepted -- its fallback opens the archived image.
  field.addEventListener("click", (e) => {
    if (e.defaultPrevented) return
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    const a = linkFor(e.target)
    if (!a) return
    const d = dataFor(a)
    if (!d || d.pages.length === 0) return
    e.preventDefault()
    location.assign(d.pages[Math.floor(Math.random() * d.pages.length)]!)
  })
}

main()
