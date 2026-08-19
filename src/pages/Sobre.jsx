import PageHero from '../components/PageHero'
import CtaSection from '../components/CtaSection'
import LazyImage from '../components/LazyImage'

const valores = [
  { titulo: 'Procedência', texto: 'Cada peça passa por conferência de origem e compatibilidade antes do envio.' },
  { titulo: 'Excelência', texto: 'Atendimento consultivo e técnico, do orçamento à entrega.' },
  { titulo: 'Confiabilidade', texto: 'Prazos cumpridos e garantia conforme o fabricante em todas as linhas.' },
  { titulo: 'Especialização', texto: 'Equipe focada exclusivamente em veículos importados premium.' },
]

export default function Sobre() {
  return (
    <>
      <PageHero
        kicker="Quem somos"
        title="Sobre a Stärke Premium Parts"
        lead="Distribuidora de peças automotivas importadas premium com mais de 15 anos de experiência no segmento de veículos de luxo."
      />

      <section className="section">
        <div className="container">
          <div className="grid grid-2" style={{ alignItems: 'center' }}>
            <div>
              <span className="kicker">Nossa história</span>
              <h2>Especialistas em peças automotivas importadas</h2>
              <p>
                A Stärke Premium Parts nasceu da percepção de que oficinas e proprietários de
                veículos importados sofriam com falta de procedência, prazos longos e peças
                incompatíveis. Criamos uma distribuidora que une rede internacional de fornecedores,
                conferência técnica e atendimento de verdade.
              </p>
              <p>
                Hoje, importamos peças originais BMW com garantia e atendemos Porsche, Audi,
                Mercedes-Benz, Land Rover, Volvo e Mitsubishi, além de caminhões importados e
                aplicações industriais. Nossa sede em São Paulo concentra estoque, logística e uma
                equipe técnica dedicada.
              </p>
            </div>
            <LazyImage
              src="/images/sobre.svg"
              alt="Equipe especializada da Stärke Premium Parts em escritório de São Paulo"
              width="640"
              height="480"
            />
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <span className="kicker">Missão e visão</span>
            <h2>Nosso propósito</h2>
          </div>
          <div className="grid grid-2">
            <div className="card">
              <h3>Missão</h3>
              <p>
                Garantir que veículos importados premium mantenham desempenho e valor por meio de
                peças com procedência comprovada e atendimento técnico especializado.
              </p>
            </div>
            <div className="card">
              <h3>Visão</h3>
              <p>
                Ser a distribuidora de referência em peças automotivas importadas premium no
                Brasil, reconhecida por confiança, qualidade e agilidade.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="kicker">Valores</span>
            <h2>O que guia nosso trabalho</h2>
          </div>
          <div className="grid grid-4">
            {valores.map((v) => (
              <div className="card feature" key={v.titulo}>
                <h3>{v.titulo}</h3>
                <p>{v.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaSection
        title="Trabalhe com quem entende de peças importadas"
        text="Solicite um orçamento e comprove a diferença do atendimento Stärke."
      />
    </>
  )
}