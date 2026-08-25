import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Box,
  Building2,
  CarFront,
  ChevronRight,
  CircleGauge,
  Clock3,
  Factory,
  Filter,
  Gauge,
  Instagram,
  MapPin,
  Menu,
  PackageCheck,
  Phone,
  Settings2,
  ShieldCheck,
  Sparkles,
  Truck,
  Warehouse,
  Wrench,
  X,
  Zap
} from "lucide-react";

const WHATSAPP_NUMBER = "5511999999999"; // Substitua pelo número oficial.
const INSTAGRAM_URL = "https://instagram.com/starkepremiumparts";

const navItems = [
  ["Sobre", "#sobre"],
  ["Especialização", "#especializacao"],
  ["Marcas", "#marcas"],
  ["Linhas", "#linhas"],
  ["Logística", "#logistica"],
  ["Estrutura", "#estrutura"],
  ["Contato", "#contato"]
];

const stats = [
  ["2016", "início da nossa trajetória"],
  ["4", "operações estratégicas em SP"],
  ["20+", "marcas parceiras no portfólio"],
  ["Brasil", "cobertura nacional"]
];

const timeline = [
  {
    year: "2016",
    title: "O início",
    text: "A Stärke Parts nasce para atender o mercado brasileiro de veículos importados, premium e de alta performance, com foco em procedência, especialização e atendimento técnico."
  },
  {
    year: "2018",
    title: "Portfólio em expansão",
    text: "A operação amplia sua cobertura para freios, suspensão, motor, elétrica, arrefecimento, transmissão e outros sistemas essenciais, fortalecendo a proposta de solução completa."
  },
  {
    year: "2023–24",
    title: "Estrutura para crescer",
    text: "A empresa amplia capacidade de estoque, processos e operação logística, preparando a estrutura para responder com mais velocidade ao crescimento da demanda."
  },
  {
    year: "2024",
    title: "Nova fase e marca própria",
    text: "A expansão operacional ganha força e a FORSCHEN passa a integrar a estratégia da Stärke Parts como marca própria, ampliando possibilidades de portfólio e desenvolvimento."
  },
  {
    year: "2025",
    title: "Presença regional",
    text: "Campinas e Santos passam a integrar a operação, aproximando a marca de novos mercados e fortalecendo sua presença estratégica no estado de São Paulo."
  },
  {
    year: "2026",
    title: "Consolidação",
    text: "A Stärke Parts entra em uma nova etapa: mais madura, estruturada e consolidada entre as principais referências brasileiras do aftermarket automotivo premium."
  }
];

const vehicleBrands = [
  "Porsche", "BMW", "Mercedes-Benz", "Audi", "Land Rover", "Volvo",
  "Jaguar", "MINI", "Ferrari", "Lamborghini", "Volkswagen Premium"
];

const partnerGroups = [
  {
    label: "Bilstein Group",
    brands: ["febi", "SWAG", "Blue Friction"],
    note: "Portfólio alemão de referência para manutenção e reposição premium, com ampla cobertura de aplicações."
  },
  {
    label: "ZF Aftermarket",
    brands: ["TRW", "Lemförder", "SACHS"],
    note: "Tecnologia reconhecida mundialmente em direção, suspensão, transmissão, chassis e componentes de alta exigência."
  },
  {
    label: "Performance & manutenção",
    brands: ["Brembo", "Textar", "MAHLE", "Bosch", "Hengst", "HELLA", "Continental"],
    note: "Marcas globais para sistemas críticos, manutenção preventiva, segurança e performance."
  },
  {
    label: "Portfólio complementar",
    brands: ["HEPU", "GEBA", "BGA", "ÜRO Parts", "Hoffer", "Meat&Doria", "UFI", "Delphi", "Pierburg", "Sidem"],
    note: "Cobertura ampliada para diferentes sistemas, motorizações e necessidades do aftermarket premium."
  }
];

const productLines = [
  { icon: CarFront, title: "Freios", text: "Discos, pastilhas, sensores, pinças e componentes para frenagem com segurança, estabilidade e resposta." },
  { icon: Wrench, title: "Suspensão", text: "Braços, buchas, bandejas, amortecimento e componentes estruturais para conforto, controle e dirigibilidade." },
  { icon: CircleGauge, title: "Direção", text: "Terminais, barras, braços e componentes que preservam precisão, estabilidade e comportamento dinâmico." },
  { icon: Settings2, title: "Motor", text: "Componentes internos e periféricos para manutenção preventiva e corretiva de motores de alta exigência." },
  { icon: Sparkles, title: "Elétrica", text: "Sensores, módulos, atuadores e componentes elétricos para gerenciamento e funcionamento dos sistemas." },
  { icon: Zap, title: "Ignição & Injeção", text: "Bobinas, velas, sensores e componentes de alimentação e gerenciamento eletrônico." },
  { icon: Gauge, title: "Arrefecimento", text: "Bombas d'água, válvulas, termostatos, mangueiras e soluções para controle térmico eficiente." },
  { icon: Box, title: "Transmissão", text: "Componentes para transmissão, embreagem, câmbio e sistemas relacionados, com foco em confiabilidade." },
  { icon: PackageCheck, title: "Eixos & Rodagem", text: "Semieixos, juntas, cubos, rolamentos e componentes responsáveis pela transferência e estabilidade de movimento." },
  { icon: Filter, title: "Filtros", text: "Filtros de óleo, ar, combustível e cabine para proteção, eficiência e manutenção adequada." },
  { icon: Factory, title: "Combustível & Escape", text: "Bombas, válvulas, componentes de alimentação, emissões e sistemas de escape." }
];

const differentials = [
  {
    icon: ShieldCheck,
    title: "Procedência e curadoria",
    text: "Selecionamos fabricantes e linhas reconhecidas para atender o padrão técnico exigido por veículos premium."
  },
  {
    icon: BadgeCheck,
    title: "Aplicação especializada",
    text: "Apoio técnico para identificar a peça correta, reduzir retrabalho e aumentar a segurança de cada compra."
  },
  {
    icon: Warehouse,
    title: "Disponibilidade",
    text: "Estoque e distribuição orientados para ampliar cobertura e responder com mais agilidade às demandas do mercado."
  },
  {
    icon: Clock3,
    title: "Velocidade comercial",
    text: "Atendimento objetivo e processos pensados para tornar cotações, aplicações e pedidos mais eficientes."
  }
];

const locations = [
  {
    city: "São Paulo",
    label: "Matriz",
    subtitle: "Chácara Santo Antônio",
    detail: "Centro comercial e administrativo da operação, concentrando atendimento especializado, relacionamento com o mercado e suporte às demais unidades."
  },
  {
    city: "Sorocaba",
    label: "Centro de Distribuição",
    subtitle: "Operação logística",
    detail: "Estrutura dedicada a estoque, separação e distribuição, aumentando velocidade, disponibilidade e capacidade de atendimento regional."
  },
  {
    city: "Campinas",
    label: "Filial",
    subtitle: "Expansão regional",
    detail: "Presença estratégica para atender Campinas e região com mais proximidade, agilidade logística e suporte comercial especializado."
  },
  {
    city: "Santos",
    label: "Filial",
    subtitle: "Litoral paulista",
    detail: "Operação regional criada para ampliar cobertura e relacionamento com oficinas, lojistas e centros automotivos do litoral."
  }
];

const audiences = [
  ["Oficinas", "Especializadas e multimarcas premium que precisam de precisão na aplicação."],
  ["Centros automotivos", "Operações que valorizam produtividade, procedência e disponibilidade."],
  ["Lojistas", "Parceiros que buscam portfólio qualificado, cobertura e suporte comercial."],
  ["Clientes finais", "Proprietários que procuram orientação técnica e peças de qualidade para seus veículos."]
];

function BrandMark() {
  return (
    <a href="#topo" className="brand" aria-label="Stärke Parts - Início">
      <span className="brand-symbol">S</span>
      <span className="brand-name">STÄRKE <b>PARTS</b></span>
    </a>
  );
}

function HeroVisual() {
  return (
    <div className="hero-visual" aria-label="Composição visual Stärke Parts">
      <div className="hero-card hero-card-main">
        <div className="visual-kicker">STÄRKE PARTS</div>
        <div className="visual-title">PREMIUM<br/>AUTOMOTIVE<br/>PARTS</div>
        <div className="visual-line" />
        <div className="visual-bottom">
          <span>QUALIDADE</span><span>•</span><span>CONFIANÇA</span><span>•</span><span>PERFORMANCE</span>
        </div>
      </div>
      <div className="hero-card hero-card-mini">
        <span className="mini-dot" />
        <div>
          <small>ATENDIMENTO</small>
          <strong>ESPECIALIZADO</strong>
        </div>
      </div>
      <div className="hero-ring ring-1" />
      <div className="hero-ring ring-2" />
      <div className="hero-red-accent" />
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const year = useMemo(() => new Date().getFullYear(), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const nodes = document.querySelectorAll("[data-reveal]");
    if (!("IntersectionObserver" in window)) {
      nodes.forEach((node) => node.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Olá! Gostaria de falar com um especialista da Stärke Parts."
  )}`;

  return (
    <div id="topo">
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <div className="container header-inner">
          <BrandMark />

          <nav className="desktop-nav" aria-label="Navegação principal">
            {navItems.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
          </nav>

          <div className="header-actions">
            <a className="btn btn-small btn-primary hide-mobile" href={whatsappLink} target="_blank" rel="noreferrer">
              Falar com especialista <ArrowRight size={16} />
            </a>
            <button className="menu-toggle" onClick={() => setMenuOpen(true)} aria-label="Abrir menu">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`} aria-hidden={!menuOpen}>
        <button className="mobile-close" onClick={() => setMenuOpen(false)} aria-label="Fechar menu"><X size={26} /></button>
        <BrandMark />
        <nav>
          {navItems.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
        </nav>
        <a className="btn btn-primary" href={whatsappLink} target="_blank" rel="noreferrer">
          Falar com especialista <ArrowRight size={17} />
        </a>
      </div>

      <main>
        <section className="hero section-dark">
          <div className="hero-grid-pattern" />
          <div className="hero-glow hero-glow-1" />
          <div className="hero-glow hero-glow-2" />

          <div className="container hero-layout">
            <div className="hero-copy" data-reveal>
              <div className="eyebrow"><BadgeCheck size={16} /> Especialistas em autopeças premium</div>

              <h1>Performance exige <span>peças à altura.</span></h1>

              <p className="hero-text">
                Distribuição especializada de componentes para veículos premium, europeus e de alta performance — com portfólio global,
                aplicação precisa, procedência, estrutura logística e atendimento de quem realmente entende do assunto.
              </p>

              <div className="hero-ctas">
                <a className="btn btn-primary" href={whatsappLink} target="_blank" rel="noreferrer">
                  Solicitar atendimento <ArrowRight size={18} />
                </a>
                <a className="btn btn-ghost" href="#sobre">
                  Conhecer a Stärke <ChevronRight size={18} />
                </a>
              </div>

              <div className="hero-trust">
                <span><ShieldCheck size={18} /> Marcas reconhecidas mundialmente</span>
                <span><Truck size={18} /> Entregas em todo o Brasil</span>
                <span><BadgeCheck size={18} /> Aplicação especializada</span>
              </div>
            </div>

            <div data-reveal><HeroVisual /></div>
          </div>

          <div className="container stats-grid" data-reveal>
            {stats.map(([value, label]) => (
              <div className="stat" key={value}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="section section-light" id="sobre">
          <div className="container two-column about-intro">
            <div data-reveal>
              <div className="section-label">SOBRE A STÄRKE PARTS</div>
              <h2>Uma história construída com especialização, estrutura e confiança.</h2>
            </div>

            <div className="body-copy" data-reveal>
              <p className="lead-paragraph">
                A Stärke Parts nasceu em 2016 com uma proposta clara: elevar o padrão de fornecimento de autopeças para veículos importados,
                premium e de alta performance no Brasil.
              </p>
              <p>
                Desde então, a empresa evoluiu de forma consistente, ampliando linhas, parceiros, estrutura logística e presença regional.
                Hoje, atende oficinas especializadas, centros automotivos, lojistas, reparadores e consumidores que buscam precisão na aplicação,
                procedência e agilidade.
              </p>
              <p>
                A combinação entre conhecimento técnico, relacionamento com fabricantes globais e uma operação cada vez mais próxima do cliente
                sustenta o posicionamento da Stärke Parts em um dos segmentos mais exigentes do aftermarket.
              </p>

              <div className="quote-card">
                <span>NOSSO COMPROMISSO</span>
                <strong>Oferecemos peças.<br/>Entregamos confiança.</strong>
              </div>
            </div>
          </div>

          <div className="container story-shell" data-reveal>
            <div className="story-head">
              <div>
                <span>2016</span>
                <div className="story-line" />
                <span>2026</span>
              </div>
              <p>Uma trajetória marcada por expansão de portfólio, estrutura, presença e fortalecimento de marca.</p>
            </div>

            <div className="timeline-grid">
              {timeline.map((item) => (
                <article className="timeline-card" key={`${item.year}-${item.title}`}>
                  <div className="timeline-year">{item.year}</div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="container positioning-card" data-reveal>
            <div className="positioning-index">01</div>
            <div>
              <span>POSICIONAMENTO</span>
              <h3>Uma das principais referências do Brasil no aftermarket automotivo premium.</h3>
            </div>
            <p>
              Mais do que crescer em tamanho, a Stärke Parts evolui em capacidade: portfólio, conhecimento, logística, relacionamento e experiência.
              O objetivo é continuar avançando sem abrir mão daquilo que construiu sua reputação: confiança em cada detalhe.
            </p>
          </div>
        </section>

        <section className="section section-muted" id="especializacao">
          <div className="container">
            <div className="section-head" data-reveal>
              <div>
                <div className="section-label">ESPECIALIZAÇÃO</div>
                <h2>Para veículos que exigem outro nível de cuidado.</h2>
              </div>
              <p>
                Nosso portfólio é direcionado a marcas premium, esportivas e importadas, com foco em aplicações que exigem precisão técnica,
                procedência e confiabilidade.
              </p>
            </div>

            <div className="vehicle-grid" data-reveal>
              {vehicleBrands.map((brand, index) => (
                <div className="vehicle-chip" key={brand}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{brand}</strong>
                </div>
              ))}
            </div>

            <div className="specialization-note" data-reveal>
              <div><BadgeCheck size={20} /><strong>Aplicação correta</strong></div>
              <p>Para maior precisão no atendimento, nosso time pode trabalhar com dados completos do veículo e chassi na identificação das aplicações.</p>
            </div>
          </div>
        </section>

        <section className="section section-light" id="marcas">
          <div className="container">
            <div className="section-head" data-reveal>
              <div>
                <div className="section-label">MARCAS & PARCEIROS</div>
                <h2>Referências globais reunidas em um portfólio premium.</h2>
              </div>
              <p>
                Relações construídas com fabricantes e marcas reconhecidas mundialmente para ampliar cobertura, confiabilidade e qualidade técnica.
              </p>
            </div>

            <div className="partner-grid">
              {partnerGroups.map((group, index) => (
                <article className={`partner-card ${index === 0 ? "partner-featured" : ""}`} key={group.label} data-reveal>
                  <div className="partner-head">
                    <span>0{index + 1}</span>
                    <small>{group.label}</small>
                  </div>
                  <div className="partner-brands">
                    {group.brands.map((brand) => <strong key={brand}>{brand}</strong>)}
                  </div>
                  <p>{group.note}</p>
                </article>
              ))}
            </div>

            <div className="own-brand-card" data-reveal>
              <div>
                <span>MARCA PRÓPRIA</span>
                <h3>FORSCHEN</h3>
              </div>
              <p>
                Uma frente estratégica da Stärke Parts para desenvolver portfólio próprio, ampliar soluções e criar novas possibilidades dentro do mercado de reposição premium.
              </p>
              <div className="own-brand-mark">F</div>
            </div>
          </div>
        </section>

        <section className="section section-dark lines-section" id="linhas">
          <div className="container">
            <div className="section-head section-head-dark" data-reveal>
              <div>
                <div className="section-label">LINHAS DE PRODUTOS</div>
                <h2>Cobertura completa para os principais sistemas do veículo.</h2>
              </div>
              <p>
                Um mix técnico pensado para manutenção preventiva, corretiva e performance, com soluções para diferentes níveis de exigência.
              </p>
            </div>

            <div className="products-grid">
              {productLines.map(({ icon: Icon, title, text }, index) => (
                <article className="product-card" key={title} data-reveal>
                  <div className="product-number">{String(index + 1).padStart(2, "0")}</div>
                  <div className="product-icon"><Icon size={24} /></div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <span className="card-arrow"><ArrowRight size={18} /></span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-light">
          <div className="container">
            <div className="section-head" data-reveal>
              <div>
                <div className="section-label">POR QUE STÄRKE</div>
                <h2>Mais segurança para decidir. Mais agilidade para comprar.</h2>
              </div>
              <p>
                O diferencial está na combinação entre produto, conhecimento técnico, disponibilidade, estrutura e proximidade comercial.
              </p>
            </div>

            <div className="advantages-grid">
              {differentials.map(({ icon: Icon, title, text }, index) => (
                <article className={`advantage-card ${index === 0 ? "featured" : ""}`} key={title} data-reveal>
                  <div className="advantage-top">
                    <div className="advantage-icon"><Icon size={22} /></div>
                    <span>0{index + 1}</span>
                  </div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section logistics-section" id="logistica">
          <div className="container logistics-layout">
            <div className="logistics-copy" data-reveal>
              <div className="section-label">LOGÍSTICA</div>
              <h2>Agilidade que acompanha o ritmo da oficina e do mercado.</h2>
              <p>
                A operação logística da Stärke Parts foi estruturada para reduzir a distância entre demanda e solução. Estoque, separação,
                distribuição e atendimento trabalham de forma integrada para acelerar o fluxo do pedido.
              </p>

              <div className="logistics-points">
                <div><Truck size={20} /><span><strong>Grande São Paulo</strong>Entregas rápidas e programadas em regiões atendidas.</span></div>
                <div><Warehouse size={20} /><span><strong>Operação regional</strong>Suporte das filiais e centro de distribuição para ampliar a disponibilidade.</span></div>
                <div><PackageCheck size={20} /><span><strong>Todo o Brasil</strong>Envios nacionais para ampliar alcance e atender diferentes mercados.</span></div>
              </div>
            </div>

            <div className="logistics-visual" data-reveal>
              <div className="network-card">
                <div className="network-title"><span>STÄRKE NETWORK</span><strong>Operação conectada</strong></div>
                <div className="network-map">
                  <span className="route route-a" />
                  <span className="route route-b" />
                  <div className="network-node node-sp"><b>SP</b><small>Matriz</small></div>
                  <div className="network-node node-so"><b>SO</b><small>Sorocaba</small></div>
                  <div className="network-node node-cp"><b>CP</b><small>Campinas</small></div>
                  <div className="network-node node-st"><b>ST</b><small>Santos</small></div>
                </div>
                <div className="network-footer"><Truck size={18} /> DISTRIBUIÇÃO / AGILIDADE / COBERTURA</div>
              </div>
            </div>
          </div>
        </section>

        <section className="section section-muted" id="estrutura">
          <div className="container">
            <div className="section-head" data-reveal>
              <div>
                <div className="section-label">PRESENÇA & ESTRUTURA</div>
                <h2>Uma operação criada para estar mais perto.</h2>
              </div>
              <p>
                Quatro pontos estratégicos em São Paulo fortalecem atendimento, distribuição e relacionamento com diferentes regiões.
              </p>
            </div>

            <div className="locations-grid">
              {locations.map((location, index) => (
                <article className="location-card" key={location.city} data-reveal>
                  <div className="location-top">
                    <MapPin size={20} />
                    <span>0{index + 1}</span>
                  </div>
                  <small>{location.label}</small>
                  <h3>{location.city}</h3>
                  <b>{location.subtitle}</b>
                  <p>{location.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section business-section">
          <div className="container">
            <div className="section-head" data-reveal>
              <div>
                <div className="section-label">PARA QUEM É A STÄRKE</div>
                <h2>Do especialista para quem precisa acertar na primeira vez.</h2>
              </div>
              <p>
                Uma estrutura preparada para diferentes perfis do mercado, sempre com foco em orientação, procedência e eficiência no atendimento.
              </p>
            </div>

            <div className="audience-grid">
              {audiences.map(([title, text], index) => (
                <article className="audience-card" key={title} data-reveal>
                  <span>0{index + 1}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="cta-section" id="contato">
          <div className="container cta-card" data-reveal>
            <div className="cta-copy">
              <div className="section-label">FALE COM A STÄRKE PARTS</div>
              <h2>Encontre a peça certa com quem entende de aplicação.</h2>
              <p>
                Fale com nosso time e envie os dados do veículo ou o chassi completo para uma identificação mais precisa da aplicação.
                Quanto mais informações você fornecer, mais ágil e seguro será o atendimento.
              </p>
              <div className="cta-actions">
                <a className="btn btn-dark" href={whatsappLink} target="_blank" rel="noreferrer">
                  <Phone size={18} /> Chamar no WhatsApp
                </a>
                <a className="btn btn-outline-dark" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
                  <Instagram size={18} /> @starkepremiumparts
                </a>
              </div>
            </div>
            <div className="cta-visual">
              <div className="cta-badge">
                <Building2 size={28} />
                <span>STÄRKE</span>
                <strong>PARTS</strong>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <BrandMark />
            <p>Distribuição de autopeças premium, atendimento especializado e confiança em cada detalhe.</p>
          </div>

          <div>
            <h4>Navegação</h4>
            {navItems.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
          </div>

          <div>
            <h4>Atendimento</h4>
            <a href={whatsappLink} target="_blank" rel="noreferrer">WhatsApp</a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Instagram</a>
            <span>Entregas em todo o Brasil</span>
          </div>
        </div>

        <div className="container footer-bottom">
          <span>© {year} Stärke Parts. Todos os direitos reservados.</span>
          <span>Potência em Qualidade. Excelência em Cada Detalhe.</span>
        </div>
      </footer>
    </div>
  );
}
