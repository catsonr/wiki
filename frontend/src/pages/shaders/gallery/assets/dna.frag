float f(float x)
{
    float a = 1.;
    float b = 30.;

    return sin((x*a)+iTime)+cos((x*b)+iTime);
}

// graphs the 1d function f -- below the curve is black, above is white
vec3 graph(vec2 uv)
{
    float s = 3.14159625 * 1.5;
    mat2 A = mat2(
        0, s,
        s, 0
    );
    
    uv *= A;
    
    return vec3(1.-step(0., f(uv.x)-uv.y));
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = fragCoord/iResolution.xy; // [0, 1]^2
    uv -= 0.5; // [-0.5, 0.5]^2
    uv *= 2.0; // [-1, 1]^2
    

    fragColor = vec4(graph(uv),1.0);
}
