let w;
let h;

let dt = 0.005;
let t = 0;
const endt = dt * 60 * 60 * 1.5 

let a = 10.0, b = 28.0, c = 8.0 / 3.0;

const displayScale = 13.0;

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

        translate(w / 2, h / 2);
        point(this.x * displayScale, this.y * displayScale);
    }
}

particles.push(new Particle(0.01, 1.0, 0.0));

function setup() {
    w = windowWidth;
    h = windowHeight;
    canvas = createCanvas(w, h);
    canvas.id("lorenzcanvas");
    canvas.style('display', 'block');

    a += Math.random() * 2 - 1;
    b += Math.random() * 4 - 2;
    c += Math.random() * 2 - 1;
}

function draw() {
    if(t < endt) {
        particles.forEach(particle => {
            particle.draw();
            particle.update();
        });
    }

    t += dt;
}
