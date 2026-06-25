float among(vec2 p)
{
    float w = 5.,
          h = 7.;
    
    vec2 id = floor(p);
    
    float row = floor(id.y / h);
    float col = floor(id.x / w);
    
    id.x -= row;
    id.y -= floor(iTime)*col;
    
    int x = int( mod(id.x, w) ),
        y = int( mod(id.y, h) );
    if(
        y == 0           && (x >= 0 && x <= 2) ||
        y >= 1 && y <= 2 && (x >= 0 && x <= 3) ||
        y == 3           && (x == 0 || x == 2)
    ) return .5;
    else if(
        y == 3           && (x == 1 || x == 3) ||
        y >= 4 && y <= 5 && (x >= 0 && x <= 3) ||
        y == 6           && (x >= 1 && x <= 3)
    ) return 1.;
    
    return 0.;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = (fragCoord - .0*iResolution.xy)/iResolution.y;

    fragColor = vec4(among(uv * 20.+iTime));
}
