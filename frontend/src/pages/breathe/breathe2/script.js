function divAddText(div, text) {
    const div_ = document.getElementById(div);
    const divText = document.createElement('p');
    divText.innerText = text;
    div_.appendChild(divText);

    if(div == 'errorbox') console.log(text);
}

function createShader(gl, type, sourcecode) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, sourcecode);
    gl.compileShader(shader);

    if(gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader;

    divAddText('errorbox', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
}

function createProgram(gl, vertexShader, fragmentShader) {
    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if(gl.getProgramParameter(program, gl.LINK_STATUS)) return program;

    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
}

const resolution = 1;
let t = 0;

function main() {
    const canvas = document.getElementById("shadercanvas");
    const gl = canvas.getContext("webgl2");

    canvas.width = window.screen.availWidth;
    canvas.height = window.screen.availHeight;

    //canvas.width = 720;
    //canvas.height = 720;

    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;
    const cols = parseInt(WIDTH / resolution);
    const rows = parseInt(HEIGHT / resolution);

    divAddText('runtime', 'canvas width  : ' + WIDTH);
    divAddText('runtime', 'canvas height : ' + HEIGHT);
    divAddText('runtime', 'resolution    : ' + resolution + 'x' + resolution);
    divAddText('runtime', '# of columns  : ' + cols);
    divAddText('runtime', '# of rows     : ' + rows);

    const VERTEXSHADERSOURCECODE =
    `#version 300 es
    precision mediump float;

    in vec2 a_position;

    uniform float u_pointSize;
    uniform vec2 u_coord_offset;
    uniform float u_scale;

    out vec3 v_color;

    vec3 wave(in float _x, in float _y) {
        float x = (_x + u_coord_offset.x) * u_scale;
        float y = (_y + u_coord_offset.y) * u_scale;

        // chess
        float a = 0.25 * sin(x * y) + 0.25 * sin(x / y) + 0.25 * cos(x + y) + 0.25 * cos(x - y);

        // zebra
        float b = 0.5 * sin(x / y) + 0.5 * sin(x * y);

        // steps
        float c = 0.5 * tan(x/y) + 0.5 * atan(x/y);

        // rings
        float d = max(fract(x*x + 10.0*y*y) - 0.0, 0.0);

        return vec3(c * a / b, b * a * .5, c * a);
    } 

    void main() {
        v_color = wave(a_position.x, a_position.y);

        gl_PointSize = u_pointSize;

        gl_Position = vec4(a_position, 0.0, 1.0); 
    }`;

    const FRAGMENTSHADERSOURCECODE =
    `#version 300 es
    precision mediump float;

    in vec3 v_color;

    out vec4 outputColor;

    void main() {
        //if(v_color.x <= 0.0) {discard; }
        outputColor = vec4(v_color, 1.0);
    }`;

    // compiles and links shaders
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, VERTEXSHADERSOURCECODE);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENTSHADERSOURCECODE);
    const program = createProgram(gl, vertexShader, fragmentShader);
    gl.useProgram(program);

    // fits shader to canvas 
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    gl.clearColor(16 / 255, 16 / 255, 16 / 255, 1);
    gl.viewport(0, 0, canvas.width, canvas.height);

    const a_position = gl.getAttribLocation(program, 'a_position');

    gl.enableVertexAttribArray(a_position);

    let tempBuff = [];
    for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
            let x = -1 + 2 * (i / cols);
            let y = -1 + 2 * (j / rows);

            tempBuff.push(x);
            tempBuff.push(y);
        }
    }

    const stride = 2;
    let bufferData = new Float32Array(tempBuff);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, bufferData, gl.STATIC_DRAW);

    divAddText('runtime', 'point count : ' + bufferData.length / stride);

    gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, stride * 4, 0);

    let offset = [0.0, 0.0];
    const u_coord_offset = gl.getUniformLocation(program, 'u_coord_offset');
    gl.uniform2fv(u_coord_offset, offset);

    let scale = 4.0;
    const u_scale = gl.getUniformLocation(program, 'u_scale');
    gl.uniform1f(u_scale, scale);

    const u_pointSize = gl.getUniformLocation(program, 'u_pointSize');
    gl.uniform1f(u_pointSize, resolution);

    canvas.addEventListener('wheel', (event) => {
        event.preventDefault();
        
        if(event.deltaY > 0) scale++;
        else {
            if(scale > 1) scale--;
            else scale /= 0.9;
        }
    });
    document.addEventListener('keydown', (event) => {
        event.preventDefault();

        switch(event.key) {
            case 'ArrowUp':
                offset[1]++;
                break;
            case 'ArrowDown':
                offset[1]--;
                break;
            case 'ArrowLeft':
                offset[0]--;
                break;
            case 'ArrowRight':
                offset[0]++;
                break;
        }
    });

    draw();
    function draw() {
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.drawArrays(gl.POINTS, 0, bufferData.length / stride);

        //scale = scale / 0.999;
        gl.uniform1f(u_scale, scale);

        //offset[0] += 0.001;
        //offset[1] += 0.0005;
        gl.uniform2fv(u_coord_offset, offset);

        requestAnimationFrame(draw);
    }
}


try {
    const start = Date.now();

    main();

    divAddText('runtime', "runtime: " + Math.floor(Date.now() - start) / 1000 + " ms");
} catch(e) {
    divAddText('errorbox', e);
}