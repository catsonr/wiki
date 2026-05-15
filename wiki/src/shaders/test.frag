#define t (iTime)
const float size = 32.0;

// true is foreground and false is background
bool checkerboard(vec2 uv)
{
    vec2 id = abs(floor(uv));
    
    // borders
    if(id.x >= size/1.5 - cos(t)*4. || id.y >= size/4. - sin(t)*5.) return false;
    // glitchy-ness
    if(tan(id.x+id.y*.500+t) >= 0.) return false;
    // checkerboard
    return mod(id.x + id.y, 4.+floor(cos(t)*3.*tan(t))) == 0.0;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = (fragCoord - 0.5*iResolution.xy)/iResolution.y;

    uv *= size;

    // drop shadow
    float l = .15;
    // draw
    fragColor = vec4(
        float(checkerboard(uv-l)),
        float(checkerboard(uv-l)),
        1.-float(checkerboard(uv+l)),
    1);
}