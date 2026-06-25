float line(vec2 uv, float a) { return abs( dot(uv, vec2(sin(a), -cos(a))) ); }
float on(float d) { return smoothstep(10./iResolution.x, 0., d); }
mat2 rotate(float a) { return mat2(cos(a), -sin(a), sin(a), cos(a)); }

#define pi 3.14159625

vec3 tile(vec2 uv, vec2 id)
{
    uv -= 0.5;
    
    float faces = 2.+4.*(sin(id.x+iTime+id.y));
    
    float lines = 0.;
    for(float i = 0.; i < faces; i++)
        lines += on(line(uv, pi/faces*i));

    return vec3(lines);
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = fragCoord/iResolution.y;
    
    uv *= 6.;
    vec2 id = ceil(uv);
    uv = fract(uv);

    fragColor = vec4(tile(uv, id),1.0);
}
