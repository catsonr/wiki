import page from '@/page.ts'

// the background canvas reads its shader off data-frag; hello-bg.js draws it behind
// the page. the <main> is intentionally empty -- carson's prose goes there.
const body: string = `<canvas id="hello-bg" data-frag="/hello/dna-hello.frag"></canvas>

<main>
    <h1>hello, im carson</h1>

    <p class="note">(this page is best viewed on desktop)</p>

    <h2>about</h2>

    <p>i'm a 23 y/o graphics programmer from Texas, currently studying at Texas A&amp;M RELLIS.</p>

    <p>i'm working on <a href="https://beatboxx.org/">BEATBOXX</a>, my free and open-source rhythm game.
    i use <a href="https://github.com/acoustid/chromaprint">chromaprint</a> to identify user
    supplied audio files to circumvent the common legal grey area of most community-driven
    rhythm games. written in c++ using custom GDExtension plugins for the godot engine.</p>

    <p>i'm also currently working as a software engineering intern at <a href="https://allsober.com/">All Sober</a>,
    an exciting healthcare startup. i'm building a patient-facing mobile app that helps
    keep patients on track with their recovery. it interfaces with our in-house
    Electronic Medical Record system.</p>

    <p>i have also fallen in love with shaders. here is a link to my <a href="https://www.shadertoy.com/user/catson">shadertoy profile</a>,
    which i like to treat like an art gallery. i love shadertoy, as it lets me collaborate
    with some very very smart graphics people!</p>

    <p>i enjoy work where i get to touch all layers of the stack: from dependable, low-level
    systems, to beautiful and interactive user-facing software.</p>

    <h2>contact</h2>

    <p>if i sound like someone you want working on your project, the best way to contact
    me is through email: <code>ritcheycarson@gmail.com</code></p>

    <h2>resume</h2>

    <p>and for those interested, here is my <a href="/hello/resume.pdf">resume</a></p>
</main>
`

export default () => page({
    title: 'hello',
    body,
    styles: ['/hello/hello.css'],
    scripts: ['/scripts/hello-bg.js'],
})
