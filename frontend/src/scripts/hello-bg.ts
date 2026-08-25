// the /hello background shader. draws the frag named by #hello-bg[data-frag] into a
// fixed, full-viewport canvas that sits BEHIND the page (see hello.css) and never
// eats a click. it's the full-screen viewer (shader-page.ts) minus everything that
// makes it a page in its own right: no prev/next navigation, no mouse plumbing, and
// on any failure it stays quiet -- the css background is white, so the prose is
// readable even if webgl / the fetch / the compile falls over.

import { buildProgram, buildVertexShader } from "@/gallery/shader.ts"

const DPR = Math.min(window.devicePixelRatio || 1, 2)

async function main() {
  const canvas = document.getElementById("hello-bg") as HTMLCanvasElement | null
  if (!canvas) return
  const fragUrl = canvas.dataset.frag
  if (!fragUrl) return

  const gl = canvas.getContext("webgl2", { antialias: false })
  if (!gl) return // no webgl2 -> leave the white css background in place

  const vert = buildVertexShader(gl)

  // one fullscreen-quad VAO; a_position is bound to loc 0 by the harness.
  const vao = gl.createVertexArray()
  gl.bindVertexArray(vao)
  const buf = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buf)
  const quad = new Float32Array([-1, -1, 1, -1, -1, 1, 1, -1, 1, 1, -1, 1])
  gl.bufferData(gl.ARRAY_BUFFER, quad, gl.STATIC_DRAW)
  gl.enableVertexAttribArray(0)
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0)

  let source: string
  try {
    const res = await fetch(fragUrl)
    if (!res.ok) return
    source = await res.text()
  } catch { return }

  const { program, uniforms } = buildProgram(gl, vert, source)
  if (!program || !uniforms) return

  // shadertoy iMouse, same convention as the rest of the SSG (see shader-page.ts):
  // .xy = current pointer position (updated on any move, so the shader reacts to plain
  // hover), .zw = that position while a button is held, else 0. framebuffer px, y flipped
  // to GL's bottom-left. listeners live on `window`, not the canvas -- the canvas is
  // pointer-events:none, so it never sees the events itself.
  const mouse = { x: 0, y: 0, down: 0 }
  window.addEventListener("pointermove", (e) => {
    mouse.x = e.clientX * DPR
    mouse.y = canvas!.height - e.clientY * DPR
  })
  window.addEventListener("pointerdown", () => { mouse.down = 1 })
  window.addEventListener("pointerup", () => { mouse.down = 0 })

  function resize() {
    canvas!.width = Math.round(window.innerWidth * DPR)
    canvas!.height = Math.round(window.innerHeight * DPR)
    gl!.viewport(0, 0, canvas!.width, canvas!.height)
  }
  resize()
  window.addEventListener("resize", resize)

  const start = performance.now()
  let frame = 0
  function loop(now: number) {
    gl!.useProgram(program)
    gl!.uniform3f(uniforms!.iResolution, canvas!.width, canvas!.height, 1)
    gl!.uniform1f(uniforms!.iTime, (now - start) / 1000)
    gl!.uniform1i(uniforms!.iFrame, frame++)
    gl!.uniform4f(uniforms!.iMouse, mouse.x, mouse.y, mouse.down ? mouse.x : 0, mouse.down ? mouse.y : 0)
    gl!.uniform2f(uniforms!.iOffset, 0, 0) // full-screen: fragCoord is already 0..iResolution
    gl!.drawArrays(gl!.TRIANGLES, 0, 6)
    requestAnimationFrame(loop)
  }
  requestAnimationFrame(loop)
}

main()
