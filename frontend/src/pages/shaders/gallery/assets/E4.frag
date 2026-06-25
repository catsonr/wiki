#define t (iTime / 2.)

// graph sin(x+t)
float E(vec2 uv)
{
    // atan generates lines ??
    return 1. - abs(sin(uv.x+t) - uv.y) <= .65 ? 0. : 1.;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 mouse = iMouse.xy / iResolution.y;

    vec2 uv = fragCoord/iResolution.xy; // [0, 1]^2
    uv.x += 1000000.*tan(t*10.);
    uv.y = (uv.y - 0.5) * (3.0 + mouse.y/10.); // y is [-2, 2]

    
    float l = mouse.y;
    fragColor = vec4(
        E(uv),
        E(uv-vec2(l, 0)),
        E(uv+vec2(0, l)),
    1.);
}
