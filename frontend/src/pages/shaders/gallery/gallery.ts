import page from '@/page.ts'

// the shader gallery. the heavy lifting is the client engine (src/gallery/*),
// bundled by the build into /scripts/gallery.js. this page is just the mount point:
// a single #gallery element the engine fills with one canvas + the overlay tiles.
const body: string = `<main class="shaders-main">
    <h1>gallery</h1>
    <p class="shaders-blurb">
      my fragment shader gallery. please explore with your mouse
    </p>

    <div id="gallery"></div>
</main>`

export default () => page({
  title: 'catson.wiki shader gallery',
  body,
  styles: ['style.css'],
  scripts: ['/scripts/gallery.js'],
})
