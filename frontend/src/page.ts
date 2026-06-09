import { API} from "@/config.ts"

export type Page = {
    title: string
    body: string

    styles?: string[]
    scripts?: string[]
}

const scripts_to_string = (scripts: string[]) => scripts.map(src => `<script src="${src}"></script>`).join('\n')
const styles_to_string  = (styles: string[])  => styles.map(href => `<link rel="stylesheet" href="${href}">`).join('\n')

const HIT =
    '<script>' +
    `fetch("${API}hit?path=" + encodeURIComponent(location.pathname)` +
    ' + "&ref=" + encodeURIComponent(document.referrer), { method: "POST" })' +
    '</script>'

// returns the Page, as a static HTML webpage
// <!DOCTYPE html> in config.HTML_HEADER
export default function(page: Page): string
{
    return `
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>${page.title}</title>
        ${styles_to_string( page.styles ?? [] )}
        <link rel="icon" href="/img/icon.png" type="image/x-icon">
    </head>

    <body>
        ${page.body}
        <!-- ${HIT} -->
        ${scripts_to_string( page.scripts ?? [] )}
    </body>
</html>`
}
