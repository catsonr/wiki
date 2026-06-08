import page from '@/page.ts'

const body: string = `<main></main>`

export default () => page({
  title: 'breathe',
  body: body,
  styles: ['./style.css'],
  scripts: [
    'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.11.1/p5.js',
    './breathe.js',
  ],
})
