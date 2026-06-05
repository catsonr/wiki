let buffer;
let resolution = 5;
let WIDTH, HEIGHT;
let t = 1;

function wave(x, y) {
    return Math.sin(x / y) + Math.sin(x * y);
}

function setup() {
    WIDTH = windowWidth;
    HEIGHT = windowHeight; 

    createCanvas(WIDTH, HEIGHT);
    buffer = createGraphics(WIDTH, HEIGHT);
}

function render(buff, t) {
    buff.noStroke();
    for(let j = 0; j < HEIGHT; j += resolution) {
        for(let i = 0; i < WIDTH; i += resolution) {
            let x = (i - WIDTH / 2) / t;
            let y = (j - HEIGHT / 2) / t;

            buff.stroke(wave(x, y), (50 + t) % 255, (50 + t) % 255);
            buff.circle(i, j, wave(x, y) * 2);
        }
    }
}

function draw() {
    render(buffer, Math.sin(t) * 400 - 200);
    background(30);
    image(buffer, 0, 0);

    t += 0.1;
}
