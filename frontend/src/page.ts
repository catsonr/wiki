import { API_BASE } from "./config.ts"

export type Page = {
    // required
    title: string
    body: string
    // optional
    styles?: string[]
    scripts?: string[]
}

const scripts_to_string = (scripts: string[]) => scripts.map(src => `<script src="${src}"></script>`).join('\n')
const styles_to_string  = (styles: string[])  => styles.map(href => `<link rel="stylesheet" href="${href}">`).join('\n')

// the hit beacon -- fired on EVERY page, unconditionally (not part of page.scripts,
// which is per-page + for external src urls only). records one human page load with
// cwab via POST /hit (writes a row; the count is read separately via GET /hit
// when a page opts in to display it). path + document.referrer go as explicit query
// params; the cross-origin Referer header is useless here. it's a bare POST (no
// headers/body) so it stays a "simple request" -- no CORS preflight. API_BASE is
// baked in at build time (outer ${}); the inner runtime js uses + concat so there
// are no nested backticks. fire-and-forget.
const HIT =
    '<script>' +
    `fetch("${API_BASE}/hit?path=" + encodeURIComponent(location.pathname)` +
    ' + "&ref=" + encodeURIComponent(document.referrer), { method: "POST" })' +
    '</script>'

export default function(page: Page): string
{
    return `<!DOCTYPE html>
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
        ${HIT}
        ${scripts_to_string( page.scripts ?? [] )}
    </body>
</html>`
}
