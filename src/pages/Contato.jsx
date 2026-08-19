import { useState } from 'react'
import PageHero from '../components/PageHero'
import { site, whatsappLink } from '../data/site'
import { IconWhatsapp, IconPhone } from '../components/Header'

export default function Contato() {
  const [sent, setSent] = useState(false)

  function onSubmit(e) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <>
      <PageHero
        kicker="Contato"
        title="Fale Conosco"
        lead="Solicite um orçamento de peças automotivas importadas ou tire suas dúvidas. Respondemos rapidamente pelo WhatsApp, e-mail ou formulário."
      />

      <section className="section">
        <div className="container contact-grid">
          <div>
            <span className="kicker">Envie sua solicitação</span>
            <h2 style={{ marginTop: 0 }}>Peça seu orçamento agora</h2>
            {sent ? (
              <div className="card" role="status">
                <h3>Recebemos sua mensagem!</h3>
                <p>
                  Nossa equipe entrará em contato em breve. Para agilizar, envie também o chassi ou
                  o código da peça pelo WhatsApp.
                </p>
                <a className="btn btn-whatsapp" href={whatsappLink()}>
                  <IconWhatsapp /> Continuar pelo WhatsApp
                </a>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="card">
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="nome">Nome</label>
                    <input id="nome" name="nome" type="text" required autoComplete="name" placeholder="Seu nome" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">E-mail</label>
                    <input id="email" name="email" type="email" required autoComplete="email" placeholder="seu@email.com" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="telefone">Telefone / WhatsApp</label>
                    <input id="telefone" name="telefone" type="tel" autoComplete="tel" placeholder="(11) 90000-0000" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="marca">Marca / modelo do veículo</label>
                    <select id="marca" name="marca">
                      <option value="">Selecione a marca</option>
                      <option>Porsche</option>
                      <option>BMW</option>
                      <option>Audi</option>
                      <option>Mercedes-Benz</option>
                      <option>Land Rover</option>
                      <option>Volvo</option>
                      <option>Mitsubishi</option>
                      <option>Caminhão importado</option>
                      <option>Industrial / máquinas</option>
                      <option>Outra</option>
                    </select>
                  </div>
                  <div className="form-group full">
                    <label htmlFor="mensagem">Mensagem</label>
                    <textarea
                      id="mensagem"
                      name="mensagem"
                      rows="5"
                      required
                      placeholder="Descreva a peça desejada: código, modelo, ano e quantidade (se aplicável)."
                    />
                  </div>
                </div>
                <div style={{ marginTop: '1.2rem' }}>
                  <button className="btn btn-gold" type="submit">Enviar solicitação</button>
                </div>
              </form>
            )}
          </div>

          <div>
            <span className="kicker">Canais de atendimento</span>
            <h2 style={{ marginTop: 0 }}>Fale com um especialista</h2>
            <ul className="contact-info" style={{ listStyle: 'none', padding: 0 }}>
              <li>
                <span className="ico" aria-hidden="true"><IconWhatsapp /></span>
                <span>
                  <strong>WhatsApp</strong><br />
                  <a href={whatsappLink()}>{site.whatsappDisplay}</a>
                </span>
              </li>
              <li>
                <span className="ico" aria-hidden="true"><IconPhone /></span>
                <span>
                  <strong>Telefone</strong><br />
                  <a href={`tel:${site.phone.replace(/\D/g, '')}`}>{site.phone}</a>
                </span>
              </li>
              <li>
                <span className="ico" aria-hidden="true">✉️</span>
                <span>
                  <strong>E-mail</strong><br />
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </span>
              </li>
              <li>
                <span className="ico" aria-hidden="true">📍</span>
                <span>
                  <strong>Matriz em São Paulo</strong><br />
                  {site.address.street}, {site.address.district}<br />
                  {site.address.city}/{site.address.state} – CEP {site.address.zip}
                </span>
              </li>
              <li>
                <span className="ico" aria-hidden="true">🕘</span>
                <span>
                  <strong>Horário de atendimento</strong><br />
                  {site.hours}
                </span>
              </li>
            </ul>
            <a className="btn btn-whatsapp" href={whatsappLink()} style={{ marginTop: '1rem' }}>
              <IconWhatsapp /> Atendimento imediato
            </a>
          </div>
        </div>
      </section>
    </>
  )
}