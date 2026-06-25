vec3 color(int x, int y)
{
    return ((x*int(iTime*2.)) + y*20) % 17 == 0 ? vec3(1) : vec3(0);
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = fragCoord/iResolution.xy;
    
    uv += iTime/100.;

    float scale = 10.;
    int x = int(iResolution.x * uv.x / scale),
        y = int(iResolution.y * uv.y / scale);

    fragColor = vec4(color(x, y), 1);
}

// TODO: remake the beach house "bloom" album cover
