import { site } from './site'
import { marcas, getMarca } from './marcas'
import { blogPosts, getPost } from './blog'
import { faqFlat } from './faq'

const baseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: site.name,
  legalName: site.legalName,
  url: site.url,
  email: site.email,
  telephone: site.phone,
  logo: `${site.url}/images/logo.svg`,
  sameAs: Object.values(site.social),
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: site.phone,
    contactType: 'customer service',
    areaServed: 'BR',
    availableLanguage: 'Portuguese',
  },
}

const localBusinessSchema = {
  '@type': 'LocalBusiness',
  '@id': `${site.url}/#localbusiness`,
  name: site.name,
  url: site.url,
  telephone: site.phone,
  email: site.email,
  image: `${site.url}/images/banner-hero.svg`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.state,
    postalCode: site.address.zip,
    addressCountry: 'BR',
  },
  geo: { '@type': 'GeoCoordinates', latitude: site.geo.latitude, longitude: site.geo.longitude },
  openingHours: 'Mo-Fr 08:00-18:00, Sa 09:00-13:00',
  priceRange: '$$$',
}

const webSiteSchema = {
  '@type': 'WebSite',
  '@id': `${site.url}/#website`,
  url: site.url,
  name: site.name,
  inLanguage: 'pt-BR',
}

function breadcrumbSchema(items) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${site.url}${it.path}`,
    })),
  }
}

function build(path, seo) {
  return {
    path,
    canonical: `${site.url}${path}`,
    title: seo.title,
    description: seo.description,
    ogTitle: seo.title,
    ogDescription: seo.description,
    ogImage: seo.ogImage || '/images/og-default.svg',
    ogType: seo.ogType || 'website',
    keywords: seo.keywords || [],
    breadcrumb: seo.breadcrumb
      ? [breadcrumbSchema(seo.breadcrumb)]
      : [],
    schema: [
      baseSchema,
      ...(seo.includeLocalBusiness ? [localBusinessSchema] : []),
      webSiteSchema,
      ...(seo.schema || []),
      ...(seo.breadcrumb ? [breadcrumbSchema(seo.breadcrumb)] : []),
    ],
  }
}

export const seoRoutes = [
  build('/', {
    title: 'Stärke Premium Parts – Peças Automotivas Importadas Premium',
    description:
      'Distribuidora de peças automotivas importadas premium para Porsche, BMW, Audi, Mercedes-Benz e Land Rover. Peças originais, garantia e entrega rápida em todo o Brasil.',
    keywords: ['peças automotivas importadas', 'peças para carros importados', 'autopeças premium'],
    includeLocalBusiness: true,
    breadcrumb: [{ name: 'Início', path: '/' }],
  }),
  build('/sobre/', {
    title: 'Sobre a Stärke Premium Parts | Distribuidora de Peças Importadas',
    description:
      'Conheça a Stärke Premium Parts: distribuidora líder em peças automotivas importadas premium, com equipe especializada, garantia e atendimento de excelência em São Paulo.',
    keywords: ['Stärke Premium Parts', 'distribuidora de peças importadas', 'quem somos'],
    includeLocalBusiness: true,
    breadcrumb: [
      { name: 'Início', path: '/' },
      { name: 'Sobre', path: '/sobre/' },
    ],
  }),
  build('/produtos/', {
    title: 'Produtos | Linha Pesada, Leve e Industrial – Stärke Premium Parts',
    description:
      'Explore as linhas de peças automotivas importadas da Stärke: Linha Pesada para caminhões, Linha Leve para veículos importados e Linha Industrial para máquinas.',
    keywords: ['peças importadas', 'linha pesada', 'linha leve', 'peças industriais'],
    breadcrumb: [
      { name: 'Início', path: '/' },
      { name: 'Produtos', path: '/produtos/' },
    ],
  }),
  build('/produtos/linha-pesada/', {
    title: 'Peças para Caminhões Importados | Linha Pesada – Stärke',
    description:
      'Peças para caminhões importados: motores, freios, suspensão e filtros para Mercedes-Benz, Volvo, Scania e mais. Qualidade original com garantia.',
    keywords: ['peças para caminhões importados', 'peças linha pesada', 'peças Mercedes-Benz caminhão'],
    breadcrumb: [
      { name: 'Início', path: '/' },
      { name: 'Produtos', path: '/produtos/' },
      { name: 'Linha Pesada', path: '/produtos/linha-pesada/' },
    ],
  }),
  build('/produtos/linha-leve/', {
    title: 'Peças para Carros Importados | Linha Leve – Stärke',
    description:
      'Peças para carros importados: Porsche, BMW, Audi, Mercedes-Benz e Land Rover. Filtros, amortecedores, freios e mais, com garantia de qualidade.',
    keywords: ['peças para carros importados', 'peças Porsche', 'peças BMW', 'autopeças importadas'],
    breadcrumb: [
      { name: 'Início', path: '/' },
      { name: 'Produtos', path: '/produtos/' },
      { name: 'Linha Leve', path: '/produtos/linha-leve/' },
    ],
  }),
  build('/produtos/industrial/', {
    title: 'Peças Industriais Importadas | Linha Industrial – Stärke',
    description:
      'Peças industriais importadas para máquinas e equipamentos pesados. Componentes OEM para frotas, indústria e off-road com suporte técnico especializado.',
    keywords: ['peças industriais importadas', 'peças para máquinas', 'componentes OEM'],
    breadcrumb: [
      { name: 'Início', path: '/' },
      { name: 'Produtos', path: '/produtos/' },
      { name: 'Industrial', path: '/produtos/industrial/' },
    ],
  }),
  build('/servicos/', {
    title: 'Serviços | Importação de Peças e Consultoria Técnica – Stärke',
    description:
      'Importação de peças automotivas sob medida, consultoria técnica, entrega expressa e garantia de qualidade. Conte com a Stärke Premium Parts.',
    keywords: ['importação de peças automotivas', 'consultoria técnica', 'entrega expressa peças'],
    breadcrumb: [
      { name: 'Início', path: '/' },
      { name: 'Serviços', path: '/servicos/' },
    ],
    schema: [
      {
        '@type': 'Service',
        name: 'Importação de peças automotivas premium',
        provider: { '@type': 'Organization', name: site.name },
        areaServed: 'Brasil',
        description:
          'Importação personalizada de peças originais premium para Porsche, BMW, Audi, Mercedes-Benz e Land Rover, com garantia e suporte técnico.',
      },
      {
        '@type': 'Service',
        name: 'Consultoria técnica automotiva',
        provider: { '@type': 'Organization', name: site.name },
        areaServed: 'Brasil',
        description:
          'Orientação especializada para seleção, compatibilidade e manutenção de peças de veículos importados.',
      },
    ],
  }),
  build('/marcas/', {
    title: 'Marcas de Autopeças | Brembo, Bilstein, Mahle, NGK – Stärke',
    description:
      'Distribuímos peças das melhores marcas de autopeças do mundo: Brembo, Bilstein, Mahle, NGK, Textar, KYB e mais. Procedência e garantia para carros importados.',
    keywords: ['marcas de autopeças', 'peças Brembo', 'peças Bilstein', 'peças NGK'],
    breadcrumb: [
      { name: 'Início', path: '/' },
      { name: 'Marcas', path: '/marcas/' },
    ],
  }),
  build('/marcas/porsche/', {
    title: 'Peças Porsche Brasil | Originais e Compatíveis – Stärke',
    description:
      'Peças Porsche com garantia: 911, Cayenne, Macan, Panamera. Componentes originais e de reposição premium com importação especializada.',
    keywords: ['peças Porsche Brasil', 'peças Porsche 911', 'importação de peças Porsche'],
    breadcrumb: [
      { name: 'Início', path: '/' },
      { name: 'Marcas', path: '/marcas/' },
      { name: 'Porsche', path: '/marcas/porsche/' },
    ],
  }),
  build('/marcas/bmw/', {
    title: 'Peças BMW Importadas | Originais e Compatíveis – Stärke',
    description:
      'Peças BMW com garantia: Série 1 a X6, freios, suspensão, filtros e muito mais. Componentes originais e premium com entrega rápida.',
    keywords: ['peças BMW', 'peças BMW importadas', 'peças BMW X'],
    breadcrumb: [
      { name: 'Início', path: '/' },
      { name: 'Marcas', path: '/marcas/' },
      { name: 'BMW', path: '/marcas/bmw/' },
    ],
  }),
  build('/marcas/mercedes-benz/', {
    title: 'Peças Mercedes-Benz Importadas | Originais – Stärke',
    description:
      'Peças Mercedes-Benz para veículos de passeio e caminhões. Filtros, freios, suspensão e mais, com garantia e procedência.',
    keywords: ['peças Mercedes-Benz', 'peças Mercedes importada', 'peças para caminhão Mercedes'],
    breadcrumb: [
      { name: 'Início', path: '/' },
      { name: 'Marcas', path: '/marcas/' },
      { name: 'Mercedes-Benz', path: '/marcas/mercedes-benz/' },
    ],
  }),
  build('/marcas/audi/', {
    title: 'Peças Audi Importadas | Originais e Compatíveis – Stärke',
    description:
      'Peças Audi com garantia para A3, A4, Q5, Q7 e mais. Componentes originais e de reposição premium com importação especializada.',
    keywords: ['peças Audi', 'peças Audi importadas', 'peças Audi Q'],
    breadcrumb: [
      { name: 'Início', path: '/' },
      { name: 'Marcas', path: '/marcas/' },
      { name: 'Audi', path: '/marcas/audi/' },
    ],
  }),
  build('/marcas/land-rover/', {
    title: 'Peças Land Rover Importadas | Originais – Stärke',
    description:
      'Peças Land Rover para Range Rover, Discovery e Defender. Componentes originais e premium com garantia e entrega rápida.',
    keywords: ['peças Land Rover', 'peças Range Rover', 'peças Defender'],
    breadcrumb: [
      { name: 'Início', path: '/' },
      { name: 'Marcas', path: '/marcas/' },
      { name: 'Land Rover', path: '/marcas/land-rover/' },
    ],
  }),
  build('/aplicacoes/', {
    title: 'Aplicações | Peças para Carros, Off-road e Máquinas – Stärke',
    description:
      'Conheça as aplicações da Stärke Premium Parts: peças para carros importados, veículos off-road, máquinas e frotas industriais.',
    keywords: ['peças Mercedes importada', 'peças para carros importados', 'peças off-road'],
    breadcrumb: [
      { name: 'Início', path: '/' },
      { name: 'Aplicações', path: '/aplicacoes/' },
    ],
  }),
  build('/blog/', {
    title: 'Blog | Dicas e Guias de Peças Importadas – Stärke Premium Parts',
    description:
      'Guias de manutenção, novidades do setor e dicas para escolher peças automotivas importadas. Conteúdo técnico da Stärke Premium Parts.',
    keywords: ['como escolher peças Porsche', 'manutenção carros importados', 'guia de peças'],
    breadcrumb: [
      { name: 'Início', path: '/' },
      { name: 'Blog', path: '/blog/' },
    ],
  }),
  build('/contato/', {
    title: 'Fale Conosco | Solicite Orçamento – Stärke Premium Parts',
    description:
      'Solicite um orçamento de peças automotivas importadas. Fale pelo WhatsApp, e-mail ou formulário com a equipe especializada da Stärke.',
    keywords: ['solicitar orçamento peças', 'contato autopeças', 'fale conosco'],
    includeLocalBusiness: true,
    breadcrumb: [
      { name: 'Início', path: '/' },
      { name: 'Contato', path: '/contato/' },
    ],
  }),
  build('/faq/', {
    title: 'Perguntas Frequentes sobre Peças Importadas – Stärke',
    description:
      'Tire suas dúvidas sobre compra, garantia, prazo de entrega e instalação de peças automotivas importadas premium.',
    keywords: ['dúvidas peças importadas', 'garantia de peças', 'prazo de entrega'],
    breadcrumb: [
      { name: 'Início', path: '/' },
      { name: 'FAQ', path: '/faq/' },
    ],
    schema: [
      {
        '@type': 'FAQPage',
        mainEntity: faqFlat.map((f) => ({
          '@type': 'Question',
          name: f.pergunta,
          acceptedAnswer: { '@type': 'Answer', text: f.resposta },
        })),
      },
    ],
  }),
]

export function getSeo(path) {
  const normalized = path.endsWith('/') && path !== '/' ? path : `${path.replace(/\/$/, '')}/`
  const found = seoRoutes.find((r) => r.path === normalized || r.path === path)
  if (found) return found

  const blogMatch = path.match(/^\/blog\/([\w-]+)\/?$/)
  if (blogMatch) {
    const post = getPost(blogMatch[1])
    if (post) {
      return build(`/blog/${post.slug}/`, {
        title: post.metaTitle,
        description: post.resumo,
        ogImage: post.imagem,
        ogType: 'article',
        keywords: post.titulo.toLowerCase().split(' '),
        breadcrumb: [
          { name: 'Início', path: '/' },
          { name: 'Blog', path: '/blog/' },
          { name: post.titulo, path: `/blog/${post.slug}/` },
        ],
        schema: [
          {
            '@type': 'BlogPosting',
            headline: post.titulo,
            description: post.resumo,
            datePublished: post.data,
            image: `${site.url}${post.imagem}`,
            author: { '@type': 'Organization', name: site.name },
            publisher: { '@type': 'Organization', name: site.name, logo: { '@type': 'ImageObject', url: `${site.url}/images/logo.svg` } },
          },
        ],
      })
    }
  }

  const marcaMatch = path.match(/^\/marcas\/([\w-]+)\/?$/)
  if (marcaMatch) {
    const marca = getMarca(marcaMatch[1])
    if (marca) {
      return build(`/marcas/${marca.slug}/`, {
        title: `Peças ${marca.name} Brasil | Originais e Compatíveis – Stärke`,
        description: `Peças ${marca.name} com garantia de procedência. ${marca.tagline} Importação especializada e entrega para todo o Brasil.`,
        keywords: [`peças ${marca.name}`, `peças ${marca.name} importadas`],
        breadcrumb: [
          { name: 'Início', path: '/' },
          { name: 'Marcas', path: '/marcas/' },
          { name: marca.name, path: `/marcas/${marca.slug}/` },
        ],
      })
    }
  }

  return seoRoutes[0]
}

export function getAllPaths() {
  const staticPaths = seoRoutes.map((r) => r.path)
  const marcaPaths = marcas.map((m) => `/marcas/${m.slug}/`)
  const blogPaths = blogPosts.map((p) => `/blog/${p.slug}/`)
  return [...new Set([...staticPaths, ...marcaPaths, ...blogPaths])]
}

export { baseSchema, localBusinessSchema, webSiteSchema, breadcrumbSchema }
