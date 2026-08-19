# Stärke Premium Parts — Página Institucional

Site institucional em **React + Vite** para a Stärke Premium Parts, distribuidora de peças automotivas importadas premium, com foco em SEO on-page, dados estruturados (Schema.org) e performance.

## Stack

- React 18 + React Router 6
- Vite 5 (build estático com pré-renderização SSR para SEO)
- HTML semântico, CSS próprio (mobile-first), imagens SVG locais com lazy-loading
- JSON-LD: Organization, LocalBusiness, WebSite, BreadcrumbList, Service, Product, BlogPosting, FAQPage

## Estrutura de páginas

| Página | URL |
| --- | --- |
| Home | `/` |
| Sobre | `/sobre/` |
| Produtos | `/produtos/` |
| Linha Pesada / Leve / Industrial | `/produtos/linha-pesada/`, `/produtos/linha-leve/`, `/produtos/industrial/` |
| Serviços | `/servicos/` |
| Marcas | `/marcas/` + `/marcas/porsche/`, `/marcas/bmw/`, etc. |
| Aplicações | `/aplicacoes/` |
| Blog | `/blog/` + `/blog/<slug>/` |
| Contato | `/contato/` |
| FAQ | `/faq/` |

## Comandos

```bash
npm install        # instala dependências
npm run dev        # servidor de desenvolvimento
npm run build      # build do bundle do cliente
npm run build:static  # build + pré-renderização SSR (gera dist/ com HTML estático por rota)
npm run sitemap    # gera dist/sitemap.xml
npm run preview    # serve o build de produção localmente
```

O fluxo completo de publicação é `npm run build:static && npm run sitemap`. O resultado em `dist/` pode ser hospedado em qualquer servidor estático (Netlify, Vercel, GitHub Pages, nginx).

## SEO implementado

- **Title e meta description únicos** por página (arquivo `src/data/seo.js`)
- **URLs amigáveis** em kebab-case, 1 H1 por página, headings hierarquizados
- **Canonical**, Open Graph e Twitter Card em todas as páginas
- **BreadcrumbList** visível e marcado com JSON-LD
- **Schema.org**: Organization, LocalBusiness (endereço SP), WebSite, Service, BlogPosting, FAQPage
- **robots.txt** e **sitemap.xml**
- Lazy-loading de imagens, CSS/JS minimizados, design mobile-first

## Integrações (placeholders)

Em `index.html` há blocos prontos para:
- **Google Analytics 4** — trocar `G-XXXXXXXXXX` pelo ID real
- **Meta Pixel** — trocar `000000000000000` pelo ID real do Pixel

Dados de contato em `src/data/site.js` (telefone, WhatsApp, e-mail e endereço) estão como placeholders para preenchimento.

## Personalização

- **Dados de contato**: `src/data/site.js`
- **Marcas**: `src/data/marcas.js`
- **Linhas de produtos**: `src/data/produtos.js`
- **Blog**: `src/data/blog.js`
- **FAQ**: `src/data/faq.js`
- **SEO por página**: `src/data/seo.js`
- **Imagens**: `public/images/` (SVGs ilustrativos a serem substituídos por fotos reais — manter atributo `alt`)