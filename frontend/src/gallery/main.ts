// the shader gallery engine.
//
// ONE canvas, ONE WebGL2 context. every shader is drawn into its own axis-aligned
// rectangle of that canvas via gl.viewport. there are no per-shader canvases.
//
// interaction + text live in the DOM: each shader gets an absolutely-positioned
// overlay <div> sitting exactly over its rect. that div owns hover (which is the
// only thing that advances a shader's clock), clicks, and the caption text. the
// canvas stays dumb and only draws pixels.
//
// performance: the context uses preserveDrawingBuffer so the framebuffer persists
// between frames. a tile is only redrawn while its `dirty` flag is set, and the only
// thing that sets dirty (after the initial draw) is being hovered. so at rest the
// render loop does nothing; hovering one shader redraws only that one shader.

import { MANIFEST } from "./manifest.ts"
import {
  buildProgram,
  buildVertexShader,
  type ShaderDef,
  type Uniforms,
} from "./shader.ts"

type Rect = { x: number; y: number; w: number; h: number } // CSS px, top-left origin

type Instance = {
  def: ShaderDef
  program: WebGLProgram | null
  uniforms: Uniforms | null
  error: string | null   // compile/link/fetch error -> dead tile
  div: HTMLDivElement
  rect: Rect
  t_sec: number          // shader clock; advances ONLY while hovered
  frame: number          // iFrame counter; advances with the clock
  hovered: boolean
  mouse: { x: number; y: number } // pointer pos within the tile, CSS px, top-left
  dirty: boolean         // needs a redraw this frame
}

const GAP = 14
const BG: [number, number, number, number] = [0.05, 0.05, 0.06, 1.0]
const DPR = Math.min(window.devicePixelRatio || 1, 2)

// coolness 0..100 -> tile size. bigger coolness, bigger tile. 3:2 aspect.
function sizeForCoolness(coolness: number): { w: number; h: number } {
  const t = Math.max(0, Math.min(100, coolness)) / 100
  const w = Math.round(150 + t * 250) // 150..400 px wide
  return { w, h: Math.round(w / 1.5) }
}

function labelFor(def: ShaderDef): string {
  if (def.label) return def.label
  return def.frag_url.split("/").pop()!.replace(/\.frag$/, "")
}

// ---- shelf packing: left-to-right, wrap to a new row when we overflow maxW.
// returns total content height so we can size the canvas.
function layout(instances: Instance[], maxW: number): number {
  let x = 0, y = 0, rowH = 0
  for (const inst of instances) {
    const { w, h } = sizeForCoolness(inst.def.coolness)
    if (x > 0 && x + w > maxW) { x = 0; y += rowH + GAP; rowH = 0 }
    inst.rect = { x, y, w, h }
    x += w + GAP
    rowH = Math.max(rowH, h)
  }
  return y + rowH
}

function positionDiv(inst: Instance) {
  const s = inst.div.style
  s.left = inst.rect.x + "px"
  s.top = inst.rect.y + "px"
  s.width = inst.rect.w + "px"
  s.height = inst.rect.h + "px"
}

function main() {
  const root = document.getElementById("gallery") as HTMLDivElement | null
  if (!root) { console.error("[gallery] no #gallery element"); return }

  const canvas = document.createElement("canvas")
  canvas.className = "gallery-canvas"
  const overlay = document.createElement("div")
  overlay.className = "gallery-overlay"
  root.append(canvas, overlay)

  const gl = canvas.getContext("webgl2", {
    premultipliedAlpha: false,
    preserveDrawingBuffer: true, // keep idle tiles on screen without redrawing them
    antialias: false,
  })
  if (!gl) { root.textContent = "your browser has no WebGL2 :("; return }

  const vert = buildVertexShader(gl)

  // one fullscreen-quad VAO, shared by every program (a_position is bound to loc 0).
  const vao = gl.createVertexArray()
  gl.bindVertexArray(vao)
  const quad = new Float32Array([-1, -1, 1, -1, -1, 1, 1, -1, 1, 1, -1, 1])
  const buf = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buf)
  gl.bufferData(gl.ARRAY_BUFFER, quad, gl.STATIC_DRAW)
  gl.enableVertexAttribArray(0)
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0)

  const instances: Instance[] = []

  function makeInstance(def: ShaderDef): Instance {
    const div = document.createElement("div")
    div.className = "tile"
    const caption = document.createElement("span")
    caption.className = "tile-caption"
    caption.textContent = labelFor(def)
    div.append(caption)
    overlay.append(div)

    const inst: Instance = {
      def, program: null, uniforms: null, error: null, div,
      rect: { x: 0, y: 0, w: 0, h: 0 },
      t_sec: 0, frame: 0, hovered: false, mouse: { x: 0, y: 0 }, dirty: true,
    }

    div.addEventListener("pointerenter", () => { inst.hovered = true })
    // leave inst.mouse where it last was inside the tile -- iMouse-reactive shaders
    // freeze on that value instead of snapping back to the origin (see drawInstance).
    div.addEventListener("pointerleave", () => { inst.hovered = false })
    div.addEventListener("pointermove", (e) => {
      const r = div.getBoundingClientRect()
      inst.mouse.x = e.clientX - r.left
      inst.mouse.y = e.clientY - r.top
    })
    // click a tile -> open that shader's full-screen page (sibling dir of the wall).
    div.addEventListener("click", () => { location.assign(labelFor(def) + "/") })

    return inst
  }

  // draw a single tile into its rect. assumes the VAO + buffer are already bound.
  function drawInstance(inst: Instance) {
    if (!inst.program || !inst.uniforms) return
    const r = inst.rect
    const gx = Math.round(r.x * DPR)
    const gy = canvas.height - Math.round((r.y + r.h) * DPR) // flip: GL origin bottom-left
    const gw = Math.round(r.w * DPR)
    const gh = Math.round(r.h * DPR)

    gl!.viewport(gx, gy, gw, gh)
    gl!.useProgram(inst.program)
    const u = inst.uniforms
    gl!.uniform3f(u.iResolution, gw, gh, 1)
    gl!.uniform1f(u.iTime, inst.t_sec)
    gl!.uniform1i(u.iFrame, inst.frame)
    gl!.uniform2f(u.iOffset, gx, gy)
    // iMouse always carries the last pointer position seen inside this tile,
    // clamped to the tile's own bounds (its [0,1]^2). it's the origin until the
    // tile is first hovered, then holds its value after the pointer leaves.
    const mx = Math.max(0, Math.min(r.w, inst.mouse.x))
    const my = Math.max(0, Math.min(r.h, inst.mouse.y))
    gl!.uniform4f(u.iMouse, mx * DPR, gh - my * DPR, 0, 0)
    gl!.drawArrays(gl!.TRIANGLES, 0, 6)
  }

  function resizeCanvas() {
    const maxW = root!.clientWidth
    const contentH = layout(instances, maxW)
    canvas.style.width = maxW + "px"
    canvas.style.height = contentH + "px"
    canvas.width = Math.round(maxW * DPR)
    canvas.height = Math.round(contentH * DPR)
    overlay.style.width = maxW + "px"
    overlay.style.height = contentH + "px"
    for (const inst of instances) {
      positionDiv(inst)
      inst.dirty = true // canvas resize wipes the framebuffer -> everything must redraw
    }
    // a fresh framebuffer: paint the background once, tiles draw over it.
    gl!.disable(gl!.SCISSOR_TEST)
    gl!.clearColor(...BG)
    gl!.clear(gl!.COLOR_BUFFER_BIT)
  }

  // ---- boot: fetch every frag, build its program, lay everything out, then loop.
  async function boot() {
    const built = await Promise.all(MANIFEST.map(async (def): Promise<Instance> => {
      const inst = makeInstance(def)
      try {
        const res = await fetch(def.frag_url)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const source = await res.text()
        const { program, uniforms, error } = buildProgram(gl!, vert, source)
        if (error) throw new Error(error)
        inst.program = program
        inst.uniforms = uniforms
      } catch (e) {
        inst.error = String(e)
        inst.div.classList.add("broken")
        inst.div.title = inst.error
        console.warn("[gallery]", labelFor(def), "failed:", inst.error)
      }
      return inst
    }))
    instances.push(...built)

    resizeCanvas()
    window.addEventListener("resize", debounce(resizeCanvas, 150))

    let last = performance.now()
    function frame(now: number) {
      const dt = (now - last) / 1000
      last = now
      gl!.bindVertexArray(vao)
      // TODO(perf): currently every shader ticks + redraws every frame so the whole
      // wall is alive. the dirty/hover-only path (see git history) is the cheap mode
      // we'll come back to once the look is dialed in.
      for (const inst of instances) {
        if (!inst.program) continue
        inst.t_sec += dt
        inst.frame++
        drawInstance(inst)
      }
      requestAnimationFrame(frame)
    }
    requestAnimationFrame(frame)
  }

  boot()
}

function debounce<T extends (...a: any[]) => void>(fn: T, ms: number): T {
  let h: number | undefined
  return ((...args: any[]) => {
    clearTimeout(h)
    h = setTimeout(() => fn(...args), ms) as unknown as number
  }) as T
}

main()
