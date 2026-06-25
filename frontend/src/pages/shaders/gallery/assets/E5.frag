#define t (iTime / 2.)

// graph sin(x+t)
float E(vec2 uv)
{
    return 1. - abs(sin(uv.x) - uv.y) <= .65 ? 0. : 1.;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 mouse = iMouse.xy / iResolution.y;

    vec2 uv = fragCoord/iResolution.xy; // [0, 1]^2
    uv.x += t;
    uv.x += tan(t);
    uv.y = (uv.y - 0.5) * (2. + 1.5*sin(t*2.));

    
    float l = sin(t);
    fragColor = vec4(
        E(uv),
        E(uv-vec2(l, 0)),
        E(uv+vec2(0, l)),
    1.);
}
