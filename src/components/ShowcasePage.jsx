import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  ArrowRight, ArrowDown, BadgeCheck, Box, Building2, CarFront,
  ChevronRight, CircleGauge, Clock3, Factory, Filter, Gauge,
  Instagram, MapPin, Menu, PackageCheck, Phone, Settings2, ShieldCheck,
  Sparkles, Truck, Warehouse, Wrench, X, Zap, Target, Globe, Award
} from "lucide-react";

const brandNames = [
  "febi", "SWAG", "Blue Friction", "TRW", "Lemförder", "SACHS",
  "Brembo", "Textar", "MAHLE", "Bosch", "Hengst", "HELLA",
  "Continental", "HEPU", "GEBA", "BGA", "ÜRO Parts", "Delphi",
  "Pierburg", "Sidem", "FORSCHEN"
];

const WA = "5511999999999";
const IG = "https://instagram.com/starkepremiumparts";
const waLink = `https://wa.me/${WA}?text=${encodeURIComponent("Olá! Gostaria de falar com um especialista da Stärke Parts.")}`;

const slides = [
  { Icon: Sparkles, title: "Bem-vindo à", highlight: "STÄRKE", subtitle: "Distribuição especializada de autopeças premium para veículos importados, europeus e de alta performance.", accent: "QUALIDADE · CONFIANÇA · PERFORMANCE", particles: 18 },
  { Icon: ShieldCheck, title: "Procedência", highlight: "Garantida", subtitle: "Bilstein, ZF, Brembo, Bosch, MAHLE, Continental — marcas globais de referência reunidas em um portfólio curado.", accent: "20+ MARCAS PARCEIRAS", particles: 14 },
  { Icon: Truck, title: "Logística", highlight: "Conectada", subtitle: "4 operações estratégicas em São Paulo — Matriz, Centro de Distribuição, Campinas e Santos. Cobertura nacional.", accent: "COBERTURA NACIONAL", particles: 16 },
  { Icon: Zap, title: "Atendimento", highlight: "Especializado", subtitle: "Identificação por chassi, suporte técnico e agilidade. Oficinas, lojistas e centros automotivos confiam na Stärke.", accent: "APLICAÇÃO PRECISA", particles: 12 }
];

const nav = [
  ["Sobre", "#sobre"],
  ["Especialização", "#especializacao"],
  ["Marcas", "#marcas"],
  ["Logística", "#logistica"],
  ["Estrutura", "#estrutura"],
  ["Contato", "#contato"]
];

const timeline = [
  { year: "2016", title: "O início", text: "Nasce a Stärke Parts para atender o mercado brasileiro de veículos importados, premium e de alta performance.", icon: Building2 },
  { year: "2018", title: "Expansão", text: "O portfólio amplia para freios, suspensão, motor, elétrica, arrefecimento e transmissão.", icon: PackageCheck },
  { year: "2023", title: "Estrutura", text: "A empresa amplia capacidade de estoque, processos e operação logística para crescer.", icon: Warehouse },
  { year: "2024", title: "Marca própria", text: "A FORSCHEN integra a estratégia como marca própria, ampliando possibilidades de portfólio.", icon: Award },
  { year: "2025", title: "Presença", text: "Campinas e Santos entram na operação, aproximando a marca de novos mercados.", icon: MapPin },
  { year: "2026", title: "Consolidação", text: "A Stärke entra em nova etapa: madura, estruturada e consolidada entre as referências do aftermarket.", icon: Target }
];

const vehicleBrands = [
  "Porsche", "BMW", "Mercedes-Benz", "Audi", "Land Rover", "Volvo",
  "Jaguar", "MINI", "Ferrari", "Lamborghini", "VW Premium"
];

const partnerGroups = [
  { label: "Bilstein Group", brands: ["febi", "SWAG", "Blue Friction"], note: "Portfólio alemão de referência para manutenção e reposição premium." },
  { label: "ZF Aftermarket", brands: ["TRW", "Lemförder", "SACHS"], note: "Tecnologia mundial em direção, suspensão, transmissão, chassis." },
  { label: "Performance", brands: ["Brembo", "Textar", "MAHLE", "Bosch", "Hengst", "HELLA", "Continental"], note: "Marcas globais para sistemas críticos, segurança e performance." },
  { label: "Complementar", brands: ["HEPU", "GEBA", "BGA", "ÜRO Parts", "Hoffer", "Meat&Doria", "UFI", "Delphi", "Pierburg", "Sidem"], note: "Cobertura ampliada para diferentes sistemas e motorizações." }
];

const productLines = [
  { icon: CarFront, title: "Freios", text: "Discos, pastilhas, sensores e pinças para frenagem segura e precisa." },
  { icon: Wrench, title: "Suspensão", text: "Braços, buchas, bandejas e amortecimento para conforto e dirigibilidade." },
  { icon: CircleGauge, title: "Direção", text: "Terminais, barras e braços que preservam precisão e estabilidade." },
  { icon: Settings2, title: "Motor", text: "Componentes para manutenção preventiva e corretiva de alta exigência." },
  { icon: Sparkles, title: "Elétrica", text: "Sensores, módulos e atuadores para gerenciamento eletrônico." },
  { icon: Zap, title: "Ignição", text: "Bobinas, velas e componentes de alimentação eletrônica." },
  { icon: Gauge, title: "Arrefecimento", text: "Bombas, termostatos e soluções para controle térmico." },
  { icon: Box, title: "Transmissão", text: "Componentes para câmbio, embreagem e confiabilidade mecânica." },
  { icon: Filter, title: "Filtros", text: "Óleo, ar, combustível e cabine para proteção do motor." }
];

const differentials = [
  { icon: ShieldCheck, title: "Procedência", text: "Selecionamos fabricantes reconhecidos para atender o padrão premium." },
  { icon: BadgeCheck, title: "Aplicação", text: "Apoio técnico para identificar a peça correta, sem retrabalho." },
  { icon: Warehouse, title: "Disponibilidade", text: "Estoque e distribuição para responder com agilidade ao mercado." },
  { icon: Clock3, title: "Velocidade", text: "Atendimento objetivo, processos eficientes do pedido à entrega." }
];

const locations = [
  { city: "São Paulo", label: "Matriz", sub: "Chácara Santo Antônio", detail: "Centro comercial e administrativo da operação." },
  { city: "Sorocaba", label: "Centro de Distribuição", sub: "Operação logística", detail: "Estoque, separação e distribuição com agilidade." },
  { city: "Campinas", label: "Filial", sub: "Expansão regional", detail: "Proximidade e suporte para Campinas e região." },
  { city: "Santos", label: "Filial", sub: "Litoral paulista", detail: "Cobertura e relacionamento com o litoral." }
];

const audiences = [
  ["Oficinas", "Especializadas e multimarcas premium que precisam de precisão."],
  ["Centros automotivos", "Operações que valorizam produtividade e procedência."],
  ["Lojistas", "Parceiros que buscam portfólio qualificado e suporte."],
  ["Clientes finais", "Proprietários que procuram orientação e qualidade."]
];

const roadmapData = [
  { year: "2016", title: "O Início", category: "Fundação", icon: Building2, color: "var(--yellow)", details: ["Nasce a Stärke Parts com foco em veículos importados e premium", "Primeiras parcerias com fabricantes globais", "Atendimento especializado desde o primeiro dia"] },
  { year: "2018", title: "Expansão", category: "Crescimento", icon: PackageCheck, color: "var(--red)", details: ["Ampliação para freios, suspensão, motor, elétrica, arrefecimento", "Entrada de Brembo, Textar, MAHLE, Bosch, Continental", "Consolidação como solução completa"] },
  { year: "2023", title: "Estrutura", category: "Operação", icon: Warehouse, color: "#888", details: ["Ampliação de capacidade de estoque e processos", "Novos sistemas de gestão e automação", "Preparação para escalar a demanda"] },
  { year: "2024", title: "FORSCHEN", category: "Inovação", icon: Award, color: "var(--yellow)", details: ["Lançamento da marca própria estratégica", "Portfólio exclusivo com padrão premium", "Nova frente de P&D e controle de qualidade"] },
  { year: "2025", title: "Presença", category: "Expansão", icon: MapPin, color: "var(--red)", details: ["Filiais em Campinas e Santos", "Proximidade com interior e litoral paulista", "Suporte comercial regional"] },
  { year: "2026", title: "Consolidação", category: "Liderança", icon: Target, color: "#888", details: ["Referência consolidada no aftermarket premium", "Novos segmentos: clássicos, competição, elétricos", "Plataforma digital B2B completa"] }
];

function useReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll("[data-reveal]");
    if (!("IntersectionObserver" in window)) {
      nodes.forEach((n) => n.classList.add("is-visible"));
      return;
    }
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.08 });
    nodes.forEach((n) => obs.observe(n));
    return () => obs.disconnect();
  });
}

export default function ShowcasePage() {
  const [welcome, setWelcome] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [rmIdx, setRmIdx] = useState(0);
  const [rmScroll, setRmScroll] = useState(0);
  const rmTrack = useRef(null);
  const rmCards = useRef([]);
  const year = new Date().getFullYear();

  useReveal();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 18);
    h();
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    document.body.style.overflow = welcome ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [welcome]);

  const snapCard = useCallback((i) => {
    const card = rmCards.current[i];
    const track = rmTrack.current;
    if (!card || !track) return;
    const l = track.scrollLeft + card.getBoundingClientRect().left - track.getBoundingClientRect().left - (track.clientWidth - card.offsetWidth) / 2;
    track.scrollTo({ left: l, behavior: "smooth" });
    setRmIdx(i);
  }, []);

  const onRmScroll = useCallback(() => {
    const track = rmTrack.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    setRmScroll(max > 0 ? track.scrollLeft / max : 0);
    let best = 0, bestD = Infinity;
    rmCards.current.forEach((c, i) => {
      if (!c) return;
      const d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - track.scrollLeft - track.clientWidth / 2);
      if (d < bestD) { bestD = d; best = i; }
    });
    setRmIdx(best);
  }, []);

  const enter = () => {
    setWelcome(false);
    setTimeout(() => {
      document.querySelectorAll("[data-reveal]").forEach((n) => {
        const obs = new IntersectionObserver(([e]) => {
          if (e.isIntersecting) { e.target.classList.add("is-visible"); obs.unobserve(e.target); }
        }, { threshold: 0.08 });
        obs.observe(n);
      });
    }, 100);
  };

  const active = roadmapData[rmIdx];

  return (
    <div id="topo">
      {welcome && <div className="welcome-overlay"><WelcomeInner onEnter={enter} /></div>}

      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <div className="container header-inner">
          <a href="#topo" className="brand" aria-label="Stärke Parts">
            <span className="brand-symbol">S</span>
            <span className="brand-name">STÄRKE <b>PARTS</b></span>
          </a>
          <nav className="desktop-nav">
            {nav.map(([l, h]) => <a key={h} href={h}>{l}</a>)}
          </nav>
          <div className="header-actions">
            <a className="btn btn-small btn-primary hide-mobile" href={waLink} target="_blank" rel="noreferrer">
              Falar com especialista <ArrowRight size={16} />
            </a>
            <button className="menu-toggle" onClick={() => setMenuOpen(true)} aria-label="Menu">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`} aria-hidden={!menuOpen}>
        <button className="mobile-close" onClick={() => setMenuOpen(false)}><X size={26} /></button>
        <a href="#topo" className="brand"><span className="brand-symbol">S</span><span className="brand-name">STÄRKE <b>PARTS</b></span></a>
        <nav>{nav.map(([l, h]) => <a key={h} href={h} onClick={() => setMenuOpen(false)}>{l}</a>)}</nav>
        <a className="btn btn-primary" href={waLink} target="_blank" rel="noreferrer">Falar com especialista <ArrowRight size={17} /></a>
      </div>

      <main>
        <section className="hero section-dark" id="hero">
          <div className="hero-grid-pattern" />
          <div className="hero-glow hero-glow-1" />
          <div className="hero-glow hero-glow-2" />
          <div className="container hero-layout">
            <div className="hero-copy" data-reveal>
              <div className="eyebrow"><BadgeCheck size={16} /> Especialistas em autopeças premium</div>
              <h1>Performance exige <span>peças à altura.</span></h1>
              <p className="hero-text">Distribuição especializada de componentes para veículos premium, europeus e de alta performance — com portfólio global, aplicação precisa e estrutura logística.</p>
              <div className="hero-ctas">
                <a className="btn btn-primary" href={waLink} target="_blank" rel="noreferrer">Solicitar atendimento <ArrowRight size={18} /></a>
                <a className="btn btn-ghost" href="#sobre">Conhecer a Stärke <ChevronRight size={18} /></a>
              </div>
              <div className="hero-trust">
                <span><ShieldCheck size={18} /> Marcas reconhecidas</span>
                <span><Truck size={18} /> Entregas nacionais</span>
                <span><BadgeCheck size={18} /> Aplicação especializada</span>
              </div>
            </div>
            <div className="hero-visual-wrap" data-reveal>
              <div className="hero-visual-float">
                <div className="hf-card hf-main">
                  <img src="/Logo.webp" alt="Stärke Parts" className="hf-logo" />
                  <div className="hf-kicker">STÄRKE PARTS</div>
                  <div className="hf-title">PREMIUM<br/>AUTOMOTIVE<br/>PARTS</div>
                  <div className="hf-line" />
                  <div className="hf-bottom"><span>QUALIDADE</span><span>·</span><span>CONFIANÇA</span><span>·</span><span>PERFORMANCE</span></div>
                </div>
                <div className="hf-card hf-mini">
                  <span className="mini-dot" />
                  <div><small>ATENDIMENTO</small><strong>ESPECIALIZADO</strong></div>
                </div>
                <div className="hf-ring hf-r1" />
                <div className="hf-ring hf-r2" />
              </div>
            </div>
          </div>
          <div className="container stats-grid" data-reveal>
            {[["2016", "início da trajetória"], ["4", "operações em SP"], ["20+", "marcas parceiras"], ["Brasil", "cobertura nacional"]].map(([v, l]) => (
              <div className="stat" key={v}><strong>{v}</strong><span>{l}</span></div>
            ))}
          </div>
        </section>

        <section className="section section-light" id="sobre">
          <div className="container two-column">
            <div data-reveal>
              <div className="section-label">SOBRE A STÄRKE PARTS</div>
              <h2>Uma história construída com especialização e confiança.</h2>
            </div>
            <div className="body-copy" data-reveal>
              <p className="lead-paragraph">A Stärke Parts nasceu em 2016 com uma proposta clara: elevar o padrão de fornecimento de autopeças para veículos importados e premium no Brasil.</p>
              <p>Desde então, evoluiu de forma consistente — ampliando linhas, parceiros, estrutura logística e presença regional. Hoje, atende quem busca precisão, procedência e agilidade.</p>
              <div className="quote-card">
                <span>NOSSO COMPROMISSO</span>
                <strong>Oferecemos peças.<br/>Entregamos confiança.</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="section section-muted" id="timeline">
          <div className="container">
            <div className="section-head" data-reveal>
              <div>
                <div className="section-label">NOSSA JORNADA</div>
                <h2>Da fundação à liderança.</h2>
              </div>
              <p>Arraste, role ou clique para navegar pela linha do tempo interativa.</p>
            </div>
            <div className="rm-wrapper" data-reveal>
              <div className="rm-progress"><div className="rm-fill" style={{ width: `${rmScroll * 100}%` }} /></div>
              <div className="rm-track" ref={rmTrack} onScroll={onRmScroll}>
                {roadmapData.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <article key={i} ref={(el) => { rmCards.current[i] = el; }} className={`rm-card ${i === rmIdx ? "active" : ""} ${i < rmIdx ? "passed" : ""}`} onClick={() => snapCard(i)}>
                      <div className="rm-card-head">
                        <div className="rm-year-badge" style={{ color: item.color, background: `${item.color}18` }}>{item.year}</div>
                        <div className="rm-card-icon" style={{ color: item.color, background: `${item.color}18` }}><Icon size={26} /></div>
                      </div>
                      <div className="rm-card-cat" style={{ color: item.color }}>{item.category}</div>
                      <h3 className="rm-card-title">{item.title}</h3>
                      <ul className="rm-card-list">{item.details.map((d, j) => <li key={j}>{d}</li>)}</ul>
                    </article>
                  );
                })}
              </div>
            </div>
            <div className="rm-nav" data-reveal>
              <button className="rm-nav-btn" onClick={() => snapCard(Math.max(0, rmIdx - 1))} disabled={rmIdx === 0}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6" /></svg>
              </button>
              <div className="rm-pips">{roadmapData.map((_, i) => <span key={i} className={`rm-pip ${i === rmIdx ? "on" : ""}`} onClick={() => snapCard(i)} />)}</div>
              <button className="rm-nav-btn" onClick={() => snapCard(Math.min(roadmapData.length - 1, rmIdx + 1))} disabled={rmIdx === roadmapData.length - 1}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6" /></svg>
              </button>
            </div>
            <div className="rm-detail" data-reveal>
              <div className="rm-detail-head">
                <div className="rm-detail-icon" style={{ color: active.color, background: `${active.color}18` }}><active.icon size={30} /></div>
                <div><div className="rm-detail-cat" style={{ color: active.color }}>{active.category}</div><h3>{active.title}</h3></div>
                <div className="rm-detail-year" style={{ color: active.color }}>{active.year}</div>
              </div>
              <p className="rm-detail-text">{active.details[0]}</p>
            </div>
          </div>
        </section>

        <section className="section section-light" id="especializacao">
          <div className="container">
            <div className="section-head" data-reveal>
              <div><div className="section-label">ESPECIALIZAÇÃO</div><h2>Para veículos que exigem outro nível.</h2></div>
              <p>Foco em marcas premium, esportivas e importadas — precisão técnica e confiabilidade.</p>
            </div>
            <div className="vehicle-grid" data-reveal>
              {vehicleBrands.map((b, i) => <div className="vehicle-chip" key={b}><span>{String(i + 1).padStart(2, "0")}</span><strong>{b}</strong></div>)}
            </div>
          </div>
        </section>

        <section className="section section-muted" id="marcas">
          <div className="container">
            <div className="section-head" data-reveal>
              <div><div className="section-label">MARCAS & PARCEIROS</div><h2>Referências globais em um portfólio premium.</h2></div>
              <p>Relações com fabricantes reconhecidos mundialmente para cobertura e qualidade técnica.</p>
            </div>
          </div>
          <div className="marquee" data-reveal>
            <div className="marquee-track">
              {[...brandNames, ...brandNames].map((name, i) => (
                <span className="marquee-item" key={i}>{name}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-dark lines-section" id="linhas">
          <div className="container">
            <div className="section-head section-head-dark" data-reveal>
              <div><div className="section-label">LINHAS DE PRODUTOS</div><h2>Cobertura completa para os sistemas do veículo.</h2></div>
              <p>Manutenção preventiva, corretiva e performance com soluções para cada nível de exigência.</p>
            </div>
            <div className="products-grid" data-reveal>
              {productLines.map(({ icon: Icon, title, text }, i) => (
                <article className="product-card" key={title}>
                  <div className="product-number">{String(i + 1).padStart(2, "0")}</div>
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
              <div><div className="section-label">POR QUE STÄRKE</div><h2>Mais segurança. Mais agilidade.</h2></div>
              <p>Produto, conhecimento técnico, disponibilidade e proximidade comercial.</p>
            </div>
            <div className="advantages-grid" data-reveal>
              {differentials.map(({ icon: Icon, title, text }, i) => (
                <article className={`advantage-card ${i === 0 ? "featured" : ""}`} key={title}>
                  <div className="advantage-top"><div className="advantage-icon"><Icon size={22} /></div><span>0{i + 1}</span></div>
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
              <h2>Agilidade que acompanha o mercado.</h2>
              <p>Estoque, separação e distribuição integrados para acelerar o fluxo do pedido.</p>
              <div className="logistics-points">
                <div><Truck size={20} /><span><strong>Grande São Paulo</strong>Entregas rápidas e programadas.</span></div>
                <div><Warehouse size={20} /><span><strong>Operação Regional</strong>4 pontos estratégicos de cobertura.</span></div>
                <div><MapPin size={20} /><span><strong>Todo o Brasil</strong>Envios nacionais para diferentes mercados.</span></div>
              </div>
            </div>
            <div className="logistics-visual" data-reveal>
              <div className="network-card">
                <div className="network-title"><span>STÄRKE NETWORK</span><strong>Operação conectada</strong></div>
                <div className="network-map">
                  <span className="route route-a" /><span className="route route-b" />
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
              <div><div className="section-label">PRESENÇA & ESTRUTURA</div><h2>Uma operação para estar mais perto.</h2></div>
              <p>Quatro pontos estratégicos em São Paulo para atendimento, distribuição e relacionamento.</p>
            </div>
            <div className="locations-grid" data-reveal>
              {locations.map((l, i) => (
                <article className="location-card" key={l.city}>
                  <div className="location-top"><MapPin size={20} /><span>0{i + 1}</span></div>
                  <small>{l.label}</small>
                  <h3>{l.city}</h3>
                  <b>{l.sub}</b>
                  <p>{l.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section business-section">
          <div className="container">
            <div className="section-head" data-reveal>
              <div><div className="section-label">PARA QUEM É</div><h2>Do especialista para quem acerta na primeira vez.</h2></div>
              <p>Atendimento preparado para diferentes perfis do mercado automotivo.</p>
            </div>
            <div className="audience-grid" data-reveal>
              {audiences.map(([t, d], i) => (
                <article className="audience-card" key={t}>
                  <span>0{i + 1}</span>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="cta-section" id="contato">
          <div className="container cta-card" data-reveal>
            <div className="cta-copy">
              <div className="section-label">FALE COM A STÄRKE</div>
              <h2>Encontre a peça certa com quem entende.</h2>
              <p>Envie dados do veículo ou chassi para identificação precisa. Quanto mais informações, mais ágil o atendimento.</p>
              <div className="cta-actions">
                <a className="btn btn-dark" href={waLink} target="_blank" rel="noreferrer"><Phone size={18} /> Chamar no WhatsApp</a>
                <a className="btn btn-outline-dark" href={IG} target="_blank" rel="noreferrer"><Instagram size={18} /> @starkepremiumparts</a>
              </div>
            </div>
            <div className="cta-visual">
              <div className="cta-badge"><Building2 size={28} /><span>STÄRKE</span><strong>PARTS</strong></div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <a href="#topo" className="brand"><span className="brand-symbol">S</span><span className="brand-name">STÄRKE <b>PARTS</b></span></a>
            <p>Distribuição de autopeças premium, atendimento especializado e confiança em cada detalhe.</p>
          </div>
          <div><h4>Navegação</h4>{nav.map(([l, h]) => <a key={h} href={h}>{l}</a>)}</div>
          <div><h4>Atendimento</h4><a href={waLink} target="_blank" rel="noreferrer">WhatsApp</a><a href={IG} target="_blank" rel="noreferrer">Instagram</a><span>Entregas em todo o Brasil</span></div>
        </div>
        <div className="container footer-bottom">
          <span>© {year} Stärke Parts. Todos os direitos reservados.</span>
          <span>Potência em Qualidade. Excelência em Cada Detalhe.</span>
        </div>
      </footer>
    </div>
  );
}

function WelcomeInner({ onEnter }) {
  const [idx, setIdx] = useState(0);
  const [locked, setLocked] = useState(false);
  const mouse = useRef({ x: 0, y: 0 });
  const layers = useRef([]);
  const touchY = useRef(null);

  const go = useCallback((d) => {
    if (locked) return;
    const next = idx + d;
    if (next < 0 || next >= slides.length) { if (d > 0) onEnter?.(); return; }
    setLocked(true);
    setIdx(next);
    setTimeout(() => setLocked(false), 900);
  }, [idx, locked, onEnter]);

  useEffect(() => {
    const onWheel = (e) => go(e.deltaY > 0 ? 1 : -1);
    const onKey = (e) => {
      if (["ArrowDown", "ArrowUp", "PageDown", "PageUp", " "].includes(e.key)) {
        e.preventDefault();
        go(e.key === "ArrowDown" || e.key === "PageDown" || e.key === " " ? 1 : -1);
      }
    };
    const onTouchS = (e) => { touchY.current = e.touches[0].clientY; };
    const onTouchE = (e) => {
      if (touchY.current === null) return;
      const d = touchY.current - e.changedTouches[0].clientY;
      touchY.current = null;
      if (Math.abs(d) > 40) go(d > 0 ? 1 : -1);
    };
    const onMouse = (e) => {
      mouse.current = { x: (e.clientX / window.innerWidth - 0.5) * 2, y: (e.clientY / window.innerHeight - 0.5) * 2 };
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("keydown", onKey);
    window.addEventListener("touchstart", onTouchS, { passive: true });
    window.addEventListener("touchend", onTouchE, { passive: true });
    window.addEventListener("mousemove", onMouse);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("touchstart", onTouchS);
      window.removeEventListener("touchend", onTouchE);
      window.removeEventListener("mousemove", onMouse);
    };
  }, [go]);

  useEffect(() => {
    let raf;
    const tick = () => {
      const { x, y } = mouse.current;
      layers.current.forEach((el, i) => {
        if (!el) return;
        const d = [40, -25, 15, -10][i] || 0;
        el.style.transform = `translate(${x * d}px, ${y * d}px)`;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const s = slides[idx];

  return (
    <div className="ws">
      <div className="ws-bg" aria-hidden="true">
        <div className="ws-layer ws-l1" ref={(el) => { layers.current[0] = el; }} />
        <div className="ws-layer ws-l2" ref={(el) => { layers.current[1] = el; }} />
        <div className="ws-layer ws-l3" ref={(el) => { layers.current[2] = el; }} />
        <div className="ws-layer ws-l4" ref={(el) => { layers.current[3] = el; }} />
      </div>

      <div className="ws-dots" aria-hidden="true">
        {Array.from({ length: s.particles }).map((_, i) => (
          <span key={i} className="ws-particle" style={{
            left: `${10 + (i * 83) % 80}%`, top: `${8 + (i * 67) % 84}%`,
            animationDelay: `${(i * 0.3) % 2.5}s`, animationDuration: `${3 + (i % 4) * 0.8}s`
          }} />
        ))}
      </div>

      <div className="ws-progress" aria-hidden="true">
        {slides.map((_, i) => <span key={i} className={`ws-pip ${i === idx ? "on" : ""} ${i < idx ? "done" : ""}`} />)}
      </div>

      <div className="ws-viewport">
        <div className="ws-slider" style={{ transform: `translateY(${-idx * 100}%)` }}>
          {slides.map((slide, i) => {
            const Icon = slide.Icon;
            return (
              <div className="ws-page" key={i}>
                <div className={`ws-inner ${i === idx ? "visible" : ""}`}>
                  <div className="ws-icon-wrap"><Icon size={42} strokeWidth={1.5} /></div>
                  <p className="ws-eyebrow">{slide.accent}</p>
                  <h1 className="ws-title">{slide.title}<br /><span className="ws-hl">{slide.highlight}</span></h1>
                  <p className="ws-sub">{slide.subtitle}</p>
                  {i === slides.length - 1 && <button className="ws-cta" onClick={onEnter}>Entrar no site <ArrowDown size={18} /></button>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="ws-hint" aria-hidden="true"><span>scroll</span><ArrowDown size={16} /></div>
      <div className="ws-corner ws-tl" aria-hidden="true" />
      <div className="ws-corner ws-br" aria-hidden="true" />
    </div>
  );
}
