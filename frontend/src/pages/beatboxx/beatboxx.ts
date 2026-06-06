import page from '../../page.ts'

// emscripten boilerplate (the Module setup script + its styles) lives in colocated
// files copied verbatim — keeps the regex/backslash-heavy loader out of a template literal.
const body: string = `
<h1>welcome to beatboxx!</h1>
<h2><i>this is an early development build</i></h2>
<h2>(this may take a while to load!)</h2>
<hr/>
<figure style="overflow:visible;" id="spinner"><div class="spinner"></div><center style="margin-top:0.5em"><strong>emscripten</strong></center></figure>
<div class="emscripten" id="status">Downloading...</div>
<div class="emscripten">
  <progress value="0" max="100" id="progress" hidden=1></progress>
</div>
<div class="emscripten_border">
  <canvas class="emscripten" id="canvas" oncontextmenu="event.preventDefault()" tabindex=-1></canvas>
</div>
<textarea class="emscripten" id="output" rows="8"></textarea>
`

export default () => page({
  title: 'BEATBOXX (neocities edition!)',
  body: body,
  styles: ['./beatboxx.css'],
  scripts: ['./loader.js', './beatboxx.js'],
})
