export const site = {
  name: 'Stärke Premium Parts',
  legalName: 'Stärke Parts Comércio Imp e Exp de Peças Automotivas Ltda.',
  url: 'https://starkeparts.com.br',
  phone: '(11) 0000-0000',
  whatsappDisplay: '(11) 90000-0000',
  whatsappNumber: '5511900000000',
  email: 'contato@starkeparts.com.br',
  address: {
    street: 'Rua Dr. Luiz Migliano, 2050',
    district: 'Morumbi',
    city: 'São Paulo',
    state: 'SP',
    zip: '05711-900',
  },
  hours: 'Segunda a sexta, das 8h às 18h',
  social: {
    instagram: 'https://www.instagram.com/starkepremiumparts',
    linkedin: 'https://www.linkedin.com/company/starke-premium-parts',
    facebook: 'https://www.facebook.com/starkepremiumparts',
  },
}

export const whatsappLink = (text = 'Olá! Gostaria de solicitar um orçamento de peças.') =>
  `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(text)}`

export const navLinks = [
  { label: 'Início', to: '/' },
  { label: 'Produtos', to: '/produtos' },
  { label: 'Serviços', to: '/servicos' },
  { label: 'Marcas', to: '/marcas' },
  { label: 'Aplicações', to: '/aplicacoes' },
  { label: 'Sobre', to: '/sobre' },
  { label: 'Blog', to: '/blog' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contato', to: '/contato' },
]
