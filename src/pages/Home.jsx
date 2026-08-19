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
            <span className="kicker" style={{ color: '#f0556f' }}>Peças Automotivas Premium</span>
            <h1>Peças Automotivas Premium para Veículos Importados</h1>
            <p className="lead">
              Distribuímos peças automotivas importadas originais e de reposição premium para
              Porsche, BMW, Audi, Mercedes-Benz, Land Rover e caminhões importados. Com garantia,
              procedência e atendimento especializado.
            </p>
            <div className="hero-actions">
              <a className="btn btn-red" href="/produtos/">Ver produtos</a>
              <a className="btn btn-whatsapp" href={whatsappLink()}>Solicite Orçamento</a>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <b>+15</b>
                <span>anos no mercado</span>
              </div>
              <div className="stat">
                <b>7</b>
                <span>marcas premium atendidas</span>
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
            <span className="kicker">Nossas linhas</span>
            <h2 id="produtos-titulo">Peças importadas para todas as aplicações</h2>
            <p>
              Atendemos caminhões, veículos de passeio premium e máquinas industriais com
              componentes de alta durabilidade.
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
            <h2 id="sobre-resumo">Distribuidora líder em peças importadas premium</h2>
            <p>
              A Stärke Premium Parts importa peças originais BMW com garantia e atende oficinas,
              revendas e frotas em todo o Brasil. Nossa equipe técnica valida cada componente para
              garantir compatibilidade e desempenho.
            </p>
          </div>
          <div className="grid grid-2">
            <p className="muted" style={{ margin: 0 }}>
              Localizados em São Paulo, combinamos rede internacional de fornecedores com
              atendimento consultivo. Da linha leve à pesada, cuidamos do processo de importação de
              ponta a ponta: cotação, nacionalização, impostos e entrega.
            </p>
            <p className="muted" style={{ margin: 0 }}>
              Nosso compromisso é simples: a peça certa, com procedência comprovada, no prazo
              combinado. Conheça nossa história e fale com um especialista.
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
            <span className="kicker">Marcas atendidas</span>
            <h2 id="marcas-titulo">Peças originais e compatíveis</h2>
            <p>Encontre peças para as principais marcas de veículos importados do mercado.</p>
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