#define t (iTime)
const float size = 64.0;

// true is foreground and false is background
bool checkerboard(vec2 uv)
{
    vec2 id = abs(floor(uv));
    
    // boarders
    if(id.x >= size/1.5 - cos(t)*4. || id.y >= size/3. - sin(t)*5.) return false;
    
    // checkerboard
    return mod(id.x + id.y, 2.) == 0.0;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = (fragCoord - 0.5*iResolution.xy)/iResolution.y;

    uv *= size;

    fragColor = vec4(1.-float(checkerboard(uv)));
}
