// returns distance from nearest vertex of
// square regular tiling, assuming side length 1
float vertex(vec2 uv)
{   
    uv = fract(uv);
    
    if(uv.x < 0.5) {
        if(uv.y < 0.5) {
            return uv.x+uv.y;
        } else {
            return uv.x+(1.-uv.y);
        }
    } else {
        if(uv.y < 0.5) {
            return (1.-uv.x)+uv.y;
        } else {
            return (1.-uv.x)+(1.-uv.y);
        }
    }
}

// returns 1.0 if on, and 0.0 if off
float on(float d) { return smoothstep(7.5/iResolution.y, 0., d-0.5*sin(iTime)*sin(iTime)); }

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = (fragCoord - 1.*.5*iResolution.xy)/iResolution.y;
    uv *= iTime;
    
    fragColor = vec4(on(vertex(uv)));
}
