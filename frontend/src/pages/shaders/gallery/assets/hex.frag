#define pi 3.14159625

// returns the distance from uv to a line through the origin rotated ccw by 'a'
/*
rotation =
cos -sin
sin cos

v = cos sin

rotation @ 270 =
0 1
-1 0
* [cos, sin]
= [sin, -cos]
*/
float line(vec2 uv, float a)
{
    return abs( dot(uv, vec2(sin(a), -cos(a))) );
}

bool on(float d) { return (d - 0.015 <= 0.); }

vec3 tile(vec2 id, vec2 uv)
{
    uv -= 0.5;
    uv = abs(uv);
    
    uv *= mat2(0, 1, 1, 0);

    float s = 0.25; // [0, 0.5]
    vec2 tripoint = vec2(s, 0);
    float a = atan(.5, .5-s);
    
    float l1 = line(uv, 0.);
    float l2 = line(uv-tripoint, a );

    float on = float(
        (on(l1) && uv.x <= s) || on(l2)
    );
    
    return vec3(on);
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = fragCoord / iResolution.xy; // [0, 1]^2
    uv.x *= iResolution.x / iResolution.y; // fix aspect ratio

    uv *= 6.;
    vec2 id = floor(uv);
    uv = fract(uv);

    fragColor = vec4(tile(id, uv), 1);
}
