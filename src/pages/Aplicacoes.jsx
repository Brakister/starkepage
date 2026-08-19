import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import CtaSection from '../components/CtaSection'
import LazyImage from '../components/LazyImage'

const aplicacoes = [
  {
    nome: 'Carros importados',
    slug: 'linha-leve',
    icone: '🚗',
    texto:
      'Peças para veículos de passeio premium: Porsche, BMW, Audi, Mercedes-Benz, Land Rover e Volvo. Freios, suspensão, filtros e componentes de motor.',
    imagem: '/images/linhas/car.svg',
  },
  {
    nome: 'Caminhões importados',
    slug: 'linha-pesada',
    icone: '🚚',
    texto:
      'Peças para caminhões e frotas pesadas: Mercedes-Benz, Volvo, Scania e Mitsubishi Fuso. Componentes de alta durabilidade para operação intensa.',
    imagem: '/images/linhas/truck.svg',
  },
  {
    nome: 'Off-road e máquinas',
    slug: 'industrial',
    icone: '🏗️',
    texto:
      'Peças industriais para equipamentos off-road, geradores, máquinas de construção e aplicações severas, com foco em reduzir paradas de produção.',
    imagem: '/images/linhas/industrial.svg',
  },
  {
    nome: 'Frotas e oficinas',
    slug: 'industrial',
    icone: '🏭',
    texto:
      'Fornecimento contínuo para oficinas, revendedores e frotas com planejamento de estoque, condições especiais e kits de manutenção preventiva.',
    imagem: '/images/aplicacoes-frota.svg',
  },
]

export default function Aplicacoes() {
  return (
    <>
      <PageHero
        kicker="Aplicações"
        title="Aplicações de peças automotivas importadas"
        lead="Conheça os segmentos atendidos pela Stärke: carros importados, caminhões, máquinas industriais e operações de frotas."
      />

      <section className="section">
        <div className="container">
          <div className="grid grid-2">
            {aplicacoes.map((a) => (
              <article className="card" key={a.nome} style={{ padding: 0, overflow: 'hidden' }}>
                <LazyImage src={a.imagem} alt={a.nome} width="640" height="360" />
                <div style={{ padding: '1.4rem' }}>
                  <h3>{a.nome}</h3>
                  <p>{a.texto}</p>
                  <Link className="link-more" to={`/produtos/${a.slug}/`}>Ver produtos →</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <span className="kicker">Cobertura</span>
            <h2>Atendimento em todo o Brasil</h2>
            <p>
              Com sede em São Paulo, enviamos peças para todos os estados, com logística planejada
              e opções de entrega expressa para urgências.
            </p>
          </div>
          <ul className="grid grid-3" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {['Sudeste', 'Sul', 'Centro-Oeste', 'Nordeste', 'Norte', 'Exportação'].map((r) => (
              <li key={r}>
                <div className="card feature">
                  <h3>{r}</h3>
                  <p>Entrega programada e suporte local via canais digitais.</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaSection
        title="Sua aplicação exige uma peça específica?"
        text="Envie os detalhes do veículo ou máquina e nossa equipe valida a melhor solução."
      />
    </>
  )
}