/*
    the position of the i, jth vertex of the
    regular triangular tiling is given by:
        ( i * sqrt(3)/2, j + i/2 )
*/

// returns distance from nearest vertex of
// square regular tiling, assuming side length 1
float vertex(vec2 uv)
{
    uv = floor(uv);
    
    return length(uv);
}

// returns 1.0 if on, and 0.0 if off
const float size = 50.5;
float on(float d) { return smoothstep(1./iResolution.y, 0., d-size); }

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = (fragCoord - .5*iResolution.xy)/iResolution.y;
    uv *= 210.;
    
    fragColor = vec4(on(vertex(uv)));
}

// ignore all the comments i was trying something else 
