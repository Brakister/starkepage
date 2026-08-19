import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import CtaSection from '../components/CtaSection'
import LazyImage from '../components/LazyImage'
import { blogPosts, blogCategorias } from '../data/blog'

export default function Blog() {
  return (
    <>
      <PageHero
        kicker="Blog"
        title="Guia de peças importadas e manutenção premium"
        lead="Guias técnicos, dicas de manutenção e novidades do segmento de peças automotivas importadas."
      />

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
              {blogCategorias.map((c) => (
                <span className="pill" key={c}>{c}</span>
              ))}
            </div>
          </div>
          <div className="grid grid-3">
            {blogPosts.map((p) => (
              <article className="card" key={p.slug}>
                <LazyImage src={p.imagem} alt={p.titulo} width="640" height="360" />
                <span className="pill">{p.categoria}</span>
                <h3 style={{ marginTop: '0.6rem' }}>{p.titulo}</h3>
                <p>{p.resumo}</p>
                <div className="post-meta" style={{ marginBottom: '0.8rem' }}>
                  <span>{p.data}</span>
                  <span>{p.tempoLeitura} de leitura</span>
                </div>
                <Link className="link-more" to={`/blog/${p.slug}/`}>Ler artigo →</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  )
}