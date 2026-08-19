import PageHero from '../components/PageHero'
import CtaSection from '../components/CtaSection'
import LazyImage from '../components/LazyImage'
import { whatsappLink } from '../data/site'

const servicos = [
  {
    nome: 'Importação personalizada',
    icone: '🌎',
    texto:
      'Importamos peças sob demanda para modelos raros ou versões específicas. Cuidamos de cotação internacional, logística, nacionalização e tributos do início ao fim.',
    detalhes: ['Cotação em múltiplos fornecedores', 'Logística internacional e local', 'Desembaraço aduaneiro e impostos', 'Rastreamento completo'],
  },
  {
    nome: 'Entrega expressa',
    icone: '🚚',
    texto:
      'Para oficinas e frotas com urgência, oferecemos modalidade expressa com prioridade na expedição e transporte agilizado, reduzindo o tempo de parada do veículo.',
    detalhes: ['Expedição prioritária', 'Transporte agilizado', 'Acompanhamento do status', 'Atendimento a urgências'],
  },
  {
    nome: 'Consultoria técnica',
    icone: '🔧',
    texto:
      'Nossa equipe valida compatibilidade por chassi ou código da peça e orienta sobre a melhor opção entre original, paralela premium ou compatível.',
    detalhes: ['Validação por chassi ou código', 'Orientação original x paralela', 'Suporte à instalação', 'Kits de manutenção preventiva'],
  },
  {
    nome: 'Fornecimento a frotas e oficinas',
    icone: '🏭',
    texto:
      'Atendemos oficinas, revendedores e frotas com condições especiais, previsibilidade de estoque e parceria de longo prazo para manutenção contínua.',
    detalhes: ['Condições para volume', 'Planejamento de estoque', 'Contrato de fornecimento', 'Suporte prioritário'],
  },
]

export default function Servicos() {
  return (
    <>
      <PageHero
        kicker="Serviços"
        title="Serviços especializados em peças importadas"
        lead="Da importação personalizada à consultoria técnica, cuidamos de todo o processo para que você receba a peça certa, no prazo certo."
      />

      <section className="section">
        <div className="container">
          <div className="grid grid-2">
            {servicos.map((s) => (
              <article className="card" key={s.nome}>
                <div className="feature" style={{ textAlign: 'left', padding: 0 }}>
                  <div className="ico" style={{ margin: 0 }} aria-hidden="true">{s.icone}</div>
                  <h3 style={{ marginTop: '1rem' }}>{s.nome}</h3>
                  <p>{s.texto}</p>
                </div>
                <ul style={{ paddingLeft: '1.2rem', color: 'var(--muted)' }}>
                  {s.detalhes.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="grid grid-2" style={{ alignItems: 'center' }}>
            <LazyImage
              src="/images/servicos.svg"
              alt="Serviço de importação e consultoria técnica de peças automotivas premium"
              width="640"
              height="420"
            />
            <div>
              <span className="kicker">Como funciona</span>
              <h2 style={{ marginTop: 0 }}>Do orçamento à entrega em 4 passos</h2>
              <ol style={{ paddingLeft: '1.2rem', color: 'var(--ink-soft)' }}>
                <li><strong>1. Envie sua solicitação</strong> – pelo WhatsApp, formulário ou e-mail, com chassi ou código da peça.</li>
                <li><strong>2. Receba a proposta</strong> – com procedência, garantia, prazo e custos transparentes.</li>
                <li><strong>3. Acompanhe o processo</strong> – nossa equipe cuida da importação e logística.</li>
                <li><strong>4. Receba com garantia</strong> – peça conferida e pronta para instalação.</li>
              </ol>
              <div style={{ marginTop: '1.4rem' }}>
                <a className="btn btn-whatsapp" href={whatsappLink()}>Fale com nosso especialista</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaSection
        title="Precisa de um serviço personalizado?"
        text="Importamos peças raras e atendemos urgências com agilidade. Conte conosco."
      />
    </>
  )
}