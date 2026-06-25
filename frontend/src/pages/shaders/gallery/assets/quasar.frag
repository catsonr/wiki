#define pi 3.14159625

float line(vec2 uv, float a) { return abs(dot(uv, vec2(sin(a), -cos(a)))); }

float on(float d) { return smoothstep(30./iResolution.y, 0., d); }

float g(float x) { return x; }
float f(float x) { return x; }

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = (fragCoord - .5*iResolution.xy)/iResolution.y;
    uv *= 10.; // [-1, 1]^2

    fragColor = vec4(on(line(uv, uv.x/uv.y+iTime)));
}
