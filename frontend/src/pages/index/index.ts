import page from '@/page.ts'

const body: string = `<main>
    welcome to my little site :$<br><br>
    
    <!-- browser info -->
    <!-- (filled by script.js) -->

    <div id="browserinfo"></div><br>

    <!-- 88x31 buttons -->

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

    <!-- the cats at the bottom of your screen -->

    <div class="bottomcats">
      <img src="/img/cat life.gif">
      <img src="/img/cat life.gif">
      <img src="/img/cat life.gif">
      <img src="/img/cat life.gif">
    </div>

    <!-- user information from ipapi -->

    <script src="/lib/platform.js"></script>
    <script src="/index/script.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <div id="userinfo"></div><br>
    
    <!-- hits display -->
    <!-- sends GET to http://api.catson.wiki/hit, which returns the current hit count -->
    <!-- POST http://api.catson.wiki/hit increments the counter, and is injected at compile time via script hit.ts -->
    <!-- note that this endpoint does zero validation. so if you wanna spam it for some reason, be my guest i guess! -->
    <div>
      hits: <span id="hits">...</span>
      <img src='/img/88x31/bw/dotdotdot.gif'>
    </div><br>
    <script>
      fetch("https://api.catson.wiki/hit?path=/")
        .then(r => r.json())
        .then(d => { document.getElementById("hits").textContent = d.count })
    </script>

    <!-- the pseudo-ranom characters -->
    <!-- (using poor naming scheme) -->
    <div id='amongus'></div>
    <script src="/index/imgtoascii.js"></script>
    
    <!-- note that here, at end of div.innerText, script.js appends information about the user's ip -->
    <!-- from https://ipapi.co/json, and they do not always respond -->

</main>

<!-- lorenz attractor background animation (using p5!) -->
<div id="lorenzContainer"></div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.3.1/p5.js"></script>
<script src="/index/lorenz-optimized.js"></script>

<!-- a cube i made just for you -->
<a id="cubecanvas-link" href='/s3/index.html'>
  <canvas id="cubecanvas"></canvas>
</a>
<script src="/lib/gl-matrix-min.js"></script>
<script src="/index/cube.js"></script>

<!-- i realize now that people will read my source code, so, here's all of it! -->
<!-- https://github.com/catsonr/wiki/ -->
<!-- im typing typescript btw -->
`

// attention.js nags first-time visitors; shader-ad.js is the returning-visitor
// treat once they've graduated. the two self-gate on attention:seen (mutually exclusive).
export default () => page({ title: 'catson wiki', body: body, scripts: ['/scripts/attention.js', '/scripts/shader-ad.js'], styles: ['/index/style.css'] })
