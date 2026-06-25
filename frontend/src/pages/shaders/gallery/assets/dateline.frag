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

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = (fragCoord - .5*iResolution.xy)/iResolution.y;
    uv *= 100.;
    
    float w = 4.;
    float h = 8.;
    vec2 pij = floor(Ti*uv); // parallelogram (i, j) index
    vec2 puv = Ti*uv - pij;  // parallelogram (u, v) position
    puv.x *= w;
    puv.y *= h;
    
    vec3 UP   = vec3(0.408,0.337,0.941);
    vec3 DOWN = vec3(0.906,0.839,0.651);

    fragColor = vec4(0);
    
    int x = int( floor(uv).x );
    int y = int( floor(uv).y );
    vec2 p = vec2(float(x), float(y));
    vec4 l9 = vec4(0, 4, 0, 0);
    bool IS_UP = (
        a(p, l9)
    );
    
    fragColor = vec4(IS_UP ? UP : DOWN, 1);
    
    

    // debug
    float e = 0.05;
    uv = fract(uv);
    
    if(uv.x <= e || uv.y <= e) fragColor.rgb = vec3(1, 0, 0);   // std basis
    if(puv.x <= e || puv.y <= e) fragColor.rgb = vec3(0, 0, 1); // T basis
}
