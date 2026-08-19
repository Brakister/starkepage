export const faqItems = [
  {
    grupo: 'Pedidos e compras',
    itens: [
      {
        pergunta: 'Como faço para solicitar um orçamento de peças?',
        resposta:
          'Você pode solicitar pelo formulário de contato, por e-mail ou diretamente pelo WhatsApp. Tenha em mãos o chassi, o código da peça ou o modelo completo do veículo para agilizar a cotação.',
      },
      {
        pergunta: 'Vocês vendem apenas atacado ou também no varejo?',
        resposta:
          'Atendemos tanto oficinas, revendedores e frotas quanto clientes finais que desejam peças de qualidade para seu veículo importado.',
      },
      {
        pergunta: 'Quais são as formas de pagamento?',
        resposta:
          'Trabalhamos com boleto, cartão de crédito e transferência bancária. Condições especiais podem ser negociadas para volumes maiores ou clientes recorrentes.',
      },
    ],
  },
  {
    grupo: 'Garantia e qualidade',
    itens: [
      {
        pergunta: 'As peças importadas têm garantia?',
        resposta:
          'Sim. Todas as peças possuem garantia conforme o fabricante. O período é informado na proposta e segue os termos de garantia do produto.',
      },
      {
        pergunta: 'As peças são originais ou paralelas?',
        resposta:
          'Trabalhamos com peças originais (OEM) e peças de reposição premium de fabricantes confiáveis. A procedência é informada em cada orçamento, e nossa equipe orienta a melhor opção para o seu caso.',
      },
      {
        pergunta: 'Como funciona a garantia em caso de defeito?',
        resposta:
          'Em caso de defeito comprovado, você entra em contato com nosso suporte com o número do pedido. Avaliamos o caso e realizamos a troca ou reparo conforme a política de garantia.',
      },
    ],
  },
  {
    grupo: 'Entrega e frete',
    itens: [
      {
        pergunta: 'Quanto tempo leva a entrega?',
        resposta:
          'O prazo depende da origem da peça. Peças em estoque saem rapidamente; peças importadas sob encomenda têm prazo informado no orçamento, com rastreamento do transporte.',
      },
      {
        pergunta: 'Vocês entregam em todo o Brasil?',
        resposta:
          'Sim. Enviamos para todos os estados brasileiros por transportadoras parceiras, com opção de entrega expressa para casos urgentes.',
      },
      {
        pergunta: 'Como é calculado o frete?',
        resposta:
          'O frete é calculado conforme o destino, peso e modalidade de envio. Você recebe o valor estimado no orçamento antes de confirmar a compra.',
      },
    ],
  },
  {
    grupo: 'Compatibilidade e instalação',
    itens: [
      {
        pergunta: 'Como sei se a peça é compatível com meu veículo?',
        resposta:
          'Envie o chassi, o código da peça ou a ficha completa do veículo (marca, modelo, ano, motorização). Nossa equipe técnica valida a compatibilidade antes do envio.',
      },
      {
        pergunta: 'A Stärke instala as peças?',
        resposta:
          'Somos uma distribuidora e não realizamos instalação, mas indicamos oficinas parceiras especializadas em veículos importados quando necessário.',
      },
      {
        pergunta: 'Posso importar uma peça que não está no catálogo?',
        resposta:
          'Sim. Fazemos importação personalizada sob demanda. Envie a referência da peça e nossa equipe providenciará a cotação internacional.',
      },
    ],
  },
]

export const faqFlat = faqItems.flatMap((g) =>
  g.itens.map((i) => ({ grupo: g.grupo, ...i })),
)