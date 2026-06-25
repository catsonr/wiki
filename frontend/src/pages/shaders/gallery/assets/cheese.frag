void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    mat2 P = mat2(2, 4, 1, 7);

    vec2 uv = fragCoord/iResolution.y;
    float minosTall = 60.;
    uv *= minosTall;
    
    vec2 mino = floor(uv); // which absolute mino we're in
    vec2 pid = floor(inverse(P) * mino); // parallelogram id
    vec2 pmino = mino - P*pid; // which relative mino we're in
    
    fragColor = vec4(pmino, 0, 1);
}
