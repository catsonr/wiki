vec3 c(float x) { // debug colors
    const float e = 0.1;
    if(abs(x) - 0. <= e) return vec3(0, 0, 0); // 0 -> black
    if(abs(x) - 1. <= e) return vec3(1, 0, 0); // 1 -> red
    if(abs(x) - 2. <= e) return vec3(0, 1, 0); // 2 -> green
    if(abs(x) - 3. <= e) return vec3(0, 0, 1); // 3 -> blue
    if(abs(x) - 4. <= e) return vec3(1, 1, 0); // 4 -> yellow
    if(abs(x) - 5. <= e) return vec3(0, 1, 1); // 5 -> cyan
    if(abs(x) - 6. <= e) return vec3(1, 0, 1); // 6 -> magenta
    if(abs(x) - 7. <= e) return vec3(1);       // 7 -> white
    if(abs(x) - 8. <= e) return vec3(.5, .1, .8); // 8 -> purple
    
    return vec3(.2); // -> otherwise grey
}

bool is(float a, int b) { return abs(a-float(b)) <= 0.1; }

vec3 isCrew(vec2 pmino) {
    float x = pmino.x, y = pmino.y;
    vec3 white = vec3(1), eyes = vec3(0, .9, .9);
    
    if(is(x, 4) && is(y, 3)) return eyes;
    if(is(x, 1) && is(y, 1)) return eyes;
    
    if(is(y, 7) && is(x, 4)) return white;
    else if(is(y, 6)) {
        if(is(x, 1) || is(x, 2) || is(x, 3) || is(x, 4)) return white;
    }
    else if(is(y, 5)) {
        if(is(x, 2) || is(x, 3)) return eyes;
        if(is(x, 1)) return white;
    }
    else if(is(y, 4)) {
        if(is(x, 1) || is(x, 2) || is(x, 3)) return white;
    }
    else if(is(y, 3)) {
        if(is(x, 1) || is(x, 3)) return white;
    }
    
    return vec3(0);
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = fragCoord/iResolution.y;
    float minosTall = 40.;
    uv *= minosTall;
 
    mat2 P    = mat2(4,  2,  1, 7);
    mat2 adjP = mat2(7, -2, -1, 4);
 
    vec2 mino = floor(uv); // which absolute mino we're in
    vec2 pid = floor(adjP * mino / 26.); // parallelogram id
    vec2 pmino = mino - P*pid; // which relative mino we're in
    
    fragColor = vec4(isCrew(pmino), 1);
}
