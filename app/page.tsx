"use client";

import { useEffect, useRef, useState, useCallback, type KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import {
  LanguageProvider,
  useLanguage,
  heroWords,
  tabs,
  type TabId,
  vehicleBrands,
  productLines,
  manufacturerLogoFiles,
  manufacturerCarouselBrands,
  locations,
  companyRoadmap,
  companyChapters,
  companyOperations,
  corporatePillars,
  applicationCriteria,
  productContexts,
  operationalJourney,
  logisticsCoverage,
  commonQuestions,
  serviceSteps,
} from "./i18n";

const INSTAGRAM = "https://www.instagram.com/starkepremiumparts/";
const WHATSAPP = "https://wa.me/5511999631185?text=Ol%C3%A1%2C%20gostaria%20de%20falar%20com%20um%20especialista%20da%20St%C3%A4rke%20Parts.";

const routes: Record<TabId, string> = {
  institucional: "/empresa",
  aplicacoes: "/montadoras",
  produtos: "/produtos",
  fabricantes: "/fabricantes",
  estrutura: "/unidades",
  logistica: "/logistica",
  atendimento: "/atendimento",
};

const vehicleBrandLogoFiles: Record<string, string> = {
  Porsche: "/vehicle-logos/porsche.svg",
  BMW: "/vehicle-logos/bmw.svg",
  "Mercedes-Benz": "/vehicle-logos/mercedes-benz.svg",
  Audi: "/vehicle-logos/audi.svg",
  "Land Rover": "/vehicle-logos/land-rover.svg",
  Volvo: "/vehicle-logos/volvo.svg",
  Jaguar: "/vehicle-logos/jaguar.svg",
  MINI: "/vehicle-logos/mini.svg",
  Ferrari: "/vehicle-logos/ferrari.svg",
  Lamborghini: "/vehicle-logos/lamborghini.svg",
"VW Premium": "/vehicle-logos/volkswagen.svg",
};

const supplierGroups = [
  { title: "Bilstein Group", brands: ["febi", "SWAG", "Blue Friction"], category: "AFTERMARKET PREMIUM", description: "Portfólio de componentes para manutenção e reparação com foco em procedência, abrangência e qualidade técnica. A Stärke Parts é distribuidora oficial febi." },
  { title: "ZF Aftermarket", brands: ["TRW", "LEMFÖRDER", "SACHS"], category: "SEGURANÇA E DINÂMICA", description: "Soluções reconhecidas para freios, suspensão, direção e amortecimento em aplicações premium." },
  { title: "Frenagem e performance", brands: ["Brembo", "Textar"], category: "SISTEMAS DE FREIO", description: "Fabricantes com soluções para discos, pastilhas e componentes de frenagem orientados à segurança e à performance." },
  { title: "Filtragem e motor", brands: ["Hengst", "MAHLE", "UFI"], category: "FILTRAGEM ESPECIALIZADA", description: "Marcas reconhecidas por soluções de filtragem e componentes relacionados à proteção e ao funcionamento do motor." },
  { title: "Tecnologia automotiva", brands: ["Bosch", "HELLA", "Delphi", "Continental", "Pierburg"], category: "ELÉTRICA E GERENCIAMENTO", description: "Especialistas em sensores, sistemas eletrônicos, ignição, componentes de motor e tecnologias automotivas." },
  { title: "Especialidades técnicas", brands: ["HEPU", "GEBA", "BGA", "ÜRO Parts", "SIDEM", "Hoffer", "Meat&Doria"], category: "LINHAS COMPLEMENTARES", description: "Soluções específicas para arrefecimento, direção, motor e aplicações que exigem uma seleção cuidadosa de fabricantes." },
  { title: "Marca própria", brands: ["Forschen"], category: "IDENTIDADE STÄRKE", description: "Uma linha própria construída dentro do universo de especialização, disponibilidade e confiança da Stärke Parts." },
];
function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<Array<HTMLSpanElement | null>>([]);
  const { t } = useLanguage();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const target = "STÄRKE PARTS";
      const chars = target.split("");
      const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZÄÉÇ#%*+0123456789";

      const progress = { value: 0 };
      const update = () => {
        const solved = Math.floor(progress.value * chars.length);
        chars.forEach((char, i) => {
          const el = lettersRef.current[i];
          if (!el) return;
          if (i < solved) {
            el.textContent = char;
            el.classList.add("is-solid");
            el.classList.remove("is-ghost");
          } else {
            el.textContent = alphabet[Math.floor(Math.random() * alphabet.length)];
            el.classList.add("is-ghost");
            el.classList.remove("is-solid");
          }
        });
      };

      gsap.set(rootRef.current, { autoAlpha: 0 });
      update();
      gsap.to(rootRef.current, { autoAlpha: 1, duration: 0.15, ease: "none" });

      gsap.to(".splash-shimmer", {
        backgroundPosition: "200% 0",
        duration: 2.6,
        ease: "none",
        repeat: -1,
      });

      const tl = gsap.timeline();
      tl.fromTo(".splash-title", { scale: .94, opacity: 0 }, { scale: 1, opacity: 1, duration: .35, ease: "power2.out" }, .25);
      tl.to(progress, { value: 1, duration: 1.15, ease: "power1.inOut", onUpdate: update }, .3);
      tl.fromTo(".splash-kicker", { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: .4, ease: "power2.out" }, .35);
      tl.fromTo(".splash-rule", { scaleX: 0 }, { scaleX: 1, duration: .5, ease: "power3.inOut" }, 1.05);
      tl.fromTo(".splash-tagline", { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: .5, ease: "power2.out" }, 1.15);
      tl.to(rootRef.current, { opacity: 0, duration: .55, ease: "power2.inOut" }, 2.35);
      tl.call(onComplete, undefined, 2.9);
    }, rootRef);
    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div className="splash" ref={rootRef} aria-hidden="true">
      <div className="splash-glow" aria-hidden="true" />
      <div className="splash-center">
        <p className="splash-kicker">{t("splash.kicker")}</p>
        <h1 className="splash-title splash-shimmer" aria-label="STÄRKE PARTS">
          {"STÄRKE PARTS".split("").map((ch, i) => (
            <span key={i} ref={el => { lettersRef.current[i] = el; }} aria-hidden="true">{ch}</span>
          ))}
        </h1>
        <span className="splash-rule" />
        <p className="splash-tagline">{t("splash.tagline")}</p>
      </div>
    </div>
  );
}

function HeroBackdrop() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const img = gsap.utils.toArray<HTMLElement>(".hero-backdrop__img")[0];
      gsap.fromTo(img,
        { scale: 1.14, filter: "blur(22px) saturate(1.7)", opacity: 0.6 },
        { scale: 1, filter: "blur(5px) saturate(1.15)", opacity: 1, duration: 2.2, ease: "power2.out" }
      );
      gsap.fromTo(".hero-backdrop__scrim",
        { opacity: 0 },
        { opacity: 1, duration: 1.6, ease: "power2.out", delay: 0.4 }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="hero-backdrop" ref={rootRef} aria-hidden="true">
      <div className="hero-backdrop__img" />
      <div className="hero-backdrop__scrim" />
    </div>
  );
}

function RotatingWord() {
  const ref = useRef<HTMLSpanElement>(null);
  const { lang } = useLanguage();
  const [idx, setIdx] = useState(0);
  const words = heroWords[lang];

  useEffect(() => { setIdx(0); }, [lang]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const timer = setInterval(() => {
      gsap.to(el, {
        opacity: 0.15, y: -18, rotateX: 60, scale: 0.96, duration: 0.32, ease: "power2.in",
        onComplete: () => setIdx((i) => (i + 1) % words.length),
      });
    }, 3200);
    return () => clearInterval(timer);
  }, [words.length]);

  useEffect(() => {
    if (idx === 0) return;
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(el,
      { opacity: 0.15, y: 18, rotateX: -60, scale: 0.96 },
      { opacity: 1, y: 0, rotateX: 0, scale: 1, duration: 0.5, ease: "power3.out" }
    );
  }, [idx]);

  return <span ref={ref} className="invite-fade--accent">{words[idx]}</span>;
}

function HeroInvite() {
  const cardRef = useRef<HTMLDivElement>(null);
  const { lang, t } = useLanguage();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.fromTo(".hero-title",
        { clipPath: "inset(0 0 100% 0)" },
        { clipPath: "inset(0 0 0% 0)", duration: 1.4 },
        0.5
      );
      tl.fromTo(".hero-card__foot",
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 1.0 },
        0.95
      );
      tl.from(".hero-card__foot .hero-rule", { scaleY: 0, transformOrigin: "bottom", duration: 0.85, ease: "power3.out" }, 1.05);
    }, cardRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="hero-card" id="hero-title" ref={cardRef}>
<h1 className="hero-title">
        <span className="hero-line">{lang === "pt" && <span className="hero-key">A</span>} <RotatingWord /></span>
        <span className="hero-line">{t("hero.line2")}</span>
        <span className="hero-line hero-line--red">{t("hero.line3")}</span>
      </h1>
      <div className="hero-card__foot">
        <span className="hero-rule" />
        <span className="hero-hint">{t("hero.hint")}</span>
      </div>
    </div>
  );
}

function InstagramIcon() {
  return <svg className="instagram-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4.25" /><circle className="instagram-icon-dot" cx="17.4" cy="6.7" r="1" /></svg>;
}

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <p className={`eyebrow ${light ? "" : "eyebrow--dark"}`}><span />{children}</p>;
}

function PanelHeading({ kicker, title, text }: { kicker: string; title: string; text: string }) {
  return <div className="panel-heading"><Eyebrow>{kicker}</Eyebrow><h3>{title}</h3><p>{text}</p></div>;
}

function CompanyRoadmap() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { lang, t } = useLanguage();

  const move = useCallback((direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>(".roadmap-item");
    const distance = (card?.offsetWidth ?? 340) + 14;
    if (direction === -1 && track.scrollLeft < distance / 2) {
      track.scrollLeft = track.scrollWidth / 2;
    }
    track.scrollBy({ left: direction * distance, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      const track = trackRef.current;
      if (!track) return;
      move(1);
    }, 3600);
    return () => window.clearInterval(timer);
  }, [move]);

  return <div className="roadmap-shell">
    <div className="company-roadmap" ref={trackRef} onScroll={() => { const track = trackRef.current; if (track && track.scrollLeft >= track.scrollWidth / 2) track.scrollLeft -= track.scrollWidth / 2; }} aria-label={t("road.aria")}>{[...companyRoadmap, ...companyRoadmap].map((item, index) => <article className={`roadmap-item ${item.year === "2026" ? "roadmap-item--current" : ""}`} key={`${item.year}-${index}`} aria-hidden={index >= companyRoadmap.length ? true : undefined}><div className="roadmap-marker"><span>{String((index % companyRoadmap.length) + 1).padStart(2, "0")}</span></div><div className="roadmap-year"><strong>{item.year}</strong><span>{item.stage[lang]}</span></div><div className="roadmap-copy"><h5>{item.title[lang]}</h5><p>{item.text[lang]}</p></div></article>)}</div>
    <div className="roadmap-controls"><span><i /> ROADMAP 2016 — 2026</span><div><button onClick={() => move(-1)} aria-label={t("road.prev")}>←</button><button onClick={() => move(1)} aria-label={t("road.next")}>→</button></div></div>
  </div>;
}

function ProductCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { lang, t } = useLanguage();

  const move = useCallback((direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>(".product-card");
    const distance = (card?.offsetWidth ?? 390) + 26;
    if (direction === -1 && track.scrollLeft < distance / 2) track.scrollLeft = track.scrollWidth / 2;
    track.scrollBy({ left: direction * distance, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => move(1), 4200);
    return () => window.clearInterval(timer);
  }, [move]);

  return <section className="product-carousel" aria-label={t("prod.carAria")}>
    <div className="product-grid product-carousel-track" ref={trackRef} onScroll={() => { const track = trackRef.current; if (track && track.scrollLeft >= track.scrollWidth / 2) track.scrollLeft -= track.scrollWidth / 2; }}>
      {[...productLines, ...productLines].map((item, index) => <article className="product-card" key={`${item.number}-${index}`} aria-hidden={index >= productLines.length ? true : undefined}><div className="product-card-top"><span>{item.number}</span><span>{item.family[lang]}</span></div><h4>{item.title[lang]}</h4><p>{item.text[lang]}</p><ul>{item.items.map(part => <li key={part[lang]}>{part[lang]}</li>)}</ul></article>)}
    </div>
    <div className="product-carousel-controls"><span>{t("prod.carControl")}</span><div><button onClick={() => move(-1)} aria-label={t("prod.carPrev")}>←</button><button onClick={() => move(1)} aria-label={t("prod.carNext")}>→</button></div></div>
  </section>;
}

function ManufacturerLogoCarousel() {
  const { lang, t } = useLanguage();
  const [selectedBrand, setSelectedBrand] = useState(manufacturerCarouselBrands[0]);

  return <section className="manufacturer-logo-carousel" aria-label={t("man.logoAria")}>
    <div className="manufacturer-logo-track">
      {[...manufacturerCarouselBrands, ...manufacturerCarouselBrands].map((brand, index) => <button className={`manufacturer-logo ${selectedBrand.name === brand.name ? "manufacturer-logo--active" : ""}`} key={`${brand.name}-${index}`} onClick={() => setSelectedBrand(brand)} aria-pressed={selectedBrand.name === brand.name} aria-hidden={index >= manufacturerCarouselBrands.length ? true : undefined} tabIndex={index >= manufacturerCarouselBrands.length ? -1 : 0}><img src={manufacturerLogoFiles[brand.name]} alt={brand.name} /></button>)}
    </div>
    <article className="manufacturer-brand-summary" key={selectedBrand.name} aria-live="polite"><div><small>{selectedBrand.origin[lang]}</small><h4>{selectedBrand.name}</h4></div><div><span>{t("man.history")}</span><p>{selectedBrand.history[lang]}</p></div><div><span>{t("man.lines")}</span><p>{selectedBrand.work[lang]}</p></div></article>
  </section>;
}

function InstitutionalPanel({ onContact }: { onContact: () => void }) {
  return <div className="institutional-page">
    <div className="panel-heading panel-heading--institutional">
      <Eyebrow>STÄRKE PARTS · ESPECIALISTAS DESDE 2016</Eyebrow>
      <h3>A força de quem entende cada peça. A confiança de quem conhece cada detalhe.</h3>

      <div className="institutional-history-intro">
        <p className="institutional-history-lead">Nascemos para elevar o padrão da distribuição de autopeças premium no Brasil. Desde 2016, conectamos conhecimento técnico, grandes fabricantes e uma operação preparada para entregar mais segurança em cada escolha.</p>

        <div className="institutional-history-summary">
          <p>A Stärke Parts nasceu com uma missão clara: transformar a compra de autopeças para veículos importados, premium e superesportivos em uma experiência mais precisa, ágil e confiável. Por isso, atendemos oficinas, centros automotivos, lojistas e proprietários com uma equipe que entende as particularidades de marcas como Porsche, BMW, Mercedes-Benz, Audi, Land Rover, Volvo, Jaguar, MINI, Ferrari e Lamborghini.</p>

          <p>Nosso portfólio reúne soluções para freios, suspensão, direção, motor, filtragem, arrefecimento, elétrica, ignição, injeção, transmissão e outros sistemas essenciais. Trabalhamos com referências globais como Bilstein Group, ZF, Brembo, Textar, Bosch, MAHLE e Hengst. Somos distribuidores oficiais febi, com produtos recebidos diretamente da fábrica do Bilstein Group na Alemanha, e ampliamos nossa entrega com a Forschen, marca própria que traduz a experiência e a identidade da Stärke.</p>

          <p>Da matriz na Chácara Santo Antônio ao centro de distribuição de Sorocaba, inaugurado em 2024, construímos uma operação integrada entre importação, estoque, atendimento, separação, expedição, e-commerce, garantia e pós-venda. Em 2025, chegamos a Campinas e Santos para ficar ainda mais próximos do interior paulista e da Baixada Santista, sem perder a capacidade de atender clientes em todo o Brasil.</p>

          <p className="institutional-history-closing">Em 2026, a Stärke Parts chega a uma nova fase: consolidada, forte e posicionada entre as principais referências brasileiras no segmento premium. Uma conquista construída com procedência, especialização e relações duradouras — porque, para nós, cada peça carrega a responsabilidade de manter histórias, negócios e grandes máquinas em movimento.</p>
        </div>

        <div className="institutional-history-milestones" aria-label="Principais marcos da história da Stärke Parts"><div><strong>2016</strong><span>Nasce uma nova força no aftermarket premium</span></div><div><strong>2024</strong><span>Mais estrutura com o CD Sorocaba</span></div><div><strong>2025</strong><span>Mais perto com Campinas e Santos</span></div><div><strong>2026</strong><span>Uma das principais referências do segmento</span></div></div>

        <p className="institutional-history-signature"><span>STÄRKE PARTS</span><strong>Potência em Qualidade.<br />Excelência em Cada Detalhe.</strong><em>Oferecemos peças. Entregamos confiança.</em></p>
      </div>
    </div>

    <div className="editorial-grid">
      <div className="editorial-photo editorial-photo--warehouse" aria-label="Componentes automotivos premium: freios, filtros e suspensão" />
      <div className="editorial-copy">
        <span className="section-number">01 / A NOSSA ESSÊNCIA</span>
        <h4>Oferecemos peças.<br /><em>Entregamos confiança.</em></h4>
        <p>Acreditamos que uma boa peça começa muito antes da instalação. Ela começa na procedência, na identificação correta da aplicação, na orientação técnica e na segurança de contar com quem conhece o segmento premium em profundidade.</p>
        <p>Por isso, construímos uma operação que conecta marcas reconhecidas internacionalmente a oficinas especializadas, centros automotivos, lojistas e proprietários de veículos que valorizam qualidade e atendimento responsável.</p>
        <p>Mais do que fornecer componentes, buscamos apoiar decisões mais assertivas e cultivar relacionamentos duradouros com quem movimenta o mercado de reposição automotiva.</p>
        <button className="text-link" onClick={onContact}>Conheça nosso atendimento <span>↗</span></button>
      </div>
    </div>

    <div className="metric-grid"><div><strong>2016</strong><span>O início da nossa história</span></div><div><strong>04</strong><span>Operações estratégicas em São Paulo</span></div><div><strong>11</strong><span>Montadoras e aplicações premium</span></div><div><strong>BR</strong><span>Atendimento para todo o Brasil</span></div></div>

    <div className="subsection-heading identity-heading"><Eyebrow>A IDENTIDADE QUE NOS MOVE</Eyebrow><h4>Um posicionamento claro.<br /><em>Uma entrega consistente.</em></h4><p className="subsection-description">A nossa atuação é orientada por princípios que conectam os interesses do mercado, a responsabilidade técnica e a construção de relacionamentos duradouros.</p></div>
    <div className="institutional-pillars-layout"><aside><strong>Princípios que orientam nossas decisões.</strong><p>Três compromissos conectados por um mesmo objetivo: entregar segurança e confiança ao mercado automotivo premium.</p></aside><div>{corporatePillars.map((item, index) => <article key={item.label}><span>{String(index + 1).padStart(2, "0")}</span><div><small>{item.label}</small><h5>{item.title}</h5></div><p>{item.text}</p></article>)}</div></div>

    <div className="subsection-heading company-story-heading"><Eyebrow>QUEM SOMOS E COMO EVOLUÍMOS</Eyebrow><h4>O que existe por trás<br />de cada peça <em>Stärke.</em></h4><p>Nossa história reúne propósito, especialização, relações com fabricantes e uma estrutura que acompanha o desenvolvimento do mercado premium brasileiro.</p></div>

    <div className="company-chapters">{companyChapters.map(chapter => <article className="company-chapter" key={chapter.number}><div className="chapter-index"><span className="chapter-icon">{chapter.icon}</span><b>{chapter.eyebrow}</b></div><div className="chapter-copy"><h5>{chapter.title}</h5>{chapter.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div></article>)}</div>

    <aside className="brand-promise"><span>O QUE NOS MOVE TODOS OS DIAS</span><h4>Potência em qualidade.<br /><em>Excelência em cada detalhe.</em></h4><p>Um compromisso que orienta o nosso portfólio, o relacionamento com fabricantes, a atenção à aplicação correta e a experiência de cada cliente.</p></aside>

    <div className="subsection-heading roadmap-heading"><Eyebrow>NOSSA TRAJETÓRIA</Eyebrow><h4>Uma história de evolução,<br />proximidade e <em>especialização.</em></h4></div>
    <CompanyRoadmap />

    <section className="operations-intro"><div><Eyebrow>OS BASTIDORES DA NOSSA OPERAÇÃO</Eyebrow><h4>Uma estrutura conectada<br />por um mesmo <em>propósito.</em></h4></div><aside><strong>09</strong><span>áreas conectadas</span><p>Por trás de cada atendimento, diferentes áreas trabalham de forma integrada para aproximar o mercado premium das soluções de que ele precisa.</p></aside></section>
    <div className="operations-grid">{companyOperations.map((item, index) => <article className="operation-card" key={item.title}><span>{String(index + 1).padStart(2, "0")}</span><h5>{item.title}</h5><p>{item.text}</p></article>)}</div>

    <div className="principle-grid"><article><span>01</span><h5>Procedência</h5><p>Fabricantes reconhecidos e seleção técnica de componentes para aplicações premium.</p></article><article><span>02</span><h5>Especialização</h5><p>Atendimento preparado para considerar veículo, motorização, ano e chassi.</p></article><article><span>03</span><h5>Proximidade</h5><p>Operações regionais e relacionamento próximo com quem move o aftermarket.</p></article><article><span>04</span><h5>Confiança</h5><p>Uma experiência construída com clareza, suporte e atenção a cada detalhe.</p></article></div>
    <div className="institutional-manifesto"><Eyebrow>O QUE SIGNIFICA SER STÄRKE</Eyebrow><p>Para nós, uma autopeça nunca representa apenas um item em estoque. Ela representa o trabalho de uma oficina, a confiança de um cliente, a precisão de um projeto e a responsabilidade de colocar o veículo novamente em movimento.</p><strong>É por isso que oferecemos peças.<br /><em>E entregamos confiança.</em></strong></div>
  </div>;
}
function ApplicationsPanel({ onContact }: { onContact: () => void }) {
  const [selected, setSelected] = useState(0);
  const vehicle = vehicleBrands[selected];
  return <div className="applications-page">
    <PanelHeading kicker="APLICAÇÕES PREMIUM E DE ALTA PERFORMANCE" title="Veículos extraordinários exigem escolhas à altura." text="Trabalhamos com aplicações para algumas das montadoras mais relevantes do segmento premium e superesportivo. Nossa equipe avalia cada veículo individualmente para orientar a identificação da peça e do fabricante adequados." />
    <div className="brand-explorer"><div className="brand-selector" aria-label="Selecione uma montadora">{vehicleBrands.map((item, index) => <button key={item.name} className={selected === index ? "selected" : ""} onClick={() => setSelected(index)} aria-pressed={selected === index} style={{ ["--vehicle-image" as string]: `url('${item.image}')` }}><span className="brand-selector-index">{String(index + 1).padStart(2, "0")}</span><span className="brand-selector-name">{item.name}</span><b>↗</b></button>)}</div><AnimatePresence mode="wait"><motion.article key={vehicle.name} className="brand-feature" initial={{ opacity: 0, filter: "blur(7px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} exit={{ opacity: 0, filter: "blur(3px)" }} transition={{ duration: .45, ease: [.4, 0, .15, 1] }}><motion.div className="brand-feature-inner" initial={{ scale: .94 }} animate={{ scale: 1 }} exit={{ scale: .97 }} transition={{ duration: .5, ease: [.25, .1, .25, 1] }}><div className="brand-feature-photo" style={{ backgroundImage: `linear-gradient(0deg,rgba(4,4,4,.9),transparent 70%),url('${vehicle.image}')` }}><span>{vehicle.territory}</span><h4>{vehicle.name}</h4><b>{vehicle.focus}</b></div><div className="brand-feature-copy"><div className="brand-feature-summary"><span>SOBRE A MONTADORA</span><p>{vehicle.about}</p></div><div className="brand-feature-summary"><span>APLICAÇÕES STÄRKE PARTS</span><p>{vehicle.text}</p></div><button className="text-link" onClick={onContact}>Consultar uma aplicação <span>↗</span></button></div></motion.div></motion.article></AnimatePresence></div>
    <aside className="info-strip"><strong>A aplicação correta começa pelo veículo certo.</strong><span>Montadora · modelo · ano · motorização · chassi completo, quando necessário.</span></aside>
    <div className="subsection-heading"><Eyebrow>COMO IDENTIFICAMOS CADA APLICAÇÃO</Eyebrow><h4>Precisão técnica começa<br />pelas <em>informações corretas.</em></h4><p className="subsection-description">Automóveis premium podem apresentar diferenças relevantes mesmo dentro de uma mesma família. Nossa análise considera os detalhes necessários para orientar a escolha do componente.</p></div>
    <div className="detail-grid">{applicationCriteria.map((item, index) => <article className="detail-card" key={item.title}><span>{String(index + 1).padStart(2, "0")}</span><h5>{item.title}</h5><p>{item.text}</p></article>)}</div>
    <aside className="editorial-note"><strong>Não é apenas sobre a marca do veículo.</strong><p>É sobre identificar a combinação correta entre projeto, sistema, fabricante e referência para que a peça atenda à aplicação com a atenção que o segmento exige.</p></aside>
  </div>;
}

function ProductsPanel({ onContact }: { onContact: () => void }) {
  return <div className="products-page">
    <PanelHeading kicker="LINHAS E SISTEMAS AUTOMOTIVOS" title="Um portfólio completo para quem conhece cada detalhe." text="Da manutenção preventiva aos componentes de sistemas mais exigentes, reunimos linhas selecionadas para diferentes montadoras e aplicações premium. A disponibilidade deve ser confirmada com nossa equipe conforme o veículo e o fabricante." />
    <div className="product-spotlight"><div className="product-spotlight-photo" aria-label="Autopeças premium: discos de freio, amortecedores e filtros" /><div className="product-spotlight-copy"><Eyebrow>PEÇAS QUE MOVEM CONFIANÇA</Eyebrow><h4>Cada sistema.<br /><em>A peça certa.</em></h4><p>Da frenagem ao arrefecimento, nossa seleção reúne componentes essenciais para uma manutenção compatível com o padrão de exigência dos veículos premium.</p></div></div>
    <ProductCarousel />
    <div className="subsection-heading"><Eyebrow>ONDE NOSSO PORTFÓLIO FAZ A DIFERENÇA</Eyebrow><h4>Soluções pensadas para<br />diferentes momentos da <em>manutenção.</em></h4></div>
    <div className="detail-grid product-context-grid">{productContexts.map((item, index) => <article className="detail-card" key={item.title}><span>{String(index + 1).padStart(2, "0")}</span><h5>{item.title}</h5><p>{item.text}</p></article>)}</div>
    <div className="quality-banner"><span>CRITÉRIOS STÄRKE PARTS</span><h4>Procedência. Compatibilidade.<br /><em>Confiança em cada componente.</em></h4><p>A disponibilidade, o fabricante e a referência exata são sempre confirmados de acordo com a aplicação e a necessidade apresentada pelo cliente.</p></div>
    <aside className="info-strip"><strong>Não encontrou o componente que procura?</strong><button className="text-link" onClick={onContact}>Fale com um especialista <span>↗</span></button></aside>
  </div>;
}

function ManufacturersPanel({ onContact }: { onContact: () => void }) {
  return <div className="manufacturers-page">
    <PanelHeading kicker="PARCERIAS E FABRICANTES INTERNACIONAIS" title="Marcas globais. Um mesmo compromisso com a qualidade." text="Nosso portfólio reúne fabricantes reconhecidos por sua atuação em diferentes sistemas automotivos. A composição da linha e a disponibilidade de cada item variam conforme a aplicação e devem ser confirmadas no atendimento." />
    <ManufacturerLogoCarousel />
    <aside className="manufacturer-note"><div><Eyebrow>DISTRIBUIÇÃO ESPECIALIZADA</Eyebrow><h4>Procedência que fortalece cada escolha.</h4></div><button className="button button--yellow" onClick={onContact}>Consultar fabricante <span>→</span></button></aside>
  </div>;
}

function StructurePanel({ onContact }: { onContact: () => void }) {
  return <div className="structure-page">
    <PanelHeading kicker="MATRIZ · CENTRO DE DISTRIBUIÇÃO · FILIAIS" title="Uma estrutura pensada para estar cada vez mais perto." text="Nossa presença no estado de São Paulo conecta atendimento especializado, disponibilidade regional e eficiência operacional. Cada unidade integra uma rede preparada para apoiar clientes em diferentes mercados." />
    <div className="locations-grid">{locations.map(location => <article className="location-card" key={location.code}><div className="location-top"><span>{location.code}</span><span>{location.type}</span></div><h4>{location.city}</h4><p className="location-area">{location.area}</p><a className="location-phone" href={location.phoneHref} aria-label={`Ligar para a unidade ${location.city}`}><span>TELEFONE</span><strong>{location.phone}</strong></a><p>{location.description}</p><ul>{location.capabilities.map(item => <li key={item}>{item}</li>)}</ul><button onClick={onContact}>Consultar atendimento <span>↗</span></button></article>)}</div>
    <aside className="coverage-banner"><Eyebrow light>REDE STÄRKE PARTS</Eyebrow><h4>Quatro operações.<br /><em>Um mesmo padrão.</em></h4><p>Atendimento próximo, conhecimento técnico e uma operação conectada ao mercado brasileiro de autopeças premium.</p></aside>
    <div className="subsection-heading"><Eyebrow>COMO AS ÁREAS SE CONECTAM</Eyebrow><h4>Uma operação completa,<br />do fornecedor ao <em>pós-venda.</em></h4><p className="subsection-description">A distribuição especializada depende de uma cadeia integrada, na qual cada etapa contribui para uma experiência mais segura e organizada.</p></div>
    <div className="journey-list">{operationalJourney.map(item => <article className="journey-item" key={item.step}><span>{item.step}</span><h5>{item.title}</h5><p>{item.text}</p></article>)}</div>
    <aside className="editorial-note"><strong>Presença regional com visão nacional.</strong><p>Matriz, centro de distribuição e filiais trabalham de forma complementar para aproximar conhecimento técnico, disponibilidade e atendimento especializado dos clientes.</p></aside>
  </div>;
}

function LogisticsPanel({ onContact }: { onContact: () => void }) {
  return <>
    <PanelHeading kicker="OPERAÇÃO LOGÍSTICA E COBERTURA NACIONAL" title="A peça certa, no ritmo que a sua operação precisa." text="Organizamos a distribuição para atender desde demandas urgentes na Grande São Paulo até envios para diferentes regiões do Brasil. Modalidades, prazos e condições dependem da disponibilidade, do destino e da política comercial aplicável." />
    <div className="logistics-grid"><article className="logistics-card logistics-card--highlight"><span>01 / GRANDE SÃO PAULO</span><h4>Entregas rápidas<br />e programadas.</h4><p>Opções de entrega estruturadas para acompanhar a dinâmica de oficinas, centros automotivos e clientes da região metropolitana.</p><b>Consulte cobertura, prazo e modalidade.</b></article><article className="logistics-card"><span>02 / CONDIÇÃO REGIONAL</span><h4>Frete grátis a partir de <em>R$ 300.</em></h4><p>Condição válida para entregas via motoboy na área de atendimento aplicável, sujeita à confirmação de cobertura e regras comerciais.</p><b>Verifique as condições com a equipe.</b></article><article className="logistics-card"><span>03 / TERRITÓRIO NACIONAL</span><h4>Da nossa estrutura<br />para todo o Brasil.</h4><p>Expedição nacional para aproximar fabricantes reconhecidos, conhecimento especializado e aplicações premium de clientes em diferentes estados.</p><b>Prazos e fretes variam conforme o destino.</b></article></div>
    <div className="subsection-heading"><Eyebrow>ÁREAS DE COBERTURA</Eyebrow><h4>Uma estrutura preparada<br />para diferentes <em>destinos.</em></h4></div>
    <div className="coverage-grid">{logisticsCoverage.map(item => <article className="coverage-card" key={item.title}><span>{item.badge}</span><h5>{item.title}</h5><p>{item.text}</p></article>)}</div>
    <div className="subsection-heading"><Eyebrow>DA CONSULTA ATÉ A ENTREGA</Eyebrow><h4>Cada etapa importa<br />quando o tempo <em>faz diferença.</em></h4></div>
    <div className="process-flow">{["Consulta da aplicação", "Confirmação da disponibilidade", "Separação e conferência", "Expedição ou entrega"].map((step, index) => <div key={step}><span>{String(index + 1).padStart(2, "0")}</span><h5>{step}</h5></div>)}</div>
    <aside className="editorial-note"><strong>Agilidade começa com informação correta.</strong><p>Ao informar o veículo, a peça procurada e o destino da entrega, nossa equipe consegue orientar a disponibilidade e a modalidade logística mais adequada para cada pedido.</p></aside>
    <button className="text-link" onClick={onContact}>Consulte a melhor opção de entrega <span>↗</span></button>
  </>;
}

function ServicePanel() {
  return <div className="service-page">
    <PanelHeading kicker="ATENDIMENTO TÉCNICO E RELACIONAMENTO" title="A peça certa começa com a pergunta certa." text="Nosso time está preparado para atender oficinas, centros automotivos, lojistas e proprietários que procuram componentes para veículos premium. O objetivo é entender a necessidade, validar a aplicação e orientar a consulta com clareza." />
    <div className="service-audiences"><article><span>01</span><h4>Oficinas e centros automotivos</h4><p>Suporte especializado para a rotina de manutenção e reparação de veículos premium e importados.</p></article><article><span>02</span><h4>Lojistas e parceiros comerciais</h4><p>Atendimento voltado ao mercado de reposição, com consulta de aplicações e fabricantes disponíveis.</p></article><article><span>03</span><h4>Proprietários de veículos premium</h4><p>Orientação para identificar a linha, o componente e o canal de atendimento mais adequados.</p></article></div>
    <div className="subsection-heading"><Eyebrow>COMO FUNCIONA</Eyebrow><h4>Um atendimento orientado<br />por informação e confiança.</h4></div>
    <div className="service-steps">{serviceSteps.map(step => <article key={step.number}><span>{step.number}</span><div><h5>{step.title}</h5><p>{step.text}</p></div></article>)}</div>
    <aside className="chassis-note"><strong>Tenha as informações do veículo em mãos.</strong><span>Marca · modelo · ano · motorização · código da peça, se disponível · chassi completo, quando necessário.</span></aside>
    <div className="subsection-heading"><Eyebrow>DÚVIDAS FREQUENTES</Eyebrow><h4>Informações importantes<br />antes de falar com a <em>equipe.</em></h4></div>
    <div className="faq-list">{commonQuestions.map(item => <details className="faq-item" key={item.question}><summary>{item.question}<span>+</span></summary><p>{item.answer}</p></details>)}</div>
    <div className="after-sales"><span>RELACIONAMENTO E PÓS-VENDA</span><h5>A conversa não termina<br />quando o pedido é confirmado.</h5><p>Nosso compromisso inclui orientar o cliente durante o processo comercial e apoiar questões relacionadas à garantia, ao direcionamento correto e ao relacionamento com a unidade responsável.</p></div>
    <div className="contact-card"><Eyebrow light>CONTATO STÄRKE PARTS</Eyebrow><h4>Vamos encontrar<br />a solução <em>certa.</em></h4><p>Fale diretamente pelo WhatsApp e solicite o direcionamento para um especialista ou para a unidade mais adequada.</p><a className="button button--yellow button--whatsapp" href={WHATSAPP} target="_blank" rel="noreferrer" aria-label="Falar com a Stärke Parts pelo WhatsApp"><span className="whatsapp-mark" aria-hidden="true">●</span> Falar pelo WhatsApp <span>↗</span></a><a className="contact-handle" href={INSTAGRAM} target="_blank" rel="noreferrer">@starkepremiumparts</a></div>
  </div>;
}

function HomeLanding({ scrolled }: { scrolled: boolean }) {
  const specialties = [
    { href: "/produtos", image: "/autoparts-brakes.webp", number: "01", title: "Portfólio premium", text: "Freios, suspensão, motor, filtragem e sistemas técnicos para aplicações exigentes." },
    { href: "/montadoras", image: "/autoparts-editorial.webp", number: "02", title: "Aplicações", text: "Atendimento especializado para veículos importados, premium e superesportivos." },
    { href: "/fabricantes", image: "/autoparts-filters.webp", number: "03", title: "Fabricantes globais", text: "Marcas reconhecidas e procedência para escolhas mais seguras em cada reparação." },
  ];

  return <main id="topo" className="landing">
    <header className={`masthead ${scrolled ? "masthead--scrolled" : ""}`}>
      <Link className="wordmark" href="/" aria-label="Stärke Parts, início"><img src="/starke-parts-logo.png" alt="" /></Link>
      <nav className="desktop-nav" aria-label="Navegação principal"><Link href="/empresa">A empresa</Link><Link href="/montadoras">Montadoras</Link><Link href="/produtos">Produtos</Link><Link href="/fabricantes">Fabricantes</Link><Link href="/unidades">Unidades</Link></nav>
      <Link className="header-cta" href="/atendimento">Falar com especialista <span>↗</span></Link>
    </header>

    <section className="landing-hero" aria-labelledby="landing-title">
      <div className="landing-hero__photo" aria-hidden="true" />
      <div className="landing-hero__content"><Eyebrow light>PREMIUM AUTOMOTIVE PARTS · BRASIL</Eyebrow><h1 id="landing-title">Engenharia exige<br /><em>a peça certa.</em></h1><p>Distribuição especializada, fabricantes globais e conhecimento técnico para veículos que não aceitam concessões.</p><Link className="button button--yellow" href="/produtos">Conheça nossas soluções <span>→</span></Link></div>
      <div className="landing-hero__index"><span>STÄRKE PARTS</span><span>DESDE 2016</span></div>
    </section>

    <section className="landing-intro"><Eyebrow>QUEM SOMOS</Eyebrow><div><h2>Especialistas no universo<br />automotivo <em>premium.</em></h2><p>A Stärke Parts conecta oficinas, centros automotivos, lojistas e proprietários a componentes selecionados para automóveis importados e de alta performance.</p><Link className="text-link" href="/empresa">Conheça nossa história <span>↗</span></Link></div></section>

    <section className="landing-specialties"><div className="landing-section-title"><Eyebrow light>NOSSAS ESPECIALIDADES</Eyebrow><h2>Soluções construídas<br />sobre <em>confiança.</em></h2></div><div className="landing-card-grid">{specialties.map(item => <Link className="landing-card" href={item.href} key={item.number}><img src={item.image} alt="" /><div className="landing-card__shade" /><span>{item.number}</span><div><h3>{item.title}</h3><p>{item.text}</p><b>Explorar →</b></div></Link>)}</div></section>

    <section className="landing-proof"><div><strong>10</strong><span>anos de<br />especialização</span></div><div><strong>04</strong><span>operações<br />em São Paulo</span></div><div><strong>30+</strong><span>fabricantes<br />selecionados</span></div><div><strong>BR</strong><span>expedição para<br />todo o país</span></div></section>

    <section className="landing-cta"><div className="landing-cta__photo" aria-hidden="true" /><div><Eyebrow light>ATENDIMENTO ESPECIALIZADO</Eyebrow><h2>Da aplicação à entrega,<br /><em>precisão em cada etapa.</em></h2><p>Conte com uma equipe preparada para identificar o componente e orientar a melhor solução para o seu veículo ou negócio.</p><Link className="button button--yellow" href="/atendimento">Fale com a Stärke Parts <span>↗</span></Link></div></section>

    <footer className="footer"><Link className="wordmark" href="/" aria-label="Stärke Parts, início"><img src="/starke-parts-logo.png" alt="" /></Link><span>Oferecemos peças. Entregamos confiança.</span><a className="footer-instagram" href={INSTAGRAM} target="_blank" rel="noreferrer"><InstagramIcon />@starkepremiumparts ↗</a></footer>
  </main>;
}

export function StarkePage({ initialSection = "institucional", showSplash = false }: { initialSection?: TabId; showSplash?: boolean }) {
  const [active, setActive] = useState<TabId>(initialSection);
  const [scrolled, setScrolled] = useState(false);
  const [language, setLanguage] = useState<SiteLanguage>("pt");
  const [splashDone, setSplashDone] = useState(!showSplash);
  const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number }>({ left: 0, width: 0 });
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const tabListRef = useRef<HTMLDivElement>(null);
  const activeSectionMounted = useRef(false);
  const router = useRouter();

  const changeLanguage = useCallback((nextLanguage: SiteLanguage) => {
    if (nextLanguage === language) return;
    localStorage.setItem("starke-language", nextLanguage);
    const translation = nextLanguage === "en" ? "/pt/en" : "/pt/pt";
    document.cookie = `googtrans=${translation}; path=/; SameSite=Lax`;
    document.cookie = `googtrans=${translation}; path=/; domain=${window.location.hostname}; SameSite=Lax`;
    window.location.reload();
  }, [language]);

  const handleSplashComplete = useCallback(() => {
    sessionStorage.setItem("starke-welcome-seen", "true");
    setSplashDone(true);
  }, []);

  useEffect(() => {
    const storedLanguage = localStorage.getItem("starke-language") === "en" ? "en" : "pt";
    setLanguage(storedLanguage);
    document.documentElement.lang = storedLanguage === "en" ? "en" : "pt-BR";

    window.googleTranslateElementInit = () => {
      if (!window.google?.translate || document.querySelector("#google_translate_element select")) return;
      new window.google.translate.TranslateElement({
        pageLanguage: "pt",
        includedLanguages: "pt,en",
        autoDisplay: false,
      }, "google_translate_element");
    };

    if (window.google?.translate) {
      window.googleTranslateElementInit();
      return;
    }

    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
    if (showSplash && sessionStorage.getItem("starke-welcome-seen") === "true") setSplashDone(true);
    const listener = () => setScrolled(window.scrollY > 28);
    listener();
    window.addEventListener("scroll", listener, { passive: true });
    const hash = window.location.hash.slice(1);
    if (tabs.some(tab => tab.id === hash)) setActive(hash as TabId);
    return () => window.removeEventListener("scroll", listener);
  }, [showSplash]);

  useEffect(() => {
    const idx = tabs.findIndex(t => t.id === active);
    const el = tabRefs.current[idx];
    if (el && tabListRef.current) {
      const listRect = tabListRef.current.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      setIndicatorStyle({ left: elRect.left - listRect.left + tabListRef.current.scrollLeft, width: elRect.width });
    }
    if (activeSectionMounted.current) {
      const scrollTimer = window.setTimeout(() => {
        document.getElementById("explore")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
      return () => window.clearTimeout(scrollTimer);
    }
    activeSectionMounted.current = true;
  }, [active]);

  function changeTab(id: TabId, shouldScroll = true) {
    if (active !== id) {
      const path = routes[id];
      if (window.location.pathname !== path) {
        router.push(path, { scroll: false });
      }
      setActive(id);
    }
    if (shouldScroll) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          document.getElementById("explore")?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      });
    }
  }

  function onTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === "Home" ? 0 : event.key === "End" ? tabs.length - 1 : (index + (event.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
    changeTab(tabs[next].id, true);
    tabRefs.current[next]?.focus();
  }

  const onContact = () => changeTab("atendimento");

  return <>
    {showSplash && !splashDone && <SplashScreen onComplete={handleSplashComplete} />}
    <main id="topo" className={splashDone ? "main--ready" : "main--hidden"}>
    <header className={`masthead ${scrolled ? "masthead--scrolled" : ""}`}><a className="wordmark" href="#topo" aria-label="Stärke Parts, voltar ao início"><img src="/starke-parts-logo.png" alt="" /></a><nav className="desktop-nav" aria-label="Navegação principal"><button onClick={() => changeTab("institucional")}>A empresa</button><button onClick={() => changeTab("aplicacoes")}>Montadoras</button><button onClick={() => changeTab("produtos")}>Portfólio</button><button onClick={() => changeTab("estrutura")}>Unidades</button></nav><div className="header-actions"><div className="language-switcher" role="group" aria-label="Selecionar idioma"><button type="button" className={language === "pt" ? "is-active" : ""} onClick={() => changeLanguage("pt")} aria-pressed={language === "pt"}>PT</button><span aria-hidden="true" /><button type="button" className={language === "en" ? "is-active" : ""} onClick={() => changeLanguage("en")} aria-pressed={language === "en"}>EN</button></div><button className="header-cta" onClick={onContact}>Falar com especialista <span>↗</span></button><div id="google_translate_element" aria-hidden="true" /></div></header>
    <section className="hero" aria-labelledby="hero-title"><HeroBackdrop /><HeroInvite /><div className="hero-meta"><span>SÃO PAULO · SOROCABA · CAMPINAS · SANTOS</span><span>EST. 2016</span></div></section>
    <section className="ticker" aria-label="Montadoras atendidas"><div className="ticker-track">{[...vehicleBrands, ...vehicleBrands].map((brand, index) => <span key={`${brand.name}-${index}`}><img src={vehicleBrandLogoFiles[brand.name]} alt="" />{!["Mercedes-Benz", "Jaguar", "MINI"].includes(brand.name) && <b aria-hidden={index >= vehicleBrands.length ? true : undefined}>{brand.name === "VW Premium" ? "Volkswagen" : brand.name}</b>}</span>)}</div></section>
    <section className="experience" id="explore" aria-labelledby="explore-heading"><div className="section-intro"><Eyebrow>EXPLORE A STÄRKE</Eyebrow><h2 id="explore-heading">Conheça cada dimensão<br />da nossa <em>especialidade.</em></h2><p>Selecione uma área para conhecer nossa história, aplicações, fabricantes, estrutura e tudo o que torna a Stärke uma referência em autopeças premium.</p></div><div className="tab-list" ref={tabListRef} role="tablist" aria-label="Áreas da Stärke Parts"><motion.div className="tab-indicator" layoutId="tab-indicator" transition={{ type: "spring", stiffness: 420, damping: 32 }} style={{ left: indicatorStyle.left, width: indicatorStyle.width }} /><motion.span className="tab-droplet" layoutId="tab-droplet" transition={{ type: "spring", stiffness: 420, damping: 32 }} style={{ left: indicatorStyle.left + indicatorStyle.width / 2 }} />{tabs.map((tab, index) => <motion.button key={tab.id} ref={element => { tabRefs.current[index] = element; }} id={`tab-${tab.id}`} className={`tab ${active === tab.id ? "tab--active" : ""}`} role="tab" aria-selected={active === tab.id} aria-controls={`panel-${tab.id}`} tabIndex={active === tab.id ? 0 : -1} onClick={() => changeTab(tab.id, false)} onKeyDown={event => onTabKeyDown(event, index)} whileHover={{ color: "#11110f" }} whileTap={{ scale: .95 }} transition={{ type: "spring", stiffness: 500, damping: 25 }}><span>{tab.number}</span>{tab.label}</motion.button>)}</div><AnimatePresence mode="wait"><motion.article key={active} className="tab-panel" role="tabpanel" id={`panel-${active}`} aria-labelledby={`tab-${active}`} tabIndex={0} initial={{ opacity: 0, y: 20, filter: "blur(4px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: -12, filter: "blur(2px)" }} transition={{ duration: .35, ease: [.4, 0, .15, 1] }}>{active === "institucional" && <InstitutionalPanel onContact={onContact} />}{active === "aplicacoes" && <ApplicationsPanel onContact={onContact} />}{active === "produtos" && <ProductsPanel onContact={onContact} />}{active === "fabricantes" && <ManufacturersPanel onContact={onContact} />}{active === "estrutura" && <StructurePanel onContact={onContact} />}{active === "logistica" && <LogisticsPanel onContact={onContact} />}{active === "atendimento" && <ServicePanel />}</motion.article></AnimatePresence></section>
    <section className="closing-statement"><Eyebrow light>STÄRKE PARTS · PREMIUM AUTOMOTIVE</Eyebrow><h2>Potência em qualidade.<br /><em>Excelência em cada detalhe.</em></h2><button className="button button--yellow" onClick={onContact}>Fale com um especialista <span>↗</span></button></section>
    <footer className="footer"><a className="wordmark" href="#topo" aria-label="Stärke Parts, voltar ao início"><img src="/starke-parts-logo.png" alt="" /></a><span>Oferecemos peças. Entregamos confiança.</span><a className="footer-instagram" href={INSTAGRAM} target="_blank" rel="noreferrer"><InstagramIcon />@starkepremiumparts ↗</a></footer>
  </main>
  </>;
}

export default function Home() {
  return <StarkePage showSplash />;
}
