void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = (fragCoord -.5*iResolution.xy)/iResolution.y;

    uv *= iResolution.y;
    uv.x *= uv.x;
    vec2 id = floor(uv/40.);

    fragColor = vec4( int(id.x+id.y) % 70 == 0 ? 1. : 0. );
}
