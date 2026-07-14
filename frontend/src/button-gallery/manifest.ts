// the button-gallery manifest: the json artifact the crawler's reduction emits
// and this build consumes. the schema is a fixed public contract (see the
// pipeline's GALLERY.md) -- exactly these fields, no extras, no stored rank
// (rank = array index + 1). this module holds the types and the validation
// that protects the compiler boundary: it rejects a bad artifact loudly and
// never repairs, re-ranks, or re-aggregates.

export type ButtonFormat = "gif" | "png" | "jpg" | "bmp" | "webp"

export type GalleryButton = {
  hash: string           // complete lowercase sha256 -- the identity
  archiveUrl: string     // permanent bucket url, recomputable from hash + format
  format: ButtonFormat
  animated: boolean
  bestName: string | null // most-witnessed filename; raw evidence, never invented
  firstSeen: string      // utc rfc 3339
  hostCount: number      // distinct hostnames in hostingPages -- THE popularity
  sightingCount: number
  hostingPages: string[] // witnessed hosting urls, deduped, sorted
}

export type Manifest = {
  generatedAt: string
  sightingCount: number
  buttonCount: number
  buttons: GalleryButton[] // in ranking order
}

// the fixed exhibition boundary: a deliberately round selection, not a claim
// about the size of the eternal archive.
export const BUTTON_COUNT = 100_000
export const BUTTONS_PER_PAGE = 100
export const PAGE_COUNT = BUTTON_COUNT / BUTTONS_PER_PAGE

const MANIFEST_KEYS = ["generatedAt", "sightingCount", "buttonCount", "buttons"]
const BUTTON_KEYS = [
  "hash", "archiveUrl", "format", "animated", "bestName",
  "firstSeen", "hostCount", "sightingCount", "hostingPages",
]

const EXTENSIONS: Record<ButtonFormat, string> = {
  gif: ".gif", png: ".png", jpg: ".jpg", bmp: ".bmp", webp: ".webp",
}

const HASH_RE = /^[0-9a-f]{64}$/
const TIMESTAMP_RE = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/

// the permanent archive url law. this must agree with the crawler's bucket
// export exactly; it exists here only to verify the manifest, never to mint
// urls the crawler didn't emit.
export const archiveUrlFor = (hash: string, format: ButtonFormat): string => {
  const bucket = Math.floor(parseInt(hash[0]!, 16) / 4)
  return `https://b${bucket}.catson.wiki/${hash.slice(0, 2)}/${hash.slice(0, 16)}${EXTENSIONS[format]}`
}

const isRecord = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null && !Array.isArray(v)

const isCount = (v: unknown): v is number =>
  typeof v === "number" && Number.isInteger(v) && v >= 0

// rfc 3339 utc; the fractional part is stripped before Date.parse because
// engines only promise millisecond precision, and the crawler emits nanoseconds.
const isUtcTimestamp = (v: unknown): v is string =>
  typeof v === "string" &&
  TIMESTAMP_RE.test(v) &&
  !Number.isNaN(Date.parse(v.replace(/\.\d+Z$/, "Z")))

const hasExactKeys = (o: Record<string, unknown>, expected: string[]): boolean =>
  Object.keys(o).length === expected.length &&
  expected.every((k) => Object.prototype.hasOwnProperty.call(o, k))

// hostname of a valid absolute http/https url, lowercased; null otherwise.
const hostingHostname = (v: string): string | null => {
  let url: URL
  try { url = new URL(v) } catch { return null }
  return url.protocol === "http:" || url.protocol === "https:"
    ? url.hostname.toLowerCase()
    : null
}

// code-point order, matching the producer's lexicographic sort (js string
// comparison is utf-16 code-unit order, which disagrees above the bmp).
const codePointCompare = (a: string, b: string): number => {
  const ai = a[Symbol.iterator](), bi = b[Symbol.iterator]()
  for (;;) {
    const x = ai.next(), y = bi.next()
    if (x.done || y.done) return (x.done ? 0 : 1) - (y.done ? 0 : 1)
    const cx = x.value.codePointAt(0)!, cy = y.value.codePointAt(0)!
    if (cx !== cy) return cx < cy ? -1 : 1
  }
}

const invalid = (msg: string): Error =>
  new Error(`button gallery manifest invalid: ${msg}`)

// structural validation of the parsed artifact. throws on the first failure
// with enough location information to identify the offending button.
export function validateManifest(data: unknown): Manifest {
  if (!isRecord(data)) throw invalid("top level is not an object")
  if (!hasExactKeys(data, MANIFEST_KEYS))
    throw invalid(`top-level fields are [${Object.keys(data)}], expected exactly [${MANIFEST_KEYS}]`)

  if (!isUtcTimestamp(data.generatedAt))
    throw invalid(`generatedAt ${JSON.stringify(data.generatedAt)} is not a utc rfc 3339 timestamp`)
  if (!isCount(data.sightingCount))
    throw invalid(`sightingCount ${JSON.stringify(data.sightingCount)} is not a non-negative integer`)
  if (data.buttonCount !== BUTTON_COUNT)
    throw invalid(`buttonCount is ${JSON.stringify(data.buttonCount)}, the exhibition requires exactly ${BUTTON_COUNT}`)
  if (!Array.isArray(data.buttons))
    throw invalid("buttons is not an array")
  if (data.buttons.length !== BUTTON_COUNT)
    throw invalid(`buttons has length ${data.buttons.length}, expected exactly ${BUTTON_COUNT}`)

  const seenHashes = new Set<string>()
  const seenArchiveIds = new Set<string>() // 16-char prefixes: one permanent url each

  for (let i = 0; i < data.buttons.length; i++) {
    const raw: unknown = data.buttons[i]
    const at = (msg: string): Error => invalid(`button at rank ${i + 1}: ${msg}`)

    if (!isRecord(raw)) throw at("not an object")
    if (!hasExactKeys(raw, BUTTON_KEYS))
      throw at(`fields are [${Object.keys(raw)}], expected exactly [${BUTTON_KEYS}]`)

    if (typeof raw.hash !== "string" || !HASH_RE.test(raw.hash))
      throw at(`hash ${JSON.stringify(raw.hash)} is not a complete lowercase sha256`)
    const hash = raw.hash
    if (seenHashes.has(hash)) throw at(`duplicate hash ${hash}`)
    seenHashes.add(hash)
    const archiveId = hash.slice(0, 16)
    if (seenArchiveIds.has(archiveId))
      throw at(`archive identity collision: prefix ${archiveId} already claimed`)
    seenArchiveIds.add(archiveId)

    if (typeof raw.format !== "string" || !(raw.format in EXTENSIONS))
      throw at(`unrecognized format ${JSON.stringify(raw.format)}`)
    const format = raw.format as ButtonFormat
    if (typeof raw.animated !== "boolean")
      throw at(`animated ${JSON.stringify(raw.animated)} is not a boolean`)
    if (raw.bestName !== null && (typeof raw.bestName !== "string" || raw.bestName.length === 0))
      throw at(`bestName ${JSON.stringify(raw.bestName)} is neither null nor a non-empty string`)
    if (!isUtcTimestamp(raw.firstSeen))
      throw at(`firstSeen ${JSON.stringify(raw.firstSeen)} is not a utc rfc 3339 timestamp`)
    if (!isCount(raw.hostCount))
      throw at(`hostCount ${JSON.stringify(raw.hostCount)} is not a non-negative integer`)
    if (!isCount(raw.sightingCount))
      throw at(`sightingCount ${JSON.stringify(raw.sightingCount)} is not a non-negative integer`)

    const expectedUrl = archiveUrlFor(hash, format)
    if (raw.archiveUrl !== expectedUrl)
      throw at(`archiveUrl ${JSON.stringify(raw.archiveUrl)} does not recompute to ${expectedUrl}`)

    if (!Array.isArray(raw.hostingPages)) throw at("hostingPages is not an array")
    const hostnames = new Set<string>()
    let prevUrl: string | null = null
    for (const u of raw.hostingPages) {
      if (typeof u !== "string") throw at(`hosting page ${JSON.stringify(u)} is not a string`)
      const hostname = hostingHostname(u)
      if (hostname === null) throw at(`hosting page ${JSON.stringify(u)} is not a valid absolute http/https url`)
      if (prevUrl !== null && codePointCompare(prevUrl, u) >= 0)
        throw at(`hostingPages not sorted and duplicate-free at ${JSON.stringify(u)}`)
      prevUrl = u
      hostnames.add(hostname)
    }
    if (raw.hostCount !== hostnames.size)
      throw at(`hostCount ${raw.hostCount} does not equal the ${hostnames.size} distinct hostnames of hostingPages`)
  }

  return data as unknown as Manifest
}
