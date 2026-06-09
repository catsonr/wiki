import { API } from '@/config.ts'

const path = encodeURIComponent(location.pathname)
const ref  = encodeURIComponent(document.referrer)
const data = `?path=${path}&ref=${ref}`

// POST records a hit; GET would only READ the count (see backend Hits.hs).
fetch(`${API}hit${data}`, { method: "POST" }).then((r) => {
    console.log("[HIT] pinged with response:\n" + r.body?.getReader().read.toString() + "\n[HIT] response end")
})
