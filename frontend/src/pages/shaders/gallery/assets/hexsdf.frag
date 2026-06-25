const float pi = 3.1415965;

const float w = 0.5;              // apothem length
const float a = w*2.*sqrt(3.)/3.; // side length
const mat2 H = mat2(              // hexagonal -> std
    2.*w, w,
    0,    w*sqrt(3.)
);
const mat2 Hi = inverse(H);       // std -> hexagonal

// returns 1.0 if on, and 0.0 if off
float on(float d) { return smoothstep(10./iResolution.y, 0., d); }

// returns the distance to nearest lattice point
float lattice(vec2 uv)
{
    vec2 id = Hi*floor(H*uv);
    
    vec2 d = uv-id;
    
    return min(
        min(
            length(d),
            length(d-Hi*vec2(0,1))
        ),
        min(
            length(d-Hi*vec2(1,0)),
            length(d-Hi*vec2(1,1))
        )
    );
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = (fragCoord - .5*iResolution.xy)/iResolution.y;
    uv *= 5.;
    uv += vec2(1,1)*iTime*.25;

    fragColor = vec4(lattice(uv));
    //fragColor = vec4( on(fragColor.x - a*iMouse.x/iResolution.x) ); // uncomment for lattice points
}
