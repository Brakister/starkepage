import { Link, useParams, Navigate } from 'react-router-dom'
import PageHero from '../components/PageHero'
import CtaSection from '../components/CtaSection'
import LazyImage from '../components/LazyImage'
import { getLinha, linhas } from '../data/produtos'
import { whatsappLink } from '../data/site'

export default function Linha() {
  const { linha } = useParams()
  const data = getLinha(linha)

  if (!data) return <Navigate to="/produtos/" replace />

  return (
    <>
      <PageHero
        kicker={data.nome}
        title={data.titulo}
        lead={`${data.descricao} Fale com um especialista para cotar peças da ${data.nome}.`}
      />

      <section className="section">
        <div className="container">
          <div className="grid grid-2" style={{ alignItems: 'center' }}>
            <div>
              <span className="kicker">{data.categoria}</span>
              <h2 style={{ marginTop: 0 }}>{data.titulo}</h2>
              <p>{data.descricao}</p>
              <p>
                Todos os componentes passam por conferência técnica de compatibilidade antes do
                envio, garantindo a aplicação correta e a durabilidade esperada pelo fabricante.
              </p>
              <div style={{ display: 'flex', gap: '0.9rem', flexWrap: 'wrap', marginTop: '1.2rem' }}>
                <a className="btn btn-red" href={whatsappLink()}>Solicite Orçamento</a>
                <Link className="btn btn-outline" to="/contato/">Falar com especialista</Link>
              </div>
            </div>
            <LazyImage src={data.imagem} alt={data.titulo} width="640" height="420" />
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <span className="kicker">Componentes</span>
            <h2>O que você encontra na {data.nome}</h2>
          </div>
          <div className="grid grid-3">
            {data.itens.map((i) => (
              <article className="card" key={i.nome}>
                <h3>{i.nome}</h3>
                <p>{i.detalhe}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="kicker">Outras linhas</span>
            <h2>Explore também</h2>
          </div>
          <div className="grid grid-3">
            {linhas
              .filter((l) => l.slug !== data.slug)
              .map((l) => (
                <article className="card" key={l.slug}>
                  <LazyImage src={l.imagem} alt={l.titulo} width="640" height="360" />
                  <h3>{l.titulo}</h3>
                  <p>{l.descricao}</p>
                  <Link className="link-more" to={`/produtos/${l.slug}/`}>Conhecer →</Link>
                </article>
              ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  )
}