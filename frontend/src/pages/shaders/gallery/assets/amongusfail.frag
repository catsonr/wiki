const mat2 T  = mat2(
    4, 1,
    2, 7
), Ti = inverse(T);

// x_min, x_max, y_min, y_max
vec4 l1 = vec4(0, 1, 4, 4);
vec4 l2 = vec4(1, 2, 3, 3);
vec4 l3 = vec4(2, 3, 4, 4);
vec4 l4 = vec4(3, 4, 3, 3);

vec4 l5 = vec4(0, 1, 6, 6);
vec4 l6 = vec4(1, 4, 7, 7);
vec4 l7 = vec4(4, 5, 6, 6);
vec4 l8 = vec4(4, 5, 8, 8);

// returns whether a point p is above an axis aligned line segment l
bool a(vec2 p, vec4 l) { return (l.r <= p.x && p.x <= l.g) && (p.y > l.b); }

vec3 UP = vec3(0.408,0.337,0.941); vec3 DOWN = vec3(0.906,0.839,0.651);

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = (fragCoord - 0.*iResolution.xy)/iResolution.xy;
    uv *= 60.;
    
    float w = 4.;
    float h = 8.;
    vec2 pij = floor(Ti*uv); // parallelogram (i, j) index
    vec2 puv = Ti*uv - pij;  // parallelogram (u, v) position
    puv.x *= w;
    puv.y *= h;
    


    fragColor = vec4(0);

    vec2 ij = vec2(mod(uv.x, w), mod(uv.y, h));
    
    bool is_up = (
        int(ij.x) == 0 && ( a(ij, l1) && !a(ij, l5) ) ||
        int(ij.x) == 1 && ( a(ij, l2) && !a(ij, l6) ) ||
        int(ij.x) == 2 && ( a(ij, l3) && !a(ij, l6) ) ||
        int(ij.x) == 3 && ( a(ij, l4) && !a(ij, l6) ) ||
        int(ij.x) == 4 && ( a(ij, l7) && !a(ij, l8) )
    );
    
    
    fragColor.r = float(is_up);
    

    // debug
    float e = 0.01;
    uv = fract(uv);
    
    if(uv.x <= e || uv.y <= e) fragColor.rgb = vec3(1, 0, 0);   // std basis
    if(puv.x <= e || puv.y <= e) fragColor.rgb = vec3(0, 0, 1); // T basis
}
