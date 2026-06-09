/*
let paying_attention = false

window.addEventListener('mousemove', (event) => {
    if(!paying_attention) return
})
*/

// untested:

(() => {
  let paying_attention = true   // start true or nothing ever draws
  let mouseX = 0, mouseY = 0

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
  ctx.strokeStyle = 'white'              // pick something visible

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
  })

  window.addEventListener('click', () => {
    paying_attention = false
  }, { once: true })

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  })

  function draw() {
    if (!paying_attention) {
      canvas.remove()   // clean up the corpse
      return            // no rAF scheduled -> loop dies, script done
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.beginPath()
    ctx.arc(mouseX, mouseY, 30, 0, Math.PI * 2)
    ctx.stroke()
    requestAnimationFrame(draw)
  }

  draw()
})()