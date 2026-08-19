import { useEffect } from 'react'
import { getSeo } from '../data/seo'
import { site } from '../data/site'

function upsertMeta(attr, key, content) {
  if (!content) return
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function upsertSchema(scripts) {
  document.querySelectorAll('script[data-seo-jsonld]').forEach((n) => n.remove())
  scripts.forEach((schema) => {
    const el = document.createElement('script')
    el.type = 'application/ld+json'
    el.setAttribute('data-seo-jsonld', 'true')
    el.textContent = JSON.stringify(schema)
    document.head.appendChild(el)
  })
}

export default function Seo({ path }) {
  const seo = getSeo(path)
  const ogImage = seo.ogImage.startsWith('http')
    ? seo.ogImage
    : `${site.url}${seo.ogImage}`

  useEffect(() => {
    document.title = seo.title
    upsertMeta('name', 'description', seo.description)
    upsertMeta('name', 'keywords', seo.keywords.join(', '))
    upsertMeta('property', 'og:title', seo.ogTitle)
    upsertMeta('property', 'og:description', seo.ogDescription)
    upsertMeta('property', 'og:image', ogImage)
    upsertMeta('property', 'og:url', seo.canonical)
    upsertMeta('property', 'og:type', seo.ogType)
    upsertMeta('property', 'og:site_name', site.name)
    upsertMeta('property', 'og:locale', 'pt_BR')
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', seo.ogTitle)
    upsertMeta('name', 'twitter:description', seo.ogDescription)
    upsertMeta('name', 'twitter:image', ogImage)
    upsertCanonical(seo.canonical)
    upsertSchema(seo.schema)
  })

  return null
}
