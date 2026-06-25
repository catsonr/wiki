import page from '@/page.ts'

// the wall: 1000 ranked 88x31 buttons, GPU-tiled on a pannable/zoomable plane.
// canvas fills the viewport; app.js loads the atlas + manifest and drives gl.js.
const body: string = `
<canvas id="wall"></canvas>

<div id="hl"></div>

<div id="panel">
  <div class="title">88<span>×</span>31 · the wall</div>
  <label>columns <span id="ctl-C-val">40</span>
    <input id="ctl-C" type="range" min="8" max="80" step="1" value="40">
  </label>
  <label>gap x <span id="ctl-gx-val">6</span>
    <input id="ctl-gx" type="range" min="0" max="40" step="1" value="6">
  </label>
  <label>gap y <span id="ctl-gy-val">6</span>
    <input id="ctl-gy" type="range" min="0" max="40" step="1" value="6">
  </label>
  <button id="ctl-reset">frame all</button>
  <div class="hint">drag to pan · scroll to zoom</div>
  <a class="back" href="/index.html"><img src="/img/88x31/buttons/back.gif"></a>
</div>

<div id="hud"></div>

<script type="module" src="/88x31/app.js"></script>
`

export default () => page({ title: '88x31 · 1000', body, styles: ['/88x31/style.css'] })
