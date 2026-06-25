vec3 on = vec3(0.0);
vec3 off = vec3(1.0);

float f(float x)
{
    return sin(x + iTime);
}

vec3 graph(vec2 uv)
{
    float epsilon = 0.015;
    bool on_graph = abs(f(uv.x) - uv.y) <= epsilon;

    return on_graph ? on : off;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = fragCoord/iResolution.xy; // x is [0, 1]
    uv.y -= 0.5; // y is [-0.5, 0.5]
    uv.y *= 2.0; // y is [-1, 1]
    uv.y *= 2.1; // y is [-1.1, 1.1]

    //uv.x *= iMouse.x;
    uv.x *= iResolution.x;

    fragColor = vec4(graph(uv),1.0);
}
