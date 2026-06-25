#define t (12.+iTime*4.)
#define mouse (iMouse.xy/iResolution.xy)
#define s (mouse.x)

float rule(vec2 uv)
{
    uv.x *= uv.y;
    return 1. - mod( floor(uv.x+uv.y), 24. );
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = (fragCoord -0.5*iResolution.xy)/iResolution.y;
    
    float a = -s*3.14159625/4.;
    uv *= mat2(cos(a), -sin(a), sin(a), cos(a));
    uv *= 50.;
    
    uv += t;
    
    vec2 id = floor(uv);
    uv = fract(uv);

    float l = mouse.y/10.;
    fragColor = vec4(
        rule(id+l)
    );
}
