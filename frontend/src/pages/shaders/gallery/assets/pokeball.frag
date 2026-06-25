float among(vec2 p)
{
    ivec2 id = ivec2(floor(p));
    
    id.y = int(mod(float(id.y), 7.)) - 3;
    
    id.x -= id.y;
    
    id.x = int(mod(float(id.x), 5.));
    
    if(
        (id.x == 1 || id.x == 3) &&  id.y == 0 || // legs
        (id.x >= 0 && id.x <= 3) && (id.y >= 1 && id.y <= 2) || // body + backpack
        (id.x >= 1 && id.x <= 3) &&  id.y == 3 // head
    )
        return 1.;
    else if(
        (id.x == 0 || id.x == 2) && id.y == 0 || // legs
        (id.x >= 0 && id.x <= 3) && (id.y <= -1 && id.y >= -2) ||
        (id.x >= 0 && id.x <= 2) && id.y == -3
    )
        return 0.5;
    
    return 0.;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = (fragCoord - .0*iResolution.xy)/iResolution.y;

    fragColor = vec4(among(uv * 20.+iTime));
}
