#define t (iTime/8.)
#define mouse ((iMouse.xy - .5*iResolution.xy)/iResolution.xy)
#define trans_t smoothstep(.2, .8, mouse.y + 0.5)

// returns 1.0 if id meets the rule and 0.0 otherwise
float rule(vec2 id)
{
    id.x *= id.y;
    return 1.0 - mod(id.x+id.y, (mix(210.9, 211., trans_t)));
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = (fragCoord - .5*iResolution.xy)/iResolution.y;
    
    float a = 3.14159625/4. * mix(0.9, 1.0, trans_t);
    uv *= mat2(cos(a), -sin(a), sin(a), cos(a));
    uv *= mix(0.5, 2.0, trans_t);    
       
    uv.x -= sin(trans_t) + 0.1*sin(t);
    uv.y += sin(trans_t) + 0.1*sin(t);
    
    float scale = 4.; // pixels per id
    vec2 id = floor( uv*iResolution.y/scale );

    fragColor = vec4( rule(id) );
    fragColor.gb += vec2(trans_t);
}
