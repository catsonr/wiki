/*
let paying_attention = false

window.addEventListener('mousemove', (event) => {
    if(!paying_attention) return
})
*/

// untested:

(() => {
  // run until they ENGAGE: the flag means "they clicked one of our lit targets",
  // not "they arrived". so we only READ it here -- set it below, on a real click.
  // bail without clicking and you get re-nagged next visit. (per-origin key, so
  // it's shared across all of catson.wiki; private-mode access can throw -> run.)
  const SEEN = 'attention:seen'
  try {
    if (localStorage.getItem(SEEN)) return   // already clicked through before -> skip
  } catch { /* no storage available -> just run */ }

  let mouseX = 0, mouseY = 0
  let moved = false             // don't draw before the cursor has actually moved

  // spawn fullscreen canvas, on top, click-through
  const canvas = document.createElement('canvas')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  Object.assign(canvas.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    zIndex: '10000',
    pointerEvents: 'none',   // <-- clicks pass through to your links
  })
  document.body.appendChild(canvas)

  const ctx = canvas.getContext('2d')!   // ! to shut up TS about null
  ctx.fillStyle = 'black'                // the veil color

  // everything we consider "clickable".
  const CLICKABLE = 'a[href], button, input, select, textarea, label, [onclick], [role="button"]'
  const PAD = 4                          // breathing room around each element

  // for each clickable, the node(s) we MEASURE each frame. an inline <a> around an
  // <img> has a box inflated by line-height leading + a collapsed-whitespace space,
  // so it reads loose; when a clickable wraps replaced media we measure that child
  // instead -- a replaced element's box is exactly its rendered pixels (this is why
  // the cube, an <a> around a <canvas>, was always tight). no media -> measure the
  // element itself (text links / buttons / inputs are already snug). queried once;
  // rects are re-read per frame, so scrolling just works.
  const REPLACED = 'img, canvas, svg, video'
  const measured = Array.from(document.querySelectorAll(CLICKABLE), (el) => {
    const media = el.querySelectorAll(REPLACED)
    return media.length ? Array.from(media) : [el]
  })

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
    moved = true
  })

  // graduate them the moment they click one of the lit targets. closest() walks
  // up from whatever was hit (e.g. the <img> inside an <a>) to the clickable.
  // the setItem is synchronous, so it lands even as a link navigates away.
  window.addEventListener('click', (e) => {
    if ((e.target as Element | null)?.closest(CLICKABLE)) {
      try { localStorage.setItem(SEEN, '1') } catch { /* no storage -> oh well */ }
    }
  })

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  })

  // --- intro animation: the bouncy stagger --------------------------------
  // veil is full-black immediately; each window then SCALES 0 -> 1 about its own
  // center with an easeOutBack OVERSHOOT (briefly punches past full size, then
  // settles), and they fire one after another -- cursor first, then each clickable
  // delayed by its index, so the lights cascade in down the page with a little
  // bounce. starts on the first drawn frame (first mouse move).
  const STAGGER_MS = 55          // delay between successive windows
  const POP_MS = 420             // how long one window takes to pop
  const c1 = 1.70158, c3 = c1 + 1
  const easeOutBack = (x: number) => 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2)
  const scaleAt = (now: number, i: number) =>   // this window's 0..~1.1 scale, given its slot
    easeOutBack(Math.min(Math.max((now - introStart - i * STAGGER_MS) / POP_MS, 0), 1))
  let introStart = -1

  // idle "breathing": once popped in, each window's padding sways on a sine wave
  // forever. a per-element random phase + speed keeps them out of step, so the
  // whole set ripples like a slow wave instead of pulsing in lockstep.
  const WAVE_MID = 8, WAVE_AMP = 4              // padding sways between 4 and 12 px
  const wobble = measured.map(() => ({
    phase: Math.random() * Math.PI * 2,         // random starting point on the wave
    speed: 0.0015 + Math.random() * 0.0015,     // rad/ms, each a touch different
  }))

  function draw(now: number) {
    if (moved) {                 // hold off until the cursor has actually moved
      if (introStart < 0) introStart = now

      // 1. full black veil
      ctx.globalCompositeOperation = 'source-over'
      ctx.fillStyle = 'black'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // 2. punch holes -- each scaled about its center by its own staggered pop
      ctx.globalCompositeOperation = 'destination-out'

      // the cursor window pops first (slot 0)
      const cs = scaleAt(now, 0)
      if (cs > 0) {
        ctx.beginPath()
        ctx.arc(mouseX, mouseY, 120 * cs, 0, Math.PI * 2)
        ctx.fill()
      }

      // each clickable pops in turn. getClientRects() gives the browser's real
      // per-fragment border boxes; `measured` already swapped any media-wrapping
      // link for its tight child. we scale each rect about its center so it grows
      // in place rather than from a corner.
      for (let gi = 0; gi < measured.length; gi++) {
        const s = scaleAt(now, gi + 1)          // slot 0 is the cursor; clickables start at 1
        if (s <= 0) continue                    // its turn hasn't come yet
        const wob = wobble[gi]
        const p = WAVE_MID + WAVE_AMP * Math.sin(now * wob.speed + wob.phase)  // breathing padding
        for (const node of measured[gi]) {
          for (const r of Array.from(node.getClientRects())) {
            if (r.width === 0 || r.height === 0) continue   // skip hidden/unrendered
            const w = (r.width + p * 2) * s
            const h = (r.height + p * 2) * s
            const cx = r.left + r.width / 2
            const cy = r.top + r.height / 2
            const rad = Math.min(6, w / 2, h / 2)           // clamp so tiny scales stay valid
            ctx.beginPath()
            ctx.roundRect(cx - w / 2, cy - h / 2, w, h, rad)
            ctx.fill()
          }
        }
      }
    }
    requestAnimationFrame(draw)
  }

  requestAnimationFrame(draw)
})()