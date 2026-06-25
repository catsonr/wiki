const mat2 T  = mat2(
    4, 1,
    2, 7
);
const mat2 Ti = inverse(T);

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = (fragCoord - .5*iResolution.xy)/iResolution.y;
    uv *= 12.;
    
    vec2 id = floor(Ti*uv);
    vec2 pv = Ti*uv - id;

    fragColor = vec4(pv.x);

    float e = 0.01;
    if(pv.x <= e || pv.y <= e) fragColor.rgb = vec3(0); // parallelogram edges debug
}
