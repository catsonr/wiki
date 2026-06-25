void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = fragCoord/iResolution.xy; // [0, 1]^2
    uv.x -= 0.5;                        // x is [-0.5, 0.5]
    uv.x *= uv.x*100000000.0;           // x is [-big, big]
    uv.y = (uv.y - 0.5) * 4.0;          // y is [-2, 2]

    // graph sin(x+t)
    fragColor = vec4(1. - abs(sin(uv.x+iTime) - uv.y) <= .65 ? vec3(0) : vec3(1), 1);
}
