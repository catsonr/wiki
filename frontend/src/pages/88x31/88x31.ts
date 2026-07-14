import page from '@/page.ts'

// two decorative marquee bars (top scrolls right, bottom scrolls left) are
// populated at runtime by /scripts/button-marquee.js from two random pre-built
// gallery pages. empty here so the page is unchanged if that script never runs.
const body: string = `
<div class="marquee" id="marquee-top" aria-hidden="true"><div class="marquee-track"></div></div>

<h1>the catson.wiki 88x31 button archive</h1>
a while ago i built a web scraper in haskell that grabs all the 88x31 buttons
across both neocities and nekoweb. it has been running since early june of 2026
and passed 100,000 byte-unique buttons about a month later in early july
<br><br>

the buttons are ranked by the number of unique sites that contain them. there are
1,000 pages, each with 100 buttons. as far as i'm aware, this is the largest
archive of 88x31 buttons out there (by a lot)! i have more fun stuff planned with
the data i collected, but i hope this is enough of a teaser
<br><br>

hover over a button to get its rank and other information, and click to go to a
random site that contains it
<br><br>

<a href="/88x31/pages/0001.html"><h2>enjoy!</h2></a>

<div class="marquee" id="marquee-bottom" aria-hidden="true"><div class="marquee-track"></div></div>
`

export default () => page({
    title: '88x31 buttons',
    body,
    styles: ['/88x31/landing.css'],
    scripts: ['/scripts/button-marquee.js'],
})
