import { Link } from 'react-router-dom'
import { navLinks, site, whatsappLink } from '../data/site'
import { marcas } from '../data/marcas'

function IconSocial({ type }) {
  if (type === 'youtube') {
    return (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
        <path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 00.5 6.2 31 31 0 000 12a31 31 0 00.5 5.8 3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1A31 31 0 0024 12a31 31 0 00-.5-5.8zM9.6 15.6V8.4L15.8 12l-6.2 3.6z" />
      </svg>
    )
  }
  if (type === 'instagram') {
    return (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
        <path d="M12 2.2c3.2 0 3.6 0 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s0 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58 0-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92C2.2 15.6 2.2 15.2 2.2 12s0-3.58.07-4.85C2.42 3.92 3.93 2.42 7.15 2.27 8.42 2.2 8.8 2.2 12 2.2zm0 2.03c-3.15 0-3.52 0-4.76.07-2.37.11-3.48 1.22-3.59 3.59-.07 1.24-.07 1.61-.07 4.76s0 3.52.07 4.76c.11 2.37 1.22 3.48 3.59 3.59 1.24.07 1.61.07 4.76.07s3.52 0 4.76-.07c2.37-.11 3.48-1.22 3.59-3.59.07-1.24.07-1.61.07-4.76s0-3.52-.07-4.76c-.11-2.37-1.22-3.48-3.59-3.59-1.24-.07-1.61-.07-4.76-.07zm0 3.46a5.29 5.29 0 110 10.58 5.29 5.29 0 010-10.58zm0 8.73a3.44 3.44 0 100-6.88 3.44 3.44 0 000 6.88zm6.8-8.94a1.24 1.24 0 11-2.48 0 1.24 1.24 0 012.48 0z" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zM8.34 18.34H5.67V9.75h2.67v8.59zM7 8.72a1.55 1.55 0 110-3.1 1.55 1.55 0 010 3.1zm11.34 9.62h-2.67v-4.18c0-1-.02-2.28-1.39-2.28-1.39 0-1.6 1.08-1.6 2.2v4.26H10v-8.59h2.56v1.17h.04c.36-.67 1.23-1.39 2.53-1.39 2.7 0 3.2 1.78 3.2 4.1v4.71z" />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <h4>Stärke Premium Parts</h4>
            <p>
              Distribuidora de peças automotivas premium para carros importados e superesportivos.
              Procedência, garantia e atendimento especializado em todo o Brasil.
            </p>
            <div className="social-row">
              <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <IconSocial type="instagram" />
              </a>
              <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <IconSocial type="facebook" />
              </a>
              <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <IconSocial type="linkedin" />
              </a>
              <a href={site.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <IconSocial type="youtube" />
              </a>
            </div>
          </div>
          <div>
            <h4>Navegação</h4>
            <ul>
              {navLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Marcas parceiras</h4>
            <ul>
              {marcas.slice(0, 6).map((m) => (
                <li key={m.slug}>
                  <Link to={`/marcas/${m.slug}/`}>Peças {m.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Contato</h4>
            <ul>
              <li>{site.address.street}, {site.address.district}</li>
              <li>{site.address.city}/{site.address.state} – CEP {site.address.zip}</li>
              <li>
                <a href={`tel:${site.phone.replace(/\D/g, '')}`}>{site.phone}</a>
              </li>
              <li>
                <a href={whatsappLink()}>WhatsApp: {site.whatsappDisplay}</a>
              </li>
              <li>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              <li>{site.hours}</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {site.legalName} · CNPJ {site.cnpj}.</span>
          <span>Todos os direitos reservados · São Paulo/SP</span>
        </div>
      </div>
    </footer>
  )
}
