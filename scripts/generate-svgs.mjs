import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const out = join(root, 'public', 'images')

function svg({ width = 640, height = 360, bg = '#1f232b', accent = '#c8102e', label = '', icon }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${label}">
  <rect width="${width}" height="${height}" fill="${bg}"/>
  <circle cx="${width * 0.85}" cy="${height * 0.15}" r="${Math.min(width, height) * 0.35}" fill="${accent}" opacity="0.16"/>
  <circle cx="${width * 0.1}" cy="${height * 0.9}" r="${Math.min(width, height) * 0.3}" fill="#ffffff" opacity="0.05"/>
  ${icon || ''}
  <text x="50%" y="${height * 0.78}" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="${Math.max(18, height * 0.075)}" font-weight="700" fill="#ffffff" opacity="0.92">${label}</text>
  <text x="50%" y="${height * 0.88}" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="${Math.max(12, height * 0.045)}" fill="#aeb3bd">Imagem ilustrativa – substituir por foto real</text>
</svg>`
}

function write(name, content) {
  const file = join(out, name)
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, content, 'utf8')
}

// Icon set (simple white glyphs)
const icons = {
  car: `<g transform="translate(0,-18)"><path d="M90 210 h460 l-20 60 h-420 z" fill="#ffffff" opacity="0.14"/><path d="M120 210 q120-70 200-60 q100 10 200 60 z" fill="#ffffff" opacity="0.1"/><circle cx="190" cy="265" r="34" fill="#16181d"/><circle cx="190" cy="265" r="14" fill="#aeb3bd"/><circle cx="450" cy="265" r="34" fill="#16181d"/><circle cx="450" cy="265" r="14" fill="#aeb3bd"/></g>`,
  truck: `<g transform="translate(0,-18)"><rect x="80" y="180" width="340" height="70" rx="10" fill="#ffffff" opacity="0.14"/><path d="M420 190 h90 q40 0 50 40 l10 20 h-60 v40 h-90 z" fill="#ffffff" opacity="0.12"/><circle cx="200" cy="265" r="32" fill="#16181d"/><circle cx="200" cy="265" r="13" fill="#aeb3bd"/><circle cx="500" cy="265" r="32" fill="#16181d"/><circle cx="500" cy="265" r="13" fill="#aeb3bd"/></g>`,
  engine: `<g transform="translate(0,-18)"><rect x="150" y="150" width="180" height="100" rx="14" fill="#ffffff" opacity="0.16"/><rect x="330" y="170" width="60" height="60" rx="10" fill="#ffffff" opacity="0.12"/><rect x="120" y="180" width="40" height="40" rx="8" fill="#ffffff" opacity="0.1"/><circle cx="240" cy="200" r="26" fill="#16181d"/><circle cx="240" cy="200" r="10" fill="#aeb3bd"/><path d="M160 250 h160 l20 30 h-60 v-20 h-80 v20 h-60 z" fill="#ffffff" opacity="0.1"/></g>`,
  gears: `<g transform="translate(0,-18)"><circle cx="240" cy="200" r="46" fill="#ffffff" opacity="0.14"/><circle cx="240" cy="200" r="18" fill="#16181d"/><circle cx="330" cy="240" r="38" fill="#ffffff" opacity="0.1"/><circle cx="330" cy="240" r="15" fill="#16181d"/></g>`,
}

// Core images
write('logo.svg', `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80" role="img" aria-label="Logo Stärke Premium Parts">
  <rect width="80" height="80" rx="18" fill="#16181d"/>
  <path d="M24 22 h32 v10 h-12 v26 h-8 V32 H24 Z" fill="#ffffff"/>
  <rect x="24" y="48" width="32" height="8" rx="2" fill="#c8102e"/>
</svg>`)

write('favicon.svg', `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#c8102e"/>
  <path d="M20 16 h24 v8 h-9 v20 h-6 V24 h-9 Z" fill="#ffffff"/>
</svg>`)

write('og-default.svg', svg({ width: 1200, height: 630, bg: '#16181d', accent: '#c8102e', label: 'Stärke Premium Parts', icon: icons.car }))

write('banner-hero.svg', svg({ width: 640, height: 480, bg: '#242a35', accent: '#c8102e', label: 'Veículos importados premium', icon: icons.car }))
write('sobre.svg', svg({ width: 640, height: 480, bg: '#1f232b', accent: '#c8102e', label: 'Equipe Stärke Premium Parts', icon: icons.gears }))
write('servicos.svg', svg({ width: 640, height: 420, bg: '#1f232b', accent: '#c8102e', label: 'Importação e consultoria técnica', icon: icons.engine }))
write('aplicacoes-frota.svg', svg({ width: 640, height: 360, bg: '#1f232b', accent: '#c8102e', label: 'Frotas e oficinas', icon: icons.truck }))

// Linhas
write('linhas/truck.svg', svg({ width: 640, height: 360, bg: '#1c212a', accent: '#c8102e', label: 'Linha Pesada – caminhões importados', icon: icons.truck }))
write('linhas/car.svg', svg({ width: 640, height: 360, bg: '#1f232b', accent: '#c8102e', label: 'Linha Leve – carros importados', icon: icons.car }))
write('linhas/industrial.svg', svg({ width: 640, height: 360, bg: '#1a1f26', accent: '#c8102e', label: 'Linha Industrial – máquinas', icon: icons.gears }))

// Marcas (wordmark-style placeholders)
const brandColors = {
  porsche: '#b12b28',
  bmw: '#1c69d4',
  'mercedes-benz': '#3f3f3f',
  audi: '#171717',
  'land-rover': '#3e6b3a',
  volvo: '#003057',
  mitsubishi: '#c4000e',
}
for (const [slug, color] of Object.entries(brandColors)) {
  const name = slug === 'mercedes-benz' ? 'Mercedes-Benz' : slug.charAt(0).toUpperCase() + slug.slice(1)
  write(`marcas/${slug}.svg`, `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="46" viewBox="0 0 120 46" role="img" aria-label="Peças ${name}">
  <rect width="120" height="46" rx="8" fill="${color}"/>
  <text x="50%" y="50%" text-anchor="middle" dominant-baseline="central" font-family="Segoe UI, Arial, sans-serif" font-size="17" font-weight="700" fill="#ffffff">${name}</text>
</svg>`)
}

// Blog
const blogMeta = [
  ['guia-pecas.svg', 'Guia de peças importadas', 'engine'],
  ['pecas-originais.svg', 'Originais x genéricas', 'gears'],
  ['manutencao.svg', 'Manutenção preventiva', 'engine'],
  ['starke.svg', 'Stärke Premium Parts', 'gears'],
  ['marcas.svg', 'Marcas e compatibilidade', 'car'],
  ['importacao.svg', 'Importação de peças', 'truck'],
  ['acessorios.svg', 'Acessórios para carros de luxo', 'car'],
  ['caminhoes.svg', 'Peças para caminhões importados', 'truck'],
  ['faq.svg', 'Dúvidas sobre peças importadas', 'gears'],
  ['porsche-caso.svg', 'Caso de sucesso: Porsche 911', 'car'],
]
for (const [file, label, icon] of blogMeta) {
  write(`blog/${file}`, svg({ width: 640, height: 360, bg: '#1f232b', accent: '#c8102e', label, icon: icons[icon] }))
}

console.log('SVG placeholders generated in public/images/')