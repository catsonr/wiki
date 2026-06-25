float f(float x)
{
    return sin(x + iTime*0.);
}

float graph(vec2 uv)
{
    const float epsilon = 0.015;

    float dist = uv.y - f(uv.x);

    return abs(dist) < epsilon ? 1.0 : 0.0;
}

float stretchX(float x)
{
    return 20.-5.*x;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = fragCoord/iResolution.xy; // [0, 1]^2
    uv.y = (uv.y - 0.5) * 4.0; // y is [-2, 2]

    uv.x *= 4.0;
    uv.x *= stretchX(uv.x);

    float g = 0.0;
    const float spacing = 0.08;
    const int line_count = 50;
    for(int i = 0; i < line_count; i++)
    {
        vec2 offset = vec2(0, -float(line_count)*0.5*spacing + spacing*float(i));
        g += graph(uv + offset);
    }

    fragColor = vec4(1.0-g, 1.0-g, 1.0-g, 1.0);
}
