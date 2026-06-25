// the bouncing shader ad. a small canvas that drifts DVD-logo-style around the
// screen, renders a real gallery shader, and links to /shaders/. it swaps to a
// fresh random shader every time it bounces off an edge.
//
// this is the back half of `attention` (see attention.ts). that nag runs until
// the visitor clicks a link, which sets attention:seen; once that key exists the
// nag stops -- and THIS runs instead, the returning-visitor treat. same key,
// opposite sign, so the two are mutually exclusive with no coordination.

import { buildProgram, buildVertexShader, type Uniforms } from "@/gallery/shader.ts"
import { MANIFEST } from "@/gallery/manifest.ts"

;(() => {
  try {
    if (!localStorage.getItem("attention:seen")) return // not graduated -> attention's turn, not ours
  } catch { return }                                    // no storage -> attention runs, we stay out

  const W = 180, H = 135                                 // CSS px, 4:3
  const DPR = 1                                          // tiny decorative box -> native res is plenty, ~4x cheaper
  const FRAME_MS = 33                                    // ~30fps; a drifting toy doesn't need 60
  const SPEED = 2.4                                      // px/tick drift (tuned for the 30fps tick)

  // a clickable box -> /shaders/, fixed and translated each frame.
  const link = document.createElement("a")
  link.href = "/shaders/"
  link.title = "see all my shaders"
  Object.assign(link.style, {
    position: "fixed", top: "0", left: "0", zIndex: "500",
    width: W + "px", height: H + "px", display: "block", overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.4)",
    boxShadow: "0 4px 22px rgba(0,0,0,0.55)",
    cursor: "pointer", background: "#000",
  })

  const canvas = document.createElement("canvas")
  canvas.width = Math.round(W * DPR)
  canvas.height = Math.round(H * DPR)
  Object.assign(canvas.style, { width: W + "px", height: H + "px", display: "block" })
  link.appendChild(canvas)

  const caption = document.createElement("span")
  caption.textContent = "shader gallery (NEW!)"
  Object.assign(caption.style, {
    position: "absolute", left: "2px", top: "2px",
    color: "#fff", font: '12px/1 "JetBrains Mono", monospace', letterSpacing: "0.1em",
    textShadow: "0 0 6px #000, 0 0 12px #88aadd", pointerEvents: "none",
  })
  link.appendChild(caption)

  document.body.appendChild(link)

  const gl = canvas.getContext("webgl2", { antialias: false })
  if (!gl) { link.remove(); return }
  const vert = buildVertexShader(gl)

  // one fullscreen-quad VAO (a_position at loc 0, matching the harness).
  const vao = gl.createVertexArray()
  gl.bindVertexArray(vao)
  const buf = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buf)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, -1, 1, 1, -1, 1]), gl.STATIC_DRAW)
  gl.enableVertexAttribArray(0)
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0)
  gl.viewport(0, 0, canvas.width, canvas.height)

  let program: WebGLProgram | null = null
  let uniforms: Uniforms | null = null

  // swap in a fresh random shader, retrying past any dead frags so a bounce never
  // lands the ad on a blank tile. the old shader keeps drawing until this resolves.
  async function swap() {
    for (let tries = 0; tries < 6; tries++) {
      const pick = MANIFEST[Math.floor(Math.random() * MANIFEST.length)]
      try {
        const res = await fetch("/shaders/gallery/" + pick.frag_url)
        if (!res.ok) continue
        const built = buildProgram(gl!, vert, await res.text())
        if (built.error || !built.program) continue
        program = built.program
        uniforms = built.uniforms
        return
      } catch { /* try another */ }
    }
  }

  // DVD-logo drift: position in CSS px, reflect off the viewport edges; every
  // reflection swaps the shader.
  let x = Math.random() * Math.max(0, window.innerWidth - W)
  let y = Math.random() * Math.max(0, window.innerHeight - H)
  let vx = SPEED * (Math.random() < 0.5 ? -1 : 1)
  let vy = SPEED * (Math.random() < 0.5 ? -1 : 1)

  const start = performance.now()
  let frame = 0
  let last = 0
  function loop(now: number) {
    requestAnimationFrame(loop)
    if (now - last < FRAME_MS) return // throttle: skip frames so the ad ticks ~30fps
    last = now

    x += vx; y += vy
    const maxX = Math.max(0, window.innerWidth - W)
    const maxY = Math.max(0, window.innerHeight - H)
    let bounced = false
    if (x <= 0) { x = 0; vx = Math.abs(vx); bounced = true }
    else if (x >= maxX) { x = maxX; vx = -Math.abs(vx); bounced = true }
    if (y <= 0) { y = 0; vy = Math.abs(vy); bounced = true }
    else if (y >= maxY) { y = maxY; vy = -Math.abs(vy); bounced = true }
    if (bounced) swap()
    link.style.transform = `translate(${x}px, ${y}px)`

    if (program && uniforms) {
      gl!.useProgram(program)
      gl!.uniform3f(uniforms.iResolution, canvas.width, canvas.height, 1)
      gl!.uniform1f(uniforms.iTime, (now - start) / 1000)
      gl!.uniform1i(uniforms.iFrame, frame++)
      gl!.uniform4f(uniforms.iMouse, 0, 0, 0, 0)
      gl!.uniform2f(uniforms.iOffset, 0, 0)
      gl!.drawArrays(gl!.TRIANGLES, 0, 6)
    }
  }

  swap()
  requestAnimationFrame(loop)
})()
