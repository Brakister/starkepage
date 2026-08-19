import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="section" style={{ textAlign: 'center', paddingTop: '5rem' }}>
      <div className="container">
        <h1>Página não encontrada</h1>
        <p className="muted">O conteúdo que você procura pode ter sido movido ou removido.</p>
        <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.9rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link className="btn btn-gold" to="/">Voltar ao início</Link>
          <Link className="btn btn-outline" to="/produtos/">Ver produtos</Link>
        </div>
      </div>
    </section>
  )
}