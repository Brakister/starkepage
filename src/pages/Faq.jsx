import PageHero from '../components/PageHero'
import CtaSection from '../components/CtaSection'
import { faqItems, faqFlat } from '../data/faq'
import { whatsappLink } from '../data/site'

export default function Faq() {
  return (
    <>
      <PageHero
        kicker="FAQ"
        title="Perguntas Frequentes"
        lead="Tire suas dúvidas sobre compra, garantia, prazo de entrega e instalação de peças automotivas importadas premium."
      />

      <section className="section">
        <div className="container">
          <div className="grid" style={{ gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', alignItems: 'start' }}>
            <div>
              {faqItems.map((grupo) => (
                <div key={grupo.grupo} style={{ marginBottom: '2rem' }}>
                  <h2 style={{ marginBottom: '1rem' }}>{grupo.grupo}</h2>
                  <div className="accordion">
                    {grupo.itens.map((item) => (
                      <details key={item.pergunta}>
                        <summary>{item.pergunta}</summary>
                        <div className="body">{item.resposta}</div>
                      </details>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <aside aria-label="Ainda com dúvidas">
              <div className="card">
                <h3>Ainda com dúvidas?</h3>
                <p>
                  Nossa equipe técnica está pronta para esclarecer questões sobre compatibilidade,
                  garantia e prazos.
                </p>
                <a className="btn btn-whatsapp" href={whatsappLink()}>Falar pelo WhatsApp</a>
                <a className="btn btn-outline" href="/contato/" style={{ marginTop: '0.6rem' }}>
                  Enviar mensagem
                </a>
              </div>
            </aside>
          </div>

          <div style={{ marginTop: '2.5rem' }}>
            <span className="kicker">Resumo rápido</span>
            <ul className="grid grid-2" style={{ listStyle: 'none', padding: 0, margin: '1rem 0 0' }}>
              {faqFlat.slice(0, 4).map((i) => (
                <li key={i.pergunta}>
                  <div className="card" style={{ marginBottom: 0 }}>
                    <h3 style={{ margin: 0, fontSize: '1.02rem' }}>{i.pergunta}</h3>
                    <p className="muted" style={{ margin: '0.5rem 0 0' }}>{i.resposta}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  )
}