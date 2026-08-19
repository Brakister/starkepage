export const marcas = [
  {
    slug: 'bilstein',
    name: 'Bilstein',
    tagline: 'Referência mundial em amortecedores.',
    descricao:
      'A Bilstein é sinônimo de amortecedores de alta performance, utilizados por montadoras premium e equipes de competição. Importamos a linha completa para veículos europeus e japoneses de luxo.',
    pecasPopulares: ['Amortecedores originais', 'Amortecedores esportivos B6/B8', 'Kit de suspensão completa', 'Amortecedores de altura regulável'],
    imagem: '/images/marcas/bilstein.svg',
  },
  {
    slug: 'brembo',
    name: 'Brembo',
    tagline: 'Freios de alto desempenho para o mercado premium.',
    descricao:
      'A Brembo equipa as melhores superesportivas do mundo. Fornecemos discos, pastilhas e pinças com desempenho e durabilidade à altura do seu veículo.',
    pecasPopulares: ['Discos de freio perfurados', 'Pastilhas de freio', 'Pinças de freio', 'Fluido de freio DOT'],
    imagem: '/images/marcas/brembo.svg',
  },
  {
    slug: 'mahle',
    name: 'Mahle',
    tagline: 'Tecnologia alemã em filtros e componentes de motor.',
    descricao:
      'A Mahle é fornecedora de montadoras e fabrica filtros, pistões e componentes de motor com precisão alemã. Garantia de encaixe e durabilidade.',
    pecasPopulares: ['Filtros de óleo e ar', 'Filtros de cabine', 'Pistões e anéis', 'Componentes de motor'],
    imagem: '/images/marcas/mahle.svg',
  },
  {
    slug: 'ngk',
    name: 'NGK',
    tagline: 'Líder mundial em velas de ignição.',
    descricao:
      'A NGK é a marca preferida em ignição. Importamos velas, cabos e bobinas para atender com exatidão as especificações de motores importados.',
    pecasPopulares: ['Velas de ignição iridium', 'Cabos de vela', 'Bobinas de ignição', 'Sensores de temperatura'],
    imagem: '/images/marcas/ngk.svg',
  },
  {
    slug: 'textar',
    name: 'Textar',
    tagline: 'Fricção premium para freios confiáveis.',
    descricao:
      'A Textar é especialista em material de fricção, oferecendo pastilhas e lonas com desempenho consistente e baixa emissão de ruído.',
    pecasPopulares: ['Pastilhas de freio cerâmicas', 'Pastilhas de freio orgânicas', 'Kit de freio completo'],
    imagem: '/images/marcas/textar.svg',
  },
  {
    slug: 'kayaba',
    name: 'KYB',
    tagline: 'Amortecedores originais para o mercado.',
    descricao:
      'A KYB é um dos maiores fabricantes de amortecedores do mundo, fornecedora de montadoras premium. Reposição com o mesmo padrão de fábrica.',
    pecasPopulares: ['Amortecedores dianteiros', 'Amortecedores traseiros', 'Kit batente e coxim', 'Kits de suspensão'],
    imagem: '/images/marcas/kayaba.svg',
  },
  {
    slug: 'febi',
    name: 'FEBI',
    tagline: 'Mais de 40 mil referências para veículos europeus.',
    descricao:
      'A FEBI Bilstein é referência em peças de reposição para o mercado europeu, com ampla cobertura de componentes de motor, suspensão e elétrica.',
    pecasPopulares: ['Componentes de suspensão', 'Sensores e atuadores', 'Peças de motor', 'Buchas e coxins'],
    imagem: '/images/marcas/febi.svg',
  },
  {
    slug: 'hengst',
    name: 'Hengst',
    tagline: 'Sistemas de filtragem de alta precisão.',
    descricao:
      'A Hengst desenvolve soluções de filtragem para montadoras e mercado de reposição, com filtros de óleo, ar e combustível de excelente desempenho.',
    pecasPopulares: ['Filtros de óleo', 'Filtros de ar', 'Filtros de combustível', 'Filtros de cabine'],
    imagem: '/images/marcas/hengst.svg',
  },
  {
    slug: 'trw',
    name: 'TRW',
    tagline: 'Tecnologia em segurança veicular.',
    descricao:
      'A TRW é especialista em sistemas de segurança: freios, direção e componentes de suspensão com padrão de fábrica das principais montadoras.',
    pecasPopulares: ['Discos e pastilhas de freio', 'Cilindros de freio', 'Caixas de direção', 'Braços e tensores'],
    imagem: '/images/marcas/trw.svg',
  },
  {
    slug: 'victor-reinz',
    name: 'Victor Reinz',
    tagline: 'Juntas e vedação para motores premium.',
    descricao:
      'A Victor Reinz é referência em juntas e vedações, oferecendo kits completos que preservam a performance original do motor.',
    pecasPopulares: ['Juntas de cabeçote', 'Kits de junta completos', 'Retentores', 'Vedações'],
    imagem: '/images/marcas/victor-reinz.svg',
  },
  {
    slug: 'ufi',
    name: 'UFI',
    tagline: 'Filtros de origem italiana.',
    descricao:
      'A UFI Filters é fabricante de sistemas de filtragem e trocadores de calor, com forte presença em veículos europeus e asiáticos.',
    pecasPopulares: ['Filtros de óleo e ar', 'Filtros de combustível', 'Separadores de óleo'],
    imagem: '/images/marcas/ufi.svg',
  },
]

export function getMarca(slug) {
  return marcas.find((m) => m.slug === slug)
}