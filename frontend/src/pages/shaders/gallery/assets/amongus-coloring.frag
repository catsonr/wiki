const int color_count = 9;
const vec3 colors[color_count] = vec3[color_count](
    vec3(0),         // black
    vec3(1),         // white
    vec3(1, 1, 0),   // yellow
    vec3(0, 1, 1),   // cyan
    vec3(.5, 0, 1),  // purple
    vec3(.5),        // gray
    vec3(1, .5, 0),  // orange
    vec3(1, 0, 0),   // red
    vec3(0, 1, 0.1)  // green
);
// returns the color of an amongi with id (x, y)
// NOTE: degenerate for negative indices
vec3 color(int x, int y) { return colors[(x+y*3) % color_count]; }

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = fragCoord/iResolution.xy;
    uv += iTime/200.;

    float scale = 20.;
    int x = int(iResolution.x * uv.x / scale),
        y = int(iResolution.y * uv.y / scale);

    fragColor = vec4(color(x, y), 1);
}
