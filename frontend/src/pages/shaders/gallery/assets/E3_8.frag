#define t (iTime/40.)
#define mouse (iMouse.xy/iResolution.xy)

float E(vec2 uv) { return 1. - abs(sin(uv.x+t) - uv.y) <= 0.15 ? 0. : 1.; }

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = (fragCoord - .5*iResolution.xy)/iResolution.y;
    
    uv *= 1.; // zoom
    
    uv *= mat2(
        1, -10000, 
        0, 1
    );
    
    float l = cos(t)*sin(t)*.5;
    fragColor = vec4(
        E(uv),
        E(uv+l),
        E(uv-l),
    1.);
}
