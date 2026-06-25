float f(float x)
{
    return sin(x + iTime);
}

float graph(vec2 uv)
{
    float dist = uv.y - f(uv.x);

    return abs(dist) < 0.015 ? 1.0 : 0.0;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = fragCoord/iResolution.xy; // [0, 1]^2
    uv.y = (uv.y - 0.5) * 4.0; // y is [-2, 2]

    //uv.x *= uv.x*1000.0;

    float g = 0.0;
    const float spacing = 0.1;
    const int line_count = 60;
    for(int i = 0; i < line_count; i++)
    {
        vec2 offset = vec2(spacing*float(i), -float(line_count)*0.5*spacing + spacing*float(i));
        g += graph(uv + offset);
    }

    fragColor = vec4(1.0-g, 1.0-g, 1.0-g, 1.0);
}
