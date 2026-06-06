import page from '../../page.ts'

const title: string = `i wanted a website so i wrote a compiler`

const body: string = `<h1>blog</h1>
<div>
<h2>${title}</h2>
<br><br>
i have been slowly improving catson.wiki (formerly catson.neocities.org) for 2 years now, as of writing this.
for me, that is a long time! html, javascript, and css all are very forgiving, so as the wiki grew,
technical debt accumulated. 
<br><br>
</div>`

export default () => page({ title: title, body: body })