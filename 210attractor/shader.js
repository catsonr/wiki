function createShader(gl, type, sourcecode) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, sourcecode);
    gl.compileShader(shader);

    if(gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader;

    console.log(gl.getShaderInfoLog(shader));
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

const mat4 = glMatrix.mat4;

function shaderDrawAttractorToCanvas(_canvas, attractorVerticies, canvasSize = [100, 100], pointSize = 0.5, example = false) {
    const canvas = document.getElementById(_canvas);
    const gl = canvas.getContext("webgl2");

    let WIDTH = canvasSize[0];
    let HEIGHT = canvasSize[1];

    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    // --------------------------------------------------------------------------------

    const VERTEXSHADERSOURCECODE = /* glsl */ `#version 300 es
    precision mediump float;

    in vec2 a_position;

    uniform vec2 u_graphBounds;
    uniform vec2 u_graphOffset;
    uniform float u_scale;
    uniform float u_pointSize;

    out vec3 v_color;

    void main() {
        v_color = vec3(1.0);
        gl_PointSize = u_pointSize;

        gl_Position = vec4(((a_position * u_scale) - u_graphOffset) / u_graphBounds, 0.0, 1.0);
    }`;

    const FRAGMENTSHADERSOURCECODE = /* glsl */ `#version 300 es
    precision mediump float;

    in vec3 v_color;

    out vec4 outputColor;

    void main() {
        outputColor = vec4(v_color, 0.2);
    }`;

    // --------------------------------------------------------------------------------

    // compiles and links shaders
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, VERTEXSHADERSOURCECODE);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENTSHADERSOURCECODE);
    const program = createProgram(gl, vertexShader, fragmentShader);
    gl.useProgram(program);

    // fits shader to canvas 
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    gl.clearColor(20 / 255, 20 / 255, 20 / 255, 1.0);
    gl.viewport(0, 0, canvas.width, canvas.height);

    const a_position = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(a_position);

    let xmin = 0;
    let xmax = 0;
    let ymin = 0;
    let ymax = 0;
    for(let i = 0; i < attractorVerticies.length; i += 2) {
        let x = attractorVerticies[i];
        let y = attractorVerticies[i + 1];

        xmin = Math.min(x, xmin);
        xmax = Math.max(x, xmax);
        ymin = Math.min(y, ymin);
        ymax = Math.max(y, ymax);
    }
    let xcenter = (xmax + xmin) / 2;
    let ycenter = (ymax + ymin) / 2;

    const stride = 2;
    const verticies = new Float32Array(attractorVerticies);
    const verticiesBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, verticiesBuffer);

    let worldMatrix = new Float32Array(16);
    let viewMatrix  = new Float32Array(16);
    let projMatrix  = new Float32Array(16);
    mat4.identity(worldMatrix);
    mat4.lookAt(viewMatrix, [0, 0, -4.55], [0, 0, 0], [0, 1, 0]);
    mat4.perspective(projMatrix, Math.PI / 4, WIDTH / HEIGHT, 0.1, 1000.0);

    const u_scale = gl.getUniformLocation(program, 'u_scale');
    gl.uniform1f(u_scale, 1.0);

    const u_pointSize = gl.getUniformLocation(program, 'u_pointSize');
    gl.uniform1f(u_pointSize, pointSize);

    const u_graphOffset = gl.getUniformLocation(program, 'u_graphOffset');
    gl.uniform2fv(u_graphOffset, [xcenter, ycenter]);

    const graphBoundsPadding = 0.2;
    const u_graphBounds = gl.getUniformLocation(program, 'u_graphBounds');
    gl.uniform2fv(u_graphBounds, [(Math.abs(xmax) + Math.abs(xmin)) / 2 + graphBoundsPadding, (Math.abs(ymax) + Math.abs(ymin)) / 2 + graphBoundsPadding]);

    const axesBuffer = gl.createBuffer();
    const axesVerticies = new Float32Array([xmin - graphBoundsPadding, 0, xmax + graphBoundsPadding, 0, 0, ymin - graphBoundsPadding, 0, ymax + graphBoundsPadding]);
    gl.bindBuffer(gl.ARRAY_BUFFER, axesBuffer);

    let pointDrawCount = 10;

    draw();
    function draw() {
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        if(pointDrawCount > verticies.length / stride) pointDrawCount = verticies.length / stride;
        if(!example) pointDrawCount = verticies.length / stride;

        gl.bufferData(gl.ARRAY_BUFFER, verticies, gl.STATIC_DRAW);
        gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, stride * 4, 0);
        gl.drawArrays(gl.POINTS, 0, pointDrawCount); // points

        if(example) {
            gl.drawArrays(gl.LINE_STRIP, 0, pointDrawCount); // lines connecting points

            gl.bufferData(gl.ARRAY_BUFFER, axesVerticies, gl.STATIC_DRAW);
            gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, 0, 0);
            gl.drawArrays(gl.LINES, 0, axesVerticies.length / 2); // axes
        }

        //requestAnimationFrame(draw);
    }
}