// the two decorative button marquees on the 88x31 landing page. each bar is
// filled from one random pre-built gallery page (0001..1000.html) -- so every
// refresh shows a different pair of 100-button slices. enhancement only: on any
// fetch/parse failure the bars stay empty and the page is exactly as rendered.
//
// motion lives entirely in css (landing.css); this only builds the dom.

const PAGE_COUNT = 1000

const pagePath = (n: number): string =>
  `/88x31/pages/${String(n).padStart(4, "0")}.html`

// two distinct random gallery pages, so the bars never mirror each other
function twoPages(): [number, number] {
  const a = 1 + Math.floor(Math.random() * PAGE_COUNT)
  let b = 1 + Math.floor(Math.random() * PAGE_COUNT)
  while (b === a) b = 1 + Math.floor(Math.random() * PAGE_COUNT)
  return [a, b]
}

// fetch a built gallery page and copy its 100 button images into `track`,
// doubled so the css translateX(-50%) loops seamlessly.
async function fillBar(track: HTMLElement, pageNum: number): Promise<void> {
  let res: Response
  try {
    res = await fetch(pagePath(pageNum))
  } catch {
    return
  }
  if (!res.ok) return
  const doc = new DOMParser().parseFromString(await res.text(), "text/html")
  const imgs = doc.querySelectorAll<HTMLImageElement>(".gallery-field img")
  if (imgs.length === 0) return

  const strip = document.createDocumentFragment()
  for (const source of imgs) {
    const img = document.createElement("img")
    img.src = source.getAttribute("src") ?? ""
    img.alt = ""            // decorative; the bar is aria-hidden
    img.width = 88
    img.height = 31
    img.decoding = "async"
    strip.appendChild(img)
  }
  track.appendChild(strip.cloneNode(true)) // copy one
  track.appendChild(strip)                 // copy two -> seamless -50% loop
}

function main(): void {
  const top = document.querySelector<HTMLElement>("#marquee-top .marquee-track")
  const bottom = document.querySelector<HTMLElement>("#marquee-bottom .marquee-track")
  if (!top || !bottom) return

  const [pa, pb] = twoPages()
  void fillBar(top, pa)
  void fillBar(bottom, pb)
}

main()
