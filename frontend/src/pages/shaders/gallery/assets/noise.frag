float tile(vec2 uv)
{
    float bs = 0.; // block size
    mat2 T = mat2( // translation vectors
        bs*2., bs*1.,
        bs*0., bs*3.
    ); 
    vec2 id = floor(inverse(T)*uv);
    
    return (id.x+id.y) / bs;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = fragCoord/iResolution.xy;
    
    fragColor = vec4(tile(uv));
}
