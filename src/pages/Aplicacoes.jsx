import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import CtaSection from '../components/CtaSection'
import LazyImage from '../components/LazyImage'
import { vehicleBrands } from '../data/site'

const aplicacoes = [
  {
    nome: 'Motor e performance',
    icone: '⚙️',
    texto:
      'Componentes de motor, juntas, vedações e peças de alta performance para carros importados e superesportivos.',
  },
  {
    nome: 'Freios e segurança',
    icone: '🛑',
    texto:
      'Discos, pastilhas e pinças Brembo, Textar e TRW — desempenho e segurança no nível exigido pelo seu veículo.',
  },
  {
    nome: 'Suspensão',
    icone: '🔩',
    texto:
      'Amortecedores Bilstein, KYB, kit batente e coxim para conforto e estabilidade com padrão de fábrica.',
  },
  {
    nome: 'Filtros e lubrificantes',
    icone: '🫗',
    texto:
      'Filtros Mahle, Hengst e UFI, além de óleos e fluidos recomendados para motores importados.',
  },
  {
    nome: 'Elétrica e ignição',
    icone: '🔋',
    texto:
      'Velas NGK, bobinas, sensores e componentes elétricos com a especificação exata do fabricante.',
  },
  {
    nome: 'Importação sob demanda',
    icone: '🌎',
    texto:
      'Peças raras ou difíceis de encontrar? Localizamos no mercado internacional e cuidamos de todo o processo.',
  },
]

export default function Aplicacoes() {
  return (
    <>
      <PageHero
        kicker="Aplicações"
        title="Peças premium para carros importados"
        lead="Conheça as áreas de aplicação das peças que distribuímos e as marcas de veículos que atendemos."
      />

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="kicker">Áreas de aplicação</span>
            <h2 style={{ marginTop: 0 }}>Do motor à elétrica</h2>
          </div>
          <div className="grid grid-3">
            {aplicacoes.map((a) => (
              <article className="card feature" key={a.nome}>
                <div className="ico" aria-hidden="true">{a.icone}</div>
                <h3>{a.nome}</h3>
                <p>{a.texto}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <span className="kicker">Marcas de veículos atendidas</span>
            <h2>Carros importados e superesportivos</h2>
            <p>
              Atendemos as principais marcas premium do mercado brasileiro com peças de procedência
              comprovada.
            </p>
          </div>
          <ul className="tag-list">
            {vehicleBrands.map((b) => (
              <li key={b}>
                <span className="pill" style={{ padding: '0.55rem 1.1rem', fontSize: '0.9rem' }}>{b}</span>
              </li>
            ))}
          </ul>
          <div style={{ marginTop: '2rem' }}>
            <Link className="btn btn-outline" to="/contato/">Solicitar orçamento →</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid-2" style={{ alignItems: 'center' }}>
            <LazyImage
              src="/images/servicos.svg"
              alt="Peças premium importadas para carros de luxo"
              width="640"
              height="420"
            />
            <div>
              <span className="kicker">Cobertura nacional</span>
              <h2 style={{ marginTop: 0 }}>Atendimento em todo o Brasil</h2>
              <p>
                Com matriz em São Paulo e canais em Santos, Campinas e Sorocaba, enviamos peças para
                todos os estados com logística planejada e opção de entrega expressa.
              </p>
              <p>
                Oficinas, revendedores e concessionárias contam com condições especiais e
                previsibilidade de estoque.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CtaSection
        title="Sua aplicação exige uma peça específica?"
        text="Envie o chassi ou o código da peça e nossa equipe valida a melhor solução."
      />
    </>
  )
}