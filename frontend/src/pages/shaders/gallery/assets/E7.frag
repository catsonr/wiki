#define t iTime

// graph sin(x)
float E(vec2 uv) { return 1. - abs(sin(uv.x) - uv.y) <= .65 ? 0. : 1.; }

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 mouse = iMouse.xy / iResolution.y;

    vec2 uv = fragCoord/iResolution.xy; // [0, 1]^2
    
    float j = exp(
        4.*sin(t/200.)
    );
    
    uv.x += t + j;
    uv.y =( uv.y-0.5 ) * ( 4.0+2.0*sin(t) );

    
    float l = sin(t);
    fragColor = vec4(
        E(uv),
        E(uv-vec2(l, 0)),
        E(uv+vec2(0, l)),
    1.);
}
