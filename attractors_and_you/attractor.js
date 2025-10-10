// 2d (parametric) quadratic equations
// x_n+1 = a_0 + a_1*x + a_2*x^2 + a_3*y + a_4*y^2 + a_5*x*y
// y_n+1 = a_6 + a_7*x + a_8*x^2 + a_9*y + a_10*y^2 + a_11*x*y
function gernerateCoefficients(count = 12, range = 1) {
    let a = [];

    for(let i = 0; i < count; i++) {
        a.push((Math.random() * 2 - 1) * range);
    }

    return a;
}

// requires 12 a values
function quadratic2dNextPoint(coords, a) {
    let x = coords[0];
    let y = coords[1];

    let xnew = a[0] + a[1]*x + a[2]*x*x + a[3]*y + a[4]*y*y + a[5]*x*y;
    let ynew = a[6] + a[7]*x + a[8]*x*x + a[9]*y + a[10]*y*y + a[11]*x*y;

    return [xnew, ynew];
}

// requires 10 a values
function abs2dNextPoint(coords, a) {
    let x = coords[0];
    let y = coords[1];

    let xnew = a[0] + a[1]*x + a[2]*Math.abs(x) + a[3]*y + a[4]*Math.abs(y);
    let ynew = a[5] + a[6]*x + a[7]*Math.abs(x) + a[8]*y + a[9]*Math.abs(y);

    return [xnew, ynew];
}

// requires 12 a values
function trig2dNextPoint(coords, a) {
    let x = coords[0];
    let y = coords[1];

    let xnew = a[0] + a[1]*Math.sin(a[2]*x) + a[3]*Math.cos(a[4]*y) * a[5]*x*y;
    let ynew = a[6] + a[7]*Math.sin(a[8]*x) + a[9]*Math.cos(a[10]*y) * a[11]*x*y;

    return [xnew, ynew];
}

const divergeThreshold = 1e5;
const distanceSameThreshold = 1e-4;
const chaosCheckThreshold = 1000;
const pointAppendThreshold = 10000;

const iterations = pointAppendThreshold * 10;

// takes a list of a and generates its verticies
function attractorGenerateVerticies(a, coords, iterations = 100) {
    let points = [coords[0], coords[1]];

    for(i = 0; i < iterations; i++) {
        let newcoords = quadratic2dNextPoint(coords, a);
        points.push(newcoords[0]);
        points.push(newcoords[1]);
        coords = newcoords;
    }

    return points;
}

// finds a random attractor and returns its verticies
function attractorFindAttractor() {
    let points = [];
    let searching = true;

    while(searching) {
        let coords = [Math.random(), Math.random()];
        let a = gernerateCoefficients(12);

        let lyapunov = 0;

        let altcoords, dx, dy, d0;
        do {
            altcoords = [coords[0] + (Math.random() * 2 - 1) / 1000, coords[1] + (Math.random() * 2 - 1) / 1000];
            dx = coords[0] - altcoords[0];
            dy = coords[1] - altcoords[1];
            d0 = Math.sqrt(dx*dx + dy*dy);
        } while(d0 <= 0);

        for(let i = 0; i < iterations; i++) {
            let newcoords = quadratic2dNextPoint(coords, a);

            if(newcoords[0] >= divergeThreshold || newcoords[1] >= divergeThreshold || newcoords[0] <= -divergeThreshold || newcoords[1] <= -divergeThreshold) {
                console.log('diverged to infinity');
                break;
            }
            else if(Math.abs(newcoords[0] - coords[0]) <= distanceSameThreshold && Math.abs(newcoords[1] - coords[1]) <= distanceSameThreshold) {
                console.log('converged to single point');
                break;
            }
            if(i >= chaosCheckThreshold) {
                let newaltcoords = quadratic2dNextPoint(altcoords, a);

                dx = newcoords[0] - newaltcoords[0];
                dy = newcoords[1] - newaltcoords[1];
                let d = Math.sqrt(dx * dx + dy * dy);

                lyapunov += Math.log(Math.abs(d / d0));

                altcoords[0] = newcoords[0] + d0 * dx / d;
                altcoords[1] = newcoords[1] + d0 * dy / d;
            }
            if(lyapunov <= -10) {
                console.log('found non-chaotic behavior');
                break;
            }

            // passed all checks
            coords = newcoords;
            
            if(i >= pointAppendThreshold) {
                points.push(coords[0]);
                points.push(coords[1]);
            }

            if(i >= iterations - 1 && lyapunov >= 10) {
                console.log('found one!!!!');
                console.log(a);
                console.log('fin w lyapunov of ' + lyapunov);
                searching = false;
            }
        }

    }

    console.log('point count: ' + points.length / 2);
    return points;
}