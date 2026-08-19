import { writeFileSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { getAllPaths, site } from '../dist-server/entry-server.js'

const root = dirname(fileURLToPath(import.meta.url)) + '/..'
const dist = join(root, 'dist')

const paths = getAllPaths()
const urls = paths
  .map((p) => {
    const loc = p === '/' ? site.url : `${site.url}${p}`
    return `  <url>\n    <loc>${loc}</loc>\n    <changefreq>${p === '/' ? 'weekly' : 'monthly'}</changefreq>\n  </url>`
  })
  .join('\n')

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`

mkdirSync(dist, { recursive: true })
writeFileSync(join(dist, 'sitemap.xml'), xml, 'utf8')
console.log(`sitemap.xml generated with ${paths.length} URLs`)