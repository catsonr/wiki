#define pi 3.14159625

float line(vec2 uv, float a) { return abs(dot(uv, vec2(sin(a), -cos(a)))); }

float on(float d) { return smoothstep(30./iResolution.y, 0., d); }

float f(float x) { return sin(x*iTime*pi*0.1); }
float g(float x) { return 0.; }

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = (fragCoord - .5*iResolution.xy)/iResolution.y;
    uv *= 20.; // [-1, 1]^2

    fragColor = vec4(on(line(uv+vec2(f(uv.x), f(uv.y)) , f(uv.x))));
}
