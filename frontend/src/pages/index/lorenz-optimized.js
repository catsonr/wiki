// lorenz attractor background -- performance-optimized variant of lorenz.js.
//
// the original traced the attractor at the screen's full retina pixelDensity, at
// 60fps, in a draw() loop that never stopped. a profile showed ~55% of the frame
// budget in CanvasRenderingContext2D.fill (one fill per p5 point()) plus ~17% in
// Paint -- all of it this full-window canvas. three changes, same look:
//   1. pixelDensity(1)  -- a soft background doesn't need 2x; ~4x cheaper fill+paint
//   2. frameRate(30)    -- plenty for a slow trace
//   3. SUBSTEPS points/frame, then noLoop() at endt -- the canvas already never
//                          clears (no background()), so points persist; the cost is
//                          the full-window Paint every frame WHILE tracing. so we
//                          trace in few frames (many points each), then stop the
//                          loop entirely -> cost falls to zero once the shape is in.

let w;
let h;

let dt = 0.005;
let t = 0;
const endt = dt * 60 * 60 * 1.5

let a = 10.0, b = 28.0, c = 8.0 / 3.0;

const displayScale = 13.0;

const SUBSTEPS = 2; // points drawn per frame. higher = trace finishes in fewer frames
                     // (fewer full-window Paints = less lag), then noLoop() kills it

let particles = [];

class Particle {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    update() {
        let dx = (a * (this.y - this.x)) * dt;
        let dy = (this.x * (b - this.z) - this.y) * dt;
        let dz = (this.x * this.y - c * this.z) * dt;

        this.x += dx;
        this.y += dy;
        this.z += dz;
    }

    draw() {
        strokeWeight(this.z / 8);
        stroke(255 - this.z * 7);

        // absolute position -- NOT translate(). with multiple substeps per frame,
        // translate() calls stack (p5 resets the matrix once per frame, not per
        // substep), so each extra substep drew a ghost attractor offset by (w/2,h/2).
        // drawing at an absolute coord uses no matrix state, so substeps stay clean.
        point(w / 2 + this.x * displayScale, h / 2 + this.y * displayScale);
    }
}

particles.push(new Particle(0.01, 1.0, 0.0));

function setup() {
    pixelDensity(1);   // render at 1x, not the display's retina density (~4x fewer pixels)
    w = windowWidth;
    h = windowHeight;
    canvas = createCanvas(w, h);
    canvas.id("lorenzcanvas");
    canvas.style('display', 'block');

    frameRate(30);     // a slow trace doesn't need 60fps

    a += Math.random() * 2 - 1;
    b += Math.random() * 4 - 2;
    c += Math.random() * 2 - 1;
}

function draw() {
    if (t < endt) {
        // several sim substeps per frame -> fewer frames, same trail density/speed
        for (let i = 0; i < SUBSTEPS; i++) {
            particles.forEach(particle => {
                particle.draw();
                particle.update();
            });
            t += dt;
        }
    } else {
        noLoop();      // fully traced: stop the loop, free the CPU for good
    }
}
