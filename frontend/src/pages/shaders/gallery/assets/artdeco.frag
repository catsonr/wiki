const float pi = 3.1415965;

const float w = 0.4;              // apothem length // change this back to 0.5 for "correct" tiling, though things are broken bc lattice sdf is incorrect (discontinuous)
const float a = w*2.*sqrt(3.)/3.; // side length
const mat2 H = mat2(              // hexagonal -> std
    2.*w, w,
    0,    w*sqrt(3.)
);
const mat2 Hi = inverse(H);       // std -> hexagonal

// returns the distance from uv to a line through the origin rotated ccw by 'a'
float line(vec2 uv, float a) { return abs( dot(uv, vec2(sin(a), -cos(a))) ); }

// returns 1.0 if on, and 0.0 if off
float on(float d) { return smoothstep(10./iResolution.y, 0., d); }

// returns the distance to nearest lattice point
float lattice(vec2 uv)
{
    vec2 id = Hi*floor(H*uv); // the matrix transforms are backwards for some reason ...
    
    return min(
        min(length(uv-id),
            length(uv-vec2(1,0)-id)
        ),
        min(length(uv-vec2(0,1)-id),
            length(uv-vec2(1,1)-id)
        )
    );
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = (fragCoord - .5*iResolution.xy)/iResolution.y;
    uv *= 15.;
    uv += vec2(1,1)*iTime*0.5;

    fragColor = vec4(lattice(uv));
    fragColor = vec4( on(fragColor.x - a) );
}
