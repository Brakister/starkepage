import { Link } from 'react-router-dom'
import CtaSection from '../components/CtaSection'
import LazyImage from '../components/LazyImage'
import { linhas } from '../data/produtos'
import { marcas } from '../data/marcas'
import { blogPosts } from '../data/blog'
import { whatsappLink } from '../data/site'

const diferenciais = [
  {
    ico: '🛡️',
    titulo: 'Garantia de procedência',
    texto: 'Peças originais e de reposição premium com garantia conforme o fabricante.',
  },
  {
    ico: '🚚',
    titulo: 'Entrega rápida',
    texto: 'Envio para todo o Brasil com rastreamento e opção de entrega expressa.',
  },
  {
    ico: '🔧',
    titulo: 'Equipe especializada',
    texto: 'Consultoria técnica para validar compatibilidade antes de cada envio.',
  },
  {
    ico: '🌎',
    titulo: 'Importação sob demanda',
    texto: 'Localizamos peças raras em qualquer mercado internacional.',
  },
]

export default function Home() {
  const destaques = blogPosts.slice(0, 3)

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="kicker" style={{ color: '#ffd93b' }}>Stärke Premium Parts · São Paulo</span>
            <h1>Peças premium para carros <em>importados</em> e superesportivos</h1>
            <p className="lead">
              Importamos e distribuímos peças de alta performance para Porsche, BMW,
              Mercedes-Benz, Audi, Land Rover e demais marcas premium. Procedência comprovada,
              garantia e atendimento especializado para oficinas e concessionárias em todo o Brasil.
            </p>
            <div className="hero-actions">
              <a className="btn btn-gold" href="/produtos/">Ver produtos</a>
              <a className="btn btn-whatsapp" href={whatsappLink()}>Solicite Orçamento</a>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <b>2016</b>
                <span>no mercado premium</span>
              </div>
              <div className="stat">
                <b>20+</b>
                <span>marcas de autopeças parceiras</span>
              </div>
              <div className="stat">
                <b>100%</b>
                <span>peças com garantia</span>
              </div>
            </div>
          </div>
          <div className="hero-figure">
            <LazyImage
              src="/images/banner-hero.svg"
              alt="Carro premium importado com peças de reposição de alta qualidade"
              width="640"
              height="480"
              loading="eager"
            />
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="produtos-titulo">
        <div className="container">
          <div className="section-head">
            <span className="kicker">Linhas de produtos</span>
            <h2 id="produtos-titulo">Peças importadas para todas as aplicações</h2>
            <p>
              De componentes de motor e freios a suspensão, filtros e elétrica — sempre com
              procedência e padrão de fábrica.
            </p>
          </div>
          <div className="grid grid-3">
            {linhas.map((l) => (
              <article className="card" key={l.slug}>
                <LazyImage src={l.imagem} alt={`${l.titulo} – ${l.categoria}`} width="640" height="360" />
                <h3>{l.titulo}</h3>
                <p>{l.descricao}</p>
                <Link className="link-more" to={`/produtos/${l.slug}/`}>
                  Conhecer a {l.nome} →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt" aria-labelledby="sobre-resumo">
        <div className="container">
          <div className="section-head">
            <span className="kicker">Quem somos</span>
            <h2 id="sobre-resumo">Especialistas em peças para carros importados</h2>
            <p>
              Desde 2016, a Stärke Premium Parts importa e distribui peças de alta qualidade para
              as principais marcas premium, atendendo oficinas, revendedores e concessionárias em
              todo o Brasil.
            </p>
          </div>
          <div className="grid grid-2">
            <p className="muted" style={{ margin: 0 }}>
              Localizados em São Paulo, trabalhamos diretamente com os melhores fabricantes
              internacionais de autopeças. Nossa equipe técnica valida compatibilidade por chassi
              antes de cada envio, garantindo a peça certa na primeira entrega.
            </p>
            <p className="muted" style={{ margin: 0 }}>
              Do motor à suspensão, do freio à elétrica: oferecemos soluções em manutenção e
              importação para quem exige o melhor desempenho do seu veículo.
            </p>
          </div>
          <div style={{ marginTop: '1.5rem' }}>
            <Link className="btn btn-outline" to="/sobre/">Conhecer a Stärke →</Link>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="marcas-titulo">
        <div className="container">
          <div className="section-head">
            <span className="kicker">Marcas parceiras</span>
            <h2 id="marcas-titulo">Trabalhamos com os melhores fabricantes</h2>
            <p>Brembo, Bilstein, Mahle, NGK, Textar, KYB e outras marcas de referência mundial.</p>
          </div>
          <div className="brands-strip">
            {marcas.map((m) => (
              <Link className="brand-card" to={`/marcas/${m.slug}/`} key={m.slug}>
                <LazyImage src={m.imagem} alt={`Peças ${m.name}`} width="120" height="46" />
                <span>Peças {m.name}</span>
                <small>Importadas com garantia</small>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt" aria-labelledby="diferenciais-titulo">
        <div className="container">
          <div className="section-head">
            <span className="kicker">Diferenciais</span>
            <h2 id="diferenciais-titulo">Por que escolher a Stärke Premium Parts?</h2>
          </div>
          <div className="grid grid-4">
            {diferenciais.map((d) => (
              <div className="card feature" key={d.titulo}>
                <div className="ico" aria-hidden="true">{d.ico}</div>
                <h3>{d.titulo}</h3>
                <p>{d.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="blog-titulo">
        <div className="container">
          <div className="section-head">
            <span className="kicker">Novidades</span>
            <h2 id="blog-titulo">Guias e dicas do segmento</h2>
            <p>Conteúdo técnico para ajudar na escolha e manutenção de peças importadas.</p>
          </div>
          <div className="grid grid-3">
            {destaques.map((p) => (
              <article className="card" key={p.slug}>
                <LazyImage src={p.imagem} alt={p.titulo} width="640" height="360" />
                <span className="pill">{p.categoria}</span>
                <h3 style={{ marginTop: '0.6rem' }}>{p.titulo}</h3>
                <p>{p.resumo}</p>
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