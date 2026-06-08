import page from '../../page.ts'

const body: string = `<main>
    welcome to my little site :$<br><br>

    <div id="browserinfo"></div><br>

    <a href='/breathe/index.html'>
        <img src='/img/88x31/bw/jamiroquai.gif'>
    </a>
    <a href="/breathe/breathe2/index.html">
      <img src='img/88x31/bw/nekojiru.gif'>
    </a>
    <img src='/img/88x31/bw/ngmi.gif'>
    <a href='attractors_and_you/index.html'>
      <img src='/img/88x31/bw/looking.gif'>
    </a>
    <img src='/img/88x31/bw/saratov.gif'>
    <img src='/img/88x31/bw/web11.gif'>
    <img src='/img/88x31/bw/tucows.gif'>
    <a href='/history/index.html'>
        <img src='/img/88x31/bw/info.gif'>
    </a>
    <img src='/img/88x31/bw/4ever.gif'>
    <img src='/img/88x31/bw/pictochat.gif'>
    <img src='/img/88x31/bw/dance.gif'>
    <a href='https://en.wikipedia.org/wiki/2001#September_11_attacks_and_invasion_of_Afghanistan' target="_blank">
        <img src='/img/88x31/bw/2001.gif'>
    </a>
    <img src='/img/88x31/bw/kawaii.gif'>
    <img src='/img/88x31/bw/blacklamb.gif'>
    <img src='/img/88x31/bw/devils.gif'>
    <img src='/img/88x31/bw/css.gif'>
    <img src='/img/88x31/bw/disc.gif'>
    <a href='' target='_blank'>
        <img src='/img/88x31/bw/enterwebs.gif'>
    </a>
    <img src='/img/88x31/bw/heyty.gif'>
    <img src="/img/88x31/bw/bad-apple.gif">
    <a href='/88x31/index.html'>
        <img src='/img/88x31/bw/blank.gif'>
    </a>

    <div class="bottomcats">
      <img src="/img/cat life.gif">
      <img src="/img/cat life.gif">
      <img src="/img/cat life.gif">
      <img src="/img/cat life.gif">
    </div>

    <script src="/lib/platform.js"></script>
    <script src="/index/script.js"></script>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <div id="userinfo"></div><br>
    
    <div>
      hits: <span id="hits">...</span>
      <img src='/img/88x31/bw/dotdotdot.gif'>
    </div><br>
    <script>
      fetch("https://api.catson.wiki/hit?path=/")
        .then(r => r.json())
        .then(d => { document.getElementById("hits").textContent = d.count })
    </script>

    <div id='amongus'></div>
    <script src="/index/imgtoascii.js"></script>

</main>

<div id="lorenzContainer"></div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.3.1/p5.js"></script>
<script src="/index/lorenz.js"></script>

<a id="cubecanvas-link" href='/s3/index.html'>
  <canvas id="cubecanvas"></canvas>
</a>
<script src="/lib/gl-matrix-min.js"></script>
<script src="/index/cube.js"></script>
`

export default () => page({ title: 'catson wiki', body: body, styles: ['/index/style.css'] })
