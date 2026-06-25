// goes from world space -> screen space, where:
// camera is centered on (0, 0, 0), and
// +x is right, +y is up, +z is out of screen
// note, of course, discontinuity at any p where z = -4
// https://youtu.be/qjWkNZ0SXfo?si=5SUtVXRjpheI7D63
vec2 project(vec3 p) { return vec2(p.x, p.y) / (p.z + 4.); }

// returns the distance from p (now in screen space) to the line through a-b
// https://en.wikipedia.org/wiki/Distance_from_a_point_to_a_line#Line_defined_by_two_points
float l(vec2 p, vec2 a, vec2 b) { return abs((b.y-a.y)*p.x - (b.x-a.x)*p.y + b.x*a.y - b.y*a.x) / length(b-a); }

// returns the distance from p (now in screen space) to the line segment a-b
// https://www.shadertoy.com/view/Wlfyzl
float ls(in vec2 p, in vec2 a, in vec2 b)
{
	vec2 ba = b - a;
	vec2 pa = p - a;
	float h = clamp(dot(pa, ba) / dot(ba, ba), 0., 1.);
	return length(pa - h * ba);
}

// returns 1.0 if given distance is "on"
float on(float d) { return smoothstep(2./iResolution.y, 0., d); }

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = (fragCoord - .5*iResolution.xy)/iResolution.y;

    float t = iTime/3.;
    float tx = -0.5;
    float ty = t;
    mat3 R = mat3(
        1, 0, 0,
        0, cos(tx), -sin(tx),
        0, sin(tx), cos(tx)
    ) * mat3(
         cos(ty), 0, sin(ty),
         0,       1, 0,
        -sin(ty), 0, cos(ty)
    );

    vec2 origin = project(R*vec3(0, 0, 0));
    vec2 i      = project(R*vec3(1, 0, 0));
    vec2 j      = project(R*vec3(0, 1, 0));
    vec2 k      = project(R*vec3(0, 0, 1));
    
    vec2 p      = project(R*vec3(cos(t*2.), sin(t*3.), sin(t*4.)));

    fragColor.r += on(ls( uv, origin, i ));
    fragColor.g += on(ls( uv, origin, j ));
    fragColor.b += on(ls( uv, origin, k ));
    fragColor   += on(ls( uv, origin, p ));
}
