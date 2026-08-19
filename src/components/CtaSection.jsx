import { whatsappLink } from '../data/site'

export default function CtaSection({ title = 'Precisa de uma peça importada?', text = 'Fale com nossos especialistas e receba um orçamento com garantia de procedência e prazo de entrega.' }) {
  return (
    <section className="container" aria-label="Chamada para ação">
      <div className="cta-band">
        <h2>{title}</h2>
        <p>{text}</p>
        <div style={{ display: 'flex', gap: '0.9rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a className="btn btn-light" href={whatsappLink()}>Fale pelo WhatsApp</a>
          <a className="btn btn-outline" style={{ borderColor: '#fff', color: '#fff' }} href="/contato/">Solicite Orçamento</a>
        </div>
      </div>
    </section>
  )
}
