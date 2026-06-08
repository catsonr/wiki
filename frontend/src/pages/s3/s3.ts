import page from '@/page.ts'

const body: string = `<canvas id="s3canvas"></canvas>
<br><br>
<script src="./src/gl-matrix-min.js"></script>
<script src="./src/gl-helper.js"></script>
<script src="./src/cube.js"></script>

<script src="./src/player.js"></script>

<script src="./src/script.js"></script>
`

export default () => page({ title: 's3 engine', body: body, styles: ['./style.css'] })