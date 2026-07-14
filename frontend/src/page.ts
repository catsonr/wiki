export type Page = {
    title: string
    body: string

    // optional head metadata; pages that omit these render exactly as before
    description?: string
    canonical?: string
    prev?: string
    next?: string

    styles?: string[]
    scripts?: string[]
}

const GLOBAL_SCRIPTS: string[] = ['/scripts/hit.js']
const GLOBAL_STYLES: string[] = ['/global.css']

const scripts_to_string = (scripts: string[]) => scripts.map(src => `<script src="${src}"></script>`).join('\n')
const styles_to_string  = (styles: string[])  => styles.map(href => `<link rel="stylesheet" href="${href}">`).join('\n')

// the optional head metadata, each on its own indented line; empty string when
// a page uses none, so existing pages keep their exact output
const meta_to_string = (page: Page) => [
    page.description ? `<meta name="description" content="${page.description}">` : '',
    page.canonical   ? `<link rel="canonical" href="${page.canonical}">`         : '',
    page.prev        ? `<link rel="prev" href="${page.prev}">`                   : '',
    page.next        ? `<link rel="next" href="${page.next}">`                   : '',
].filter(Boolean).map(line => '\n    ' + line).join('')

// returns the Page, as a static HTML webpage
// <!DOCTYPE html> prepended in main.ts
export default function(page: Page): string
{
    return `
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>${page.title}</title>${meta_to_string( page )}
    ${styles_to_string( GLOBAL_STYLES )}
    ${styles_to_string( page.styles ?? [] )}
    <link rel="icon" href="/img/icon.png" type="image/x-icon">
</head>

<body>
    <!-- body -->

    ${page.body}

    <!-- global scipts -->
    
    ${scripts_to_string( GLOBAL_SCRIPTS )}
    
    <!-- applied scripts (if any) -->

    ${scripts_to_string( page.scripts ?? [] )}
</body>

</html>`
}
