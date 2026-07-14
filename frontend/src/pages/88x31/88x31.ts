import page from '@/page.ts'

const body: string = `
<h1>88x31 button gallery</h1>
a while ago i built a web scraper in haskell that grabs all the 88x31 buttons
across both neocities and nekoweb. it has been running since mid june of 2026
and reached 100k unique button sightings in july. i intend on making a browsable
archive of <i>all</i> 100,000+ buttons, but for now i hope the little sample i
prepared can satiate your hunger until the full gallery is ready
<br><br>

the following link will take you to a paginated view of the first 10,000 buttons
sorted by number of occurances. there are 100 pages, each with 100 buttons
<br><br>

<a>enjoy!</a>
`

export default () => page({ title: '88x31 buttons', body, })
