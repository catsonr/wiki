// the full-screen single-shader viewer. one shadertoy frag, sized to the whole
// viewport, zero scroll. reuses the gallery's GL harness (shader.ts) verbatim --
// the only differences from the wall are: one program, no tiling, iOffset = 0.
//
// the frag url + prev/next neighbours are baked onto the canvas data-attrs by the
// build (src/main.ts), so this one bundled script serves all 79 generated pages.

import { buildProgram, buildVertexShader } from "@/gallery/shader.ts"

const DPR = Math.min(window.devicePixelRatio || 1, 2)

// a dead shader (failed fetch/compile/link) shows the reason full-screen instead
// of a blank black page -- same spirit as the wall's dead tiles.
function fail(msg: string): void {
  const el = document.createElement("pre")
  el.className = "shader-error"
  el.textContent = msg
  document.body.append(el)
}

async function main() {
  const canvas = document.getElementById("shader") as HTMLCanvasElement | null
  if (!canvas) return
  const fragUrl = canvas.dataset.frag
  const prev = canvas.dataset.prev
  const next = canvas.dataset.next
  if (!fragUrl) return

  // step through the gallery in manifest order. forward: down-arrow / left-click.
  // back: up-arrow / right-click (contextmenu suppressed so the menu doesn't eat it).
  const goNext = () => { if (next) location.assign(`../${next}/`) }
  const goPrev = () => { if (prev) location.assign(`../${prev}/`) }
  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") goNext()
    else if (e.key === "ArrowUp") goPrev()
  })
  canvas.addEventListener("click", goNext)
  window.addEventListener("contextmenu", (e) => { e.preventDefault(); goPrev() })

  const gl = canvas.getContext("webgl2", { antialias: false })
  if (!gl) { fail("your browser has no WebGL2 :("); return }

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
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    source = await res.text()
  } catch (e) { fail(`couldn't load shader:\n\n${e}`); return }

  const { program, uniforms, error } = buildProgram(gl, vert, source)
  if (error || !program || !uniforms) { fail(`shader failed to compile:\n\n${error}`); return }

  // standard shadertoy iMouse, in framebuffer px (y flipped to GL bottom-left).
  // the whole screen IS the shader here, so the mouse is always "inside".
  const mouse = { x: 0, y: 0, down: 0 }
  canvas.addEventListener("pointermove", (e) => {
    mouse.x = e.clientX * DPR
    mouse.y = canvas.height - e.clientY * DPR
  })
  canvas.addEventListener("pointerdown", () => { mouse.down = 1 })
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
