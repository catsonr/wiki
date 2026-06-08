import page from '@/page.ts'

const body: string = `<h1>shaders</h1>

<p>
i write a lot of shaders, particularly <a href="https://shadertoy.com"><i>shader toy</i></a> shaders. small, single fragment shader
shaders that draw something cool. using math obviously.<br><br>

my more "serious" shaders are available <a href="https://shadertoy.com/user/catson">here</a>. that's where i started
in fact! but as i'm typing in their in-browser text editor, typing "code", and immediately recieving
visual proof of the expression that i *just* typed, sometimes i'll ctrl+C, ctrl+V into a folder on my
desktop. that's what this is. or, that's what the gallery is!<br><br>
</p>

<a href="gallery/"><h2>gallery</h2></a>
`

export default () => page({ title: 'shaders', body: body })