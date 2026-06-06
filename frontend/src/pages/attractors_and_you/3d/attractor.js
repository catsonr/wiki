function generateCoefficients(count, range = 1) {
    let a = [];

    for(let i = 0; i < count; i++) {
        a.push((Math.random() * 2 - 1) * range);
    }

    return a;
}

// requires 24 a values
function quadratic3dNextPoint(coords, a) {
    let x = coords[0];
    let y = coords[1];
    let z = coords[2];

    let xnew = a[0] + a[1]*x + a[2]*x*z + a[3]*y + a[4]*y*x + a[5]*z + a[6]*z*y + a[7]*x*y*z;
    let ynew = a[8] + a[9]*x + a[10]*x*z + a[11]*y + a[12]*y*x + a[13]*z + a[14]*z*y + a[15]*x*y*z;
    let znew = a[16] + a[17]*x + a[18]*x*z + a[19]*y + a[20]*y*x + a[21]*z + a[22]*z*y + a[23]*x*y*z;

    return [xnew, ynew, znew];
}

// requires 21 a values
function abs3dNextPoint(coords, a) {
    let x = coords[0];
    let y = coords[1];
    let z = coords[2];

    let xnew = a[0] + a[1] * x + a[2] * y + a[3] * z + a[4] * Math.abs(x) + a[5] * Math.abs(y) + a[6] * Math.abs(z);
    let ynew = a[7] + a[8] * x + a[9] * y + a[10] * z + a[11] * Math.abs(x) + a[12] * Math.abs(y) + a[13] * Math.abs(z);
    let znew = a[14] + a[15] * x + a[16] * y + a[17] * z + a[18] * Math.abs(x) + a[19] * Math.abs(y) + a[20] * Math.abs(z);

    return [xnew, ynew, znew];
}

const divergeThreshold = 1e5;
const distanceSameThreshold = 1e-3;
const chaosCheckThreshold = 1000;
const pointAppendThreshold = 10000;

const iterations = pointAppendThreshold * 10;

function attractorGenerateVerticies() {
    let points = [];
    let searching = true;

    while(searching) {
        let coords = [Math.random(), Math.random(), Math.random()];
        let a = generateCoefficients(30, 1);

        let lyapunov = 0;

        let altcoords, dx, dy, dz, d0;
        do {
            altcoords = [coords[0] + (Math.random() * 2 - 1) / 1000, coords[1] + (Math.random() * 2 - 1) / 1000, coords[2] + (Math.random() * 2 - 1) / 1000];
            dx = coords[0] - altcoords[0];
            dy = coords[1] - altcoords[1];
            dz = coords[2] - altcoords[2];
            d0 = Math.sqrt(dx*dx + dy*dy + dz*dz);
        } while(d0 <= 0);

        for(let i = 0; i < iterations; i++) {
            let newcoords = quadratic3dNextPoint(coords, a);

            if(newcoords[0] >= divergeThreshold || newcoords[1] >= divergeThreshold || newcoords[0] <= -divergeThreshold || newcoords[1] <= -divergeThreshold) {
                console.log('diverged to infinity');
                break;
            }
            else if(Math.abs(newcoords[0] - coords[0]) <= distanceSameThreshold && Math.abs(newcoords[1] - coords[1]) <= distanceSameThreshold) {
                console.log('converged to single point');
                break;
            }
            if(i >= chaosCheckThreshold) {
                let newaltcoords = quadratic3dNextPoint(altcoords, a);

                dx = newcoords[0] - newaltcoords[0];
                dy = newcoords[1] - newaltcoords[1];
                dz = newcoords[2] - newaltcoords[2];
                let d = Math.sqrt(dx * dx + dy * dy + dz*dz);

                lyapunov += Math.log(Math.abs(d / d0));

                altcoords[0] = newcoords[0] + d0 * dx / d;
                altcoords[1] = newcoords[1] + d0 * dy / d;
                altcoords[2] = newcoords[2] + d0 * dz / d;
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
                points.push(coords[2]);
            }

            if(i >= iterations - 1 && lyapunov >= 100) {
                console.log('found one!!!!');
                console.log(a);
                console.log('fin w lyapunov of ' + lyapunov);
                searching = false;
            }
        }

    }

    console.log('point count: ' + points.length / 3);
    return points;
}