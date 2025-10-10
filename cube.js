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

const mat4 = glMatrix.mat4;
const canvasSize = 128;

function main() {
    const canvas = document.getElementById("cubecanvas");
    const gl = canvas.getContext("webgl2");

    canvas.width = canvasSize;
    canvas.height = canvasSize;

    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;

    // --------------------------------------------------------------------------------

    const VERTEXSHADERSOURCECODE = /* glsl */ `#version 300 es
    precision mediump float;

    in vec3 a_position;

    uniform mat4 u_mWorld;
    uniform mat4 u_mView;
    uniform mat4 u_mProj;

    out vec3 v_color;

    void main() {
        v_color = vec3(0.0);
        gl_Position = u_mProj * u_mView * u_mWorld * vec4(a_position, 1.0); 
    }`;

    const FRAGMENTSHADERSOURCECODE = /* glsl */ `#version 300 es
    precision mediump float;

    in vec3 v_color;

    out vec4 outputColor;

    void main() {
        outputColor = vec4(v_color, 1.0);
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
    gl.clearColor(0 / 255, 0 / 255, 0 / 255, 0.0);
    gl.viewport(0, 0, canvas.width, canvas.height);

    const a_position = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(a_position);

    const stride = 3;
    const verticies = new Float32Array([
        // front face
        -1.0, -1.0, -1.0, // 0
        1.0, -1.0, -1.0, // 1
        -1.0, -1.0, -1.0, // 0
        -1.0, 1.0, -1.0, // 2
        1.0, 1.0, -1.0, // 3
        -1.0, 1.0, -1.0, // 2
        1.0, 1.0, -1.0, // 3
        1.0, -1.0, -1.0, // 1

        // back face
        -1.0, -1.0, 1.0, // 4
        1.0, -1.0, 1.0, // 5
        -1.0, -1.0, 1.0, // 4
        -1.0, 1.0, 1.0, // 6
        1.0, 1.0, 1.0, // 7
        -1.0, 1.0, 1.0, // 6
        1.0, 1.0, 1.0, // 7
        1.0, -1.0, 1.0, // 5

        // connecting lines
        -1.0, -1.0, -1.0, // 0
        -1.0, -1.0, 1.0, // 4
        1.0, -1.0, -1.0, // 1
        1.0, -1.0, 1.0, // 5
        -1.0, 1.0, -1.0, // 2
        -1.0, 1.0, 1.0, // 6
        1.0, 1.0, -1.0, // 3
        1.0, 1.0, 1.0, // 7
    ]);
    const verticiesBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, verticiesBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, verticies, gl.STATIC_DRAW);

    gl.vertexAttribPointer(a_position, 3, gl.FLOAT, false, stride * 4, 0);

    let worldMatrix = new Float32Array(16);
    let viewMatrix  = new Float32Array(16);
    let projMatrix  = new Float32Array(16);
    mat4.identity(worldMatrix);
    mat4.lookAt(viewMatrix, [0, 0, -4.55], [0, 0, 0], [0, 1, 0]);
    mat4.perspective(projMatrix, Math.PI / 4, WIDTH / HEIGHT, 0.1, 1000.0);

    const u_mWorld = gl.getUniformLocation(program, 'u_mWorld');
    const u_mView  = gl.getUniformLocation(program, 'u_mView');
    const u_mProj  = gl.getUniformLocation(program, 'u_mProj');
    gl.uniformMatrix4fv(u_mWorld, gl.FALSE, worldMatrix);
    gl.uniformMatrix4fv(u_mView, gl.FALSE, viewMatrix);
    gl.uniformMatrix4fv(u_mProj, gl.FALSE, projMatrix);

    let xRotationMatrix = new Float32Array(16);
    let yRotationMatrix = new Float32Array(16);
    let zRotationMatrix = new Float32Array(16);
    let identityMatrix  = mat4.identity(new Float32Array(16));

    let angle = 0.0;

    let mouseX = 0, mouseY = 0;
    document.addEventListener('mousemove', (event) => {
        mouseX = event.clientX;
        mouseY = event.clientY;
    });

    draw();
    function draw() {
        angle = performance.now() / 1000 / 20 * 2 * Math.PI;

        mat4.rotate(xRotationMatrix, identityMatrix, angle + Math.PI * (mouseY / window.innerHeight), [1, 0, 0]);
        mat4.rotate(yRotationMatrix, identityMatrix, angle / 4 + Math.PI * (mouseX / window.innerWidth), [0, 1, 0]);
        //mat4.rotate(zRotationMatrix, identityMatrix, Math.PI * window.scrollY / (document.documentElement.scrollHeight - window.innerHeight), [0, 0, 1]);

        mat4.mul(worldMatrix, xRotationMatrix, yRotationMatrix);
        gl.uniformMatrix4fv(u_mWorld, gl.FALSE, worldMatrix);

        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.drawArrays(gl.LINES, 0, verticies.length / stride);

        requestAnimationFrame(draw);
    }
}

main();