vfloat line(vec2 uv, float a) { return abs(dot(uv, vec2(sin(a), -cos(a)))); }
float on(float d) { return smoothstep(5./iResolution.y, 0., d); }

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = (fragCoord - .5*iResolution.xy)/iResolution.y;
    
    float a = 100000.;
    fragColor = vec4(on(line(uv, (a*uv.x/uv.y)+iTime)));
}
