"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type SiteLanguage = "pt" | "en";

export type Bilingual = {
  pt: string;
  en: string;
};

/* ------------------------------------------------------------------ */
/* Context                                                             */
/* ------------------------------------------------------------------ */

const LanguageContext = createContext<{ lang: SiteLanguage; setLanguage: (next: SiteLanguage) => void }>({
  lang: "pt",
  setLanguage: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<SiteLanguage>("pt");

  useEffect(() => {
    let stored: SiteLanguage = "pt";
    try {
      stored = window.localStorage.getItem("starke-language") === "en" ? "en" : "pt";
    } catch {
      /* ignore */
    }
    setLang(stored);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "en" ? "en" : "pt-BR";
  }, [lang]);

  const setLanguage = (next: SiteLanguage) => {
    setLang(next);
    try {
      window.localStorage.setItem("starke-language", next);
    } catch {
      /* ignore */
    }
  };

  return <LanguageContext.Provider value={{ lang, setLanguage }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const { lang, setLanguage } = useContext(LanguageContext);
  const t = (key: string) => (key in copy ? copy[key][lang] : key);
  return { lang, setLanguage, t };
}

/* ------------------------------------------------------------------ */
/* Freeform copy                                                       */
/* ------------------------------------------------------------------ */

export const copy: Record<string, Bilingual> = {
  /* Splash */
  "splash.kicker": { pt: "PREMIUM AUTOMOTIVE PARTS", en: "PREMIUM AUTOMOTIVE PARTS" },
  "splash.tagline": { pt: "Oferecemos peças. Entregamos confiança.", en: "We offer parts. We deliver trust." },

  /* Masthead */
  "nav.home": { pt: "Stärke Parts, início", en: "Stärke Parts, home" },
  "nav.aria": { pt: "Navegação principal", en: "Main navigation" },
  "nav.company": { pt: "A empresa", en: "About us" },
  "nav.automakers": { pt: "Montadoras", en: "Automakers" },
  "nav.portfolio": { pt: "Portfólio", en: "Portfolio" },
  "nav.locations": { pt: "Unidades", en: "Locations" },
  "nav.cta": { pt: "Falar com especialista", en: "Talk to an expert" },
  "lang.aria": { pt: "Selecionar idioma", en: "Select language" },

  /* Hero */
  "hero.line2": { pt: "começa na", en: "begins with" },
  "hero.line3": { pt: "peça certa.", en: "the right part." },
  "hero.hint": { pt: "ROLE PARA EXPLORAR", en: "SCROLL TO EXPLORE" },
  "ticker.aria": { pt: "Montadoras atendidas", en: "Automakers we serve" },

  /* Explore */
  "explore.eyebrow": { pt: "EXPLORE A STÄRKE", en: "EXPLORE STÄRKE" },
  "explore.heading": {
    pt: "Conheça cada dimensão<br />da nossa <em>especialidade.</em>",
    en: "Explore every dimension<br />of our <em>expertise.</em>",
  },
  "explore.desc": {
    pt: "Selecione uma área para conhecer nossa história, aplicações, fabricantes, estrutura e tudo o que torna a Stärke uma referência em autopeças premium.",
    en: "Select an area to discover our history, applications, manufacturers, structure and everything that makes Stärke a benchmark in premium auto parts.",
  },
  "explore.aria": { pt: "Áreas da Stärke Parts", en: "Stärke Parts areas" },

  /* Closing */
  "closing.eyebrow": { pt: "STÄRKE PARTS · PREMIUM AUTOMOTIVE", en: "STÄRKE PARTS · PREMIUM AUTOMOTIVE" },
  "closing.heading": {
    pt: "Potência em qualidade.<br /><em>Excelência em cada detalhe.</em>",
    en: "Power in quality.<br /><em>Excellence in every detail.</em>",
  },
  "closing.cta": { pt: "Fale com um especialista", en: "Talk to an expert" },

  /* Story intro slides */
  "intro.aria": { pt: "A Stärke Parts em três momentos", en: "Stärke Parts in three moments" },
  "intro1.eyebrow": { pt: "STÄRKE PARTS · ESPECIALISTAS DESDE 2016", en: "STÄRKE PARTS · SPECIALISTS SINCE 2016" },
  "intro1.title": {
    pt: "Oferecemos peças.<br /><em class=\"story-line2\">Entregamos confiança.</em>",
    en: "We offer parts.<br /><em class=\"story-line2\">We deliver trust.</em>",
  },
  "intro1.text": {
    pt: "Distribuidora especializada em autopeças premium para veículos importados, premium e superesportivos — unindo fabricantes globais, conhecimento técnico em profundidade e uma operação integrada que atende todo o Brasil.",
    en: "A distributor specialized in premium auto parts for imported, premium and super sports vehicles — combining global manufacturers, deep technical knowledge and an integrated operation serving all of Brazil.",
  },
  "intro1.s1": { pt: "ESPECIALIZAÇÃO DESDE", en: "EXPERTISE SINCE" },
  "intro1.s2": { pt: "OPERAÇÕES EM SÃO PAULO", en: "OPERATIONS IN SÃO PAULO" },
  "intro1.s3": { pt: "FABRICANTES SELECIONADOS", en: "SELECTED MANUFACTURERS" },
  "intro1.s4": { pt: "EXPEDIÇÃO PARA TODO O PAÍS", en: "SHIPPING ACROSS BRAZIL" },
  "intro2.eyebrow": { pt: "CONTATE A GENTE", en: "CONTACT US" },
  "intro2.title": {
    pt: "Vamos encontrar<br />a solução <em>certa.</em>",
    en: "Let's find<br />the <em>right</em> solution.",
  },
  "intro2.text": {
    pt: "Fale com um especialista pelo WhatsApp ou visite uma de nossas unidades em Chácara Santo Antônio, Sorocaba, Campinas ou Santos — com atendimento ágil no horário comercial.",
    en: "Talk to a specialist on WhatsApp or visit one of our units in Chácara Santo Antônio, Sorocaba, Campinas or Santos — with swift service during business hours.",
  },
  "intro2.cta": { pt: "Falar com um especialista", en: "Talk to an expert" },
  "intro2.whatsapp": { pt: "Falar pelo WhatsApp", en: "Chat on WhatsApp" },
  "intro2.note": { pt: "RESPONDEMOS NO HORÁRIO COMERCIAL", en: "WE REPLY DURING BUSINESS HOURS" },
  "intro2.live": { pt: "ATENDIMENTO COMERCIAL", en: "COMMERCIAL SERVICE" },
  "intro2.phoneLabel": { pt: "WHATSAPP COMERCIAL", en: "BUSINESS WHATSAPP" },
  "intro3.eyebrow": { pt: "EM MOVIMENTO", en: "IN MOTION" },
  "intro3.title": {
    pt: "Uma operação<br />em <em>movimento.</em>",
    en: "An operation<br />in <em>motion.</em>",
  },
  "intro3.cycle": { pt: "QUANDO O ASSUNTO É", en: "WHEN IT COMES TO" },
  "intro4.eyebrow": { pt: "TAMBÉM ESTAMOS NO", en: "ALSO ON" },
  "intro4.title": {
    pt: "Mercado Livre.<br /><em>Comprando com confiança.</em>",
    en: "Mercado Livre.<br /><em>Shopping with confidence.</em>",
  },
  "intro4.text": {
    pt: "Encontre as peças Stärke Parts no Mercado Livre com a mesma qualidade e procedência que você espera de nós — prático, rápido e com toda a segurança.",
    en: "Find Stärke Parts on Mercado Livre with the same quality and authenticity you expect from us — easy, fast and fully secure.",
  },
  "intro4.cta": { pt: "Visitar nossa loja", en: "Visit our store" },
  "intro4.badge": { pt: "LOJA OFICIAL", en: "OFFICIAL STORE" },

  /* Footer */
  "footer.tagline": { pt: "Oferecemos peças. Entregamos confiança.", en: "We offer parts. We deliver trust." },

  /* Roadmap carousel */
  "road.aria": {
    pt: "Roadmap de evolução da Stärke Parts entre 2016 e 2026",
    en: "Stärke Parts evolution roadmap between 2016 and 2026",
  },
  "road.prev": { pt: "Marco anterior", en: "Previous milestone" },
  "road.next": { pt: "Próximo marco", en: "Next milestone" },

  /* Product carousel */
  "prod.carAria": { pt: "Linhas de produtos Stärke Parts", en: "Stärke Parts product lines" },
  "prod.carControl": { pt: "PORTFÓLIO · 10 SISTEMAS", en: "PORTFOLIO · 10 SYSTEMS" },
  "prod.carPrev": { pt: "Produto anterior", en: "Previous product" },
  "prod.carNext": { pt: "Próximo produto", en: "Next product" },

  /* Manufacturer carousel */
  "man.logoAria": {
    pt: "Fabricantes presentes no portfólio Stärke Parts",
    en: "Manufacturers present in the Stärke Parts portfolio",
  },
  "man.history": { pt: "HISTÓRIA", en: "HISTORY" },
  "man.lines": { pt: "PRINCIPAIS LINHAS", en: "MAIN PRODUCT LINES" },

  /* Institutional */
  "inst.eyebrow": { pt: "STÄRKE PARTS · ESPECIALISTAS DESDE 2016", en: "STÄRKE PARTS · SPECIALISTS SINCE 2016" },
  "inst.title": {
    pt: "A força de quem entende cada peça. A confiança de quem conhece cada detalhe.",
    en: "The strength of those who understand every part. The trust of those who know every detail.",
  },
  "inst.lead": {
    pt: "Nascemos para elevar o padrão da distribuição de autopeças premium no Brasil. Desde 2016, conectamos conhecimento técnico, grandes fabricantes e uma operação preparada para entregar mais segurança em cada escolha.",
    en: "We were born to raise the standard of premium auto parts distribution in Brazil. Since 2016, we connect technical knowledge, major manufacturers and an operation prepared to deliver more confidence in every choice.",
  },
  "inst.p1": {
    pt: "A Stärke Parts nasceu com uma missão clara: transformar a compra de autopeças para veículos importados, premium e superesportivos em uma experiência mais precisa, ágil e confiável. Por isso, atendemos oficinas, centros automotivos, lojistas e proprietários com uma equipe que entende as particularidades de marcas como Porsche, BMW, Mercedes-Benz, Audi, Land Rover, Volvo, Jaguar, MINI, Ferrari e Lamborghini.",
    en: "Stärke Parts was born with a clear mission: to turn buying auto parts for imported, premium and super-sports vehicles into a more precise, agile and reliable experience. That is why we serve workshops, auto service centers, retailers and owners with a team that understands the particularities of brands such as Porsche, BMW, Mercedes-Benz, Audi, Land Rover, Volvo, Jaguar, MINI, Ferrari and Lamborghini.",
  },
  "inst.p2": {
    pt: "Nosso portfólio reúne soluções para freios, suspensão, direção, motor, filtragem, arrefecimento, elétrica, ignição, injeção, transmissão e outros sistemas essenciais. Trabalhamos com referências globais como Bilstein Group, ZF, Brembo, Textar, Bosch, MAHLE e Hengst. Somos distribuidores oficiais febi, com produtos recebidos diretamente da fábrica do Bilstein Group na Alemanha, e ampliamos nossa entrega com a Forschen, marca própria que traduz a experiência e a identidade da Stärke.",
    en: "Our portfolio brings together solutions for brakes, suspension, steering, engine, filtration, cooling, electrical, ignition, injection, transmission and other essential systems. We work with global references such as Bilstein Group, ZF, Brembo, Textar, Bosch, MAHLE and Hengst. We are official febi distributors, receiving products directly from the Bilstein Group factory in Germany, and we expand our offering with Forschen, our own brand that reflects Stärke's experience and identity.",
  },
  "inst.p3": {
    pt: "Da matriz na Chácara Santo Antônio ao centro de distribuição de Sorocaba, inaugurado em 2024, construímos uma operação integrada entre importação, estoque, atendimento, separação, expedição, e-commerce, garantia e pós-venda. Em 2025, chegamos a Campinas e Santos para ficar ainda mais próximos do interior paulista e da Baixada Santista, sem perder a capacidade de atender clientes em todo o Brasil.",
    en: "From the headquarters in Chácara Santo Antônio to the Sorocaba distribution center, opened in 2024, we built an integrated operation connecting import, stock, service, picking, shipping, e-commerce, warranty and after-sales. In 2025, we arrived in Campinas and Santos to be even closer to the interior of São Paulo and the Santos coastline, without giving up the ability to serve clients across Brazil.",
  },
  "inst.close": {
    pt: "Em 2026, a Stärke Parts chega a uma nova fase: consolidada, forte e posicionada entre as principais referências brasileiras no segmento premium. Uma conquista construída com procedência, especialização e relações duradouras — porque, para nós, cada peça carrega a responsabilidade de manter histórias, negócios e grandes máquinas em movimento.",
    en: "In 2026, Stärke Parts reaches a new phase: consolidated, strong and positioned among Brazil's leading references in the premium segment. An achievement built on provenance, specialization and lasting relationships — because, for us, every part carries the responsibility of keeping stories, businesses and great machines moving.",
  },
  "inst.m1": { pt: "Nasce uma nova força no aftermarket premium", en: "A new force is born in the premium aftermarket" },
  "inst.m2": { pt: "Mais estrutura com o CD Sorocaba", en: "More structure with the Sorocaba DC" },
  "inst.m3": { pt: "Mais perto com Campinas e Santos", en: "Closer with Campinas and Santos" },
  "inst.m4": { pt: "Uma das principais referências do segmento", en: "One of the leading references in the segment" },
  "inst.sig1": { pt: "Potência em Qualidade.", en: "Power in Quality." },
  "inst.sig2": { pt: "Excelência em Cada Detalhe.", en: "Excellence in Every Detail." },
  "inst.sig3": { pt: "Oferecemos peças. Entregamos confiança.", en: "We offer parts. We deliver trust." },
  "inst.edit.eyebrow": { pt: "01 / A NOSSA ESSÊNCIA", en: "01 / OUR ESSENCE" },
  "inst.edit.t1": { pt: "Oferecemos peças.", en: "We offer parts." },
  "inst.edit.t2": { pt: "Entregamos confiança.", en: "We deliver trust." },
  "inst.edit.p1": {
    pt: "Acreditamos que uma boa peça começa muito antes da instalação. Ela começa na procedência, na identificação correta da aplicação, na orientação técnica e na segurança de contar com quem conhece o segmento premium em profundidade.",
    en: "We believe a good part starts long before installation. It starts with provenance, the correct identification of the application, technical guidance and the confidence of relying on someone who deeply understands the premium segment.",
  },
  "inst.edit.p2": {
    pt: "Por isso, construímos uma operação que conecta marcas reconhecidas internacionalmente a oficinas especializadas, centros automotivos, lojistas e proprietários de veículos que valorizam qualidade e atendimento responsável.",
    en: "That is why we built an operation that connects internationally recognized brands with specialized workshops, auto service centers, retailers and owners of vehicles that value quality and responsible service.",
  },
  "inst.edit.p3": {
    pt: "Mais do que fornecer componentes, buscamos apoiar decisões mais assertivas e cultivar relacionamentos duradouros com quem movimenta o mercado de reposição automotiva.",
    en: "More than supplying components, we seek to support more assertive decisions and cultivate lasting relationships with those who keep the automotive replacement market moving.",
  },
  "inst.edit.cta": { pt: "Conheça nosso atendimento", en: "Discover our service" },
  "inst.met1": { pt: "O início da nossa história", en: "The beginning of our story" },
  "inst.met2": { pt: "Operações estratégicas em São Paulo", en: "Strategic operations in São Paulo" },
  "inst.met3": { pt: "Montadoras e aplicações premium", en: "Premium automakers and applications" },
  "inst.met4": { pt: "Atendimento para todo o Brasil", en: "Service across Brazil" },
  "inst.id.eyebrow": { pt: "A IDENTIDADE QUE NOS MOVE", en: "THE IDENTITY THAT DRIVES US" },
  "inst.id.t1": { pt: "Um posicionamento claro.", en: "A clear position." },
  "inst.id.t2": { pt: "Uma entrega consistente.", en: "A consistent delivery." },
  "inst.id.desc": {
    pt: "A nossa atuação é orientada por princípios que conectam os interesses do mercado, a responsabilidade técnica e a construção de relacionamentos duradouros.",
    en: "Our work is guided by principles that connect market interests, technical responsibility and the building of lasting relationships.",
  },
  "inst.pill.aside": { pt: "Princípios que orientam nossas decisões.", en: "Principles that guide our decisions." },
  "inst.pill.text": {
    pt: "Três compromissos conectados por um mesmo objetivo: entregar segurança e confiança ao mercado automotivo premium.",
    en: "Three commitments connected by one goal: delivering safety and confidence to the premium automotive market.",
  },
  "inst.story.eyebrow": { pt: "QUEM SOMOS E COMO EVOLUÍMOS", en: "WHO WE ARE AND HOW WE EVOLVED" },
  "inst.story.t1": { pt: "O que existe por trás", en: "What stands behind" },
  "inst.story.t2": { pt: "de cada peça", en: "every" },
  "inst.story.desc": {
    pt: "Nossa história reúne propósito, especialização, relações com fabricantes e uma estrutura que acompanha o desenvolvimento do mercado premium brasileiro.",
    en: "Our history combines purpose, specialization, relationships with manufacturers and a structure that keeps pace with the development of the Brazilian premium market.",
  },
  "inst.brand.eyebrow": { pt: "O QUE NOS MOVE TODOS OS DIAS", en: "WHAT DRIVES US EVERY DAY" },
  "inst.brand.text": {
    pt: "Um compromisso que orienta o nosso portfólio, o relacionamento com fabricantes, a atenção à aplicação correta e a experiência de cada cliente.",
    en: "A commitment that guides our portfolio, the relationship with manufacturers, the attention to correct application and the experience of every client.",
  },
  "inst.road.eyebrow": { pt: "NOSSA TRAJETÓRIA", en: "OUR JOURNEY" },
  "inst.road.t1": { pt: "Uma história de evolução,", en: "A story of evolution," },
  "inst.road.t2": { pt: "proximidade e", en: "proximity and" },
  "inst.road.t3": { pt: "especialização.", en: "specialization." },
  "inst.ops.eyebrow": { pt: "OS BASTIDORES DA NOSSA OPERAÇÃO", en: "BEHIND THE SCENES OF OUR OPERATION" },
  "inst.ops.t1": { pt: "Uma estrutura conectada", en: "A structure connected" },
  "inst.ops.t2": { pt: "por um mesmo", en: "by a single" },
  "inst.ops.t3": { pt: "propósito.", en: "purpose." },
  "inst.ops.count": { pt: "áreas conectadas", en: "connected areas" },
  "inst.ops.text": {
    pt: "Por trás de cada atendimento, diferentes áreas trabalham de forma integrada para aproximar o mercado premium das soluções de que ele precisa.",
    en: "Behind every order, different areas work in an integrated way to bring the premium market closer to the solutions it needs.",
  },
  "inst.princ1.t": { pt: "Procedência", en: "Provenance" },
  "inst.princ1.p": {
    pt: "Fabricantes reconhecidos e seleção técnica de componentes para aplicações premium.",
    en: "Recognized manufacturers and technical selection of components for premium applications.",
  },
  "inst.princ2.t": { pt: "Especialização", en: "Specialization" },
  "inst.princ2.p": {
    pt: "Atendimento preparado para considerar veículo, motorização, ano e chassi.",
    en: "Service prepared to consider vehicle, engine, year and chassis.",
  },
  "inst.princ3.t": { pt: "Proximidade", en: "Proximity" },
  "inst.princ3.p": {
    pt: "Operações regionais e relacionamento próximo com quem move o aftermarket.",
    en: "Regional operations and close relationships with those who move the aftermarket.",
  },
  "inst.princ4.t": { pt: "Confiança", en: "Trust" },
  "inst.princ4.p": {
    pt: "Uma experiência construída com clareza, suporte e atenção a cada detalhe.",
    en: "An experience built with clarity, support and attention to every detail.",
  },
  "inst.manifesto.eyebrow": { pt: "O QUE SIGNIFICA SER STÄRKE", en: "WHAT IT MEANS TO BE STÄRKE" },
  "inst.manifesto.p": {
    pt: "Para nós, uma autopeça nunca representa apenas um item em estoque. Ela representa o trabalho de uma oficina, a confiança de um cliente, a precisão de um projeto e a responsabilidade de colocar o veículo novamente em movimento.",
    en: "To us, an auto part is never just an item in stock. It represents the work of a workshop, the trust of a customer, the precision of a project and the responsibility of putting a vehicle back on the road.",
  },
  "inst.manifesto.strong1": { pt: "É por isso que oferecemos peças.", en: "That is why we offer parts." },
  "inst.manifesto.strong2": { pt: "E entregamos confiança.", en: "And deliver trust." },

  /* Applications */
  "app.kicker": { pt: "APLICAÇÕES PREMIUM E DE ALTA PERFORMANCE", en: "PREMIUM AND HIGH-PERFORMANCE APPLICATIONS" },
  "app.title": {
    pt: "Veículos extraordinários exigem escolhas à altura.",
    en: "Extraordinary vehicles demand exceptional choices.",
  },
  "app.text": {
    pt: "Trabalhamos com aplicações para algumas das montadoras mais relevantes do segmento premium e superesportivo. Nossa equipe avalia cada veículo individualmente para orientar a identificação da peça e do fabricante adequados.",
    en: "We work with applications for some of the most relevant automakers in the premium and super-sports segment. Our team evaluates each vehicle individually to guide the identification of the right part and manufacturer.",
  },
  "app.selectorAria": { pt: "Selecione uma montadora", en: "Select an automaker" },
  "app.about": { pt: "SOBRE A MONTADORA", en: "ABOUT THE AUTOMAKER" },
  "app.apply": { pt: "APLICAÇÕES STÄRKE PARTS", en: "STÄRKE PARTS APPLICATIONS" },
  "app.cta": { pt: "Consultar uma aplicação", en: "Inquire about an application" },
  "app.stripStrong": {
    pt: "A aplicação correta começa pelo veículo certo.",
    en: "The right application starts with the right vehicle.",
  },
  "app.stripSpan": {
    pt: "Montadora · modelo · ano · motorização · chassi completo, quando necessário.",
    en: "Automaker · model · year · engine · complete chassis, when necessary.",
  },
  "app.secEyebrow": { pt: "COMO IDENTIFICAMOS CADA APLICAÇÃO", en: "HOW WE IDENTIFY EACH APPLICATION" },
  "app.secHeading": {
    pt: "Precisão técnica começa<br />pelas <em>informações corretas.</em>",
    en: "Technical precision begins<br />with the <em>right information.</em>",
  },
  "app.secDesc": {
    pt: "Automóveis premium podem apresentar diferenças relevantes mesmo dentro de uma mesma família. Nossa análise considera os detalhes necessários para orientar a escolha do componente.",
    en: "Premium cars can show significant differences even within the same family. Our analysis considers the details needed to guide component selection.",
  },
  "app.noteStrong": { pt: "Não é apenas sobre a marca do veículo.", en: "It's not just about the vehicle brand." },
  "app.noteText": {
    pt: "É sobre identificar a combinação correta entre projeto, sistema, fabricante e referência para que a peça atenda à aplicação com a atenção que o segmento exige.",
    en: "It's about identifying the right combination of design, system, manufacturer and reference so the part meets the application with the attention the segment demands.",
  },

  /* Products */
  "prod.kicker": { pt: "LINHAS E SISTEMAS AUTOMOTIVOS", en: "AUTOMOTIVE LINES AND SYSTEMS" },
  "prod.title": {
    pt: "Um portfólio completo para quem conhece cada detalhe.",
    en: "A complete portfolio for those who know every detail.",
  },
  "prod.text": {
    pt: "Da manutenção preventiva aos componentes de sistemas mais exigentes, reunimos linhas selecionadas para diferentes montadoras e aplicações premium. A disponibilidade deve ser confirmada com nossa equipe conforme o veículo e o fabricante.",
    en: "From preventive maintenance to components for the most demanding systems, we bring together selected lines for different automakers and premium applications. Availability must be confirmed with our team according to the vehicle and manufacturer.",
  },
  "prod.spotEyebrow": { pt: "PEÇAS QUE MOVEM CONFIANÇA", en: "PARTS THAT DRIVE TRUST" },
  "prod.spotHeading": {
    pt: "Cada sistema.<br /><em>A peça certa.</em>",
    en: "Every system.<br /><em>The right part.</em>",
  },
  "prod.spotText": {
    pt: "Da frenagem ao arrefecimento, nossa seleção reúne componentes essenciais para uma manutenção compatível com o padrão de exigência dos veículos premium.",
    en: "From braking to cooling, our selection brings together essential components for maintenance that matches the demanding standard of premium vehicles.",
  },
  "prod.secEyebrow": { pt: "ONDE NOSSO PORTFÓLIO FAZ A DIFERENÇA", en: "WHERE OUR PORTFOLIO MAKES A DIFFERENCE" },
  "prod.secHeading": {
    pt: "Soluções pensadas para<br />diferentes momentos da <em>manutenção.</em>",
    en: "Solutions designed for<br />different moments of <em>maintenance.</em>",
  },
  "prod.bannerEyebrow": { pt: "CRITÉRIOS STÄRKE PARTS", en: "STÄRKE PARTS CRITERIA" },
  "prod.bannerHeading": {
    pt: "Procedência. Compatibilidade.<br /><em>Confiança em cada componente.</em>",
    en: "Provenance. Compatibility.<br /><em>Trust in every component.</em>",
  },
  "prod.bannerText": {
    pt: "A disponibilidade, o fabricante e a referência exata são sempre confirmados de acordo com a aplicação e a necessidade apresentada pelo cliente.",
    en: "Availability, manufacturer and exact reference are always confirmed according to the application and the need presented by the client.",
  },
  "prod.notFound": { pt: "Não encontrou o componente que procura?", en: "Didn't find the part you're looking for?" },
  "prod.cta": { pt: "Fale com um especialista", en: "Talk to an expert" },

  /* Manufacturers */
  "man.kicker": { pt: "PARCERIAS E FABRICANTES INTERNACIONAIS", en: "INTERNATIONAL PARTNERSHIPS AND MANUFACTURERS" },
  "man.title": {
    pt: "Marcas globais. Um mesmo compromisso com a qualidade.",
    en: "Global brands. One shared commitment to quality.",
  },
  "man.text": {
    pt: "Nosso portfólio reúne fabricantes reconhecidos por sua atuação em diferentes sistemas automotivos. A composição da linha e a disponibilidade de cada item variam conforme a aplicação e devem ser confirmadas no atendimento.",
    en: "Our portfolio brings together manufacturers recognized for their work across different automotive systems. The composition of each line and the availability of every item vary by application and must be confirmed at the time of service.",
  },
  "man.noteEyebrow": { pt: "DISTRIBUIÇÃO ESPECIALIZADA", en: "SPECIALIZED DISTRIBUTION" },
  "man.noteHeading": {
    pt: "Procedência que fortalece cada escolha.",
    en: "Provenance that strengthens every choice.",
  },
  "man.cta": { pt: "Consultar fabricante", en: "Inquire about a manufacturer" },

  /* Structure */
  "str.kicker": { pt: "MATRIZ · CENTRO DE DISTRIBUIÇÃO · FILIAIS", en: "HEADQUARTERS · DISTRIBUTION CENTER · BRANCHES" },
  "str.title": {
    pt: "Uma estrutura pensada para estar cada vez mais perto.",
    en: "A structure designed to be closer every day.",
  },
  "str.text": {
    pt: "Nossa presença no estado de São Paulo conecta atendimento especializado, disponibilidade regional e eficiência operacional. Cada unidade integra uma rede preparada para apoiar clientes em diferentes mercados.",
    en: "Our presence in the state of São Paulo connects specialized service, regional availability and operational efficiency. Each unit is part of a network prepared to support clients in different markets.",
  },
  "str.phone": { pt: "TELEFONE", en: "PHONE" },
  "str.cardAria": { pt: "Ligar para a unidade {city}", en: "Call the {city} unit" },
  "str.cardCta": { pt: "Consultar atendimento", en: "Inquire about service" },
  "str.coverEyebrow": { pt: "REDE STÄRKE PARTS", en: "STÄRKE PARTS NETWORK" },
  "str.coverHeading": {
    pt: "Quatro operações.<br /><em>Um mesmo padrão.</em>",
    en: "Four operations.<br /><em>One single standard.</em>",
  },
  "str.coverText": {
    pt: "Atendimento próximo, conhecimento técnico e uma operação conectada ao mercado brasileiro de autopeças premium.",
    en: "Close service, technical knowledge and an operation connected to the Brazilian premium auto parts market.",
  },
  "str.secEyebrow": { pt: "COMO AS ÁREAS SE CONECTAM", en: "HOW THE AREAS CONNECT" },
  "str.secHeading": {
    pt: "Uma operação completa,<br />do fornecedor ao <em>pós-venda.</em>",
    en: "A complete operation,<br />from supplier to <em>after-sales.</em>",
  },
  "str.secDesc": {
    pt: "A distribuição especializada depende de uma cadeia integrada, na qual cada etapa contribui para uma experiência mais segura e organizada.",
    en: "Specialized distribution depends on an integrated chain, in which every step contributes to a safer and more organized experience.",
  },
  "str.noteStrong": { pt: "Presença regional com visão nacional.", en: "Regional presence with a national vision." },
  "str.noteText": {
    pt: "Matriz, centro de distribuição e filiais trabalham de forma complementar para aproximar conhecimento técnico, disponibilidade e atendimento especializado dos clientes.",
    en: "Headquarters, distribution center and branches work together to bring technical knowledge, availability and specialized service closer to clients.",
  },

  /* Logistics */
  "log.kicker": { pt: "OPERAÇÃO LOGÍSTICA E COBERTURA NACIONAL", en: "LOGISTICS OPERATION AND NATIONAL COVERAGE" },
  "log.title": { pt: "A peça certa, no ritmo que a sua operação precisa.", en: "The right part, at the pace your operation needs." },
  "log.text": {
    pt: "Organizamos a distribuição para atender desde demandas urgentes na Grande São Paulo até envios para diferentes regiões do Brasil. Modalidades, prazos e condições dependem da disponibilidade, do destino e da política comercial aplicável.",
    en: "We organize distribution to serve from urgent demands in Greater São Paulo to shipments to different regions of Brazil. Options, deadlines and conditions depend on availability, destination and applicable commercial policy.",
  },
  "log.card1.span": { pt: "01 / GRANDE SÃO PAULO", en: "01 / GREATER SÃO PAULO" },
  "log.card1.title": { pt: "Entregas rápidas<br />e programadas.", en: "Fast, scheduled<br />deliveries." },
  "log.card1.text": {
    pt: "Opções de entrega estruturadas para acompanhar a dinâmica de oficinas, centros automotivos e clientes da região metropolitana.",
    en: "Structured delivery options to keep up with the pace of workshops, auto service centers and clients in the metropolitan region.",
  },
  "log.card1.note": { pt: "Consulte cobertura, prazo e modalidade.", en: "Check coverage, deadline and option." },
  "log.card2.span": { pt: "02 / CONDIÇÃO REGIONAL", en: "02 / REGIONAL CONDITION" },
  "log.card2.title": { pt: "Frete grátis a partir de <em>R$ 300.</em>", en: "Free shipping from <em>R$ 300.</em>" },
  "log.card2.text": {
    pt: "Condição válida para entregas via motoboy na área de atendimento aplicável, sujeita à confirmação de cobertura e regras comerciais.",
    en: "Valid for motorcycle courier deliveries within the applicable service area, subject to coverage confirmation and commercial rules.",
  },
  "log.card2.note": { pt: "Verifique as condições com a equipe.", en: "Check the conditions with the team." },
  "log.card3.span": { pt: "03 / TERRITÓRIO NACIONAL", en: "03 / NATIONAL TERRITORY" },
  "log.card3.title": { pt: "Da nossa estrutura<br />para todo o Brasil.", en: "From our structure<br />to all of Brazil." },
  "log.card3.text": {
    pt: "Expedição nacional para aproximar fabricantes reconhecidos, conhecimento especializado e aplicações premium de clientes em diferentes estados.",
    en: "Nationwide shipping to bring recognized manufacturers, specialized knowledge and premium applications closer to clients in different states.",
  },
  "log.card3.note": { pt: "Prazos e fretes variam conforme o destino.", en: "Deadlines and freight vary by destination." },
  "log.secEyebrow": { pt: "ÁREAS DE COBERTURA", en: "COVERAGE AREAS" },
  "log.secHeading": {
    pt: "Uma estrutura preparada<br />para diferentes <em>destinos.</em>",
    en: "A structure prepared<br />for different <em>destinations.</em>",
  },
  "log.procEyebrow": { pt: "DA CONSULTA ATÉ A ENTREGA", en: "FROM INQUIRY TO DELIVERY" },
  "log.procHeading": {
    pt: "Cada etapa importa<br />quando o tempo <em>faz diferença.</em>",
    en: "Every step matters<br />when time <em>makes a difference.</em>",
  },
  "log.step1": { pt: "Consulta da aplicação", en: "Application inquiry" },
  "log.step2": { pt: "Confirmação da disponibilidade", en: "Availability confirmation" },
  "log.step3": { pt: "Separação e conferência", en: "Picking and verification" },
  "log.step4": { pt: "Expedição ou entrega", en: "Shipping or delivery" },
  "log.noteStrong": { pt: "Agilidade começa com informação correta.", en: "Agility starts with the right information." },
  "log.noteText": {
    pt: "Ao informar o veículo, a peça procurada e o destino da entrega, nossa equipe consegue orientar a disponibilidade e a modalidade logística mais adequada para cada pedido.",
    en: "When you provide the vehicle, the part you need and the delivery destination, our team can guide availability and the most suitable logistics option for each order.",
  },
  "log.cta": { pt: "Consulte a melhor opção de entrega", en: "Check the best delivery option" },

  /* Service */
  "srv.kicker": { pt: "ATENDIMENTO TÉCNICO E RELACIONAMENTO", en: "TECHNICAL SERVICE AND RELATIONSHIPS" },
  "srv.title": { pt: "A peça certa começa com a pergunta certa.", en: "The right part starts with the right question." },
  "srv.text": {
    pt: "Nosso time está preparado para atender oficinas, centros automotivos, lojistas e proprietários que procuram componentes para veículos premium. O objetivo é entender a necessidade, validar a aplicação e orientar a consulta com clareza.",
    en: "Our team is ready to serve workshops, auto service centers, retailers and owners looking for components for premium vehicles. The goal is to understand the need, validate the application and guide the inquiry with clarity.",
  },
  "srv.aud1.title": { pt: "Oficinas e centros automotivos", en: "Workshops and auto service centers" },
  "srv.aud1.text": {
    pt: "Suporte especializado para a rotina de manutenção e reparação de veículos premium e importados.",
    en: "Specialized support for the maintenance and repair routine of premium and imported vehicles.",
  },
  "srv.aud2.title": { pt: "Lojistas e parceiros comerciais", en: "Retailers and business partners" },
  "srv.aud2.text": {
    pt: "Atendimento voltado ao mercado de reposição, com consulta de aplicações e fabricantes disponíveis.",
    en: "Service focused on the replacement market, with inquiries about available applications and manufacturers.",
  },
  "srv.aud3.title": { pt: "Proprietários de veículos premium", en: "Premium vehicle owners" },
  "srv.aud3.text": {
    pt: "Orientação para identificar a linha, o componente e o canal de atendimento mais adequados.",
    en: "Guidance to identify the most suitable line, component and service channel.",
  },
  "srv.secEyebrow": { pt: "COMO FUNCIONA", en: "HOW IT WORKS" },
  "srv.secHeading": {
    pt: "Um atendimento orientado<br />por informação e confiança.",
    en: "A service guided<br />by information and trust.",
  },
  "srv.chassisStrong": { pt: "Tenha as informações do veículo em mãos.", en: "Have the vehicle information at hand." },
  "srv.chassisSpan": {
    pt: "Marca · modelo · ano · motorização · código da peça, se disponível · chassi completo, quando necessário.",
    en: "Brand · model · year · engine · part number, if available · complete chassis, when necessary.",
  },
  "srv.faqEyebrow": { pt: "DÚVIDAS FREQUENTES", en: "FREQUENT QUESTIONS" },
  "srv.faqHeading": {
    pt: "Informações importantes<br />antes de falar com a <em>equipe.</em>",
    en: "Important information<br />before talking to the <em>team.</em>",
  },
  "srv.afterEyebrow": { pt: "RELACIONAMENTO E PÓS-VENDA", en: "RELATIONSHIP AND AFTER-SALES" },
  "srv.afterTitle": {
    pt: "A conversa não termina<br />quando o pedido é confirmado.",
    en: "The conversation doesn't end<br />when the order is confirmed.",
  },
  "srv.afterText": {
    pt: "Nosso compromisso inclui orientar o cliente durante o processo comercial e apoiar questões relacionadas à garantia, ao direcionamento correto e ao relacionamento com a unidade responsável.",
    en: "Our commitment includes guiding the client throughout the commercial process and supporting issues related to warranty, correct direction and the relationship with the responsible unit.",
  },
  "srv.contactEyebrow": { pt: "CONTATO STÄRKE PARTS", en: "CONTACT STÄRKE PARTS" },
  "srv.contactTitle": {
    pt: "Vamos encontrar<br />a solução <em>certa.</em>",
    en: "Let's find<br />the <em>right</em> solution.",
  },
  "srv.contactText": {
    pt: "Fale diretamente pelo WhatsApp e solicite o direcionamento para um especialista ou para a unidade mais adequada.",
    en: "Reach out directly on WhatsApp and ask to be directed to a specialist or the most suitable unit.",
  },
  "srv.whatsapp": { pt: "Falar pelo WhatsApp", en: "Chat on WhatsApp" },
};

/* ------------------------------------------------------------------ */
/* Static content (bilingual)                                          */
/* ------------------------------------------------------------------ */

export const heroWords: Record<SiteLanguage, string[]> = {
  pt: ["EXCELÊNCIA", "PRECISÃO", "DURABILIDADE", "PERFORMANCE"],
  en: ["EXCELLENCE", "PRECISION", "DURABILITY", "PERFORMANCE"],
};

export const introCycles: Record<SiteLanguage, string[]> = {
  pt: ["FRENAGEM", "SUSPENSÃO", "DIREÇÃO", "MOTOR", "FILTRAGEM", "ARREFECIMENTO", "ELÉTRICA", "INJEÇÃO", "TRANSMISSÃO"],
  en: ["BRAKING", "SUSPENSION", "STEERING", "ENGINE", "FILTRATION", "COOLING", "ELECTRICAL", "INJECTION", "TRANSMISSION"],
};

export const tabs = [
  { id: "institucional", number: "01", label: { pt: "A Stärke", en: "About Stärke" } },
  { id: "aplicacoes", number: "02", label: { pt: "Montadoras", en: "Automakers" } },
  { id: "produtos", number: "03", label: { pt: "Produtos", en: "Products" } },
  { id: "fabricantes", number: "04", label: { pt: "Fabricantes", en: "Manufacturers" } },
  { id: "estrutura", number: "05", label: { pt: "Estrutura", en: "Structure" } },
  { id: "atendimento", number: "06", label: { pt: "Atendimento", en: "Service" } },
] as const;

export type TabId = (typeof tabs)[number]["id"] | "logistica";

export const vehicleBrands = [
  {
    name: "Porsche",
    territory: { pt: "STUTTGART · ALEMANHA", en: "STUTTGART · GERMANY" },
    focus: { pt: "Precisão esportiva", en: "Sporting precision" },
    about: {
      pt: "Símbolo da engenharia esportiva alemã, a Porsche combina desempenho, precisão construtiva e evolução tecnológica em automóveis reconhecidos mundialmente.",
      en: "A symbol of German sports-car engineering, Porsche combines performance, construction precision and technological evolution in automobiles recognized worldwide.",
    },
    text: {
      pt: "Componentes para as linhas 911, Cayenne, Macan, Panamera, Boxster e Cayman, respeitando a configuração e as exigências técnicas de cada veículo.",
      en: "Components for the 911, Cayenne, Macan, Panamera, Boxster and Cayman lines, respecting the configuration and technical requirements of each vehicle.",
    },
    image: "/vehicles/porsche-color-hero.png",
  },
  {
    name: "BMW",
    territory: { pt: "MUNIQUE · ALEMANHA", en: "MUNICH · GERMANY" },
    focus: { pt: "Performance e dinâmica", en: "Performance and dynamics" },
    about: {
      pt: "A BMW construiu sua identidade em torno do prazer de dirigir, unindo comportamento dinâmico, tecnologia e acabamento premium em diferentes segmentos.",
      en: "BMW built its identity around the joy of driving, combining dynamic behavior, technology and premium refinement across different segments.",
    },
    text: {
      pt: "Soluções para sedãs, SUVs e modelos esportivos das famílias Série 1, Série 3, Série 5, Série 7, X e aplicações selecionadas da linha M.",
      en: "Solutions for sedans, SUVs and sports models from the 1, 3, 5 and 7 Series, X and selected M-line applications.",
    },
    image: "/vehicles/bmw-color-hero.png",
  },
  {
    name: "Mercedes-Benz",
    territory: { pt: "STUTTGART · ALEMANHA", en: "STUTTGART · GERMANY" },
    focus: { pt: "Conforto e engenharia", en: "Comfort and engineering" },
    about: {
      pt: "Referência histórica no automóvel premium, a Mercedes-Benz reúne conforto, segurança, inovação e engenharia em uma ampla família de veículos.",
      en: "A historic benchmark in the premium automobile, Mercedes-Benz combines comfort, safety, innovation and engineering across a broad family of vehicles.",
    },
    text: {
      pt: "Atendimento a aplicações das classes A, C, E e S, além de GLA, GLC, GLE e outros veículos da marca, sempre com validação técnica da peça.",
      en: "Service for A, C, E and S-Class applications, plus GLA, GLC, GLE and other vehicles from the brand, always with technical validation of the part.",
    },
    image: "/vehicles/mercedes-color-hero.png",
  },
  {
    name: "Audi",
    territory: { pt: "INGOLSTADT · ALEMANHA", en: "INGOLSTADT · GERMANY" },
    focus: { pt: "Tecnologia e controle", en: "Technology and control" },
    about: {
      pt: "Design progressivo, tecnologia e precisão definem a Audi, com projetos que equilibram sofisticação, conectividade e desempenho.",
      en: "Progressive design, technology and precision define Audi, with projects that balance sophistication, connectivity and performance.",
    },
    text: {
      pt: "Peças para famílias A3, A4, A5, A6, Q3, Q5, Q7 e aplicações esportivas S e RS, conforme disponibilidade e identificação correta do veículo.",
      en: "Parts for the A3, A4, A5, A6, Q3, Q5 and Q7 families and S and RS performance applications, according to availability and correct vehicle identification.",
    },
    image: "/vehicles/audi-color-hero.png",
  },
  {
    name: "Land Rover",
    territory: { pt: "COVENTRY · REINO UNIDO", en: "COVENTRY · UNITED KINGDOM" },
    focus: { pt: "Capacidade e sofisticação", en: "Capability and sophistication" },
    about: {
      pt: "A Land Rover combina tradição britânica, capacidade fora de estrada e luxo, criando SUVs preparados para diferentes terrenos e experiências.",
      en: "Land Rover combines British tradition, off-road capability and luxury, creating SUVs prepared for different terrains and experiences.",
    },
    text: {
      pt: "Componentes para Range Rover, Evoque, Discovery e Defender, com atenção especial aos sistemas de suspensão, arrefecimento e motorização.",
      en: "Components for Range Rover, Evoque, Discovery and Defender, with special attention to suspension, cooling and engine systems.",
    },
    image: "/vehicles/land-rover-color-hero.png",
  },
  {
    name: "Volvo",
    territory: { pt: "GOTEMBURGO · SUÉCIA", en: "GOTHENBURG · SWEDEN" },
    focus: { pt: "Segurança e consistência", en: "Safety and consistency" },
    about: {
      pt: "Reconhecida por sua cultura de segurança, a Volvo aplica design escandinavo, conforto e tecnologia a veículos orientados ao uso cotidiano.",
      en: "Known for its safety culture, Volvo applies Scandinavian design, comfort and technology to vehicles oriented to everyday use.",
    },
    text: {
      pt: "Soluções selecionadas para as famílias XC, S e V, considerando tecnologia embarcada, procedência e especificação de cada conjunto.",
      en: "Selected solutions for the XC, S and V families, considering onboard technology, origin and specification of each assembly.",
    },
    image: "/vehicles/volvo-color-hero.png",
  },
  {
    name: "Jaguar",
    territory: { pt: "COVENTRY · REINO UNIDO", en: "COVENTRY · UNITED KINGDOM" },
    focus: { pt: "Performance britânica", en: "British performance" },
    about: {
      pt: "A Jaguar expressa elegância e desempenho britânicos por meio de sedãs, esportivos e SUVs marcados por design e personalidade.",
      en: "Jaguar expresses British elegance and performance through sedans, sports cars and SUVs marked by design and personality.",
    },
    text: {
      pt: "Aplicações para sedãs, SUVs e esportivos Jaguar, com suporte especializado para a identificação de versões, motores e sistemas.",
      en: "Applications for Jaguar sedans, SUVs and sports cars, with specialized support for identifying versions, engines and systems.",
    },
    image: "/vehicles/jaguar-color-hero.png",
  },
  {
    name: "MINI",
    territory: { pt: "OXFORD · REINO UNIDO", en: "OXFORD · UNITED KINGDOM" },
    focus: { pt: "Personalidade e agilidade", en: "Personality and agility" },
    about: {
      pt: "Com design inconfundível e condução ágil, a MINI traduz herança britânica em automóveis compactos de forte personalidade.",
      en: "With unmistakable design and agile driving, MINI translates British heritage into compact cars with strong personality.",
    },
    text: {
      pt: "Componentes para Cooper, Countryman, Clubman, Cabrio e John Cooper Works, de acordo com a geração e a motorização do veículo.",
      en: "Components for Cooper, Countryman, Clubman, Cabrio and John Cooper Works, according to the generation and engine of the vehicle.",
    },
    image: "/vehicles/mini-hero.png",
  },
  {
    name: "Ferrari",
    territory: { pt: "MARANELLO · ITÁLIA", en: "MARANELLO · ITALY" },
    focus: { pt: "Alto desempenho", en: "High performance" },
    about: {
      pt: "A Ferrari representa a tradição italiana em competição, exclusividade e alta performance, com projetos guiados por engenharia e emoção.",
      en: "Ferrari represents the Italian tradition in competition, exclusivity and high performance, with projects driven by engineering and emotion.",
    },
    text: {
      pt: "Consulta especializada para aplicações selecionadas de veículos superesportivos, considerando os requisitos técnicos de cada projeto.",
      en: "Specialized consultation for selected supercar applications, considering the technical requirements of each project.",
    },
    image: "/vehicles/ferrari-hero.png",
  },
  {
    name: "Lamborghini",
    territory: { pt: "SANT'AGATA · ITÁLIA", en: "SANT'AGATA · ITALY" },
    focus: { pt: "Engenharia superesportiva", en: "Supercar engineering" },
    about: {
      pt: "Design expressivo e desempenho extremo definem a Lamborghini, fabricante italiana reconhecida por seus superesportivos de caráter singular.",
      en: "Expressive design and extreme performance define Lamborghini, a manufacturer recognized for its unique supercars.",
    },
    text: {
      pt: "Atendimento sob consulta para aplicações de alta performance e componentes compatíveis com as especificações da montadora.",
      en: "Service on request for high-performance applications and components compatible with the manufacturer's specifications.",
    },
    image: "/vehicles/lamborghini-hero.png",
  },
  {
    name: "VW Premium",
    territory: { pt: "WOLFSBURG · ALEMANHA", en: "WOLFSBURG · GERMANY" },
    focus: { pt: "Aplicações selecionadas", en: "Selected applications" },
    about: {
      pt: "A Volkswagen reúne engenharia alemã, tecnologia e ampla experiência industrial em modelos selecionados de posicionamento superior.",
      en: "In its premium lineup, Volkswagen combines German engineering, technology and broad industrial experience, tailored for select vehicles.",
    },
    text: {
      pt: "Componentes destinados a aplicações selecionadas da Volkswagen premium, sempre conforme veículo, motorização e chassi.",
      en: "Components for selected premium Volkswagen applications, always according to vehicle, engine and chassis.",
    },
    image: "/vehicles/volkswagen-color-hero.png",
  },
];

export type VehicleBrand = (typeof vehicleBrands)[number];

export const productLines = [
  {
    number: "01",
    family: { pt: "SEGURANÇA", en: "SAFETY" },
    title: { pt: "Freios", en: "Brakes" },
    text: {
      pt: "Precisão e confiança em cada desaceleração, com componentes projetados para responder às exigências de veículos premium e esportivos.",
      en: "Precision and confidence in every deceleration, with components engineered to respond to the demands of premium and sports vehicles.",
    },
    items: [
      { pt: "Discos de freio", en: "Brake discs" },
      { pt: "Pastilhas", en: "Brake pads" },
      { pt: "Sensores de desgaste", en: "Wear sensors" },
      { pt: "Pinças e reparos", en: "Calipers and repair kits" },
      { pt: "Flexíveis e fluidos", en: "Brake hoses and fluids" },
    ],
  },
  {
    number: "02",
    family: { pt: "DINÂMICA", en: "DYNAMICS" },
    title: { pt: "Suspensão", en: "Suspension" },
    text: {
      pt: "Conforto, estabilidade e controle com soluções selecionadas para a geometria e o comportamento dinâmico de cada veículo.",
      en: "Comfort, stability and control with solutions selected for the geometry and dynamic behavior of each vehicle.",
    },
    items: [
      { pt: "Amortecedores", en: "Shock absorbers" },
      { pt: "Braços e bandejas", en: "Arms and wishbones" },
      { pt: "Buchas e pivôs", en: "Bushings and ball joints" },
      { pt: "Coxins e batentes", en: "Engine mounts and bump stops" },
      { pt: "Molas e componentes", en: "Springs and components" },
    ],
  },
  {
    number: "03",
    family: { pt: "CONTROLE", en: "CONTROL" },
    title: { pt: "Direção", en: "Steering" },
    text: {
      pt: "Resposta precisa e segurança de condução por meio de componentes adequados à arquitetura original do sistema de direção.",
      en: "Precise response and driving safety through components suited to the original architecture of the steering system.",
    },
    items: [
      { pt: "Terminais de direção", en: "Tie rod ends" },
      { pt: "Barras axiais", en: "Axial rods" },
      { pt: "Braços de direção", en: "Steering arms" },
      { pt: "Bombas e reparos", en: "Pumps and repair kits" },
      { pt: "Componentes hidráulicos", en: "Hydraulic components" },
    ],
  },
  {
    number: "04",
    family: { pt: "PERFORMANCE", en: "PERFORMANCE" },
    title: { pt: "Motor", en: "Engine" },
    text: {
      pt: "Peças para manutenção preventiva e corretiva dos conjuntos mecânicos que impulsionam veículos de diferentes gerações e motorizações.",
      en: "Parts for preventive and corrective maintenance of the mechanical assemblies that power vehicles of different generations.",
    },
    items: [
      { pt: "Juntas e retentores", en: "Gaskets and seals" },
      { pt: "Correias e tensionadores", en: "Belts and tensioners" },
      { pt: "Polias", en: "Pulleys" },
      { pt: "Coxins de motor", en: "Engine mounts" },
      { pt: "Componentes internos", en: "Internal engine components" },
    ],
  },
  {
    number: "05",
    family: { pt: "PROTEÇÃO", en: "PROTECTION" },
    title: { pt: "Filtros", en: "Filters" },
    text: {
      pt: "Filtragem de alto padrão para preservar motor, cabine e sistemas essenciais, com fabricantes reconhecidos no mercado internacional.",
      en: "High-standard filtration to preserve the engine, cabin and essential systems, with manufacturers recognized in the international market.",
    },
    items: [
      { pt: "Filtro de óleo", en: "Oil filter" },
      { pt: "Filtro de ar", en: "Air filter" },
      { pt: "Filtro de combustível", en: "Fuel filter" },
      { pt: "Filtro de cabine", en: "Cabin filter" },
      { pt: "Soluções de filtragem premium", en: "Premium filtration solutions" },
    ],
  },
  {
    number: "06",
    family: { pt: "GESTÃO TÉRMICA", en: "THERMAL MANAGEMENT" },
    title: { pt: "Arrefecimento", en: "Cooling" },
    text: {
      pt: "Controle térmico eficiente para proteger o motor e manter o desempenho em condições severas de uso.",
      en: "Efficient thermal control to protect the engine and maintain performance under severe use.",
    },
    items: [
      { pt: "Bombas d'água", en: "Water pumps" },
      { pt: "Válvulas termostáticas", en: "Thermostats" },
      { pt: "Radiadores", en: "Radiators" },
      { pt: "Reservatórios", en: "Reservoirs" },
      { pt: "Mangueiras e sensores", en: "Hoses and sensors" },
    ],
  },
  {
    number: "07",
    family: { pt: "TECNOLOGIA", en: "TECHNOLOGY" },
    title: { pt: "Elétrica e ignição", en: "Electrical and ignition" },
    text: {
      pt: "Confiabilidade para os sistemas eletrônicos e de gerenciamento que coordenam eficiência, partida e funcionamento do veículo.",
      en: "Reliability for the electronic and management systems that coordinate efficiency, starting and vehicle operation.",
    },
    items: [
      { pt: "Bobinas", en: "Ignition coils" },
      { pt: "Velas de ignição", en: "Spark plugs" },
      { pt: "Sensores", en: "Sensors" },
      { pt: "Atuadores", en: "Actuators" },
      { pt: "Componentes eletrônicos", en: "Electronic components" },
    ],
  },
  {
    number: "08",
    family: { pt: "TRAÇÃO", en: "DRIVETRAIN" },
    title: { pt: "Transmissão e eixos", en: "Transmission and axles" },
    text: {
      pt: "Soluções para a transferência de potência, preservando suavidade, resistência e compatibilidade com o conjunto original.",
      en: "Solutions for power transfer, preserving smoothness, durability and compatibility with the original assembly.",
    },
    items: [
      { pt: "Componentes de câmbio", en: "Gearbox components" },
      { pt: "Semieixos", en: "Axle shafts" },
      { pt: "Juntas homocinéticas", en: "Constant velocity joints" },
      { pt: "Rolamentos", en: "Bearings" },
      { pt: "Fluidos e reparos", en: "Fluids and repair kits" },
    ],
  },
  {
    number: "09",
    family: { pt: "EFICIÊNCIA", en: "EFFICIENCY" },
    title: { pt: "Injeção e combustível", en: "Fuel injection and supply" },
    text: {
      pt: "Componentes que contribuem para alimentação precisa, resposta do motor e funcionamento adequado dos sistemas de injeção.",
      en: "Components that contribute to precise delivery, engine response and proper operation of injection systems.",
    },
    items: [
      { pt: "Bombas de combustível", en: "Fuel pumps" },
      { pt: "Bicos injetores", en: "Fuel injectors" },
      { pt: "Sensores de pressão", en: "Pressure sensors" },
      { pt: "Válvulas", en: "Valves" },
      { pt: "Componentes de alimentação", en: "Fuel system components" },
    ],
  },
  {
    number: "10",
    family: { pt: "EMISSÕES", en: "EMISSIONS" },
    title: { pt: "Escape e sistemas auxiliares", en: "Exhaust and auxiliary systems" },
    text: {
      pt: "Itens destinados ao funcionamento integrado do motor, ao controle de emissões e à manutenção dos sistemas complementares.",
      en: "Items for integrated engine operation, emission control and the maintenance of complementary systems.",
    },
    items: [
      { pt: "Sensores de oxigênio", en: "Oxygen sensors" },
      { pt: "Válvulas e componentes", en: "Valves and components" },
      { pt: "Juntas de escape", en: "Exhaust gaskets" },
      { pt: "Peças auxiliares", en: "Auxiliary parts" },
      { pt: "Aplicações sob consulta", en: "Applications on request" },
    ],
  },
];

export const manufacturerLogos = [
  {
    name: "febi",
    origin: { pt: "Alemanha · desde 1844", en: "Germany · since 1844" },
    history: {
      pt: "Uma das marcas centrais do Bilstein Group, a febi construiu uma trajetória ligada ao desenvolvimento e à distribuição de componentes para o mercado de reposição.",
      en: "One of the core brands of the Bilstein Group, febi built a track record linked to the development and distribution of components for the replacement market.",
    },
    work: {
      pt: "Direção, suspensão, motor, transmissão, freios e soluções de manutenção para diferentes aplicações.",
      en: "Steering, suspension, engine, transmission, brakes and maintenance solutions for different applications.",
    },
  },
  {
    name: "SWAG",
    origin: { pt: "Alemanha · Bilstein Group", en: "Germany · Bilstein Group" },
    history: {
      pt: "Marca alemã integrada ao Bilstein Group, reconhecida por ampliar a oferta de reposição para veículos europeus e por sua tradição no aftermarket.",
      en: "A German brand within the Bilstein Group, recognized for expanding the replacement offering for European vehicles and for its tradition in the aftermarket.",
    },
    work: {
      pt: "Componentes de direção, suspensão, motor, transmissão, elétrica e manutenção geral.",
      en: "Steering, suspension, engine, transmission, electrical and general maintenance components.",
    },
  },
  {
    name: "Blue Print",
    origin: { pt: "Reino Unido · Bilstein Group", en: "United Kingdom · Bilstein Group" },
    history: {
      pt: "A Blue Print nasceu com foco em aplicações para veículos asiáticos e britânicos e passou a integrar o Bilstein Group, ampliando sua presença no aftermarket internacional.",
      en: "Blue Print was born focused on applications for Asian and British vehicles and joined the Bilstein Group, expanding its presence in the international aftermarket.",
    },
    work: {
      pt: "Filtragem, frenagem, direção, suspensão, embreagem e componentes de manutenção.",
      en: "Filtration, braking, steering, suspension, clutch and maintenance components.",
    },
  },
  {
    name: "TRW",
    origin: { pt: "Estados Unidos · atualmente ZF Aftermarket", en: "United States · now ZF Aftermarket" },
    history: {
      pt: "A TRW reúne uma longa herança em sistemas automotivos e passou a integrar a ZF, preservando sua presença global no mercado de reposição.",
      en: "TRW brings a long heritage in automotive systems and joined ZF, preserving its global presence in the replacement market.",
    },
    work: {
      pt: "Freios, direção, suspensão e componentes ligados à segurança veicular.",
      en: "Brakes, steering, suspension and components linked to vehicle safety.",
    },
  },
  {
    name: "LEMFÖRDER",
    origin: { pt: "Alemanha · desde 1947", en: "Germany · since 1947" },
    history: {
      pt: "Marca do grupo ZF reconhecida pela especialização em componentes de chassis e por sua presença como fornecedora de projetos originais e do aftermarket.",
      en: "A ZF group brand recognized for its specialization in chassis components and for its presence as a supplier of original and aftermarket designs.",
    },
    work: {
      pt: "Braços, buchas, articulações, direção e componentes de suspensão.",
      en: "Arms, bushings, joints, steering and suspension components.",
    },
  },
  {
    name: "SACHS",
    origin: { pt: "Alemanha · desde 1895", en: "Germany · since 1895" },
    history: {
      pt: "Com raízes na engenharia alemã, a SACHS tornou-se uma referência em sistemas de transmissão e controle de movimento, integrando atualmente a ZF.",
      en: "With roots in German engineering, SACHS became a benchmark in transmission and motion-control systems, currently part of ZF.",
    },
    work: {
      pt: "Amortecedores, embreagens, volantes bimassa e componentes de suspensão.",
      en: "Shock absorbers, clutches, dual-mass flywheels and suspension components.",
    },
  },
  {
    name: "Brembo",
    origin: { pt: "Itália · desde 1961", en: "Italy · since 1961" },
    history: {
      pt: "Nascida próxima a Bérgamo, a Brembo evoluiu de uma oficina mecânica para uma referência mundial em tecnologia de frenagem e alta performance.",
      en: "Born near Bergamo, Brembo grew from a mechanical workshop into a world benchmark in braking technology and high performance.",
    },
    work: {
      pt: "Discos, pinças, pastilhas, fluidos e sistemas completos de freio.",
      en: "Discs, calipers, pads, fluids and complete brake systems.",
    },
  },
  {
    name: "Textar",
    origin: { pt: "Alemanha · mais de um século de experiência", en: "Germany · more than a century of experience" },
    history: {
      pt: "Marca de fricção da TMD Friction com longa atuação no fornecimento de componentes para veículos de passeio e aplicações de maior exigência.",
      en: "A TMD Friction friction brand with a long history of supplying components for passenger vehicles and more demanding applications.",
    },
    work: {
      pt: "Pastilhas, discos, lonas e acessórios para sistemas de frenagem.",
      en: "Pads, discs, linings and accessories for braking systems.",
    },
  },
  {
    name: "Hengst",
    origin: { pt: "Alemanha · desde 1958", en: "Germany · since 1958" },
    history: {
      pt: "Fundada em Münster, a Hengst cresceu como especialista em filtração e gerenciamento de fluidos para mobilidade, indústria e outras aplicações técnicas.",
      en: "Founded in Münster, Hengst grew as a specialist in filtration and fluid management for mobility, industry and other technical applications.",
    },
    work: {
      pt: "Filtros de óleo, ar, combustível, cabine e módulos de filtração.",
      en: "Oil, air, fuel, cabin filters and filtration modules.",
    },
  },
  {
    name: "MAHLE",
    origin: { pt: "Alemanha · desde 1920", en: "Germany · since 1920" },
    history: {
      pt: "A MAHLE nasceu em Stuttgart e tornou-se um dos grandes grupos internacionais de tecnologia para motores, mobilidade e gerenciamento térmico.",
      en: "MAHLE was born in Stuttgart and became one of the largest international technology groups for engines, mobility and thermal management.",
    },
    work: {
      pt: "Filtragem, pistões, componentes de motor, arrefecimento e gestão térmica.",
      en: "Filtration, pistons, engine components, cooling and thermal management.",
    },
  },
  {
    name: "UFI",
    origin: { pt: "Itália · desde 1971", en: "Italy · since 1971" },
    history: {
      pt: "A UFI Filters desenvolveu sua atuação internacional a partir da especialização em filtração para veículos, aplicações industriais e projetos de alta exigência.",
      en: "UFI Filters built its international presence from specialization in filtration for vehicles, industrial applications and high-demand projects.",
    },
    work: {
      pt: "Filtros de óleo, ar, combustível, cabine e sistemas térmicos.",
      en: "Oil, air, fuel, cabin filters and thermal systems.",
    },
  },
  {
    name: "Bosch",
    origin: { pt: "Alemanha · desde 1886", en: "Germany · since 1886" },
    history: {
      pt: "Fundada por Robert Bosch em Stuttgart, a empresa tornou-se uma das maiores referências mundiais em tecnologia, mobilidade e equipamentos automotivos.",
      en: "Founded by Robert Bosch in Stuttgart, the company became one of the world's largest references in technology, mobility and automotive equipment.",
    },
    work: {
      pt: "Ignição, injeção, sensores, elétrica, eletrônica, frenagem, filtros e diagnóstico.",
      en: "Ignition, injection, sensors, electrical, electronics, braking, filters and diagnostics.",
    },
  },
  {
    name: "HELLA",
    origin: { pt: "Alemanha · desde 1899", en: "Germany · since 1899" },
    history: {
      pt: "Com origem em Lippstadt, a HELLA consolidou uma trajetória centenária em iluminação e eletrônica automotiva e hoje integra o grupo FORVIA.",
      en: "With its origins in Lippstadt, HELLA built a century-long track record in automotive lighting and electronics and is now part of the FORVIA group.",
    },
    work: {
      pt: "Iluminação, sensores, atuadores, eletrônica e gerenciamento de energia.",
      en: "Lighting, sensors, actuators, electronics and energy management.",
    },
  },
  {
    name: "Delphi",
    origin: { pt: "Estados Unidos · atuação global", en: "United States · global reach" },
    history: {
      pt: "A Delphi reúne décadas de experiência em sistemas eletrônicos, gerenciamento de motores e soluções de reposição para diferentes mercados automotivos.",
      en: "Delphi brings decades of experience in electronic systems, engine management and replacement solutions for different automotive markets.",
    },
    work: {
      pt: "Ignição, injeção, sensores, bombas, direção, suspensão e gerenciamento do motor.",
      en: "Ignition, injection, sensors, pumps, steering, suspension and engine management.",
    },
  },
  {
    name: "Continental",
    origin: { pt: "Alemanha · desde 1871", en: "Germany · since 1871" },
    history: {
      pt: "Fundada em Hannover, a Continental evoluiu da produção de artefatos de borracha para um grupo global de tecnologia e soluções para mobilidade.",
      en: "Founded in Hanover, Continental evolved from rubber manufacturing to a global group of technology and mobility solutions.",
    },
    work: {
      pt: "Correias, sensores, eletrônica, freios, pneus e sistemas de gerenciamento automotivo.",
      en: "Belts, sensors, electronics, brakes, tires and automotive management systems.",
    },
  },
  {
    name: "Pierburg",
    origin: { pt: "Alemanha · desde 1909", en: "Germany · since 1909" },
    history: {
      pt: "A Pierburg desenvolveu sua história em torno de sistemas de alimentação e controle de motores e integra atualmente o grupo Rheinmetall.",
      en: "Pierburg built its history around engine fuel-supply and control systems and is currently part of the Rheinmetall group.",
    },
    work: {
      pt: "Bombas, válvulas, controle de emissões, admissão e gerenciamento de ar.",
      en: "Pumps, valves, emission control, intake and air management.",
    },
  },
  {
    name: "HEPU",
    origin: { pt: "Alemanha · tradição em arrefecimento", en: "Germany · tradition in cooling" },
    history: {
      pt: "A HEPU consolidou sua presença no aftermarket europeu com foco técnico em componentes de circulação e controle térmico do motor.",
      en: "HEPU consolidated its presence in the European aftermarket with technical focus on engine circulation and thermal control components.",
    },
    work: {
      pt: "Bombas d'água, kits de correia, anticongelantes e componentes de arrefecimento.",
      en: "Water pumps, belt kits, antifreeze and cooling components.",
    },
  },
  {
    name: "GEBA",
    origin: { pt: "Alemanha · especialista independente", en: "Germany · independent specialist" },
    history: {
      pt: "Fabricante alemã dedicada ao mercado de reposição, com trajetória concentrada na produção e no desenvolvimento de bombas para aplicações automotivas.",
      en: "A German manufacturer dedicated to the replacement market, focused on producing and developing pumps for automotive applications.",
    },
    work: {
      pt: "Bombas d'água e componentes associados ao sistema de arrefecimento.",
      en: "Water pumps and components associated with the cooling system.",
    },
  },
  {
    name: "BGA",
    origin: { pt: "Reino Unido · experiência em componentes de motor", en: "United Kingdom · engine components expertise" },
    history: {
      pt: "A BG Automotive desenvolveu uma ampla linha para reposição, apoiada em conhecimento de aplicações e cobertura para veículos europeus e asiáticos.",
      en: "BG Automotive developed a broad replacement line, supported by application knowledge and coverage for European and Asian vehicles.",
    },
    work: {
      pt: "Juntas, cabeçotes, válvulas, corrente de comando, direção e suspensão.",
      en: "Gaskets, cylinder heads, valves, timing chains, steering and suspension.",
    },
  },
  {
    name: "ÜRO Parts",
    origin: { pt: "Estados Unidos · reposição para veículos europeus", en: "United States · replacement for European vehicles" },
    history: {
      pt: "A ÜRO Parts foi criada para atender o mercado de reposição de automóveis europeus com uma linha ampla de componentes e aplicações específicas.",
      en: "ÜRO Parts was created to serve the replacement market for European cars with a broad line of components and specific applications.",
    },
    work: {
      pt: "Arrefecimento, elétrica, acabamento, suspensão, direção e componentes de carroceria.",
      en: "Cooling, electrical, trim, suspension, steering and body components.",
    },
  },
  {
    name: "SIDEM",
    origin: { pt: "Bélgica · desde 1933", en: "Belgium · since 1933" },
    history: {
      pt: "Empresa familiar belga especializada há várias gerações em componentes de direção e suspensão para o mercado internacional de reposição.",
      en: "A Belgian family company specialized for generations in steering and suspension components for the international replacement market.",
    },
    work: {
      pt: "Braços, terminais, barras axiais, pivôs, buchas e articulações.",
      en: "Arms, tie rods, axial rods, ball joints, bushings and joints.",
    },
  },
  {
    name: "Hoffer",
    origin: { pt: "Itália · grupo Meat&Doria", en: "Italy · Meat&Doria group" },
    history: {
      pt: "A Hoffer integra a experiência italiana do grupo Meat&Doria e amplia sua presença no aftermarket com linhas ligadas à eletrônica e alimentação.",
      en: "Hoffer integrates the Italian experience of the Meat&Doria group and expands its aftermarket presence with electronics and fuel-supply lines.",
    },
    work: {
      pt: "Sensores, injeção, bombas, válvulas, elétrica e gerenciamento do motor.",
      en: "Sensors, injection, pumps, valves, electrical and engine management.",
    },
  },
  {
    name: "Meat&Doria",
    origin: { pt: "Itália · desde 1945", en: "Italy · since 1945" },
    history: {
      pt: "Marca italiana com longa atuação no aftermarket, inicialmente ligada à distribuição de componentes e posteriormente ampliada para linhas eletrônicas e de motor.",
      en: "An Italian brand with a long presence in the aftermarket, initially linked to component distribution and later expanded into electronic and engine lines.",
    },
    work: {
      pt: "Injeção, sensores, bombas, filtros, válvulas e gerenciamento eletrônico.",
      en: "Injection, sensors, pumps, filters, valves and electronic management.",
    },
  },
  {
    name: "Bilstein",
    origin: { pt: "Alemanha · tradição em dinâmica veicular", en: "Germany · tradition in vehicle dynamics" },
    history: {
      pt: "A Bilstein desenvolveu uma trajetória internacional ligada à engenharia de suspensão, fornecendo soluções para projetos originais, competição e reposição premium.",
      en: "Bilstein built an international track record linked to suspension engineering, providing solutions for original, competition and premium replacement projects.",
    },
    work: {
      pt: "Amortecedores, conjuntos de suspensão e soluções voltadas à estabilidade e ao desempenho.",
      en: "Shock absorbers, suspension assemblies and stability and performance solutions.",
    },
  },
  {
    name: "KYB",
    origin: { pt: "Japão · desde 1919", en: "Japan · since 1919" },
    history: {
      pt: "A KYB construiu uma presença global a partir da engenharia hidráulica e tornou-se uma das referências em sistemas de controle de movimento para veículos.",
      en: "KYB built a global presence from hydraulic engineering and became one of the references in motion-control systems for vehicles.",
    },
    work: {
      pt: "Amortecedores, molas, kits de suspensão, direção hidráulica e componentes associados.",
      en: "Shock absorbers, springs, suspension kits, hydraulic steering and associated components.",
    },
  },
  {
    name: "Victor Reinz",
    origin: { pt: "Alemanha · marca do grupo Dana", en: "Germany · Dana group brand" },
    history: {
      pt: "A Victor Reinz reúne uma longa experiência em tecnologias de vedação e proteção térmica para motores e sistemas automotivos.",
      en: "Victor Reinz brings long experience in sealing and thermal protection technologies for engines and automotive systems.",
    },
    work: {
      pt: "Juntas, retentores, parafusos de cabeçote, vedantes e soluções de proteção térmica.",
      en: "Gaskets, seals, head bolts, sealants and thermal protection solutions.",
    },
  },
  {
    name: "WABCO",
    origin: { pt: "Estados Unidos · tradição em veículos comerciais", en: "United States · commercial vehicle tradition" },
    history: {
      pt: "A WABCO desenvolveu sua história em sistemas de segurança e controle para veículos comerciais e hoje integra o grupo ZF.",
      en: "WABCO built its history in safety and control systems for commercial vehicles and is now part of the ZF group.",
    },
    work: {
      pt: "Frenagem pneumática, controle de estabilidade, suspensão e sistemas para veículos comerciais.",
      en: "Pneumatic braking, stability control, suspension and commercial vehicle systems.",
    },
  },
  {
    name: "Forschen",
    origin: { pt: "Brasil · marca própria Stärke Parts", en: "Brazil · Stärke Parts own brand" },
    history: {
      pt: "A Forschen nasceu da experiência da Stärke Parts no mercado premium para ampliar a oferta com uma identidade própria e seleção orientada por aplicação.",
      en: "Forschen was born from Stärke Parts' experience in the premium market to expand the offering with its own identity and application-driven selection.",
    },
    work: {
      pt: "Componentes selecionados para manutenção e reposição, conforme disponibilidade e especificação do veículo.",
      en: "Selected components for maintenance and replacement, according to availability and vehicle specification.",
    },
  },
];

export const manufacturerLogoFiles: Record<string, string> = {
  Bilstein: "/manufacturer-logos/bilstein.png",
  "Blue Print": "/manufacturer-logos/blue-print.png",
  Forschen: "/manufacturer-logos/forschen-v2.png",
  GEBA: "/manufacturer-logos/geba.png",
  Hengst: "/manufacturer-logos/hengst.png",
  Hoffer: "/manufacturer-logos/hoffer.png",
  KYB: "/manufacturer-logos/kyb.png",
  LEMFÖRDER: "/manufacturer-logos/lemforder.png",
  MAHLE: "/manufacturer-logos/mahle.png",
  Pierburg: "/manufacturer-logos/pierburg.png",
  SIDEM: "/manufacturer-logos/sidem.png",
  SWAG: "/manufacturer-logos/swag.png",
  Textar: "/manufacturer-logos/textar.png",
  TRW: "/manufacturer-logos/trw.png",
  UFI: "/manufacturer-logos/ufi.png",
  "ÜRO Parts": "/manufacturer-logos/uro-parts.png",
  "Victor Reinz": "/manufacturer-logos/victor-reinz.png",
  WABCO: "/manufacturer-logos/wabco.png",
};

export const manufacturerCarouselBrands = manufacturerLogos.filter(brand => manufacturerLogoFiles[brand.name]);

export const locations = [
  {
    code: "SP·01",
    city: "São Paulo",
    type: { pt: "MATRIZ", en: "HEADQUARTERS" },
    area: { pt: "Chácara Santo Antônio", en: "Chácara Santo Antônio" },
    phone: "(11) 4102-1202",
    phoneHref: "tel:+551141021202",
    description: {
      pt: "Nossa operação central conecta atendimento comercial, gestão de portfólio e suporte especializado ao mercado de autopeças premium.",
      en: "Our central operation connects commercial service, portfolio management and specialized support to the premium auto parts market.",
    },
    capabilities: [
      { pt: "Atendimento especializado", en: "Specialized service" },
      { pt: "Operação comercial", en: "Commercial operations" },
      { pt: "Distribuição regional", en: "Regional distribution" },
    ],
  },
  {
    code: "SP·02",
    city: "Sorocaba",
    type: { pt: "CENTRO DE DISTRIBUIÇÃO", en: "DISTRIBUTION CENTER" },
    area: { pt: "Interior de São Paulo", en: "São Paulo state countryside" },
    phone: "(15) 98804-7031",
    phoneHref: "tel:+5515988047031",
    description: {
      pt: "Estrutura logística estratégica para ampliar a disponibilidade de produtos e agilizar o atendimento ao interior paulista.",
      en: "Strategic logistics structure to expand product availability and speed up service to the interior of São Paulo.",
    },
    capabilities: [
      { pt: "Estoque estratégico", en: "Strategic stock" },
      { pt: "Expedição", en: "Shipping" },
      { pt: "Atendimento regional", en: "Regional service" },
    ],
  },
  {
    code: "SP·03",
    city: "Campinas",
    type: { pt: "FILIAL", en: "BRANCH" },
    area: { pt: "Rua Pedro Domingos Vitali, 400 · Parque Itália", en: "Pedro Domingos Vitali St., 400 · Parque Itália" },
    phone: "(19) 97820-4813",
    phoneHref: "tel:+5519978204813",
    description: {
      pt: "Presença em uma das principais regiões automotivas do estado, aproximando a Stärke de oficinas, centros automotivos e parceiros locais.",
      en: "Presence in one of the state's main automotive regions, bringing Stärke closer to workshops, auto service centers and local partners.",
    },
    capabilities: [
      { pt: "Atendimento regional", en: "Regional service" },
      { pt: "Proximidade comercial", en: "Commercial proximity" },
      { pt: "Suporte especializado", en: "Specialized support" },
    ],
  },
  {
    code: "SP·04",
    city: "Santos",
    type: { pt: "FILIAL", en: "BRANCH" },
    area: { pt: "Baixada Santista", en: "Santos coastline" },
    phone: "(13) 99205-9253",
    phoneHref: "tel:+5513992059253",
    description: {
      pt: "Operação voltada ao relacionamento com clientes do litoral paulista e à ampliação da cobertura comercial da marca.",
      en: "Operation focused on relationships with clients on the São Paulo coast and expanding the brand's commercial coverage.",
    },
    capabilities: [
      { pt: "Atendimento regional", en: "Regional service" },
      { pt: "Cobertura no litoral", en: "Coastline coverage" },
      { pt: "Agilidade comercial", en: "Commercial agility" },
    ],
  },
];

export const companyRoadmap = [
  {
    year: "2016",
    stage: { pt: "FUNDAÇÃO", en: "FOUNDATION" },
    title: { pt: "Nasce a Stärke Parts", en: "Stärke Parts is born" },
    text: {
      pt: "A empresa inicia sua trajetória com foco definido em veículos importados, premium e de alta performance, combinando conhecimento técnico, procedência e atendimento próximo.",
      en: "The company begins its journey with a clear focus on imported, premium and high-performance vehicles, combining technical knowledge, provenance and close service.",
    },
  },
  {
    year: "2018",
    stage: { pt: "ESPECIALIZAÇÃO", en: "SPECIALIZATION" },
    title: { pt: "Conhecimento que ganha escala", en: "Knowledge that gains scale" },
    text: {
      pt: "A operação aprofunda sua atuação técnica e fortalece o relacionamento com oficinas, centros automotivos, lojistas e profissionais especializados.",
      en: "The operation deepens its technical work and strengthens relationships with workshops, auto service centers, retailers and specialized professionals.",
    },
  },
  {
    year: "2021",
    stage: { pt: "PORTFÓLIO", en: "PORTFOLIO" },
    title: { pt: "Conexões com referências globais", en: "Connections with global benchmarks" },
    text: {
      pt: "A seleção de fabricantes internacionais amplia as soluções em freios, suspensão, motor, filtragem, arrefecimento e sistemas eletrônicos.",
      en: "The selection of international manufacturers expands solutions in brakes, suspension, engine, filtration, cooling and electronic systems.",
    },
  },
  {
    year: "2024",
    stage: { pt: "ESTRUTURA", en: "STRUCTURE" },
    title: { pt: "Novo centro de distribuição", en: "New distribution center" },
    text: {
      pt: "A inauguração do centro de distribuição em Sorocaba amplia a capacidade operacional, a disponibilidade de produtos e a conexão com o interior paulista.",
      en: "The inauguration of the distribution center in Sorocaba expands operational capacity, product availability and the connection with the interior of São Paulo.",
    },
  },
  {
    year: "2025",
    stage: { pt: "EXPANSÃO", en: "EXPANSION" },
    title: { pt: "Mais perto de novos mercados", en: "Closer to new markets" },
    text: {
      pt: "As operações de Campinas e Santos aproximam a Stärke de duas regiões estratégicas e fortalecem sua cobertura comercial no estado de São Paulo.",
      en: "The Campinas and Santos operations bring Stärke closer to two strategic regions and strengthen its commercial coverage in the state of São Paulo.",
    },
  },
  {
    year: "2026",
    stage: { pt: "CONSOLIDAÇÃO", en: "CONSOLIDATION" },
    title: { pt: "Uma referência no segmento premium", en: "A benchmark in the premium segment" },
    text: {
      pt: "Com quatro operações, atendimento nacional e um portfólio reconhecido, a Stärke consolida uma década de evolução e prepara seu próximo ciclo de crescimento.",
      en: "With four operations, nationwide service and a recognized portfolio, Stärke consolidates a decade of evolution and prepares its next growth cycle.",
    },
  },
];

export const companyChapters = [
  {
    number: "01",
    icon: "✦",
    eyebrow: { pt: "NOSSA ORIGEM", en: "OUR ORIGIN" },
    title: {
      pt: "Uma necessidade do mercado transformada em especialidade.",
      en: "A market need turned into a specialty.",
    },
    paragraphs: [
      {
        pt: "A Stärke Parts nasceu em 2016 com uma proposta objetiva: oferecer ao mercado brasileiro uma distribuição mais preparada para as exigências de veículos importados, premium e superesportivos.",
        en: "Stärke Parts was born in 2016 with an objective proposal: to offer the Brazilian market a distribution operation better prepared for the demands of imported, premium and super-sports vehicles.",
      },
      {
        pt: "Desde o início, entendemos que esse segmento pede mais do que um código de peça. Ele exige leitura técnica, atenção à compatibilidade, fabricantes confiáveis e uma equipe capaz de orientar cada atendimento com responsabilidade.",
        en: "From the very beginning, we understood this segment demands more than a part number. It requires technical analysis, attention to compatibility, reliable manufacturers and a team able to guide every order responsibly.",
      },
    ],
  },
  {
    number: "02",
    icon: "⚙",
    eyebrow: { pt: "NOSSA ESSÊNCIA", en: "OUR ESSENCE" },
    title: {
      pt: "Conhecimento técnico que acompanha cada escolha.",
      en: "Technical knowledge that accompanies every choice.",
    },
    paragraphs: [
      {
        pt: "A identificação correta de um componente depende da análise de detalhes como montadora, modelo, ano, motorização, versão e, quando necessário, chassi completo.",
        en: "The correct identification of a component depends on analyzing details such as automaker, model, year, engine, version and, when necessary, the complete chassis.",
      },
      {
        pt: "Essa atenção orienta a nossa maneira de trabalhar e ajuda oficinas, centros automotivos, lojistas e proprietários a realizar consultas mais seguras, conscientes e compatíveis com a aplicação do veículo.",
        en: "This attention guides the way we work and helps workshops, auto service centers, retailers and owners to carry out safer, more conscious inquiries compatible with the vehicle application.",
      },
    ],
  },
  {
    number: "03",
    icon: "▦",
    eyebrow: { pt: "NOSSO PORTFÓLIO", en: "OUR PORTFOLIO" },
    title: {
      pt: "Fabricantes globais para um mercado que não aceita improviso.",
      en: "Global manufacturers for a market that does not accept improvisation.",
    },
    paragraphs: [
      {
        pt: "Nosso relacionamento com referências do aftermarket internacional reúne nomes como Bilstein Group, ZF, Brembo, Bosch, MAHLE, Hengst, Textar e outras marcas relevantes para diferentes sistemas automotivos.",
        en: "Our relationships with international aftermarket benchmarks bring together names such as Bilstein Group, ZF, Brembo, Bosch, MAHLE, Hengst, Textar and other relevant brands across different automotive systems.",
      },
      {
        pt: "A condição de distribuidora oficial febi, marca do Bilstein Group, representa esse compromisso com a procedência. A Forschen, nossa marca própria, amplia o portfólio e fortalece nossa identidade dentro do mercado de reposição.",
        en: "Being the official febi distributor — a Bilstein Group brand — represents this commitment to provenance. Forschen, our own brand, expands the portfolio and strengthens our identity in the replacement market.",
      },
    ],
  },
  {
    number: "04",
    icon: "↗",
    eyebrow: { pt: "NOSSA EVOLUÇÃO", en: "OUR EVOLUTION" },
    title: {
      pt: "Crescer sem abrir mão da atenção aos detalhes.",
      en: "Growing without giving up attention to detail.",
    },
    paragraphs: [
      {
        pt: "A matriz em São Paulo, o centro de distribuição em Sorocaba e as operações em Campinas e Santos formam uma estrutura pensada para aproximar o atendimento e apoiar a distribuição regional.",
        en: "The headquarters in São Paulo, the distribution center in Sorocaba and the operations in Campinas and Santos form a structure designed to bring service closer and support regional distribution.",
      },
      {
        pt: "Essa presença se conecta a uma operação de expedição para todo o Brasil, permitindo que o conhecimento técnico e o portfólio da Stärke cheguem a diferentes profissionais e mercados.",
        en: "This presence connects to a nationwide shipping operation, allowing Stärke's technical knowledge and portfolio to reach different professionals and markets.",
      },
    ],
  },
  {
    number: "05",
    icon: "❖",
    eyebrow: { pt: "NOSSA RELAÇÃO COM O MERCADO", en: "OUR RELATIONSHIP WITH THE MARKET" },
    title: {
      pt: "Parcerias construídas muito além da primeira venda.",
      en: "Partnerships built well beyond the first sale.",
    },
    paragraphs: [
      {
        pt: "A Stärke se desenvolve ao lado de oficinas especializadas, centros automotivos, lojistas e profissionais que conhecem a responsabilidade envolvida na manutenção de automóveis premium.",
        en: "Stärke grows alongside specialized workshops, auto service centers, retailers and professionals who understand the responsibility involved in maintaining premium cars.",
      },
      {
        pt: "Cada relacionamento é fortalecido por disponibilidade, orientação técnica, transparência nas condições comerciais e uma postura próxima antes, durante e depois do atendimento.",
        en: "Every relationship is strengthened by availability, technical guidance, transparent commercial conditions and a close approach before, during and after the service.",
      },
    ],
  },
  {
    number: "06",
    icon: "➤",
    eyebrow: { pt: "NOSSO PRÓXIMO CAPÍTULO", en: "OUR NEXT CHAPTER" },
    title: {
      pt: "Uma marca consolidada, pronta para continuar evoluindo.",
      en: "A consolidated brand, ready to keep evolving.",
    },
    paragraphs: [
      {
        pt: "Em 2026, a Stärke Parts reafirma sua presença entre os principais nomes brasileiros dedicados ao mercado de autopeças premium e de alta performance.",
        en: "In 2026, Stärke Parts reaffirms its presence among the leading Brazilian names dedicated to premium and high-performance auto parts.",
      },
      {
        pt: "O futuro é construído sobre os mesmos fundamentos que deram origem à empresa: ampliar conexões, qualificar a operação e entregar componentes de confiança a um mercado que não admite concessões.",
        en: "The future is built on the same foundations that gave rise to the company: expanding connections, qualifying the operation and delivering trusted components to a market that tolerates no concessions.",
      },
    ],
  },
];

export const companyOperations = [
  {
    title: { pt: "Importação e relacionamento", en: "Import and relationships" },
    text: {
      pt: "Conexão com fabricantes e fornecedores reconhecidos para fortalecer a seleção de componentes e a procedência do portfólio.",
      en: "Connection with recognized manufacturers and suppliers to strengthen the selection of components and the provenance of the portfolio.",
    },
  },
  {
    title: { pt: "Curadoria técnica", en: "Technical curation" },
    text: {
      pt: "Análise de aplicações, linhas e referências para orientar uma oferta alinhada às necessidades do segmento premium.",
      en: "Analysis of applications, lines and references to guide an offering aligned with the needs of the premium segment.",
    },
  },
  {
    title: { pt: "Estoque e separação", en: "Stock and picking" },
    text: {
      pt: "Organização operacional voltada à identificação, à disponibilidade e à conferência dos componentes comercializados.",
      en: "Operational organization focused on identification, availability and verification of the components sold.",
    },
  },
  {
    title: { pt: "Expedição e logística", en: "Shipping and logistics" },
    text: {
      pt: "Integração entre atendimento, preparação de pedidos, entregas regionais e envio para diferentes pontos do Brasil.",
      en: "Integration between service, order preparation, regional deliveries and shipments to different parts of Brazil.",
    },
  },
  {
    title: { pt: "Atendimento especializado", en: "Specialized service" },
    text: {
      pt: "Equipe preparada para orientar oficinas, centros automotivos, lojistas, parceiros e proprietários de veículos premium.",
      en: "A team ready to guide workshops, auto service centers, retailers, partners and premium vehicle owners.",
    },
  },
  {
    title: { pt: "Garantia e pós-venda", en: "Warranty and after-sales" },
    text: {
      pt: "Suporte que complementa a experiência comercial e reforça o compromisso com um relacionamento transparente e confiável.",
      en: "Support that complements the commercial experience and reinforces the commitment to a transparent and reliable relationship.",
    },
  },
  {
    title: { pt: "Loja e relacionamento comercial", en: "Store and commercial relationships" },
    text: {
      pt: "Atendimento consultivo para compreender demandas, identificar oportunidades e aproximar os clientes da unidade mais adequada.",
      en: "Consultative service to understand demands, identify opportunities and bring customers closer to the most suitable unit.",
    },
  },
  {
    title: { pt: "E-commerce e canais digitais", en: "E-commerce and digital channels" },
    text: {
      pt: "Presença conectada aos novos hábitos de compra e pesquisa, levando a especialização da Stärke também aos ambientes digitais.",
      en: "A presence connected to new buying and research habits, taking Stärke's specialization into digital environments as well.",
    },
  },
  {
    title: { pt: "Gestão e desenvolvimento", en: "Management and development" },
    text: {
      pt: "Áreas administrativas, financeiras e de pessoas que apoiam a organização e a evolução sustentável de todas as operações.",
      en: "Administrative, financial and people areas that support the organization and sustainable growth of all operations.",
    },
  },
];

export const corporatePillars = [
  {
    label: { pt: "NOSSO PROPÓSITO", en: "OUR PURPOSE" },
    title: { pt: "Conectar qualidade a quem não pode parar.", en: "Connect quality to those who cannot stop." },
    text: {
      pt: "Aproximar fabricantes confiáveis e profissionais especializados por meio de uma distribuição que valoriza procedência, precisão técnica e atendimento responsável.",
      en: "Bring reliable manufacturers and specialized professionals together through a distribution operation that values provenance, technical precision and responsible service.",
    },
  },
  {
    label: { pt: "NOSSA VISÃO", en: "OUR VISION" },
    title: { pt: "Ser referência em confiança no segmento premium.", en: "To be a benchmark of trust in the premium segment." },
    text: {
      pt: "Fortalecer continuamente a presença da Stärke Parts no mercado brasileiro de reposição premium, evoluindo a estrutura, o relacionamento e a experiência dos clientes.",
      en: "Continuously strengthen Stärke Parts' presence in the Brazilian premium replacement market, evolving the structure, relationships and customer experience.",
    },
  },
  {
    label: { pt: "NOSSO COMPROMISSO", en: "OUR COMMITMENT" },
    title: { pt: "Transformar conhecimento em segurança.", en: "Turning knowledge into safety." },
    text: {
      pt: "Tratar cada consulta com a atenção que uma aplicação automotiva exige, respeitando as características do veículo, a origem da peça e a necessidade real de quem compra.",
      en: "Treat every inquiry with the attention an automotive application demands, respecting the vehicle's characteristics, the origin of the part and the real need of the buyer.",
    },
  },
];

export const applicationCriteria = [
  {
    title: { pt: "Montadora e modelo", en: "Automaker and model" },
    text: {
      pt: "Identificamos o fabricante, a família e a configuração do veículo para estabelecer o ponto de partida correto da consulta.",
      en: "We identify the manufacturer, family and configuration of the vehicle to establish the correct starting point for the inquiry.",
    },
  },
  {
    title: { pt: "Ano e geração", en: "Year and generation" },
    text: {
      pt: "Diferenças de geração, período de produção e atualização de projeto podem alterar significativamente a aplicação de um componente.",
      en: "Generation differences, production period and design updates can significantly change a component's application.",
    },
  },
  {
    title: { pt: "Motorização e versão", en: "Engine and version" },
    text: {
      pt: "Cilindrada, combustível, potência, câmbio e especificações de acabamento ajudam a distinguir peças visualmente semelhantes.",
      en: "Displacement, fuel, power, transmission and trim specifications help distinguish visually similar parts.",
    },
  },
  {
    title: { pt: "Chassi e referência", en: "Chassis and reference" },
    text: {
      pt: "Quando necessário, o chassi completo e os códigos originais permitem uma verificação mais precisa da compatibilidade técnica.",
      en: "When necessary, the complete chassis and original codes allow a more precise verification of technical compatibility.",
    },
  },
];

export const productContexts = [
  {
    title: { pt: "Manutenção preventiva", en: "Preventive maintenance" },
    text: {
      pt: "Filtros, componentes de desgaste, fluidos e itens periódicos que ajudam a preservar a operação do veículo dentro da especificação correta.",
      en: "Filters, wear components, fluids and periodic items that help preserve vehicle operation within the correct specification.",
    },
  },
  {
    title: { pt: "Reparação especializada", en: "Specialized repair" },
    text: {
      pt: "Peças e conjuntos destinados às demandas identificadas por oficinas e centros automotivos com experiência no segmento premium.",
      en: "Parts and assemblies for the demands identified by workshops and auto service centers with experience in the premium segment.",
    },
  },
  {
    title: { pt: "Segurança e dirigibilidade", en: "Safety and handling" },
    text: {
      pt: "Linhas relacionadas a freios, suspensão, direção e estabilidade, selecionadas para acompanhar as exigências de cada aplicação.",
      en: "Lines related to brakes, suspension, steering and stability, selected to match the requirements of each application.",
    },
  },
  {
    title: { pt: "Tecnologia e gerenciamento", en: "Technology and management" },
    text: {
      pt: "Sensores, ignição, injeção e componentes eletrônicos presentes em plataformas cada vez mais conectadas e tecnicamente complexas.",
      en: "Sensors, ignition, injection and electronic components present in increasingly connected and technically complex platforms.",
    },
  },
];

export const operationalJourney = [
  {
    step: "01",
    title: { pt: "Planejamento e importação", en: "Planning and import" },
    text: {
      pt: "Analisamos o mercado, fortalecemos o relacionamento com fornecedores e estruturamos um portfólio aderente às necessidades do segmento premium.",
      en: "We analyze the market, strengthen relationships with suppliers and structure a portfolio aligned with the needs of the premium segment.",
    },
  },
  {
    step: "02",
    title: { pt: "Recebimento e organização", en: "Receiving and organization" },
    text: {
      pt: "Os componentes passam por rotinas de recebimento, identificação e organização de estoque para apoiar consultas e separações mais precisas.",
      en: "Components go through receiving, identification and stock organization routines to support more precise inquiries and order picking.",
    },
  },
  {
    step: "03",
    title: { pt: "Atendimento e validação", en: "Service and validation" },
    text: {
      pt: "A equipe comercial e técnica identifica a demanda, verifica a aplicação e orienta o cliente sobre fabricantes, disponibilidade e condições.",
      en: "The commercial and technical team identifies the demand, verifies the application and guides the customer on manufacturers, availability and conditions.",
    },
  },
  {
    step: "04",
    title: { pt: "Separação e conferência", en: "Picking and verification" },
    text: {
      pt: "Após a confirmação, o pedido é organizado com atenção às referências, às quantidades e às características necessárias para a expedição.",
      en: "After confirmation, the order is organized with attention to references, quantities and the characteristics required for shipping.",
    },
  },
  {
    step: "05",
    title: { pt: "Entrega e acompanhamento", en: "Delivery and follow-up" },
    text: {
      pt: "A modalidade logística é definida conforme o destino e a operação, mantendo o relacionamento ativo também no pós-venda.",
      en: "The logistics option is defined according to the destination and operation, keeping the relationship active in the after-sales as well.",
    },
  },
];

export const logisticsCoverage = [
  {
    title: { pt: "Grande São Paulo", en: "Greater São Paulo" },
    badge: { pt: "ENTREGAS RÁPIDAS", en: "QUICK DELIVERIES" },
    text: {
      pt: "Atendimento voltado à rotina de oficinas e clientes da região metropolitana, com modalidades rápidas e programadas conforme área de cobertura.",
      en: "Service focused on the routine of workshops and clients in the metropolitan region, with fast and scheduled options according to coverage area.",
    },
  },
  {
    title: { pt: "Interior paulista", en: "São Paulo state interior" },
    badge: { pt: "ESTRUTURA REGIONAL", en: "REGIONAL STRUCTURE" },
    text: {
      pt: "A presença do centro de distribuição de Sorocaba e da operação de Campinas fortalece o relacionamento e o apoio aos mercados do interior.",
      en: "The presence of the Sorocaba distribution center and the Campinas operation strengthens relationships and support for interior markets.",
    },
  },
  {
    title: { pt: "Baixada Santista", en: "Santos coastline" },
    badge: { pt: "PROXIMIDADE LOCAL", en: "LOCAL PROXIMITY" },
    text: {
      pt: "A filial Santos aproxima a Stärke dos clientes do litoral e contribui para uma experiência comercial mais conectada à região.",
      en: "The Santos branch brings Stärke closer to coastline clients and contributes to a more connected commercial experience in the region.",
    },
  },
  {
    title: { pt: "Demais estados", en: "Other states" },
    badge: { pt: "ENVIO NACIONAL", en: "NATIONWIDE SHIPPING" },
    text: {
      pt: "Pedidos podem ser organizados para outras regiões do Brasil, respeitando disponibilidade, modalidade, prazo e condições de frete aplicáveis.",
      en: "Orders can be arranged for other regions of Brazil, respecting availability, option, deadline and applicable freight conditions.",
    },
  },
];

export const commonQuestions = [
  {
    question: { pt: "A Stärke Parts atende somente oficinas?", en: "Does Stärke Parts only serve workshops?" },
    answer: {
      pt: "Não. Atendemos oficinas, centros automotivos, lojistas, parceiros comerciais e proprietários que procuram orientação para aplicações premium. O direcionamento depende da necessidade apresentada.",
      en: "No. We serve workshops, auto service centers, retailers, business partners and owners seeking guidance for premium applications. Direction depends on the need presented.",
    },
  },
  {
    question: {
      pt: "Quais informações preciso enviar para consultar uma peça?",
      en: "What information do I need to send to inquire about a part?",
    },
    answer: {
      pt: "Informe montadora, modelo, ano, motorização e, se possível, o código da peça. Quando a aplicação exigir uma confirmação mais precisa, nossa equipe poderá solicitar o chassi completo.",
      en: "Provide automaker, model, year, engine and, if possible, the part number. When the application requires a more precise confirmation, our team may ask for the complete chassis.",
    },
  },
  {
    question: { pt: "A Stärke trabalha com peças usadas?", en: "Does Stärke work with used parts?" },
    answer: {
      pt: "Não. Nosso portfólio é voltado a componentes novos, de fabricantes reconhecidos e linhas selecionadas conforme disponibilidade e aplicação.",
      en: "No. Our portfolio is focused on new components from recognized manufacturers and lines selected according to availability and application.",
    },
  },
  {
    question: { pt: "Vocês são distribuidores oficiais febi?", en: "Are you official febi distributors?" },
    answer: {
      pt: "Sim. A Stärke Parts é distribuidora oficial febi e recebe produtos diretamente da fábrica do Bilstein Group na Alemanha, reforçando a procedência da linha.",
      en: "Yes. Stärke Parts is an official febi distributor and receives products directly from the Bilstein Group factory in Germany, reinforcing the provenance of the line.",
    },
  },
  {
    question: { pt: "A entrega está disponível para todo o Brasil?", en: "Is delivery available throughout Brazil?" },
    answer: {
      pt: "Sim. Trabalhamos com expedição nacional e modalidades regionais. Prazos, disponibilidade, cobertura e valores devem ser confirmados com o time de atendimento.",
      en: "Yes. We work with nationwide shipping and regional options. Deadlines, availability, coverage and prices must be confirmed with the service team.",
    },
  },
];

export const serviceSteps = [
  {
    number: "01",
    title: { pt: "Entendemos a sua necessidade", en: "We understand your need" },
    text: {
      pt: "Você informa a peça procurada, o veículo e o perfil do atendimento: oficina, centro automotivo, lojista ou proprietário.",
      en: "You tell us the part you are looking for, the vehicle and the service profile: workshop, auto service center, retailer or owner.",
    },
  },
  {
    number: "02",
    title: { pt: "Validamos a aplicação", en: "We validate the application" },
    text: {
      pt: "Nossa equipe considera montadora, modelo, ano, motorização e, quando necessário, o chassi completo para reduzir dúvidas de compatibilidade.",
      en: "Our team considers automaker, model, year, engine and, when necessary, the complete chassis to reduce compatibility doubts.",
    },
  },
  {
    number: "03",
    title: { pt: "Apresentamos as alternativas", en: "We present the alternatives" },
    text: {
      pt: "Consultamos a disponibilidade e indicamos opções de fabricantes e componentes adequados à necessidade identificada.",
      en: "We check availability and recommend manufacturer and component options suited to the identified need.",
    },
  },
  {
    number: "04",
    title: { pt: "Organizamos a entrega", en: "We organize the delivery" },
    text: {
      pt: "O atendimento segue com a unidade mais adequada, considerando disponibilidade, localização e a modalidade logística aplicável.",
      en: "The service continues with the most suitable unit, considering availability, location and the applicable logistics option.",
    },
  },
];