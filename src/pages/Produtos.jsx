import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import CtaSection from '../components/CtaSection'
import LazyImage from '../components/LazyImage'
import { linhas } from '../data/produtos'

export default function Produtos() {
  return (
    <>
      <PageHero
        kicker="Produtos"
        title="Peças automotivas importadas por linha"
        lead="Explore nossas linhas de peças importadas: pesada para caminhões, leve para veículos premium e industrial para máquinas e frotas."
      />

      <section className="section">
        <div className="container">
          <div className="grid" style={{ gap: '2rem' }}>
            {linhas.map((l) => (
              <article className="card" key={l.slug} style={{ padding: 0, overflow: 'hidden' }}>
                <div className="grid grid-2" style={{ gap: 0, alignItems: 'stretch' }}>
                  <LazyImage src={l.imagem} alt={`${l.titulo}: ${l.descricao}`} width="640" height="360" />
                  <div style={{ padding: '1.6rem' }}>
                    <span className="kicker">{l.nome}</span>
                    <h2 style={{ marginTop: 0 }}>{l.titulo}</h2>
                    <p>{l.descricao}</p>
                    <ul style={{ paddingLeft: '1.2rem', color: 'var(--muted)' }}>
                      {l.itens.slice(0, 4).map((i) => (
                        <li key={i.nome}>{i.nome}</li>
                      ))}
                    </ul>
                    <div style={{ marginTop: '1.2rem' }}>
                      <Link className="btn btn-red" to={`/produtos/${l.slug}/`}>
                        Ver {l.nome} →
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaSection
        title="Não encontrou a peça que precisa?"
        text="Fazemos importação sob demanda e localização de peças raras em qualquer mercado internacional."
      />
    </>
  )
}