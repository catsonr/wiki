// graph tan(x+t)
float E(vec2 uv)
{
    float speed = 40.;
    return 1. - abs(tan(uv.x+iTime/speed) - uv.y) <= 0.15 ? 0. : 1.;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 mouse = iMouse.xy / iResolution.xy;

    vec2 uv = fragCoord/iResolution.xy;
    uv.x -= 0.5; 
    uv.x += .00000001*tan(iTime/4.);
    uv.x *= uv.x*1000000.0;
    uv.x *= 1.; // changing this to different values can be cool
    uv.y = (uv.y - 0.5) * (3.0 + mouse.y*10.);
    uv.y += 0.008*iMouse.y;
    uv *= 10.; // zoom
    
    float l = mouse.y;
    fragColor = vec4(
        E(uv),
        E(uv-l),
        E(uv+l),
    1.);
}
