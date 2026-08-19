import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { renderRoute, getAllPaths, getSeo, site } from '../dist-server/entry-server.js'

const root = dirname(fileURLToPath(import.meta.url)) + '/..'
const dist = join(root, 'dist')
const shell = readFileSync(join(dist, 'index.html'), 'utf8')

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function buildHead(seo) {
  const ogImage = seo.ogImage.startsWith('http') ? seo.ogImage : `${site.url}${seo.ogImage}`
  const metas = [
    `<title>${escapeHtml(seo.title)}</title>`,
    `<meta name="description" content="${escapeHtml(seo.description)}" />`,
    `<meta name="keywords" content="${escapeHtml(seo.keywords.join(', '))}" />`,
    `<link rel="canonical" href="${seo.canonical}" />`,
    `<meta property="og:title" content="${escapeHtml(seo.ogTitle)}" />`,
    `<meta property="og:description" content="${escapeHtml(seo.ogDescription)}" />`,
    `<meta property="og:image" content="${ogImage}" />`,
    `<meta property="og:url" content="${seo.canonical}" />`,
    `<meta property="og:type" content="${seo.ogType}" />`,
    `<meta property="og:site_name" content="${site.name}" />`,
    `<meta property="og:locale" content="pt_BR" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(seo.ogTitle)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(seo.ogDescription)}" />`,
    `<meta name="twitter:image" content="${ogImage}" />`,
  ]
  const schemas = seo.schema.map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`)
  return [...metas, ...schemas].join('\n    ')
}

const paths = getAllPaths()

for (const path of paths) {
  const seo = getSeo(path)
  const body = renderRoute(path)

  let html = shell.replace(/<title>[\s\S]*?<\/title>/, `${buildHead(seo)}`)
  html = html.replace('<div id="root"></div>', `<div id="root">${body}</div>`)

  const filePath = path === '/' ? join(dist, 'index.html') : join(dist, path, 'index.html')
  mkdirSync(dirname(filePath), { recursive: true })
  writeFileSync(filePath, html, 'utf8')
  console.log(`✔ ${path || '/'} (${(html.length / 1024).toFixed(1)} kB)`)
}

const notFoundSeo = getSeo('/404/')
let notFound = shell.replace(/<title>[\s\S]*?<\/title>/, `${buildHead({ ...notFoundSeo, title: 'Página não encontrada – Stärke Premium Parts' })}`)
notFound = notFound.replace('<div id="root"></div>', `<div id="root">${renderRoute('/paginanaoexiste/')}</div>`)
writeFileSync(join(dist, '404.html'), notFound, 'utf8')
console.log('✔ 404.html')

console.log(`Prerendered ${paths.length} pages into dist/`)