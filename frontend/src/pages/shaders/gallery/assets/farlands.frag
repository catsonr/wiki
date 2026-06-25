bool is(float a, int b) { return abs(a-float(b)) <= 0.1; }

vec3 isCrew(vec2 pmino) {
    float x = pmino.x, y = pmino.y;
    vec3 crew = vec3(0.8, .4, .4), eyes = vec3(.9);
        
    // crew
    if(is(y, 7) && is(x, 4)) return crew;
    if(is(y, 6) && (is(x, 1) || is(x, 2) || is(x, 3) || is(x, 4))) return crew;
    if(is(y, 5)) {
        if(is(x, 2) || is(x, 3)) return eyes;
        if(is(x, 1)) return crew;
    }
    if(is(y, 4) && (is(x, 1) || is(x, 2) || is(x, 3))) return crew;
    if(is(y, 3) && (is(x, 1) || is(x, 3))) return crew;
    
    // mate eyes
    if(is(x, 4) && is(y, 3)) return eyes;
    if(is(x, 1) && is(y, 1)) return eyes;
    
    // otherwise mate
    return vec3(.5);
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = (fragCoord - 0.5*iResolution.xy)/iResolution.y;
    uv += iTime/100.;
    uv *= 40.;
    
    uv.x *= exp(uv.x);
 
    mat2 P = mat2(4, 2, 1, 7);
 
    vec2 mino = floor(uv); // which absolute mino we're in
    vec2 pid = floor(inverse(P) * mino); // parallelogram id
    vec2 pmino = mino - P*pid; // which relative mino we're in
    
    fragColor = vec4(isCrew(pmino), 1);
}
