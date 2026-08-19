import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import CtaSection from '../components/CtaSection'
import LazyImage from '../components/LazyImage'
import { marcas } from '../data/marcas'

export default function Marcas() {
  return (
    <>
      <PageHero
        kicker="Marcas"
        title="Marcas de veículos importados atendidas"
        lead="Peças originais e de reposição premium para as principais marcas de carros e caminhões importados do mercado."
      />

      <section className="section">
        <div className="container">
          <div className="grid grid-3">
            {marcas.map((m) => (
              <article className="card" key={m.slug}>
                <LazyImage src={m.imagem} alt={`Logo de peças ${m.name}`} width="120" height="46" />
                <h3 style={{ marginTop: '0.4rem' }}>Peças {m.name}</h3>
                <p>{m.descricao}</p>
                <Link className="link-more" to={`/marcas/${m.slug}/`}>Ver peças {m.name} →</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <span className="kicker">Compatibilidade</span>
            <h2>Encontre a peça certa para a sua marca</h2>
            <p>
              Cada página de marca reúne os componentes mais procurados e orientações de
              compatibilidade por modelo e ano.
            </p>
          </div>
          <div className="brands-strip">
            {marcas.map((m) => (
              <Link className="brand-card" to={`/marcas/${m.slug}/`} key={m.slug}>
                <LazyImage src={m.imagem} alt={`Peças ${m.name}`} width="120" height="46" />
                <span>Peças {m.name}</span>
                <small>{m.tagline}</small>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaSection
        title="Não viu sua marca na lista?"
        text="Fazemos importação sob demanda para outras marcas. Envie sua solicitação e receba uma cotação."
      />
    </>
  )
}