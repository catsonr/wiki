// returns the distance from uv to a line through the origin rotated ccw by 'a'
float line(vec2 uv, float a) { return abs( dot(uv, vec2(sin(a), -cos(a))) ); }

// returns true if given distance counts as being on the line
// there's definitely a better way of doing this
float on(float d) { float e = 0.015; return 1. - smoothstep(-e*.5, e*.5, d); }



// pattern based off this symmetry:
// https://en.wikipedia.org/wiki/Cairo_pentagonal_tiling#/media/File:Wallpaper_group-p4g-with_Cairo_pentagonal_tiling.png
vec3 tile(vec2 id, vec2 uv)
{
    uv -= 0.5;
    if(int(id.x+id.y) % 2 == 0) uv *= mat2(0, -1, 1, 0);
    uv = abs(uv);

    float s = 0.25 + 0.125*sin(iTime+id.x); // [0, 0.5]
    float a = atan(.5, .5-s);
    
    float l1 = line(uv, 0.);
    float l2 = line(uv-vec2(s, 0), a );

    //float on = float( (on(l1) && uv.x <= s) || on(l2) );
    float on = on(l1);
    
    return vec3(on);
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = fragCoord / iResolution.xy; // [0, 1]^2
    uv.x *= iResolution.x / iResolution.y; // fix aspect ratio

    uv *= 5.;
    vec2 id = floor(uv);
    uv = fract(uv);

    fragColor = vec4(tile(id, uv), 1);
}
