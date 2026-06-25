#define PI 3.14159625
#define t iTime

vec3 tiling(vec2 uv)
{
    uv -= 0.5;
    uv *= 2.0;

    float d = dot(uv, uv.x*uv.y >= 0.0 ? vec2(1, 0) : vec2(1, 1));

    return d >= 0. ? vec3(.9,.6,1) : vec3(0);
}

vec3 c(vec2 id, vec2 uv)
{
    float a = 0.1*float(int(id.x*t*0.1) % int(id.y/t)) + 0.1*(id.x+id.y);
    mat2 r = mat2(cos(a), -sin(a), sin(a), cos(a));
    
    return tiling(r * uv);
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = fragCoord/iResolution.xy;
    uv.x *= iResolution.x / iResolution.y;
    
    float s = 32.*2.;
    uv *= s;
    
    vec2 id = floor(uv);
    uv = fract(uv);

    fragColor = vec4(c(id, uv), 1.0);
}
