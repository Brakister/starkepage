export const site = {
  name: 'Stärke Premium Parts',
  legalName: 'Starke Parts Comércio Importação e Exportação de Peças Automotivas Ltda.',
  cnpj: '26.397.330/0001-56',
  url: 'https://starkeparts.com',
  phone: '(11) 4102-1202',
  whatsappDisplay: '(11) 99963-1185',
  whatsappNumber: '5511999631185',
  email: 'contato@starkeparts.com.br',
  address: {
    street: 'Rua Américo Brasiliense, 2414',
    district: 'Chácara Santo Antônio',
    city: 'São Paulo',
    state: 'SP',
    zip: '04715-004',
  },
  geo: { latitude: -23.6271942, longitude: -46.7113214 },
  hours: 'Segunda a sexta, das 8h às 18h · Sábado, das 9h às 13h',
  branches: [
    { cidade: 'São Paulo', telefone: '(11) 4102-1202' },
    { cidade: 'Santos', telefone: '(13) 9920-59253' },
    { cidade: 'Campinas', telefone: '(19) 9782-04813' },
    { cidade: 'Sorocaba', telefone: '(15) 9880-47031' },
  ],
  social: {
    instagram: 'https://www.instagram.com/starkepremiumparts',
    facebook: 'https://www.facebook.com/starkepremium',
    linkedin: 'https://www.linkedin.com/company/starkeparts',
    youtube: 'https://www.youtube.com/@starkepremiumparts',
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

export const vehicleBrands = [
  'Porsche',
  'BMW',
  'Mercedes-Benz',
  'Audi',
  'Land Rover',
  'Ferrari',
  'Lamborghini',
  'Aston Martin',
  'Maserati',
  'Bentley',
  'Jaguar',
  'Volvo',
  'Mini',
  'Tesla',
]