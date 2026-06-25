// the GL core for the shader gallery.
//
// every shader in the gallery is a shadertoy-style single-pass fragment shader:
// it defines `void mainImage(out vec4, in vec2)` and reads the iTime/iResolution/
// iMouse uniforms. we wrap that body in a tiny webgl2 harness (PREFIX/SUFFIX) so
// the original source survives verbatim -- same convention shadertoy uses, and the
// same convention every .frag in assets/ was authored against.
//
// ALL shaders share one WebGL2 context, one vertex shader, and one fullscreen-quad
// VAO. each shader is its own linked program (they each have a different mainImage),
// drawn into its own rectangle of the single canvas via gl.viewport. see main.ts.

export type ShaderDef = {
  frag_url: string  // e.g. "assets/tunnel.frag" -- fetched + compiled at runtime
  coolness: number  // 0..100. drives tile size, and is the field people vote on later
  label?: string    // shown in the overlay caption; defaults to the filename
}

// the shadertoy harness. iFrame/iMouse are declared even if a given shader ignores
// them -- unused uniforms just get optimized out, and declaring them means any
// shadertoy shader pastes in unchanged.
export const VERT_SRC = `#version 300 es
in vec2 a_position;
void main() { gl_Position = vec4(a_position, 0.0, 1.0); }
`

// iOffset is OURS, not shadertoy's: gl_FragCoord is in whole-framebuffer pixels,
// so when a tile lives in a sub-rect via gl.viewport, fragCoord arrives offset by
// the rect's origin. subtracting iOffset gives mainImage the tile-local 0..iResolution
// coords every shadertoy shader assumes. invisible to the pasted-in shader source.
const FRAG_PREFIX = `#version 300 es
precision highp float;
uniform vec3 iResolution;
uniform float iTime;
uniform int iFrame;
uniform vec4 iMouse;
uniform vec2 iOffset;
out vec4 fragColor;
`

// alpha forced to 1.0 to match shadertoy, which ignores whatever a shader writes to
// fragColor.a -- some of these shaders leave it < 1 and would punch holes otherwise.
const FRAG_SUFFIX = `
void main() { mainImage(fragColor, gl_FragCoord.xy - iOffset); fragColor.a = 1.0; }
`

export type Uniforms = {
  iResolution: WebGLUniformLocation | null
  iTime:       WebGLUniformLocation | null
  iFrame:      WebGLUniformLocation | null
  iMouse:      WebGLUniformLocation | null
  iOffset:     WebGLUniformLocation | null
}

function compileStage(
  gl: WebGL2RenderingContext,
  type: number,
  src: string,
): { shader: WebGLShader | null; error: string | null } {
  const shader = gl.createShader(type)!
  gl.shaderSource(shader, src)
  gl.compileShader(shader)
  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    return { shader, error: null }
  }
  const error = gl.getShaderInfoLog(shader) ?? "unknown compile error"
  gl.deleteShader(shader)
  return { shader: null, error }
}

// compile + link one shadertoy shader into a program, reusing the shared vertex
// shader. a_position is forced to attribute location 0 (bindAttribLocation before
// link) so a single VAO works for every program. returns the error string instead
// of throwing -- a broken shader should show a dead tile, never kill the gallery.
export function buildProgram(
  gl: WebGL2RenderingContext,
  vert: WebGLShader,
  fragBody: string,
): { program: WebGLProgram | null; uniforms: Uniforms | null; error: string | null } {
  const frag = compileStage(gl, gl.FRAGMENT_SHADER, FRAG_PREFIX + fragBody + FRAG_SUFFIX)
  if (!frag.shader) return { program: null, uniforms: null, error: frag.error }

  const program = gl.createProgram()!
  gl.attachShader(program, vert)
  gl.attachShader(program, frag.shader)
  gl.bindAttribLocation(program, 0, "a_position")
  gl.linkProgram(program)
  gl.deleteShader(frag.shader) // flagged for deletion; kept alive by the program

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const error = gl.getProgramInfoLog(program) ?? "unknown link error"
    gl.deleteProgram(program)
    return { program: null, uniforms: null, error }
  }

  const uniforms: Uniforms = {
    iResolution: gl.getUniformLocation(program, "iResolution"),
    iTime:       gl.getUniformLocation(program, "iTime"),
    iFrame:      gl.getUniformLocation(program, "iFrame"),
    iMouse:      gl.getUniformLocation(program, "iMouse"),
    iOffset:     gl.getUniformLocation(program, "iOffset"),
  }
  return { program, uniforms, error: null }
}

// the shared vertex shader, compiled once and attached to every program.
export function buildVertexShader(gl: WebGL2RenderingContext): WebGLShader {
  const { shader, error } = compileStage(gl, gl.VERTEX_SHADER, VERT_SRC)
  if (!shader) throw new Error("vertex shader failed: " + error)
  return shader
}
