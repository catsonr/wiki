import { useRef, useEffect } from 'react'
import VERT_SRC from './shader.vert?raw'

interface ShaderProps {
    width: number
    height: number
    fragmentSource: string
}

const FRAG_PREFIX = `#version 300 es
precision highp float;

uniform vec3 iResolution;
uniform float iTime;
uniform int iFrame;
uniform vec4 iMouse;

out vec4 fragColor;
`

const FRAG_SUFFIX = `
void main() {
    mainImage(fragColor, gl_FragCoord.xy);
}
`

export function Shader({ width, height, fragmentSource }: ShaderProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const mouseRef = useRef<{ x: number; y: number; clickX: number; clickY: number; down: boolean }>({
        x: 0, y: 0, clickX: 0, clickY: 0, down: false
    })

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const gl = canvas.getContext('webgl2', { premultipliedAlpha: false })
        if (!gl) { console.error('no webgl2'); return }

        function compileShader(gl: WebGL2RenderingContext, type: number, source: string) {
            const s = gl.createShader(type)
            if (!s) return null
            gl.shaderSource(s, source)
            gl.compileShader(s)
            if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
                console.error(gl.getShaderInfoLog(s))
                gl.deleteShader(s)
                return null
            }
            return s
        }

        const vert = compileShader(gl, gl.VERTEX_SHADER, VERT_SRC)
        if (!vert) return
        const frag = compileShader(gl, gl.FRAGMENT_SHADER, FRAG_PREFIX + fragmentSource + FRAG_SUFFIX)
        if (!frag) return

        const program = gl.createProgram()!
        gl.attachShader(program, vert)
        gl.attachShader(program, frag)
        gl.linkProgram(program)
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error(gl.getProgramInfoLog(program))
            return
        }
        gl.useProgram(program)

        const quad = new Float32Array([-1,-1, 1,-1, -1,1, 1,-1, 1,1, -1,1])
        const buf = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, buf)
        gl.bufferData(gl.ARRAY_BUFFER, quad, gl.STATIC_DRAW)

        const aPos = gl.getAttribLocation(program, 'a_position')
        gl.enableVertexAttribArray(aPos)
        gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

        const uResolution = gl.getUniformLocation(program, 'iResolution')
        const uTime = gl.getUniformLocation(program, 'iTime')
        const uFrame = gl.getUniformLocation(program, 'iFrame')
        const uMouse = gl.getUniformLocation(program, 'iMouse')

        let frame = 0
        let animId: number
        const t0 = performance.now()

        function render() {
            gl!.viewport(0, 0, canvas!.width, canvas!.height)
            gl!.uniform3f(uResolution, canvas!.width, canvas!.height, 1.0)
            gl!.uniform1f(uTime, (performance.now() - t0) / 1000)
            gl!.uniform1i(uFrame, frame++)

            const m = mouseRef.current
            gl!.uniform4f(uMouse,
                m.down ? m.x : 0,
                m.down ? m.y : 0,
                m.down ? m.clickX : 0,
                m.down ? m.clickY : 0
            )

            gl!.drawArrays(gl!.TRIANGLES, 0, 6)
            animId = requestAnimationFrame(render)
        }
        render()

        return () => {
            cancelAnimationFrame(animId)
            gl.deleteProgram(program)
            gl.deleteShader(vert)
            gl.deleteShader(frag)
            gl.deleteBuffer(buf)
        }
    }, [fragmentSource, width, height])

    function toGl(e: React.MouseEvent<HTMLCanvasElement>) {
        const r = e.currentTarget.getBoundingClientRect()
        return { x: e.clientX - r.left, y: height - (e.clientY - r.top) }
    }

    return <canvas
        ref={canvasRef}
        width={width}
        height={height}
        onMouseMove={e => { const p = toGl(e); mouseRef.current.x = p.x; mouseRef.current.y = p.y }}
        onMouseDown={e => { const p = toGl(e); mouseRef.current = { ...mouseRef.current, clickX: p.x, clickY: p.y, down: true } }}
        onMouseUp={() => { mouseRef.current.down = false }}
        onMouseLeave={() => { mouseRef.current.down = false }}
    />
}
