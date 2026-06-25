void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = fragCoord/iResolution.xy; // [0, 1]^2
    uv.y = (uv.y - 0.5) * 4.0; // y is [-2, 2]
    uv.x *= uv.x*1000.0; // x is [0, 1000]

    // graph sin(x+t)
    fragColor = vec4(abs(sin(uv.x+iTime) - uv.y) <= 0.015 ? vec3(0) : vec3(1), 1);
}

