#define t (iTime/4.)
#define mouse (iMouse.xy/iResolution.xy)

float E(vec2 uv) { return 1. - abs(sin(uv.x+t) - uv.y) <= 0.15 ? 0. : 1.; }

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = (fragCoord - .5*iResolution.xy)/iResolution.y;
    uv.x += .00000005*tan(t)*sin(t);               // spin
    //uv.x *= sin(uv.x*1000000.0);            // squish
    uv.y += sin(t)/10.;                     // sway up & down
    uv *= 20.*smoothstep(-.1, 1., mouse.x); // zoom
    
    float l = cos(t)*sin(t)*.5;
    fragColor = vec4(
        E(uv),
        E(uv+l),
        E(uv-l),
    1.);
}
