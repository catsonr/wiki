float line(vec2 uv, float a) { return abs( dot(uv, vec2(sin(a), -cos(a))) ); }
float on(float d) { return smoothstep(7.5/iResolution.y, 0., d); }

vec3 tile(vec2 uv, vec2 id)
{
    uv -= 0.5;
    
    float a = 3.14159625/6.;
    
    float lines = on(line(uv, 0.*a))+
                  on(line(uv, 1.*a))+
                  on(line(uv, 2.*a))+
                  on(line(uv, 3.*a))+
                  on(line(uv, 4.*a))+
                  on(line(uv, 5.*a));
    
    return vec3(lines);
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = fragCoord/iResolution.y;
    
    uv *= 5.;
    vec2 id = floor(uv);
    uv = fract(uv);

    fragColor = vec4(tile(uv, id),1.0);
}
