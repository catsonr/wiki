// gl.js — dependency-free WebGL2 renderer for the "wall of 1000 buttons".
//
// Pure rendering + setters. The caller owns camera math, animation timing,
// event handling, and the CPU hit-test. This module only knows how to draw
// N instanced 88x31 tiles, each sampling one cell of a single atlas texture.
//
// The vertex-shader transform below is the EXACT inverse of the caller's CPU
// hit-test. Do not "tidy" it without changing the pick code in lock-step.
//
// Usage:
//   const wall = createGLWall(canvas);
//   wall.setAtlas(image, atlasCols, 88, 31);
//   wall.setCount(1000);
//   wall.setGrid({ gx: 4, gy: 4, margin: 8, C: 40 });
//   wall.setCamera({ center: [x, y], zoom: 1 });
//   wall.setCells(int32Array);   // length === count
//   wall.resize();               // on init + window resize
//   wall.render();               // once per frame

const VERT_SRC = `#version 300 es
precision highp float;
precision highp int;

// Unit-quad corner: one of (0,0),(1,0),(0,1),(1,1).
in vec2 aCorner;
// Per-instance atlas cell index. Plain integer attribute — `flat` is only a
// vertex-OUTPUT / fragment-INPUT qualifier and is illegal on a vertex `in`.
in int aCell;

uniform float uC;          // columns per grid row
uniform vec2  uGap;        // gap px between neighbours (gx, gy)
uniform float uMargin;     // world-space border px
uniform vec2  uCell;       // tile / cell size px (cellW, cellH) e.g. (88, 31)
uniform vec2  uCenter;     // world-px point shown at screen CENTER
uniform float uZoom;       // screen px per world px
uniform vec2  uViewport;   // drawing-buffer px (width, height)
uniform float uAtlasCols;  // cells per atlas row
uniform vec2  uAtlasSize;  // atlas texture size px (width, height)

out vec2 vUV;

void main() {
  // ---- INVERSE OF CPU PICK — keep byte-for-byte in sync with hit-test ----
  float i   = float(gl_InstanceID);
  float col = floor(mod(i, uC));
  float row = floor(i / uC);

  // Top-left of this tile in world px.
  vec2 tileTL = vec2(uMargin + col * (uCell.x + uGap.x),
                     uMargin + row * (uCell.y + uGap.y));

  // aCorner scales across the 88x31 tile (0..1 -> 0..cell).
  vec2 world = tileTL + aCorner * uCell;

  // World -> screen (drawing-buffer) px: scale about uCenter, recentre.
  vec2 screen = (world - uCenter) * uZoom + uViewport * 0.5;

  // Screen px -> NDC, flipping Y (screen is y-down, clip space is y-up).
  vec2 ndc = screen / uViewport * 2.0 - 1.0;
  gl_Position = vec4(ndc.x, -ndc.y, 0.0, 1.0);
  // ------------------------------------------------------------------------

  // Atlas UV for this tile's current cell (row-major, uAtlasCols per row).
  float ac = mod(float(aCell), uAtlasCols);
  float ar = floor(float(aCell) / uAtlasCols);
  vUV = (vec2(ac, ar) + aCorner) * uCell / uAtlasSize;
}
`;

const FRAG_SRC = `#version 300 es
precision highp float;

uniform sampler2D uAtlas;
in vec2 vUV;
out vec4 outColor;

void main() {
  outColor = texture(uAtlas, vUV);
}
`;

function compileShader(gl, type, src) {
  const sh = gl.createShader(type);
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(sh);
    gl.deleteShader(sh);
    const kind = type === gl.VERTEX_SHADER ? 'vertex' : 'fragment';
    throw new Error(`GLWall: ${kind} shader compile failed:\n${log}`);
  }
  return sh;
}

function linkProgram(gl, vsSrc, fsSrc) {
  const vs = compileShader(gl, gl.VERTEX_SHADER, vsSrc);
  const fs = compileShader(gl, gl.FRAGMENT_SHADER, fsSrc);
  const prog = gl.createProgram();
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  // Shaders can be detached/deleted once linked.
  gl.detachShader(prog, vs);
  gl.detachShader(prog, fs);
  gl.deleteShader(vs);
  gl.deleteShader(fs);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    const log = gl.getProgramInfoLog(prog);
    gl.deleteProgram(prog);
    throw new Error(`GLWall: program link failed:\n${log}`);
  }
  return prog;
}

/**
 * Create a WebGL2 wall renderer bound to `canvas`.
 * @param {HTMLCanvasElement} canvas
 * @returns {{
 *   setAtlas(image: TexImageSource, atlasCols: number, cellW: number, cellH: number): void,
 *   setCount(n: number): void,
 *   setGrid(grid: {gx:number, gy:number, margin:number, C:number}): void,
 *   setCamera(cam: {center:[number,number], zoom:number}): void,
 *   setCells(cells: Int32Array): void,
 *   resize(): void,
 *   render(): void,
 *   gl: WebGL2RenderingContext,
 *   dispose(): void,
 * }}
 */
export function createGLWall(canvas) {
  const gl = canvas.getContext('webgl2', {
    alpha: true,
    premultipliedAlpha: false,
    antialias: false,
    depth: false,
    stencil: false,
  });
  if (!gl) {
    throw new Error('GLWall: WebGL2 is not available (canvas.getContext("webgl2") returned null).');
  }

  const program = linkProgram(gl, VERT_SRC, FRAG_SRC);

  // ---- Attribute / uniform locations -------------------------------------
  const locCorner = gl.getAttribLocation(program, 'aCorner');
  const locCell = gl.getAttribLocation(program, 'aCell');

  const u = {
    C: gl.getUniformLocation(program, 'uC'),
    Gap: gl.getUniformLocation(program, 'uGap'),
    Margin: gl.getUniformLocation(program, 'uMargin'),
    Cell: gl.getUniformLocation(program, 'uCell'),
    Center: gl.getUniformLocation(program, 'uCenter'),
    Zoom: gl.getUniformLocation(program, 'uZoom'),
    Viewport: gl.getUniformLocation(program, 'uViewport'),
    AtlasCols: gl.getUniformLocation(program, 'uAtlasCols'),
    AtlasSize: gl.getUniformLocation(program, 'uAtlasSize'),
    Atlas: gl.getUniformLocation(program, 'uAtlas'),
  };

  // ---- CPU-side state (applied at render time) ---------------------------
  const state = {
    count: 0,
    // grid
    C: 1, gx: 0, gy: 0, margin: 0,
    // atlas
    cellW: 88, cellH: 31, atlasCols: 1, atlasW: 1, atlasH: 1,
    hasAtlas: false,
    // camera
    cx: 0, cy: 0, zoom: 1,
    // viewport (drawing-buffer px)
    vw: 1, vh: 1,
  };

  // ---- Geometry: unit quad (two triangles, 6 verts) ----------------------
  // Corners chosen so the strip-as-triangles covers (0,0)-(1,1).
  const QUAD = new Float32Array([
    0, 0, 1, 0, 0, 1,   // tri 1
    1, 0, 1, 1, 0, 1,   // tri 2
  ]);

  const vao = gl.createVertexArray();
  gl.bindVertexArray(vao);

  // Static quad buffer.
  const quadBuf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, quadBuf);
  gl.bufferData(gl.ARRAY_BUFFER, QUAD, gl.STATIC_DRAW);
  gl.enableVertexAttribArray(locCorner);
  gl.vertexAttribPointer(locCorner, 2, gl.FLOAT, false, 0, 0);

  // Per-instance integer cell buffer. Sized lazily in setCount/setCells.
  const cellBuf = gl.createBuffer();
  let cellCapacity = 0; // in elements (ints)
  gl.bindBuffer(gl.ARRAY_BUFFER, cellBuf);
  if (locCell >= 0) {
    gl.enableVertexAttribArray(locCell);
    // INTEGER attribute path — must use vertexAttribIPointer, not Pointer.
    gl.vertexAttribIPointer(locCell, 1, gl.INT, 0, 0);
    gl.vertexAttribDivisor(locCell, 1); // advance once per instance
  }

  gl.bindVertexArray(null);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  // ---- Texture -----------------------------------------------------------
  let atlasTex = null;

  function ensureCellCapacity(n) {
    if (n <= cellCapacity) return;
    gl.bindVertexArray(vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, cellBuf);
    // Grow to exactly n; orphan with DYNAMIC_DRAW (updated per frame).
    gl.bufferData(gl.ARRAY_BUFFER, n * 4, gl.DYNAMIC_DRAW);
    cellCapacity = n;
    gl.bindVertexArray(null);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
  }

  // ---- Public setters ----------------------------------------------------

  function setAtlas(image, atlasCols, cellW, cellH) {
    if (!atlasTex) atlasTex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, atlasTex);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
    gl.texImage2D(
      gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image
    );
    // Pixel-art: NEAREST, no mipmaps, clamp.
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.bindTexture(gl.TEXTURE_2D, null);

    state.atlasCols = atlasCols;
    state.cellW = cellW;
    state.cellH = cellH;
    // Atlas pixel size from the image itself.
    state.atlasW =
      image.width || image.videoWidth || image.naturalWidth || 1;
    state.atlasH =
      image.height || image.videoHeight || image.naturalHeight || 1;
    state.hasAtlas = true;
  }

  function setCount(n) {
    state.count = n | 0;
    ensureCellCapacity(state.count);
  }

  function setGrid({ gx, gy, margin, C }) {
    state.gx = gx;
    state.gy = gy;
    state.margin = margin;
    state.C = C;
  }

  function setCamera({ center, zoom }) {
    state.cx = center[0];
    state.cy = center[1];
    state.zoom = zoom;
  }

  function setCells(int32Array) {
    if (!(int32Array instanceof Int32Array)) {
      throw new Error('GLWall.setCells: expected an Int32Array.');
    }
    ensureCellCapacity(int32Array.length);
    gl.bindBuffer(gl.ARRAY_BUFFER, cellBuf);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, int32Array);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
  }

  function resize() {
    const dpr = (typeof window !== 'undefined' && window.devicePixelRatio) || 1;
    const w = Math.max(1, Math.round((canvas.clientWidth || 1) * dpr));
    const h = Math.max(1, Math.round((canvas.clientHeight || 1) * dpr));
    if (canvas.width !== w) canvas.width = w;
    if (canvas.height !== h) canvas.height = h;
    gl.viewport(0, 0, w, h);
    state.vw = w;
    state.vh = h;
  }

  function render() {
    // Neutral dark transparent-ish background; alpha 0 so the page shows
    // through where nothing draws. (Documented in README.)
    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    if (state.count <= 0 || !state.hasAtlas) return;

    // Straight (non-premultiplied) alpha blending — many gif cells are
    // transparent. Texture was uploaded with PREMULTIPLY_ALPHA = false.
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    gl.useProgram(program);
    gl.bindVertexArray(vao);

    // Bind atlas to texture unit 0.
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, atlasTex);
    gl.uniform1i(u.Atlas, 0);

    // Upload uniforms (all per-frame; cheap).
    gl.uniform1f(u.C, state.C);
    gl.uniform2f(u.Gap, state.gx, state.gy);
    gl.uniform1f(u.Margin, state.margin);
    gl.uniform2f(u.Cell, state.cellW, state.cellH);
    gl.uniform2f(u.Center, state.cx, state.cy);
    gl.uniform1f(u.Zoom, state.zoom);
    gl.uniform2f(u.Viewport, state.vw, state.vh);
    gl.uniform1f(u.AtlasCols, state.atlasCols);
    gl.uniform2f(u.AtlasSize, state.atlasW, state.atlasH);

    gl.drawArraysInstanced(gl.TRIANGLES, 0, 6, state.count);

    gl.bindVertexArray(null);
    gl.bindTexture(gl.TEXTURE_2D, null);
  }

  function dispose() {
    gl.deleteBuffer(quadBuf);
    gl.deleteBuffer(cellBuf);
    gl.deleteVertexArray(vao);
    if (atlasTex) gl.deleteTexture(atlasTex);
    gl.deleteProgram(program);
  }

  return {
    setAtlas,
    setCount,
    setGrid,
    setCamera,
    setCells,
    resize,
    render,
    dispose,
    gl,
  };
}

export default createGLWall;
