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

const WIDTH = screen.width;
const HEIGHT = screen.height;

const mat4 = glMatrix.mat4;

function main() {
    const canvas = document.getElementById("shadercanvas");
    const gl = canvas.getContext("webgl2");

    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    // --------------------------------------------------------------------------------

    const VERTEXSHADERSOURCECODE = /* glsl */ `#version 300 es
    precision mediump float;

    in vec3 a_position;

    uniform vec2 u_graphBounds;
    uniform vec2 u_graphOffset;
    uniform float u_scale;

    uniform mat4 u_mWorld;
    uniform mat4 u_mView;
    uniform mat4 u_mProj;

    out vec3 v_color;

    void main() {
        v_color = vec3(1.0);
        gl_PointSize = 0.5;

        vec2 xy = a_position.xy;

        gl_Position = u_mProj * u_mView * u_mWorld * vec4((xy * u_scale - u_graphOffset) / u_graphBounds, a_position.z, 1.0); 
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

    let attractorPoints = attractorGenerateVerticies();
    let xmin = 100;
    let xmax = -100;
    let ymin = 100;
    let ymax = -100;
    for(let i = 0; i < attractorPoints.length; i += 3) {
        let x = attractorPoints[i];
        let y = attractorPoints[i + 1];

        if(x < xmin) xmin = x;
        else if(x > xmax) xmax = x;
        
        if(y < ymin) ymin = y;
        else if(y > ymax) ymax = y;
    }
    let xcenter = (xmax + xmin) / 2;
    let ycenter = (ymax + ymin) / 2;

    console.log(xmax, xmin, xcenter);
    console.log(ymax, ymin, ycenter);

    const stride = 3;
    const verticies = new Float32Array(attractorPoints);
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

    let scale = 1;
    const u_scale = gl.getUniformLocation(program, 'u_scale');
    gl.uniform1f(u_scale, scale);

    const u_graphOffset = gl.getUniformLocation(program, 'u_graphOffset');
    gl.uniform2fv(u_graphOffset, [xcenter, ycenter]);

    const u_graphBounds = gl.getUniformLocation(program, 'u_graphBounds');
    gl.uniform2fv(u_graphBounds, [(Math.abs(xmax) + Math.abs(xmin)) / 2, (Math.abs(ymax) + Math.abs(ymin)) / 2]);

    const u_mWorld = gl.getUniformLocation(program, 'u_mWorld');
    const u_mView  = gl.getUniformLocation(program, 'u_mView');
    const u_mProj  = gl.getUniformLocation(program, 'u_mProj');
    gl.uniformMatrix4fv(u_mWorld, gl.FALSE, worldMatrix);
    gl.uniformMatrix4fv(u_mView, gl.FALSE, viewMatrix);
    gl.uniformMatrix4fv(u_mProj, gl.FALSE, projMatrix);

    let xRotationMatrix = new Float32Array(16);
    let yRotationMatrix = new Float32Array(16);
    let identityMatrix  = mat4.identity(new Float32Array(16));

    let angle = 0.0;

    draw();
    function draw() {
        angle = performance.now() / 1000 / 12 * 2 * Math.PI;

        gl.uniform1f(u_scale, scale);

        mat4.rotate(xRotationMatrix, identityMatrix, angle / 4, [1, 0, 0]);
        mat4.rotate(yRotationMatrix, identityMatrix, angle, [0, 1, 0]);

        mat4.mul(worldMatrix, xRotationMatrix, yRotationMatrix);
        gl.uniformMatrix4fv(u_mWorld, gl.FALSE, worldMatrix);


        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.drawArrays(gl.POINTS, 0, verticies.length / stride);

        requestAnimationFrame(draw);
    }

    window.addEventListener('wheel', (event) => {
        if(event.deltaY < 0) {
            scale += 0.5;
        }
        else {
            scale -= 0.5;
        }
    });
}

main();