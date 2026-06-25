// vec2 variables with the suffix _C are complex numbers; not vectors

vec2 f(vec2 z_C, vec2 c_C)
{
    float a = z_C.x;
    float b = z_C.y;

    return vec2(
        atan(a*a) - sin(b*b) + c_C.x,
        2.*a*b + c_C.y
    );
}

vec3 julia(vec2 uv, vec2 c_C)
{
    const int iterations = 100;
    const float max_value = 30.;

    vec2 z_C = uv;
    for(int i = 0; i < iterations; i++)
    {
        z_C = f(z_C, c_C);

        if(z_C.x > max_value || z_C.y > max_value) return vec3(float(i)/float(iterations)); // diverged!
    }

    return vec3(1);
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 mouse = iMouse.xy/iResolution.xy;

    vec2 uv = (fragCoord - 0.5*iResolution.xy)/iResolution.y / mix(1., 50., mouse.y);

    float t = iTime/360.;
    vec2 c_C = vec2(sin(t), cos(t))/20. + vec2(0.41, 0);

    fragColor = vec4(julia(uv, c_C), 1);
}
