import { useParams, Navigate, Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import CtaSection from '../components/CtaSection'
import LazyImage from '../components/LazyImage'
import { getMarca, marcas } from '../data/marcas'
import { whatsappLink } from '../data/site'

export default function Marca() {
  const { marca } = useParams()
  const data = getMarca(marca)

  if (!data) return <Navigate to="/marcas/" replace />

  return (
    <>
      <PageHero
        kicker="Marcas"
        title={`Peças ${data.name}`}
        lead={data.tagline}
      />

      <section className="section">
        <div className="container">
          <div className="grid grid-2" style={{ alignItems: 'center' }}>
            <LazyImage src={data.imagem} alt={`Peças ${data.name} importadas`} width="120" height="46" />
            <div>
              <h2 style={{ marginTop: 0 }}>Peças {data.name} com garantia</h2>
              <p>{data.descricao}</p>
              <p>
                Todos os componentes são conferidos por chassi ou código antes do envio, garantindo
                compatibilidade exata com o seu modelo.
              </p>
              <div style={{ display: 'flex', gap: '0.9rem', flexWrap: 'wrap', marginTop: '1.2rem' }}>
                <a className="btn btn-gold" href={whatsappLink()}>Solicite Orçamento</a>
                <Link className="btn btn-outline" to="/contato/">Falar com especialista</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <span className="kicker">Peças mais procuradas</span>
            <h2>Componentes populares para {data.name}</h2>
          </div>
          <ul className="grid grid-3" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {data.pecasPopulares.map((p) => (
              <li key={p}>
                <div className="card" style={{ marginBottom: 0 }}>
                  <h3 style={{ margin: 0 }}>{p}</h3>
                  <p className="muted" style={{ margin: '0.4rem 0 0' }}>Disponível com garantia de procedência.</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="kicker">Outras marcas</span>
            <h2>Veja também</h2>
          </div>
          <div className="brands-strip">
            {marcas
              .filter((m) => m.slug !== data.slug)
              .map((m) => (
                <Link className="brand-card" to={`/marcas/${m.slug}/`} key={m.slug}>
                  <LazyImage src={m.imagem} alt={`Peças ${m.name}`} width="120" height="46" />
                  <span>Peças {m.name}</span>
                </Link>
              ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  )
}