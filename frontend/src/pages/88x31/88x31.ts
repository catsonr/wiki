import page from '@/page.ts'

const body: string = `
<h1>88x31 button gallery</h1>
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
`

export default () => page({ title: '88x31 buttons', body, })
