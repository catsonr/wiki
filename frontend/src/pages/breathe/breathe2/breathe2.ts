import page from '@/page.ts'

const body: string = `<canvas id="shadercanvas">HTML5 canvas not supported :(</canvas>
    <div id="runtime">
        <span class='runtime-title'></span>
    </div>

    <br><br>
    <div id='errorbox'>
        <span class='errorbox-title'></span>
    </div>
    <script src="./script.js"></script>
`

export default () => page({ title: "breathe 2", body: body, styles: ['./style.css'] })
