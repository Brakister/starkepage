import { useParams, Navigate, Link } from 'react-router-dom'
import CtaSection from '../components/CtaSection'
import LazyImage from '../components/LazyImage'
import { getPost, blogPosts } from '../data/blog'
import { whatsappLink } from '../data/site'

function Block({ block }) {
  if (block.tipo === 'h2') return <h2>{block.texto}</h2>
  if (block.tipo === 'ul')
    return (
      <ul>
        {block.itens.map((i, idx) => (
          <li key={idx}>{i}</li>
        ))}
      </ul>
    )
  return <p>{block.texto}</p>
}

export default function Post() {
  const { slug } = useParams()
  const post = getPost(slug)

  if (!post) return <Navigate to="/blog/" replace />

  const relacionados = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3)

  return (
    <>
      <article className="page-hero" style={{ padding: '3.2rem 0 2.5rem' }}>
        <div className="container">
          <span className="kicker" style={{ color: '#ffd93b' }}>{post.categoria}</span>
          <h1>{post.titulo}</h1>
          <div className="post-meta" style={{ color: '#aeb3bd' }}>
            <span>Publicado em {post.data}</span>
            <span>{post.tempoLeitura} de leitura</span>
          </div>
        </div>
      </article>

      <section className="section" style={{ paddingTop: '2rem' }}>
        <div className="container">
          <div className="grid grid-2" style={{ alignItems: 'start', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)' }}>
            <div className="post-content">
              <LazyImage src={post.imagem} alt={post.titulo} width="840" height="420" />
              {post.conteudo.map((b, i) => (
                <Block key={i} block={b} />
              ))}
              <div style={{ marginTop: '2rem', padding: '1.4rem', background: 'var(--bg-alt)', borderRadius: 'var(--radius)' }}>
                <h3>Precisa dessa peça para o seu veículo?</h3>
                <p className="muted">
                  Envie o chassi ou o código da peça e receba um orçamento com garantia de
                  procedência e prazo.
                </p>
                <a className="btn btn-whatsapp" href={whatsappLink()}>Falar no WhatsApp</a>
              </div>
            </div>

            <aside aria-label="Artigos relacionados">
              <h3>Artigos relacionados</h3>
              <div className="grid" style={{ gap: '1rem' }}>
                {relacionados.map((r) => (
                  <article className="card" key={r.slug}>
                    <LazyImage src={r.imagem} alt={r.titulo} width="320" height="180" />
                    <span className="pill">{r.categoria}</span>
                    <h3 style={{ marginTop: '0.5rem', fontSize: '1.05rem' }}>{r.titulo}</h3>
                    <Link className="link-more" to={`/blog/${r.slug}/`}>Ler artigo →</Link>
                  </article>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  )
}