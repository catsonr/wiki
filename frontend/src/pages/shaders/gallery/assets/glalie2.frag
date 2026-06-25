#define t (iTime/8.)
#define mouse ((iMouse.xy - .5*iResolution.xy)/iResolution.xy)

// returns 1.0 if id meets the rule and 0.0 otherwise
float rule(vec2 id)
{
    id.x *= id.y*id.x;
    return 1.0 - mod(id.x+id.y, 152.);
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = (fragCoord - .5*iResolution.xy)/iResolution.y;
    
    float a = 3.14159625/4.;
    //uv *= mat2(cos(a), -sin(a), sin(a), cos(a));
    
    uv.x += mouse.x;
    uv.y += mouse.y;
    
    float scale = 2.; // pixels per id
    vec2 id = floor( uv*iResolution.y/scale );

    fragColor = vec4( rule(id) );
    
    //fragColor.r += 1.;
    fragColor.g += 1.;
    fragColor.b += 1.;
}
