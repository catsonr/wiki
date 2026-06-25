#define t (12.+iTime*4.)

float rule(vec2 uv)
{
    uv.x *= uv.y;
    return mod( floor(uv.x+uv.y), floor(t) );
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = (fragCoord -0.5*iResolution.xy)/iResolution.y;
    
    uv *= 50.;
    vec2 id = floor(uv);
    uv = fract(uv);

    fragColor = vec4( 1.0-rule(id) );
}
