# wall/gl.js — WebGL2 button-wall renderer

Dependency-free, plain-browser ES module. One factory, pure rendering. The
caller owns camera, animation, events, and the CPU hit-test.

## API

```js
import { createGLWall } from './gl.js';

const wall = createGLWall(canvas); // throws if WebGL2 unavailable

wall.setAtlas(image, atlasCols, cellW, cellH);
//   image    : TexImageSource (HTMLImageElement | ImageBitmap | canvas | ...)
//   atlasCols: cells per atlas row (row-major packing)
//   cellW/H  : tile/cell size px, e.g. 88, 31
//   -> uploads to a single TEXTURE_2D, NEAREST, no mips, CLAMP_TO_EDGE.
//      Atlas pixel size is read from the image (width/height).

wall.setCount(n);                          // number of instances (tiles)
wall.setGrid({ gx, gy, margin, C });       // floats; gaps px, border px, columns
wall.setCamera({ center: [x, y], zoom });  // center = world px at screen CENTER
wall.setCells(int32Array);                 // length-N Int32Array, atlas cell per tile
wall.resize();                             // size canvas to client * devicePixelRatio
wall.render();                             // clear + one instanced draw call

wall.dispose();                            // free GL resources
wall.gl                                    // the WebGL2 context (escape hatch)
```

All setters store state and are safe to call in any order, before or after
`setAtlas`. Uniforms are applied at `render()`. `render()` is a no-op (just a
clear) until both `setCount(>0)` and `setAtlas` have run.

## The exact transform (vertex shader)

This block is the **inverse of the caller's CPU hit-test**. Changing it breaks
picking — change both together.

```
i      = gl_InstanceID
col    = floor(mod(i, C))
row    = floor(i / C)
tileTL = (margin + col*(cellW+gx), margin + row*(cellH+gy))   // world px
world  = tileTL + corner * cell                                // corner in {0,1}^2
screen = (world - center) * zoom + viewport*0.5                // drawing-buffer px
ndc    = screen / viewport * 2 - 1
gl_Position = (ndc.x, -ndc.y, 0, 1)                            // flip y: y-down -> y-up
```

Atlas UV for the tile's current cell `aCell`:

```
ac = mod(aCell, atlasCols)
ar = floor(aCell / atlasCols)
uv = (vec2(ac, ar) + corner) * cell / atlasSize
```

`viewport` and `atlasSize` are in **drawing-buffer px** and **atlas px**
respectively (NOT CSS px). The grid is laid out in **world px**; `zoom` is
screen-px-per-world-px, so margin/gap/cell are all world units that scale with
zoom.

## Conventions / decisions

- **Clear color**: transparent black `(0,0,0,0)` so the page background shows
  through the gaps. Change `clearColor` in `render()` for an opaque bg.
- **Blending**: straight (non-premultiplied) alpha,
  `SRC_ALPHA, ONE_MINUS_SRC_ALPHA`. The atlas is uploaded with
  `UNPACK_PREMULTIPLY_ALPHA_WEBGL = false`, so transparent gif cells composite
  correctly. The context is created with `premultipliedAlpha: false`.
- **Geometry**: one static unit quad (6 verts, 2 triangles, corners
  `{(0,0),(1,0),(0,1),(1,1)}`), drawn `drawArraysInstanced(TRIANGLES, 0, 6, N)`.
- **Cell buffer**: `cellBuf` is allocated to N ints (`bufferData`, DYNAMIC_DRAW)
  and updated per frame via `bufferSubData` in `setCells`. It grows on demand if
  count/length increases.

## Things to double-check in-browser

- **Integer attribute wiring**: `aCell` is `flat in int`, fed by
  `vertexAttribIPointer(loc, 1, gl.INT, 0, 0)` + `vertexAttribDivisor(loc, 1)`.
  This is the common WebGL2 gotcha — using `vertexAttribPointer` here would
  silently break. Confirm cells map to the right atlas cells.
- **Max texture size**: a ~8184×4743 atlas exceeds the WebGL2 guaranteed
  minimum `MAX_TEXTURE_SIZE` of 2048 and may exceed 4096 on some GPUs. Check
  `gl.getParameter(gl.MAX_TEXTURE_SIZE)`; if the atlas is wider/taller than
  that, `texImage2D` will fail. Mitigations (caller's job): cap atlas width to
  the limit, or split into multiple atlas textures. I did not implement
  splitting — single TEXTURE_2D as specified.
- **devicePixelRatio**: `resize()` uses `canvas.clientWidth/Height * dpr`. The
  canvas must have a CSS-driven layout size (e.g. `width:100%; height:100%`)
  for `clientWidth/Height` to be meaningful; otherwise pass an explicitly sized
  canvas. Re-call `resize()` on window resize and on dpr/monitor changes.
- **Cell count vs grid**: `setCount(N)` and `C` (columns) are independent. With
  N=1000 and C=40 you get 25 full rows. If `setCells` is shorter than `count`,
  the trailing instances read stale/zeroed cell indices (cell 0) — keep the
  Int32Array length === count.
- **Premultiply assumption**: if your atlas PNG is already premultiplied,
  switch the blend func to `ONE, ONE_MINUS_SRC_ALPHA` and flip the upload flag.
```
```
