#define t (iTime/8.)
#define mouse ((iMouse.xy - .5*iResolution.xy)/iResolution.xy)
#define selected (sign(uv.y) == sign(mouse.y))

// returns 1.0 if id meets the rule and 0.0 otherwise
float rule(vec2 id)
{
    id.x *= id.y;
        return 1.0 - mod(id.x+id.y, 128.+sin(t)*tan(t)*0.01);
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = (fragCoord - .5*iResolution.xy)/iResolution.y;
    
    float a = 3.14159625/4.;
    uv *= mat2(cos(a), -sin(a), sin(a), cos(a));
    
    uv.x += mouse.x;
    uv.y += mouse.y;
    
    float scale = (selected) ? 10. : 5.; // pixels per id
    vec2 id = floor( uv*iResolution.y/scale );

    float l = 0.0001 * sign(mouse.y);
    fragColor = vec4( rule(id+vec2(l,0)) );
    
    if(selected)
    {
        fragColor.g += sin(t);
        fragColor.b += cos(t);
    }
}
