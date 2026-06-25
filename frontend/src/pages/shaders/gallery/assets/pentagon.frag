// following spec as defined by:
// https://en.wikipedia.org/wiki/Flag_of_Turkey#Dimensions

vec3 white = vec3(1),
     red   = vec3(200, 16, 46)/255.;

const float pi = 3.1415965; 
const float e  = 0.001;

// returns the distance from uv to a line through the origin rotated ccw by 'a', where positive values denote "above"
float line(vec2 uv, float a) { return dot(uv, vec2(sin(a), -cos(a))); }

// returns the distance from uv to a unit star (vertices on unit circle)
float star(vec2 uv)
{
    float a = -2.*pi/5.;
    float b = a/4.;
    
    mat2 R = mat2(
        cos(a), -sin(a),
        sin(a),  cos(a)
    );

    vec2 c = vec2(1,0);
    return max(
        line(c-uv, b),
        max(
            max(
                line(R*c-uv, b-a),
                line(R*R*c-uv, b-a-a)
            ),
            max(
                line(R*R*R*c-uv, b-a-a-a),
                line(R*R*R*R*c-uv, b-a-a-a-a)
            )
        )
    );
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = (fragCoord - .5*iResolution.xy)/iResolution.y;
    uv *= 2.5;
    
    vec3 c = mix(red, white, smoothstep( .2-e,  .2+e, length(uv+vec2(.1875, 0)))); // inner circle
         c = mix(c,   red,   smoothstep(.25-e, .25+e, length(uv+vec2(.25,   0)))); // outer circle

    c = vec3(star(uv));

    fragColor = vec4(c, 1);
    
    if(abs(length(uv) - 1.0) <= e) fragColor.rgb = vec3(1);
    
    //if(abs(uv.x) <= .01 || abs(uv.y) <= 0.01) fragColor.gb = vec2(1);
}
