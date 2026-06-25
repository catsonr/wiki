#define t (iTime/4.)

// graph tan(x+t)
float E(vec2 uv) { return 1. - abs(tan(uv.x+t/10.) - uv.y) <= 0.15 ? 0. : 1.; }

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 mouse = iMouse.xy / iResolution.xy;

    vec2 uv = (fragCoord - .5*iResolution.xy)/iResolution.y;
    uv.x += .00000001*tan(t);              // spin
    uv.x *= uv.x*1000000.0;                // squish
    uv.y += sin(t)/10.;                    // sway up & down
    uv *= 30.*smoothstep(0., 1., mouse.x); // zoom
    
    float l = mouse.y;
    fragColor = vec4(
        E(uv),
        E(uv-l),
        E(uv+l),
    1.);
}
