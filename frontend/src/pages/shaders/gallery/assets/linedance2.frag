// distance to nearest edge
float edge(vec2 uv)
{
    uv = fract(uv);
    
    bool X_LESS_Y           = uv.x    < uv.y;
    bool ONE_MINUS_X_LESS_Y = 1.-uv.x < uv.y;
    
    if(!X_LESS_Y && !ONE_MINUS_X_LESS_Y) return    uv.y;
    if( X_LESS_Y && !ONE_MINUS_X_LESS_Y) return    uv.x;
    if(!X_LESS_Y &&  ONE_MINUS_X_LESS_Y) return 1.-uv.x;
    if( X_LESS_Y &&  ONE_MINUS_X_LESS_Y) return 1.-uv.y;
}

// returns 1.0 if on, and 0.0 if off
float on(float d) { return smoothstep(10./iResolution.y, 0., d); }

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = (fragCoord - .5*iResolution.xy)/iResolution.y;
    uv *= 5.;
    
    float t = cos(iTime/4.)*4.;
    uv *= mat2(
        cos(t)*tan(t),          sin(t)*tan(t),
        (sin(t)-cos(t))*sin(t), cos(t)*sin(t)
    );
    
    fragColor = vec4(on(edge(uv)));
}
