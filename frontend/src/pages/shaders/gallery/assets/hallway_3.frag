void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = (fragCoord -.5*iResolution.xy);

    uv += iTime/100.;

    uv.x *= uv.x;
    vec2 id = floor(uv/128.);

    fragColor = vec4( int(id.x+id.y) % 10 == 0 ? 1. : 0. );
}
