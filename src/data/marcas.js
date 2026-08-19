export const marcas = [
  {
    slug: 'porsche',
    name: 'Porsche',
    tagline: 'Precisão alemã para veículos esportivos de alta performance.',
    descricao:
      'A Porsche é sinônimo de engenharia esportiva e precisão. Trabalhamos com peças originais e de reposição premium para os modelos 911, Cayenne, Macan, Panamera e Taycan, com garantia de procedência e aplicação correta.',
    pecasPopulares: ['Pastilhas e discos de freio', 'Amortecedores esportivos', 'Filtros de óleo e ar', 'Bombas de óleo e vedadores', 'Juntas e correias'],
    imagem: '/images/marcas/porsche.svg',
  },
  {
    slug: 'bmw',
    name: 'BMW',
    tagline: 'Diversidade e desempenho para toda a linha premium.',
    descricao:
      'Da Série 1 ao X6, a BMW combina luxo e desempenho. Fornecemos componentes originais e premium para motor, freios, suspensão e elétrica, garantindo a performance que a marca exige.',
    pecasPopulares: ['Discos e pastilhas de freio', 'Amortecedores e buchas', 'Sensores e módulos elétricos', 'Filtros e velas de ignição', 'Radiadores e bombas d\'água'],
    imagem: '/images/marcas/bmw.svg',
  },
  {
    slug: 'mercedes-benz',
    name: 'Mercedes-Benz',
    tagline: 'Luxo, segurança e durabilidade em cada componente.',
    descricao:
      'A Mercedes-Benz é referência mundial em engenharia automotiva. Atendemos veículos de passeio (Classe C, E, S, GLC, GLE) e caminhões, com peças originais e de reposição de alta qualidade.',
    pecasPopulares: ['Sistema de freios completo', 'Componentes de suspensão', 'Filtros e lubrificantes', 'Peças de motor e turbo', 'Elétrica e sensores'],
    imagem: '/images/marcas/mercedes.svg',
  },
  {
    slug: 'audi',
    name: 'Audi',
    tagline: 'Tecnologia quattro e acabamento impecável.',
    descricao:
      'A Audi entrega tecnologia e sofisticação. Importamos peças para A3, A4, A6, Q5, Q7 e mais, com foco em componentes de transmissão, freios e sistemas eletrônicos.',
    pecasPopulares: ['Discos de freio esportivos', 'Amortecedores adaptativos', 'Filtros e correias', 'Sensores e atuadores', 'Peças de suspensão'],
    imagem: '/images/marcas/audi.svg',
  },
  {
    slug: 'land-rover',
    name: 'Land Rover',
    tagline: 'Robustez off-road com conforto premium.',
    descricao:
      'Da linha Discovery ao Range Rover, a Land Rover une capacidade off-road e luxo. Fornecemos peças para suspensão, freios, motor e sistemas 4x4 com garantia de qualidade.',
    pecasPopulares: ['Suspensão a ar', 'Freios e discos', 'Juntas homocinéticas', 'Componentes de motor', 'Elétrica e módulos'],
    imagem: '/images/marcas/land-rover.svg',
  },
  {
    slug: 'volvo',
    name: 'Volvo',
    tagline: 'Segurança sueca para carros e caminhões.',
    descricao:
      'A Volvo é reconhecida pela segurança e durabilidade. Trabalhamos peças para automóveis e caminhões, com foco em sistemas de freios, motor e componentes estruturais.',
    pecasPopulares: ['Pastilhas e discos de freio', 'Filtros e peças de motor', 'Amortecedores', 'Sensores de segurança', 'Peças de caminhões'],
    imagem: '/images/marcas/volvo.svg',
  },
  {
    slug: 'mitsubishi',
    name: 'Mitsubishi',
    tagline: 'Resistência e confiabilidade para uso severo.',
    descricao:
      'A Mitsubishi é referência em robustez, tanto nos modelos Pajero e L200 quanto nos caminhões Fuso. Oferecemos peças originais e compatíveis para máxima durabilidade.',
    pecasPopulares: ['Peças para caminhão Fuso', 'Componentes de motor', 'Freios e embreagem', 'Filtros pesados', 'Suspensão e direção'],
    imagem: '/images/marcas/mitsubishi.svg',
  },
]

export function getMarca(slug) {
  return marcas.find((m) => m.slug === slug)
}
