// graph sin(x+t)
float E(vec2 uv)
{
    // atan generates lines ??
    return 1. - abs(tan(uv.x+iTime) - uv.y) <= .65 ? 0. : 1.;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 mouse = iMouse.xy / iResolution.xy;
    float t = iTime / 2.0;

    vec2 uv = fragCoord/iResolution.xy; // [0, 1]^2
    uv.x -= 0.5; 
    uv.x += .00000001*tan(t);
    uv.x *= uv.x*100000000.0;
    uv.y = (uv.y - 0.5) * (3.0 + mouse.y*10.); // y is [-2, 2]

    
    float l = mouse.y;
    fragColor = vec4(
        E(uv),
        E(uv-l),
        E(uv+l),
    1.);
}
