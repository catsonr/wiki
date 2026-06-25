float among(vec2 p)
{
    vec2 id = floor(p);
    
    id.x -= floor(id.y/7.);
    id.y += floor(id.x/4.);
    
    id.y = mod(id.y, 7.) - 3.; // [-3, 3]
    id.x = mod(id.x, 4.); // [0, 5]
    
    int x = int(id.x), y = int(id.y);
    if(
        (x == 1 || x == 3) &&  y == 0 || // legs
        (x >= 0 && x <= 3) && (y >= 1 && y <= 2) || // body + backpack
        (x >= 1 && x <= 3) &&  y == 3 // head
    )
        return 1.;
    else if(
        (x == 0 || x == 2) && y == 0 || // legs
        (x >= 0 && x <= 3) && (y <= -1 && y >= -2) ||
        (x >= 0 && x <= 2) && y == -3
    )
        return 0.5;
    
    return 0.;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = (fragCoord - .0*iResolution.xy)/iResolution.y;

    fragColor = vec4(among(uv * 20.+iTime));
}
