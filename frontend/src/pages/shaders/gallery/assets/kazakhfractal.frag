// vec2 with suffix _c is a complex number

vec2 f(vec2 z_c, vec2 c_c)
{
    float a = z_c.x, b = z_c.y;
    return vec2(
        a*a - b*b + c_c.x,
        2.*a*b + c_c.y
    );
}

float julia(vec2 z_c, vec2 c_c)
{
    vec2 poop_c = z_c;

    float iterations = 300.;    
    for(float i = 0.; i < iterations; i++)
    {
        poop_c = f(poop_c, c_c);
        
        if(dot(poop_c, poop_c) >= 20.) return (i/iterations); // diverged!
    }
    
    return 1.;
}

vec4 pallete(float x) { return mix(vec4(0, 1, 1, 1), vec4(1, 1, 0, 1), x); }

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = (fragCoord - .5*iResolution.xy)/iResolution.y * 2.;

    vec2 c_c = vec2(-0.5125, 0.5213);
    //c_c = uv; // madenelbrot for free

    fragColor = vec4(pallete(julia(uv, c_c)));
}
