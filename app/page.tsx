"use client";

import { useEffect, useRef, useState, useCallback, useMemo, memo, type KeyboardEvent } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "lenis";
import {
  LanguageProvider,
  useLanguage,
  heroWords,
  tabs as translatedTabs,
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

gsap.registerPlugin(ScrollTrigger);

const INSTAGRAM = "https://www.instagram.com/starkepremiumparts/";
const WHATSAPP_PT = "https://wa.me/5511952063102?text=Ol%C3%A1%2C%20gostaria%20de%20falar%20com%20um%20especialista%20da%20St%C3%A4rke%20Parts.";
const WHATSAPP_EN = "https://wa.me/5511952063102?text=Hello%2C%20I%27d%20like%20to%20talk%20to%20a%20St%C3%A4rke%20Parts%20specialist.";

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
  Jaguar: "/vehicle-logos/logo-jaguar.png",
  MINI: "/vehicle-logos/mini.svg",
  Ferrari: "/vehicle-logos/ferrari.svg",
  Lamborghini: "/vehicle-logos/lamborghini.svg",
"VW Premium": "/vehicle-logos/volkswagen.svg",
};

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
        { scale: 1.08, opacity: 0.72 },
        { scale: 1, opacity: 1, duration: 1.35, ease: "power2.out", clearProps: "willChange" }
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
  const { lang } = useLanguage();
  const [idx, setIdx] = useState(0);
  const accentRef = useRef<HTMLSpanElement>(null);
  const words = heroWords[lang];
  const widest = words.reduce((a, b) => (b.length > a.length ? b : a));
  const activeIdx = idx % words.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setIdx((i) => (i + 1) % words.length);
    }, 2400);
    return () => clearInterval(timer);
  }, [words.length]);

  useEffect(() => {
    const el = accentRef.current;
    if (!el) return;
    const letters = el.querySelectorAll(".invite-letter");
    gsap.fromTo(letters,
      { opacity: 0, transform: "translateY(.42em) rotateX(-80deg) scale(.84)" },
      {
        opacity: 1,
        transform: "translateY(0) rotateX(0deg) scale(1)",
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.05,
        clearProps: "transform",
      }
    );
  }, [idx, lang]);

  return <span className="invite-accent-group">
    <span className="invite-fade--accent" ref={accentRef} key={`${lang}-${activeIdx}`} aria-label={words[activeIdx]}>
      {Array.from(words[activeIdx]).map((letter, charIndex) => <span
        className="invite-letter"
        aria-hidden="true"
        key={`${letter}-${charIndex}`}
      >{letter === " " ? "\u00a0" : letter}</span>)}
    </span>
    <span className="invite-accent-ghost" aria-hidden="true">{widest}</span>
  </span>;
}

function HeroInvite() {
  const cardRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.fromTo(".hero-title",
        { clipPath: "inset(0 0 100% 0)" },
        { clipPath: "inset(0 0 0% 0)", duration: 1.4, onComplete: () => gsap.set(".hero-title", { clipPath: "none" }) },
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
        <span className="hero-line"><RotatingWord /></span>
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

function HeroMarkOne() {
  return <svg className="hero-mark hero-mark--tr" viewBox="0 0 89.68 155.95" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
    <polygon fill="#fbbb00" points=".25 56.15 45.35 56.15 1.93 0 .25 2.13 .25 56.15" />
    <polygon fill="none" stroke="#666665" strokeWidth="0.5" points="70.24 155.7 26.82 99.56 .25 133.21 .25 155.7 70.24 155.7" />
    <polyline fill="#981b1d" points="89.68 0 45.35 56.15 1.93 0 89.68 0" />
    <polyline fill="#4e4a4c" points="45.37 56.14 22.53 85.06 .16 56.14 45.37 56.14" />
    <polyline fill="#666665" points=".2 56.18 22.52 85.13 .2 113.47 .2 56.18" />
    <polyline fill="#fbbb00" points="45.33 56.15 67.65 85.09 45.33 113.44 45.33 56.15" />
    <polyline fill="none" stroke="#666665" strokeWidth="0.5" points="82.32 27.81 60 56.76 82.32 85.11 82.32 27.81" />
  </svg>;
}

function InstagramIcon() {
  return <svg className="instagram-icon" viewBox="0 0 24 24" aria-hidden="true"><defs><linearGradient id="instagram-gradient" x1="3" y1="21" x2="21" y2="3" gradientUnits="userSpaceOnUse"><stop stopColor="#ffcc55" /><stop offset=".28" stopColor="#ff543e" /><stop offset=".52" stopColor="#c837ab" /><stop offset=".78" stopColor="#7553d6" /><stop offset="1" stopColor="#2b65c8" /></linearGradient></defs><rect className="instagram-icon-bg" x="1.5" y="1.5" width="21" height="21" rx="6" /><rect className="instagram-icon-camera" x="6" y="6" width="12" height="12" rx="3.5" /><circle className="instagram-icon-lens" cx="12" cy="12" r="3" /><circle className="instagram-icon-dot" cx="16.4" cy="7.7" r=".9" /></svg>;
}

function WhatsAppBadge() {
  return <svg className="whatsapp-icon" viewBox="0 0 24 24" aria-hidden="true"><path className="whatsapp-icon-bg" d="M20.7 11.8a8.7 8.7 0 0 1-12.9 7.7l-4.6 1.3 1.4-4.5a8.7 8.7 0 1 1 16.1-4.5Z" /><path className="whatsapp-icon-phone" d="M8.1 7.7c.2-.4.4-.4.7-.4h.4c.2 0 .4 0 .5.4l.8 1.9c.1.3 0 .5-.1.7l-.6.8c-.2.2-.1.4 0 .6.7 1.2 1.7 2.2 3 2.8.2.1.4.1.6-.1l.8-1c.2-.2.4-.3.7-.2l1.9.9c.3.1.4.3.4.5 0 .3-.2 1.5-.8 2.1-.5.6-1.3.9-2.1.9-.6 0-1.4-.2-2.4-.6-1.1-.5-2.4-1.2-3.6-2.4-1-1-1.8-2.1-2.3-3.2-.5-1-.7-1.9-.7-2.6 0-.7.3-1.5.8-2.1Z" /></svg>;
}

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return <svg className={`whatsapp-icon ${className}`} viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" /></svg>;
}

function BrazilFlag() {
  return <svg className="language-flag" viewBox="0 0 28 20" aria-hidden="true"><rect width="28" height="20" rx="2" fill="#229e45" /><path d="m14 3 10 7-10 7-10-7Z" fill="#f7d229" /><path d="M10.3 9.1c2.8-.7 5.3-.3 7.5 1.1" fill="none" stroke="#fff" strokeWidth=".65" /><circle cx="14" cy="10" r="4.2" fill="#244aa5" /></svg>;
}

function UnitedStatesFlag() {
  return <svg className="language-flag" viewBox="0 0 28 20" aria-hidden="true"><rect width="28" height="20" rx="2" fill="#fff" /><path d="M0 0h28v2H0zm0 4h28v2H0zm0 4h28v2H0zm0 4h28v2H0zm0 4h28v2H0z" fill="#d52b3f" /><path d="M0 0h12v11H0Z" fill="#23488f" /><path d="M2 2h1v1H2zm3 0h1v1H5zm3 0h1v1H8zM2 5h1v1H2zm3 0h1v1H5zm3 0h1v1H8zM2 8h1v1H2zm3 0h1v1H5zm3 0h1v1H8z" fill="#fff" /></svg>;
}

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <p className={`eyebrow ${light ? "" : "eyebrow--dark"}`}><span />{children}</p>;
}

function PanelHeading({ kicker, title, text }: { kicker: string; title: string; text: string }) {
  return <div className="panel-heading"><Eyebrow>{kicker}</Eyebrow><h3>{title}</h3><p>{text}</p></div>;
}

function StoryIntro() {
  const { lang, t } = useLanguage();
  const WHATSAPP = lang === "en" ? WHATSAPP_EN : WHATSAPP_PT;
  const wrapRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const root = wrapRef.current;
    if (!root) return;
    const io = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        setReady(true);
        io.disconnect();
      }
    }, { rootMargin: "900px 0px" });
    io.observe(root);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const root = wrapRef.current;
    if (!root || !ready) return;
    const pinWindow = Math.max(1, root.offsetHeight - window.innerHeight);
    let raf = 0;

    const compute = () => {
      raf = 0;
      const top = root.getBoundingClientRect().top;
      const p = Math.min(1, Math.max(0, -top / pinWindow));
      setActive(Math.min(2, Math.floor(p * 3)));
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ready]);

  const goToSlide = useCallback((index: number) => {
    const root = wrapRef.current;
    if (!root) return;
    const pinWindow = Math.max(1, root.offsetHeight - window.innerHeight);
    const rootTop = window.scrollY + root.getBoundingClientRect().top;
    const progress = (index + 0.5) / 3;
    window.scrollTo({
      top: rootTop + pinWindow * progress,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  }, []);

  return <section className="story-intro" ref={wrapRef} aria-label={t("intro.aria")}>
    {ready && <div className="story-intro__pin">
      <article className={`story-slide story-slide--n1 ${active === 0 ? "is-active" : ""}`}>
        <InstitutionalVideoSection />
      </article>

      <article className={`story-slide story-slide--n2 ${active === 1 ? "is-active" : ""}`}>
        <div className="story-contact">
          <div className="story-contact__col story-appear">
            <div className="story-contact__head">
              <Eyebrow>{t("intro2.eyebrow")}</Eyebrow>
              <h3 dangerouslySetInnerHTML={{ __html: t("intro2.title") }} />
            </div>
            <p className="story-contact__text">{t("intro2.text")}</p>
            <a className="text-link story-contact__link" href={WHATSAPP} target="_blank" rel="noreferrer">{t("intro2.cta")} <span>↗</span></a>
          </div>
          <div className="story-chat-card story-appear">
            <span className="story-chat-card__live"><i aria-hidden="true" />{t("intro2.live")}</span>
            <WhatsAppIcon />
            <strong>+55 11 95206-3102</strong>
            <small>{t("intro2.phoneLabel")}</small>
            <a className="story-contact__btn" href={WHATSAPP} target="_blank" rel="noreferrer" aria-label={t("intro2.whatsapp")}><WhatsAppIcon /> {t("intro2.whatsapp")} <span>↗</span></a>
            <div className="story-chat-card__foot">
              <a className="story-contact__handle" href={INSTAGRAM} target="_blank" rel="noreferrer"><InstagramIcon />@starkepremiumparts <span>↗</span></a>
              <span className="story-contact__note">{t("intro2.note")}</span>
            </div>
          </div>
        </div>
      </article>

      <article className={`story-slide story-slide--n3 ${active === 2 ? "is-active" : ""}`}>
        <div className="story-ml">
          <img src="/mercadolivre.png" alt="Mercado Livre" className="story-ml__logo story-appear" loading="lazy" decoding="async" />
          <div className="story-ml__badge story-appear">
            <span className="story-ml__badge-dot" />
            {t("intro4.badge")}
          </div>
          <div className="story-ml__content story-appear">
            <Eyebrow light>{t("intro4.eyebrow")}</Eyebrow>
            <h3 dangerouslySetInnerHTML={{ __html: t("intro4.title") }} />
            <p>{t("intro4.text")}</p>
            <a className="story-ml__link" href="https://www.mercadolivre.com.br/pagina/starkeparts2600" target="_blank" rel="noreferrer">
              <svg className="story-ml__icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 12a9 9 0 0 1-9 9m9-9a9 9 0 0 0-9-9m9 9H3m9 9a9 9 0 0 1-9-9m9 9c1.66 0 3-4.03 3-9s-1.34-9-3-9m0 18c-1.66 0-3-4.03-3-9s1.34-9 3-9m-9 9a9 9 0 0 1 9-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              {t("intro4.cta")} <span>↗</span>
            </a>
          </div>
        </div>
      </article>

      <nav className="story-rail" aria-label={lang === "en" ? "Intro slides" : "Telas de introdução"}>
        {[0, 1, 2].map(i => <button type="button" key={i} className={`story-rail__item ${active === i ? "is-active" : ""}`} onClick={() => goToSlide(i)} aria-label={lang === "en" ? `Go to slide ${i + 1}` : `Ir para a tela ${i + 1}`} aria-current={active === i ? "step" : undefined}><b>{String(i + 1).padStart(2, "0")}</b><i aria-hidden="true" /></button>)}
      </nav>
    </div>}
  </section>;
}

const MemoStoryIntro = memo(StoryIntro);

function HeroSection() {
  return <section className="hero" aria-labelledby="hero-title"><HeroBackdrop /><HeroInvite /><HeroMarkOne /><div className="hero-meta"><span>SÃO PAULO · SOROCABA · CAMPINAS · SANTOS</span><span>EST. 2016</span></div></section>;
}
const MemoHero = memo(HeroSection);

function TickerSection() {
  const { t } = useLanguage();
  return <section className="ticker" aria-label={t("ticker.aria")}><div className="ticker-track">{[...vehicleBrands, ...vehicleBrands].map((brand, index) => <span key={`${brand.name}-${index}`}><img src={vehicleBrandLogoFiles[brand.name]} alt="" />{!["Mercedes-Benz", "Jaguar", "MINI"].includes(brand.name) && <b aria-hidden={index >= vehicleBrands.length ? true : undefined}>{brand.name === "VW Premium" ? "Volkswagen" : brand.name}</b>}</span>)}</div></section>;
}
const MemoTicker = memo(TickerSection);

function InstitutionalVideoSection() {
  const { lang } = useLanguage();
  const copy = lang === "en"
    ? {
        eyebrow: "INSTITUTIONAL VIDEO",
        title: <>Get to know the strength<br />behind <em>every part.</em></>,
        text: "Discover our structure, our team and the expertise that connects premium automotive parts to customers throughout Brazil.",
        label: "STÄRKE PARTS · SINCE 2016",
        aria: "Stärke Parts institutional video",
        status: "Institutional video coming soon",
      }
    : {
        eyebrow: "VÍDEO INSTITUCIONAL",
        title: <>Conheça a força<br />por trás de <em>cada peça.</em></>,
        text: "Nossa estrutura, nossa equipe e a experiência que conecta autopeças premium a clientes de todo o Brasil.",
        label: "STÄRKE PARTS · DESDE 2016",
        aria: "Vídeo institucional da Stärke Parts",
        status: "Vídeo institucional em preparação",
      };

  return <section className="institutional-video" aria-labelledby="institutional-video-title">
    <div className="institutional-video__intro story-appear">
      <Eyebrow light>{copy.eyebrow}</Eyebrow>
      <h2 id="institutional-video-title">{copy.title}</h2>
      <p>{copy.text}</p>
    </div>
    <div className="institutional-video__frame story-appear">
      <div className="institutional-video__placeholder" role="img" aria-label={copy.aria}>
        <img src="/unidade-sao-paulo.webp" alt="" loading="lazy" decoding="async" />
        <span>{copy.status}</span>
      </div>
      <span className="institutional-video__label">{copy.label}</span>
    </div>
  </section>;
}
function ClosingSection() {
  const { lang, t } = useLanguage();
  const WHATSAPP = lang === "en" ? WHATSAPP_EN : WHATSAPP_PT;
  return <section className="closing-statement"><Eyebrow light>{t("closing.eyebrow")}</Eyebrow><h2 dangerouslySetInnerHTML={{ __html: t("closing.heading") }} /><a className="button button--yellow" href={WHATSAPP} target="_blank" rel="noreferrer">{t("closing.cta")} <span>↗</span></a></section>;
}
const MemoClosing = memo(ClosingSection);

function FooterSection() {
  const { t } = useLanguage();
  return <footer className="footer"><a className="wordmark" href="#topo" aria-label={t("nav.home")}><img src="/starke-parts-logo.png" alt="" /></a><span>{t("footer.tagline")}</span><a className="footer-instagram" href={INSTAGRAM} target="_blank" rel="noreferrer"><InstagramIcon />@starkepremiumparts ↗</a></footer>;
}
const MemoFooter = memo(FooterSection);

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
      {[...manufacturerCarouselBrands, ...manufacturerCarouselBrands].map((brand, index) => <button className={`manufacturer-logo ${selectedBrand.name === brand.name ? "manufacturer-logo--active" : ""}`} key={`${brand.name}-${index}`} onClick={() => setSelectedBrand(brand)} aria-pressed={selectedBrand.name === brand.name} aria-hidden={index >= manufacturerCarouselBrands.length ? true : undefined} tabIndex={index >= manufacturerCarouselBrands.length ? -1 : 0}><img src={manufacturerLogoFiles[brand.name]} alt={brand.name} loading="lazy" decoding="async" /></button>)}
    </div>
    <article className="manufacturer-brand-summary" key={selectedBrand.name} aria-live="polite"><div><small>{selectedBrand.origin[lang]}</small><h4>{selectedBrand.name}</h4></div><div><span>{t("man.history")}</span><p>{selectedBrand.history[lang]}</p></div><div><span>{t("man.lines")}</span><p>{selectedBrand.work[lang]}</p></div></article>
  </section>;
}

function InstitutionalPanel({ onContact }: { onContact: () => void }) {
  const { lang, t } = useLanguage();
  return <div className="institutional-page">
    <div className="panel-heading panel-heading--institutional">
      <Eyebrow>{t("inst.eyebrow")}</Eyebrow>
      <h3>{t("inst.title")}</h3>

      <div className="institutional-history-intro">
        <p className="institutional-history-lead">{t("inst.lead")}</p>

        <div className="institutional-history-summary">
          <p>{t("inst.p1")}</p>

          <p>{t("inst.p2")}</p>

          <p>{t("inst.p3")}</p>

          <p className="institutional-history-closing">{t("inst.close")}</p>
        </div>

        <div className="institutional-history-milestones" aria-label={t("inst.eyebrow")}><div><strong>2016</strong><span>{t("inst.m1")}</span></div><div><strong>2024</strong><span>{t("inst.m2")}</span></div><div><strong>2025</strong><span>{t("inst.m3")}</span></div><div><strong>2026</strong><span>{t("inst.m4")}</span></div></div>

        <p className="institutional-history-signature"><span>STÄRKE PARTS</span><strong>{t("inst.sig1")}<br />{t("inst.sig2")}</strong><em>{t("inst.sig3")}</em></p>
      </div>
    </div>

    <div className="editorial-grid editorial-grid--no-photo">
      <div className="editorial-copy">
        <span className="section-number">{t("inst.edit.eyebrow")}</span>
        <h4>{t("inst.edit.t1")}<br /><em>{t("inst.edit.t2")}</em></h4>
        <p>{t("inst.edit.p1")}</p>
        <p>{t("inst.edit.p2")}</p>
        <p>{t("inst.edit.p3")}</p>
        <button className="text-link" onClick={onContact}>{t("inst.edit.cta")} <span>↗</span></button>
      </div>
    </div>

    <div className="metric-grid"><div><strong>2016</strong><span>{t("inst.met1")}</span></div><div><strong>04</strong><span>{t("inst.met2")}</span></div><div><strong>11</strong><span>{t("inst.met3")}</span></div><div><strong>BR</strong><span>{t("inst.met4")}</span></div></div>

    <div className="subsection-heading identity-heading"><Eyebrow>{t("inst.id.eyebrow")}</Eyebrow><h4>{t("inst.id.t1")}<br /><em>{t("inst.id.t2")}</em></h4><p className="subsection-description">{t("inst.id.desc")}</p></div>
    <div className="institutional-pillars-layout"><aside><strong>{t("inst.pill.aside")}</strong><p>{t("inst.pill.text")}</p></aside><div>{corporatePillars.map((item, index) => <article key={item.label[lang]}><span>{String(index + 1).padStart(2, "0")}</span><div><small>{item.label[lang]}</small><h5>{item.title[lang]}</h5></div><p>{item.text[lang]}</p></article>)}</div></div>

    <div className="subsection-heading company-story-heading"><Eyebrow>{t("inst.story.eyebrow")}</Eyebrow><h4>{t("inst.story.t1")}<br />{t("inst.story.t2")} <em>Stärke.</em></h4><p>{t("inst.story.desc")}</p></div>

    <div className="company-chapters">{companyChapters.map(chapter => <article className="company-chapter" key={chapter.number}><div className="chapter-index"><span className="chapter-icon">{chapter.icon}</span><b>{chapter.eyebrow[lang]}</b></div><div className="chapter-copy"><h5>{chapter.title[lang]}</h5>{chapter.paragraphs.map(paragraph => <p key={paragraph[lang]}>{paragraph[lang]}</p>)}</div></article>)}</div>

    <aside className="brand-promise"><span>{t("inst.brand.eyebrow")}</span><h4 dangerouslySetInnerHTML={{ __html: t("closing.heading") }} /><p>{t("inst.brand.text")}</p></aside>

    <div className="subsection-heading roadmap-heading"><Eyebrow>{t("inst.road.eyebrow")}</Eyebrow><h4>{t("inst.road.t1")}<br />{t("inst.road.t2")} <em>{t("inst.road.t3")}</em></h4></div>
    <CompanyRoadmap />

    <section className="operations-intro"><div><Eyebrow>{t("inst.ops.eyebrow")}</Eyebrow><h4>{t("inst.ops.t1")}<br />{t("inst.ops.t2")} <em>{t("inst.ops.t3")}</em></h4></div><aside><strong>09</strong><span>{t("inst.ops.count")}</span><p>{t("inst.ops.text")}</p></aside></section>
    <div className="operations-grid">{companyOperations.map((item, index) => <article className="operation-card" key={item.title[lang]}><span>{String(index + 1).padStart(2, "0")}</span><h5>{item.title[lang]}</h5><p>{item.text[lang]}</p></article>)}</div>

    <div className="principle-grid"><article><span>01</span><h5>{t("inst.princ1.t")}</h5><p>{t("inst.princ1.p")}</p></article><article><span>02</span><h5>{t("inst.princ2.t")}</h5><p>{t("inst.princ2.p")}</p></article><article><span>03</span><h5>{t("inst.princ3.t")}</h5><p>{t("inst.princ3.p")}</p></article><article><span>04</span><h5>{t("inst.princ4.t")}</h5><p>{t("inst.princ4.p")}</p></article></div>
    <div className="institutional-manifesto"><Eyebrow>{t("inst.manifesto.eyebrow")}</Eyebrow><p>{t("inst.manifesto.p")}</p><strong>{t("inst.manifesto.strong1")}<br /><em>{t("inst.manifesto.strong2")}</em></strong></div>
  </div>;
}
function ApplicationsPanel({ onContact }: { onContact: () => void }) {
  const { lang, t } = useLanguage();
  const [selected, setSelected] = useState(0);
  const [previewed, setPreviewed] = useState<number | null>(null);
  const vehicle = vehicleBrands[selected];

  const selectVehicle = (index: number) => {
    setSelected(index);
    setPreviewed(null);
  };

  return <div className="applications-page">
    <PanelHeading kicker={t("app.kicker")} title={t("app.title")} text={t("app.text")} />
    <div className="brand-explorer">
      <div className="brand-selector" aria-label={t("app.selectorAria")}>
        {vehicleBrands.map((item, index) => {
          return <button
            type="button"
            key={item.name}
            className={`${selected === index ? "selected" : ""} ${previewed === index ? "is-previewed" : ""}`}
            onPointerDown={() => selectVehicle(index)}
            onClick={() => selectVehicle(index)}
            onMouseEnter={() => setPreviewed(index)}
            onMouseLeave={() => setPreviewed(null)}
            onFocus={() => setPreviewed(index)}
            onBlur={() => setPreviewed(null)}
            aria-pressed={selected === index}
            style={{ ["--vehicle-image" as string]: `url('${item.image}')` }}
          >
            <span className="brand-selector-index">{String(index + 1).padStart(2, "0")}</span>
            <span className="brand-selector-name">{item.name}</span>
            <b>↗</b>
          </button>;
        })}
      </div>
      <article
        key={selected}
        className="brand-feature brand-feature--in"
      >
        <div className="brand-feature-inner">
          <div className="brand-feature-photo" style={{ backgroundImage: `linear-gradient(0deg,rgba(4,4,4,.9),transparent 70%),url('${vehicle.image}')` }}>
            <span>{vehicle.territory[lang]}</span><h4>{vehicle.name}</h4><b>{vehicle.focus[lang]}</b>
          </div>
          <div className="brand-feature-copy">
            <div className="brand-feature-summary"><span>{t("app.about")}</span><p>{vehicle.about[lang]}</p></div>
            <div className="brand-feature-summary"><span>{t("app.apply")}</span><p>{vehicle.text[lang]}</p></div>
            <button className="text-link" onClick={onContact}>{t("app.cta")} <span>↗</span></button>
          </div>
        </div>
      </article>
    </div>
    <aside className="info-strip"><strong>{t("app.stripStrong")}</strong><span>{t("app.stripSpan")}</span></aside>
    <div className="subsection-heading"><Eyebrow>{t("app.secEyebrow")}</Eyebrow><h4 dangerouslySetInnerHTML={{ __html: t("app.secHeading") }} /><p className="subsection-description">{t("app.secDesc")}</p></div>
    <div className="detail-grid">{applicationCriteria.map((item, index) => <article className="detail-card" key={item.title[lang]}><span>{String(index + 1).padStart(2, "0")}</span><h5>{item.title[lang]}</h5><p>{item.text[lang]}</p></article>)}</div>
    <aside className="editorial-note"><strong>{t("app.noteStrong")}</strong><p>{t("app.noteText")}</p></aside>
  </div>;
}

function ProductsPanel() {
  const { lang, t } = useLanguage();
  const WHATSAPP = lang === "en" ? WHATSAPP_EN : WHATSAPP_PT;
  return <div className="products-page">
    <PanelHeading kicker={t("prod.kicker")} title={t("prod.title")} text={t("prod.text")} />
    <div className="product-spotlight"><div className="product-spotlight-photo" aria-label={t("prod.spotEyebrow")} /><div className="product-spotlight-copy"><Eyebrow>{t("prod.spotEyebrow")}</Eyebrow><h4 dangerouslySetInnerHTML={{ __html: t("prod.spotHeading") }} /><p>{t("prod.spotText")}</p></div></div>
    <ProductCarousel />
    <div className="subsection-heading"><Eyebrow>{t("prod.secEyebrow")}</Eyebrow><h4 dangerouslySetInnerHTML={{ __html: t("prod.secHeading") }} /></div>
    <div className="detail-grid product-context-grid">{productContexts.map((item, index) => <article className="detail-card" key={item.title[lang]}><span>{String(index + 1).padStart(2, "0")}</span><h5>{item.title[lang]}</h5><p>{item.text[lang]}</p></article>)}</div>
    <div className="quality-banner"><span>{t("prod.bannerEyebrow")}</span><h4 dangerouslySetInnerHTML={{ __html: t("prod.bannerHeading") }} /><p>{t("prod.bannerText")}</p></div>
    <aside className="info-strip"><strong>{t("prod.notFound")}</strong><a className="text-link" href={WHATSAPP} target="_blank" rel="noreferrer">{t("prod.cta")} <span>↗</span></a></aside>
  </div>;
}

function ManufacturersPanel({ onContact }: { onContact: () => void }) {
  const { t } = useLanguage();
  return <div className="manufacturers-page">
    <PanelHeading kicker={t("man.kicker")} title={t("man.title")} text={t("man.text")} />
    <ManufacturerLogoCarousel />
    <aside className="manufacturer-note"><div><Eyebrow>{t("man.noteEyebrow")}</Eyebrow><h4>{t("man.noteHeading")}</h4></div><button className="button button--yellow" onClick={onContact}>{t("man.cta")} <span>→</span></button></aside>
  </div>;
}

function StructurePanel({ onContact }: { onContact: () => void }) {
  const { lang, t } = useLanguage();
  return <div className="structure-page">
    <PanelHeading kicker={t("str.kicker")} title={t("str.title")} text={t("str.text")} />
    <div className="locations-grid">{locations.map(location => <article className="location-card" key={location.code}><div className="location-top"><span>{location.code}</span><span>{location.type[lang]}</span></div><h4>{location.city}</h4><p className="location-area">{location.area[lang]}</p><a className="location-address" href={location.addressHref} target="_blank" rel="noreferrer" aria-label={`Endereço ${location.city}`}><span>{location.address}</span></a><a className="location-phone" href={location.phoneHref} aria-label={t("str.cardAria").replace("{city}", location.city)}><span>{t("str.phone")}</span><strong>{location.phone}</strong></a><p>{location.description[lang]}</p><ul>{location.capabilities.map(item => <li key={item[lang]}>{item[lang]}</li>)}</ul><button onClick={onContact}>{t("str.cardCta")} <span>↗</span></button></article>)}</div>
    <aside className="coverage-banner"><Eyebrow light>{t("str.coverEyebrow")}</Eyebrow><h4 dangerouslySetInnerHTML={{ __html: t("str.coverHeading") }} /><p>{t("str.coverText")}</p></aside>
    <div className="subsection-heading"><Eyebrow>{t("str.secEyebrow")}</Eyebrow><h4 dangerouslySetInnerHTML={{ __html: t("str.secHeading") }} /><p className="subsection-description">{t("str.secDesc")}</p></div>
    <div className="journey-list">{operationalJourney.map(item => <article className="journey-item" key={item.step}><span>{item.step}</span><h5>{item.title[lang]}</h5><p>{item.text[lang]}</p></article>)}</div>
    <aside className="editorial-note"><strong>{t("str.noteStrong")}</strong><p>{t("str.noteText")}</p></aside>
  </div>;
}

function LogisticsPanel({ onContact }: { onContact: () => void }) {
  const { lang, t } = useLanguage();
  return <>
    <PanelHeading kicker={t("log.kicker")} title={t("log.title")} text={t("log.text")} />
    <div className="logistics-grid"><article className="logistics-card logistics-card--highlight"><span>{t("log.card1.span")}</span><h4 dangerouslySetInnerHTML={{ __html: t("log.card1.title") }} /><p>{t("log.card1.text")}</p><b>{t("log.card1.note")}</b></article><article className="logistics-card"><span>{t("log.card2.span")}</span><h4 dangerouslySetInnerHTML={{ __html: t("log.card2.title") }} /><p>{t("log.card2.text")}</p><b>{t("log.card2.note")}</b></article><article className="logistics-card"><span>{t("log.card3.span")}</span><h4 dangerouslySetInnerHTML={{ __html: t("log.card3.title") }} /><p>{t("log.card3.text")}</p><b>{t("log.card3.note")}</b></article></div>
    <div className="subsection-heading"><Eyebrow>{t("log.secEyebrow")}</Eyebrow><h4 dangerouslySetInnerHTML={{ __html: t("log.secHeading") }} /></div>
    <div className="coverage-grid">{logisticsCoverage.map(item => <article className="coverage-card" key={item.title[lang]}><span>{item.badge[lang]}</span><h5>{item.title[lang]}</h5><p>{item.text[lang]}</p></article>)}</div>
    <div className="subsection-heading"><Eyebrow>{t("log.procEyebrow")}</Eyebrow><h4 dangerouslySetInnerHTML={{ __html: t("log.procHeading") }} /></div>
    <div className="process-flow">{[t("log.step1"), t("log.step2"), t("log.step3"), t("log.step4")].map((step, index) => <div key={step}><span>{String(index + 1).padStart(2, "0")}</span><h5>{step}</h5></div>)}</div>
    <aside className="editorial-note"><strong>{t("log.noteStrong")}</strong><p>{t("log.noteText")}</p></aside>
    <button className="text-link" onClick={onContact}>{t("log.cta")} <span>↗</span></button>
  </>;
}

function ServicePanel() {
  const { lang, t } = useLanguage();
  const WHATSAPP = lang === "en" ? WHATSAPP_EN : WHATSAPP_PT;
  return <div className="service-page">
    <PanelHeading kicker={t("srv.kicker")} title={t("srv.title")} text={t("srv.text")} />
    <div className="service-audiences"><article><span>01</span><h4>{t("srv.aud1.title")}</h4><p>{t("srv.aud1.text")}</p></article><article><span>02</span><h4>{t("srv.aud2.title")}</h4><p>{t("srv.aud2.text")}</p></article><article><span>03</span><h4>{t("srv.aud3.title")}</h4><p>{t("srv.aud3.text")}</p></article></div>
    <div className="subsection-heading"><Eyebrow>{t("srv.secEyebrow")}</Eyebrow><h4 dangerouslySetInnerHTML={{ __html: t("srv.secHeading") }} /></div>
    <div className="service-steps">{serviceSteps.map(step => <article key={step.number}><span>{step.number}</span><div><h5>{step.title[lang]}</h5><p>{step.text[lang]}</p></div></article>)}</div>
    <aside className="chassis-note"><strong>{t("srv.chassisStrong")}</strong><span>{t("srv.chassisSpan")}</span></aside>
    <div className="subsection-heading"><Eyebrow>{t("srv.faqEyebrow")}</Eyebrow><h4 dangerouslySetInnerHTML={{ __html: t("srv.faqHeading") }} /></div>
    <div className="faq-list">{commonQuestions.map(item => <details className="faq-item" key={item.question[lang]}><summary>{item.question[lang]}<span>+</span></summary><p>{item.answer[lang]}</p></details>)}</div>
    <div className="after-sales"><span>{t("srv.afterEyebrow")}</span><h5 dangerouslySetInnerHTML={{ __html: t("srv.afterTitle") }} /><p>{t("srv.afterText")}</p></div>
    <div className="contact-card"><Eyebrow light>{t("srv.contactEyebrow")}</Eyebrow><h4 dangerouslySetInnerHTML={{ __html: t("srv.contactTitle") }} /><p>{t("srv.contactText")}</p><div className="contact-socials"><a className="contact-social contact-social--whatsapp" href={WHATSAPP} target="_blank" rel="noreferrer" aria-label={t("srv.whatsapp")}><span className="contact-social__icon" aria-hidden="true"><WhatsAppBadge /></span><span className="contact-social__copy"><small>WHATSAPP</small><strong>{t("srv.whatsapp")}</strong></span><span className="contact-social__arrow" aria-hidden="true">↗</span></a><a className="contact-social contact-social--instagram" href={INSTAGRAM} target="_blank" rel="noreferrer"><span className="contact-social__icon" aria-hidden="true"><InstagramIcon /></span><span className="contact-social__copy"><small>INSTAGRAM</small><strong>@starkepremiumparts</strong></span><span className="contact-social__arrow" aria-hidden="true">↗</span></a></div></div>
  </div>;
}

function StarkePageContent({ initialSection = "institucional", showSplash = false }: { initialSection?: TabId; showSplash?: boolean }) {
  const { lang: language, setLanguage, t } = useLanguage();
  const WHATSAPP = language === "en" ? WHATSAPP_EN : WHATSAPP_PT;
  const tabs = useMemo(() => translatedTabs.map(tab => ({ ...tab, label: tab.label[language] })), [language]);
  const [active, setActive] = useState<TabId>(() => {
    if (typeof window === "undefined") return initialSection;
    const hash = window.location.hash.slice(1);
    return translatedTabs.some(tab => tab.id === hash) ? hash as TabId : initialSection;
  });
  const [scrolled, setScrolled] = useState(() => typeof window !== "undefined" && window.scrollY > 28);
  const [splashDone, setSplashDone] = useState(() => {
    if (!showSplash) return true;
    if (typeof window === "undefined") return false;
    return window.sessionStorage.getItem("starke-welcome-seen") === "true";
  });
  const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number }>({ left: 0, width: 0 });
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const tabListRef = useRef<HTMLDivElement>(null);
  const activeSectionMounted = useRef(false);
  const lenisRef = useRef<Lenis | null>(null);

  const scrollToExplore = useCallback(() => {
    const lenis = lenisRef.current;
    if (lenis) lenis.scrollTo("#explore", { duration: 1.2, offset: -70, easing: (t) => 1 - Math.pow(1 - t, 4) });
    else document.getElementById("explore")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => {
    if (splashDone) return;
    const html = document.documentElement;
    const body = document.body;
    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    window.scrollTo(0, 0);
    return () => {
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
    };
  }, [splashDone]);

  useEffect(() => {
    if (!splashDone) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const deviceMemory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
    const limitedDevice = navigator.hardwareConcurrency <= 4 || (deviceMemory !== undefined && deviceMemory <= 4);
    const smoothWheel = !reduceMotion && !coarsePointer && !limitedDevice;
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.18,
      smoothWheel,
      wheelMultiplier: 1,
      touchMultiplier: 1,
      syncTouch: false,
      overscroll: false,
    });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const refreshFrame = window.requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
    return () => {
      window.cancelAnimationFrame(refreshFrame);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [splashDone]);

  const handleSplashComplete = useCallback(() => {
    sessionStorage.setItem("starke-welcome-seen", "true");
    setSplashDone(true);
  }, []);

  useEffect(() => {
    let scrollFrame = 0;
    let lastScrolled = window.scrollY > 28;
    const listener = () => {
      if (scrollFrame) return;
      scrollFrame = window.requestAnimationFrame(() => {
        scrollFrame = 0;
        const nextScrolled = window.scrollY > 28;
        if (nextScrolled !== lastScrolled) {
          lastScrolled = nextScrolled;
          setScrolled(nextScrolled);
        }
      });
    };
    listener();
    window.addEventListener("scroll", listener, { passive: true });
    return () => {
      window.removeEventListener("scroll", listener);
      if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
    };
  }, []);

  useEffect(() => {
    const updateIndicator = () => {
      const idx = tabs.findIndex(t => t.id === active);
      const el = tabRefs.current[idx];
      if (!el || !tabListRef.current) return;
      const listRect = tabListRef.current.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      setIndicatorStyle({ left: elRect.left - listRect.left + tabListRef.current.scrollLeft, width: elRect.width });
    };
    updateIndicator();
    const indicatorTimer = window.setTimeout(updateIndicator, 360);
    if (activeSectionMounted.current) {
      const scrollTimer = window.setTimeout(scrollToExplore, 80);
      return () => {
        window.clearTimeout(scrollTimer);
        window.clearTimeout(indicatorTimer);
      };
    }
    activeSectionMounted.current = true;
    return () => window.clearTimeout(indicatorTimer);
  }, [active, scrollToExplore, tabs]);

  useEffect(() => {
    const onPopState = () => {
      const path = window.location.pathname;
      const id = (Object.keys(routes) as TabId[]).find(key => routes[key] === path);
      if (id && id !== active) setActive(id);
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [active]);

  const changeTab = useCallback((id: TabId, shouldScroll = true) => {
    setActive(current => {
      if (current !== id) {
        const path = routes[id];
        if (window.location.pathname !== path) {
          window.history.pushState({ tab: id }, "", path);
        }
      }
      return id;
    });
    if (shouldScroll) {
      requestAnimationFrame(() => {
        requestAnimationFrame(scrollToExplore);
      });
    }
  }, [scrollToExplore]);

  function onTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === "Home" ? 0 : event.key === "End" ? tabs.length - 1 : (index + (event.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
    changeTab(tabs[next].id, true);
    tabRefs.current[next]?.focus();
  }

  const onContact = useCallback(() => changeTab("atendimento"), [changeTab]);

  return <>
    {showSplash && !splashDone && <SplashScreen onComplete={handleSplashComplete} />}
    <main id="topo" className={splashDone ? "main--ready" : "main--hidden"}>
    <header className={`masthead ${scrolled ? "masthead--scrolled" : ""}`}><a className="wordmark" href="#topo" aria-label={t("nav.home")}><img src="/starke-parts-logo.png" alt="" /></a><nav className="desktop-nav" aria-label={t("nav.aria")}><button onClick={() => changeTab("institucional")}>{t("nav.company")}</button><button onClick={() => changeTab("aplicacoes")}>{t("nav.automakers")}</button><button onClick={() => changeTab("produtos")}>{t("nav.portfolio")}</button><button onClick={() => changeTab("estrutura")}>{t("nav.locations")}</button></nav><div className="header-actions"><div className="language-switcher" role="group" aria-label={t("lang.aria")}><button type="button" className={language === "pt" ? "is-active" : ""} onClick={() => setLanguage("pt")} aria-label="Português do Brasil" title="Português do Brasil" aria-pressed={language === "pt"}><BrazilFlag /></button><span aria-hidden="true" /><button type="button" className={language === "en" ? "is-active" : ""} onClick={() => setLanguage("en")} aria-label="English (United States)" title="English (United States)" aria-pressed={language === "en"}><UnitedStatesFlag /></button></div><a className="header-cta" href={WHATSAPP} target="_blank" rel="noreferrer">{t("nav.cta")} <span>↗</span></a></div></header>
    <MemoHero />
    <MemoTicker />
    <MemoStoryIntro />
    <section className="experience" id="explore" aria-labelledby="explore-heading"><div className="section-intro"><Eyebrow>{t("explore.eyebrow")}</Eyebrow><h2 id="explore-heading" dangerouslySetInnerHTML={{ __html: t("explore.heading") }} /><p>{t("explore.desc")}</p></div><div className="tab-list" ref={tabListRef} role="tablist" aria-label={t("explore.aria")}><div className="tab-indicator" style={{ left: indicatorStyle.left, width: indicatorStyle.width }} /><span className="tab-droplet" style={{ left: indicatorStyle.left + indicatorStyle.width / 2 }} />{tabs.map((tab, index) => <button key={tab.id} ref={element => { tabRefs.current[index] = element; }} id={`tab-${tab.id}`} className={`tab ${active === tab.id ? "tab--active" : ""}`} role="tab" aria-selected={active === tab.id} aria-controls={`panel-${tab.id}`} tabIndex={active === tab.id ? 0 : -1} onClick={() => changeTab(tab.id, false)} onKeyDown={event => onTabKeyDown(event, index)}><span>{tab.number}</span>{tab.label}</button>)}</div><article key={active} className="tab-panel tab-panel--in" role="tabpanel" id={`panel-${active}`} aria-labelledby={`tab-${active}`} tabIndex={0}>{active === "institucional" && <InstitutionalPanel onContact={onContact} />}{active === "aplicacoes" && <ApplicationsPanel onContact={onContact} />}{active === "produtos" && <ProductsPanel />}{active === "fabricantes" && <ManufacturersPanel onContact={onContact} />}{active === "estrutura" && <StructurePanel onContact={onContact} />}{active === "logistica" && <LogisticsPanel onContact={onContact} />}{active === "atendimento" && <ServicePanel />}</article></section>
    <MemoClosing />
    <MemoFooter />
  </main>
  </>;
}

export function StarkePage(props: { initialSection?: TabId; showSplash?: boolean }) {
  return <LanguageProvider><StarkePageContent {...props} /></LanguageProvider>;
}

export default function Home() {
  return <StarkePage showSplash />;
}

