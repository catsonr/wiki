import page from '@/page.ts'

const body: string = `<main>
    7.11.24 ~ site created :) <br>
    7.12.24 ~ 88x31 & history pages created <br>

    <br>
    7.13.24 - 10.23.25 ~ stuff added <br>
    <br>
    
    10.24.25 ~ file paths are now absolute <br>
    <br>
    
    5.28.26 ~ hit counter added <br>
    
    6.5.26 ~ compiled catson.wiki <br>
    
    6.6.26 ~ hits counted for each page <br>

    <br><br>

    <a href='/index.html'>
        <img src='/img/88x31/buttons/back.gif'>
    </a>

</main>
`

export default () => page({ title: 'history', body: body })