export const linhas = [
  {
    slug: 'linha-leve',
    nome: 'Linha Leve',
    titulo: 'Peças para Carros Importados',
    categoria: 'Veículos premium e superesportivos',
    descricao:
      'Peças para carros importados de marcas premium como Porsche, BMW, Audi, Mercedes-Benz e Land Rover. Componentes originais e de reposição de alta qualidade para manter o desempenho e o valor do seu veículo.',
    imagem: '/images/linhas/car.svg',
    itens: [
      { nome: 'Sistema de freios', detalhe: 'Discos, pastilhas e pinças para desempenho e segurança.' },
      { nome: 'Suspensão', detalhe: 'Amortecedores, buchas e componentes de suspensão esportiva.' },
      { nome: 'Filtros e velas', detalhe: 'Filtros de óleo, ar e cabine e velas de ignição originais.' },
      { nome: 'Elétrica e sensores', detalhe: 'Sensores, módulos e componentes do sistema elétrico.' },
      { nome: 'Motor e vedação', detalhe: 'Juntas, retentores e componentes internos de motor.' },
    ],
  },
  {
    slug: 'linha-pesada',
    nome: 'Linha Pesada',
    titulo: 'Peças para Caminhões Importados',
    categoria: 'Caminhões e frotas',
    descricao:
      'Peças para caminhões importados com foco em durabilidade e desempenho. Atendemos Mercedes-Benz, Volvo, Scania, Mitsubishi Fuso e outras marcas com componentes para motor, freios, suspensão e transmissão.',
    imagem: '/images/linhas/truck.svg',
    itens: [
      { nome: 'Motores e turbos', detalhe: 'Kit de motor, cabeçotes e turbocompressores para aplicações pesadas.' },
      { nome: 'Sistema de freios', detalhe: 'Discos, tambores, lonas e válvulas para operações de alta exigência.' },
      { nome: 'Suspensão e direção', detalhe: 'Amortecedores, molas, buchas e caixas de direção reforçadas.' },
      { nome: 'Filtros pesados', detalhe: 'Filtros de óleo, ar, combustível e separadores de água.' },
      { nome: 'Transmissão', detalhe: 'Embreagens, caixas de câmbio e componentes de transmissão.' },
    ],
  },
  {
    slug: 'industrial',
    nome: 'Linha Industrial',
    titulo: 'Peças Industriais Importadas',
    categoria: 'Máquinas e equipamentos',
    descricao:
      'Peças industriais importadas para máquinas pesadas, equipamentos off-road, geradores e frotas. Componentes OEM com suporte técnico especializado para minimizar paradas de produção.',
    imagem: '/images/linhas/industrial.svg',
    itens: [
      { nome: 'Componentes de motor', detalhe: 'Pistões, bielas, juntas e vedações para motores industriais.' },
      { nome: 'Hidráulica', detalhe: 'Bombas, válvulas e cilindros para sistemas hidráulicos.' },
      { nome: 'Transmissão de potência', detalhe: 'Rolamentos, correias e acoplamentos industriais.' },
      { nome: 'Filtros industriais', detalhe: 'Filtros de alta capacidade para condições severas.' },
      { nome: 'Manutenção preventiva', detalhe: 'Kits de manutenção e peças de reposição programadas.' },
    ],
  },
]

export function getLinha(slug) {
  return linhas.find((l) => l.slug === slug)
}