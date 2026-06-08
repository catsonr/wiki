import page from '@/page.ts'

// NOTE: String.raw so the inline LaTeX delimiters (\( ... \)) survive — a normal
// template literal would eat the backslashes and katex would never render.
const body: string = String.raw`
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.css" integrity="sha384-zB1R0rpPzHqg7Kpt0Aljp8JPLqbXI3bhnPWROx27a9N0Ll6ZP/+DiW/UqRcLbRjq" crossorigin="anonymous">
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.js" integrity="sha384-y23I5Q6l+B6vatafAwxRu/0oK/79VlbSz7Q9aiSZUvyWYIYsd+qj+o24G5ZU2zJz" crossorigin="anonymous"></script>
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/contrib/auto-render.min.js" integrity="sha384-kWPLUVMOks5AQFrykwIup5lo0m3iMkkHrD0uJ4H5cjeGihAutqP0yW0J6dpFiVkI" crossorigin="anonymous" onload="renderMathInElement(document.body);"></script>

<main>
    Strange Attractors and You


    this site will explain what a strange attractor is and how to discover one yourself
    <p><b>steps:</b>
      <i>given the following parametric equations:</i>
      \(x_{n+1} = a_0 + a_1x + a_2x^2 + a_3y + a_4y^2 + a_5xy\)
      \(y_{n+1} = a_6 + a_7x + a_8x^2 + a_9y + a_{10}y^2 + a_{11}xy\)

      <b>1. assign random values (from -1 to 1) to all values of \(a_i\)</b>
      it will look something like this:

      \(x_{n+1} = -0.3 - 0.5x - 0.9x^2 + 0.9y + 0.8y^2 - 0.6xy\)
      \(y_{n+1} = -0.1 + 0.9x - 0.6x^2 - 0.3y - 0.7y^2 + 0.9xy\)

      we now have our attractor! ...but what do we actually do with it?

      <b>2. pick an initial point, lets call it \(P\) </b>
      for simplicity we can start at \((0, 0)\), giving us \(P = (0, 0)\)

      using our \(x_{n+1}\) and \(y_{n+1}\) equations we can plug \(P\) into them as many times as we wish, generating a
      new point \(P_{n+1}\) using the equation

      \(P_{n+1} = (x_{n+1}(P_x, P_y),  y_{n+1}(P_x, P_y))\)

      <b>3. calculate \(P_{n+1}\) and plot!</b>

      <canvas id="canvas_ex1"></canvas>
      <input type="range" id="ex1_slider" min="1" max="10" value="1" step="1">
      <span id="ex1_slidervalue">1</span>

      use the slider to generate points 2 through 10
      this is what we get after repeating <b>step 3</b> nine times!
    </p>

    <p>
      the result of our work is a little cool--at least to me--but it's really nothing "strange".
      why then are they called "strange attractors" and what is an "attractor" anyways?

      put simply, an attractor is a system that attracts points to certain positions in 2D space.
      in the example above, our point \(P\) is being attracted to the point (-infinity, -infinity), which is called <i>diverging.</i>
      since we randomly generated our example, there's an infinite number of other attractors! some of which <i>converge</i> to a single point or certain paths.

      okay... but what makes them strange? well, 99% of the time an attractor will simply diverge to infinity, but the rest you will find act pretty strangely. that's really the only reason they're named that!

      <canvas id="canvas_ex2"></canvas>
      <button id="ex2_button">generate new attractor</button>

      idk abt you, but i really find these beautiful. at least some of them. you can use the "generate new attractor" button if you're displeased
      <a target="_blank" href="./3d/index.html">add dimension</a>
    </p>
</main>
`

export default () => page({
  title: 'Strange Attractors and You',
  body: body,
  styles: ['./style.css'],
  scripts: [
    './attractor.js',
    './gl-matrix-min.js',
    './shader.js',
    './script.js',
  ],
})
