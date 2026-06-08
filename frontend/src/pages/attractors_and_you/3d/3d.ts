import page from '@/page.ts'

const body: string = `
<canvas id="shadercanvas"></canvas>

<br><br>
`

export default () => page({
  title: 'strange attractors 3d :3',
  body: body,
  styles: ['./style.css'],
  scripts: [
    '/lib/gl-matrix-min.js',
    './attractor.js',
    './shader.js',
  ],
})
