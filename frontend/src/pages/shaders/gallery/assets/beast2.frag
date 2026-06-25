// vec2 variables with the suffix _C are complex numbers; not vectors

// returns f(z)=z^2+c
vec2 f(vec2 z_C, vec2 c_C)
{
    float a = z_C.x;
    float b = z_C.y;
    
    return vec2(
        sin(a*a) - cos(b*b) + c_C.x,
        2.*a*b + c_C.y
    );
}

vec3 julia(vec2 uv, vec2 c_C)
{
    const int iterations = 100;
    const float max_value = 100.;
    
    // start z_C 
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
    vec2 uv = (fragCoord - 0.5*iResolution.xy)/iResolution.y;
    uv *= 3.;

    //vec2 c_C = (iMouse.xy/iResolution.y - 0.5) / 3.;
    vec2 c_C = vec2(sin(iTime), cos(iTime))/3.;

    fragColor = vec4(julia(uv, c_C), 1);
}
