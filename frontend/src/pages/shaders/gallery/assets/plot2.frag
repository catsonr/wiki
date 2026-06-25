#define t (12.+iTime*4.)
#define mouse (iMouse.xy/iResolution.xy)
#define s (mouse.x)

float rule(vec2 uv)
{
    uv.x *= uv.y;
    return mod( floor(uv.x+uv.y), floor(17.+2.*sin(s*3.14159625*2.)) );
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = (fragCoord -0.5*iResolution.xy)/iResolution.y;
    
    float a = s*3.14159625/4.;
    uv *= mat2(cos(a), -sin(a), sin(a), cos(a));
    uv *= 50.;
    vec2 id = floor(uv);
    uv = fract(uv);

    fragColor = vec4( 1.0-rule(id) );
}
