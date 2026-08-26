"use client";

import { useEffect, useRef, useState, useCallback, type KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const INSTAGRAM = "https://www.instagram.com/starkepremiumparts/";

const tabs = [
  { id: "institucional", label: "A Stärke", number: "01" },
  { id: "aplicacoes", label: "Montadoras", number: "02" },
  { id: "produtos", label: "Produtos", number: "03" },
  { id: "fabricantes", label: "Fabricantes", number: "04" },
  { id: "estrutura", label: "Estrutura", number: "05" },
  { id: "logistica", label: "Logística", number: "06" },
  { id: "atendimento", label: "Atendimento", number: "07" },
] as const;

export type TabId = (typeof tabs)[number]["id"];

const routes: Record<TabId, string> = {
  institucional: "/empresa",
  aplicacoes: "/montadoras",
  produtos: "/produtos",
  fabricantes: "/fabricantes",
  estrutura: "/unidades",
  logistica: "/logistica",
  atendimento: "/atendimento",
};

const vehicleBrands = [
  { name: "Porsche", territory: "STUTTGART · ALEMANHA", focus: "Precisão esportiva", text: "Componentes para as linhas 911, Cayenne, Macan, Panamera, Boxster e Cayman, respeitando a configuração e as exigências técnicas de cada veículo.", image: "/autoparts-brakes.webp" },
  { name: "BMW", territory: "MUNIQUE · ALEMANHA", focus: "Performance e dinâmica", text: "Soluções para sedãs, SUVs e modelos esportivos das famílias Série 1, Série 3, Série 5, Série 7, X e aplicações selecionadas da linha M.", image: "/autoparts-filters.webp" },
  { name: "Mercedes-Benz", territory: "STUTTGART · ALEMANHA", focus: "Conforto e engenharia", text: "Atendimento a aplicações das classes A, C, E e S, além de GLA, GLC, GLE e outros veículos da marca, sempre com validação técnica da peça.", image: "/autoparts-suspension.webp" },
  { name: "Audi", territory: "INGOLSTADT · ALEMANHA", focus: "Tecnologia e controle", text: "Peças para famílias A3, A4, A5, A6, Q3, Q5, Q7 e aplicações esportivas S e RS, conforme disponibilidade e identificação correta do veículo.", image: "/autoparts-brakes.webp" },
  { name: "Land Rover", territory: "COVENTRY · REINO UNIDO", focus: "Capacidade e sofisticação", text: "Componentes para Range Rover, Evoque, Discovery e Defender, com atenção especial aos sistemas de suspensão, arrefecimento e motorização.", image: "/autoparts-filters.webp" },
  { name: "Volvo", territory: "GOTEMBURGO · SUÉCIA", focus: "Segurança e consistência", text: "Soluções selecionadas para as famílias XC, S e V, considerando tecnologia embarcada, procedência e especificação de cada conjunto.", image: "/autoparts-suspension.webp" },
  { name: "Jaguar", territory: "COVENTRY · REINO UNIDO", focus: "Performance britânica", text: "Aplicações para sedãs, SUVs e esportivos Jaguar, com suporte especializado para a identificação de versões, motores e sistemas.", image: "/autoparts-brakes.webp" },
  { name: "MINI", territory: "OXFORD · REINO UNIDO", focus: "Personalidade e agilidade", text: "Componentes para Cooper, Countryman, Clubman, Cabrio e John Cooper Works, de acordo com a geração e a motorização do veículo.", image: "/autoparts-filters.webp" },
  { name: "Ferrari", territory: "MARANELLO · ITÁLIA", focus: "Alto desempenho", text: "Consulta especializada para aplicações selecionadas de veículos superesportivos, considerando os requisitos técnicos de cada projeto.", image: "/autoparts-suspension.webp" },
  { name: "Lamborghini", territory: "SANT’AGATA · ITÁLIA", focus: "Engenharia superesportiva", text: "Atendimento sob consulta para aplicações de alta performance e componentes compatíveis com as especificações da montadora.", image: "/autoparts-brakes.webp" },
  { name: "VW Premium", territory: "WOLFSBURG · ALEMANHA", focus: "Aplicações selecionadas", text: "Componentes destinados a aplicações selecionadas da Volkswagen premium, sempre conforme veículo, motorização e chassi.", image: "/autoparts-filters.webp" },
];

const productLines = [
  { number: "01", family: "SEGURANÇA", title: "Freios", text: "Precisão e confiança em cada desaceleração, com componentes projetados para responder às exigências de veículos premium e esportivos.", items: ["Discos de freio", "Pastilhas", "Sensores de desgaste", "Pinças e reparos", "Flexíveis e fluidos"] },
  { number: "02", family: "DINÂMICA", title: "Suspensão", text: "Conforto, estabilidade e controle com soluções selecionadas para a geometria e o comportamento dinâmico de cada veículo.", items: ["Amortecedores", "Braços e bandejas", "Buchas e pivôs", "Coxins e batentes", "Molas e componentes"] },
  { number: "03", family: "CONTROLE", title: "Direção", text: "Resposta precisa e segurança de condução por meio de componentes adequados à arquitetura original do sistema de direção.", items: ["Terminais de direção", "Barras axiais", "Braços de direção", "Bombas e reparos", "Componentes hidráulicos"] },
  { number: "04", family: "PERFORMANCE", title: "Motor", text: "Peças para manutenção preventiva e corretiva dos conjuntos mecânicos que impulsionam veículos de diferentes gerações e motorizações.", items: ["Juntas e retentores", "Correias e tensionadores", "Polias", "Coxins de motor", "Componentes internos"] },
  { number: "05", family: "PROTEÇÃO", title: "Filtros", text: "Filtragem de alto padrão para preservar motor, cabine e sistemas essenciais, com fabricantes reconhecidos no mercado internacional.", items: ["Filtro de óleo", "Filtro de ar", "Filtro de combustível", "Filtro de cabine", "Soluções de filtragem premium"] },
  { number: "06", family: "GESTÃO TÉRMICA", title: "Arrefecimento", text: "Controle térmico eficiente para proteger o motor e manter o desempenho em condições severas de uso.", items: ["Bombas d’água", "Válvulas termostáticas", "Radiadores", "Reservatórios", "Mangueiras e sensores"] },
  { number: "07", family: "TECNOLOGIA", title: "Elétrica e ignição", text: "Confiabilidade para os sistemas eletrônicos e de gerenciamento que coordenam eficiência, partida e funcionamento do veículo.", items: ["Bobinas", "Velas de ignição", "Sensores", "Atuadores", "Componentes eletrônicos"] },
  { number: "08", family: "TRAÇÃO", title: "Transmissão e eixos", text: "Soluções para a transferência de potência, preservando suavidade, resistência e compatibilidade com o conjunto original.", items: ["Componentes de câmbio", "Semieixos", "Juntas homocinéticas", "Rolamentos", "Fluidos e reparos"] },
  { number: "09", family: "EFICIÊNCIA", title: "Injeção e combustível", text: "Componentes que contribuem para alimentação precisa, resposta do motor e funcionamento adequado dos sistemas de injeção.", items: ["Bombas de combustível", "Bicos injetores", "Sensores de pressão", "Válvulas", "Componentes de alimentação"] },
  { number: "10", family: "EMISSÕES", title: "Escape e sistemas auxiliares", text: "Itens destinados ao funcionamento integrado do motor, ao controle de emissões e à manutenção dos sistemas complementares.", items: ["Sensores de oxigênio", "Válvulas e componentes", "Juntas de escape", "Peças auxiliares", "Aplicações sob consulta"] },
];

const supplierGroups = [
  { title: "Bilstein Group", brands: ["febi", "SWAG", "Blue Friction"], category: "AFTERMARKET PREMIUM", description: "Portfólio de componentes para manutenção e reparação com foco em procedência, abrangência e qualidade técnica. A Stärke Parts é distribuidora oficial febi." },
  { title: "ZF Aftermarket", brands: ["TRW", "LEMFÖRDER", "SACHS"], category: "SEGURANÇA E DINÂMICA", description: "Soluções reconhecidas para freios, suspensão, direção e amortecimento em aplicações premium." },
  { title: "Frenagem e performance", brands: ["Brembo", "Textar"], category: "SISTEMAS DE FREIO", description: "Fabricantes com soluções para discos, pastilhas e componentes de frenagem orientados à segurança e à performance." },
  { title: "Filtragem e motor", brands: ["Hengst", "MAHLE", "UFI"], category: "FILTRAGEM ESPECIALIZADA", description: "Marcas reconhecidas por soluções de filtragem e componentes relacionados à proteção e ao funcionamento do motor." },
  { title: "Tecnologia automotiva", brands: ["Bosch", "HELLA", "Delphi", "Continental", "Pierburg"], category: "ELÉTRICA E GERENCIAMENTO", description: "Especialistas em sensores, sistemas eletrônicos, ignição, componentes de motor e tecnologias automotivas." },
  { title: "Especialidades técnicas", brands: ["HEPU", "GEBA", "BGA", "ÜRO Parts", "SIDEM", "Hoffer", "Meat&Doria"], category: "LINHAS COMPLEMENTARES", description: "Soluções específicas para arrefecimento, direção, motor e aplicações que exigem uma seleção cuidadosa de fabricantes." },
  { title: "Marca própria", brands: ["Forschen"], category: "IDENTIDADE STÄRKE", description: "Uma linha própria construída dentro do universo de especialização, disponibilidade e confiança da Stärke Parts." },
];

const locations = [
  { code: "SP·01", city: "São Paulo", type: "MATRIZ", area: "Chácara Santo Antônio", description: "Nossa operação central conecta atendimento comercial, gestão de portfólio e suporte especializado ao mercado de autopeças premium.", capabilities: ["Atendimento especializado", "Operação comercial", "Distribuição regional"] },
  { code: "SP·02", city: "Sorocaba", type: "CENTRO DE DISTRIBUIÇÃO", area: "Interior de São Paulo", description: "Estrutura logística estratégica para ampliar a disponibilidade de produtos e agilizar o atendimento ao interior paulista.", capabilities: ["Estoque estratégico", "Expedição", "Atendimento regional"] },
  { code: "SP·03", city: "Campinas", type: "FILIAL", area: "Rua Pedro Domingos Vitali, 400 · Parque Itália", description: "Presença em uma das principais regiões automotivas do estado, aproximando a Stärke de oficinas, centros automotivos e parceiros locais.", capabilities: ["Atendimento regional", "Proximidade comercial", "Suporte especializado"] },
  { code: "SP·04", city: "Santos", type: "FILIAL", area: "Baixada Santista", description: "Operação voltada ao relacionamento com clientes do litoral paulista e à ampliação da cobertura comercial da marca.", capabilities: ["Atendimento regional", "Cobertura no litoral", "Agilidade comercial"] },
];

const companyHistory = [
  { year: "2016", title: "Uma empresa nasce com foco definido", text: "A Stärke Parts inicia sua trajetória a partir de uma leitura clara do mercado: veículos importados, premium e de alta performance exigem uma distribuição especializada, capaz de combinar conhecimento técnico, procedência e atendimento próximo." },
  { year: "ORIGEM", title: "Especialização desde os primeiros passos", text: "Nos primeiros anos, a operação consolida uma forma própria de atender: compreender a aplicação correta, selecionar fabricantes reconhecidos e construir relações de confiança com oficinas, centros automotivos, lojistas e proprietários." },
  { year: "EVOLUÇÃO", title: "Um portfólio construído com critério", text: "A experiência comercial e técnica amplia o relacionamento com importantes fabricantes do aftermarket internacional, fortalecendo linhas como freios, suspensão, motor, filtragem, arrefecimento e sistemas eletrônicos." },
  { year: "2024", title: "A estrutura ganha nova escala", text: "O centro de distribuição em Sorocaba marca um avanço importante na estrutura logística da empresa, ampliando a capacidade operacional e fortalecendo a conexão com clientes do interior de São Paulo." },
  { year: "2025", title: "Expansão para estar mais perto", text: "As operações de Campinas e Santos ampliam a presença regional da Stärke, aproximando o atendimento especializado de dois mercados estratégicos: a região metropolitana de Campinas e a Baixada Santista." },
  { year: "2026", title: "Uma presença consolidada no segmento premium", text: "Com matriz, centro de distribuição, filiais, fabricantes reconhecidos e atendimento nacional, a Stärke reforça seu posicionamento entre as referências brasileiras em autopeças premium e continua expandindo sua relação de confiança com o mercado." },
];

const companyRoadmap = [
  { year: "2016", stage: "FUNDAÇÃO", title: "Nasce a Stärke Parts", text: "A empresa inicia sua trajetória com foco definido em veículos importados, premium e de alta performance, combinando conhecimento técnico, procedência e atendimento próximo." },
  { year: "2018", stage: "ESPECIALIZAÇÃO", title: "Conhecimento que ganha escala", text: "A operação aprofunda sua atuação técnica e fortalece o relacionamento com oficinas, centros automotivos, lojistas e profissionais especializados." },
  { year: "2021", stage: "PORTFÓLIO", title: "Conexões com referências globais", text: "A seleção de fabricantes internacionais amplia as soluções em freios, suspensão, motor, filtragem, arrefecimento e sistemas eletrônicos." },
  { year: "2024", stage: "ESTRUTURA", title: "Novo centro de distribuição", text: "A inauguração do centro de distribuição em Sorocaba amplia a capacidade operacional, a disponibilidade de produtos e a conexão com o interior paulista." },
  { year: "2025", stage: "EXPANSÃO", title: "Mais perto de novos mercados", text: "As operações de Campinas e Santos aproximam a Stärke de duas regiões estratégicas e fortalecem sua cobertura comercial no estado de São Paulo." },
  { year: "2026", stage: "CONSOLIDAÇÃO", title: "Uma referência no segmento premium", text: "Com quatro operações, atendimento nacional e um portfólio reconhecido, a Stärke consolida uma década de evolução e prepara seu próximo ciclo de crescimento." },
];

const companyChapters = [
  { number: "01", eyebrow: "NOSSA ORIGEM", title: "Uma necessidade do mercado transformada em especialidade.", paragraphs: ["A Stärke Parts nasceu em 2016 com uma proposta objetiva: oferecer ao mercado brasileiro uma distribuição mais preparada para as exigências de veículos importados, premium e superesportivos.", "Desde o início, entendemos que esse segmento pede mais do que um código de peça. Ele exige leitura técnica, atenção à compatibilidade, fabricantes confiáveis e uma equipe capaz de orientar cada atendimento com responsabilidade."] },
  { number: "02", eyebrow: "NOSSA ESSÊNCIA", title: "Conhecimento técnico que acompanha cada escolha.", paragraphs: ["A identificação correta de um componente depende da análise de detalhes como montadora, modelo, ano, motorização, versão e, quando necessário, chassi completo.", "Essa atenção orienta a nossa maneira de trabalhar e ajuda oficinas, centros automotivos, lojistas e proprietários a realizar consultas mais seguras, conscientes e compatíveis com a aplicação do veículo."] },
  { number: "03", eyebrow: "NOSSO PORTFÓLIO", title: "Fabricantes globais para um mercado que não aceita improviso.", paragraphs: ["Nosso relacionamento com referências do aftermarket internacional reúne nomes como Bilstein Group, ZF, Brembo, Bosch, MAHLE, Hengst, Textar e outras marcas relevantes para diferentes sistemas automotivos.", "A condição de distribuidora oficial febi, marca do Bilstein Group, representa esse compromisso com a procedência. A Forschen, nossa marca própria, amplia o portfólio e fortalece nossa identidade dentro do mercado de reposição."] },
  { number: "04", eyebrow: "NOSSA EVOLUÇÃO", title: "Crescer sem abrir mão da atenção aos detalhes.", paragraphs: ["A matriz em São Paulo, o centro de distribuição em Sorocaba e as operações em Campinas e Santos formam uma estrutura pensada para aproximar o atendimento e apoiar a distribuição regional.", "Essa presença se conecta a uma operação de expedição para todo o Brasil, permitindo que o conhecimento técnico e o portfólio da Stärke cheguem a diferentes profissionais e mercados."] },
  { number: "05", eyebrow: "NOSSA RELAÇÃO COM O MERCADO", title: "Parcerias construídas muito além da primeira venda.", paragraphs: ["A Stärke se desenvolve ao lado de oficinas especializadas, centros automotivos, lojistas e profissionais que conhecem a responsabilidade envolvida na manutenção de automóveis premium.", "Cada relacionamento é fortalecido por disponibilidade, orientação técnica, transparência nas condições comerciais e uma postura próxima antes, durante e depois do atendimento."] },
  { number: "06", eyebrow: "NOSSO PRÓXIMO CAPÍTULO", title: "Uma marca consolidada, pronta para continuar evoluindo.", paragraphs: ["Em 2026, a Stärke Parts reafirma sua presença entre os principais nomes brasileiros dedicados ao mercado de autopeças premium e de alta performance.", "O futuro é construído sobre os mesmos fundamentos que deram origem à empresa: ampliar conexões, qualificar a operação e entregar componentes de confiança a um mercado que não admite concessões."] },
];

const companyOperations = [
  { title: "Importação e relacionamento", text: "Conexão com fabricantes e fornecedores reconhecidos para fortalecer a seleção de componentes e a procedência do portfólio." },
  { title: "Curadoria técnica", text: "Análise de aplicações, linhas e referências para orientar uma oferta alinhada às necessidades do segmento premium." },
  { title: "Estoque e separação", text: "Organização operacional voltada à identificação, à disponibilidade e à conferência dos componentes comercializados." },
  { title: "Expedição e logística", text: "Integração entre atendimento, preparação de pedidos, entregas regionais e envio para diferentes pontos do Brasil." },
  { title: "Atendimento especializado", text: "Equipe preparada para orientar oficinas, centros automotivos, lojistas, parceiros e proprietários de veículos premium." },
  { title: "Garantia e pós-venda", text: "Suporte que complementa a experiência comercial e reforça o compromisso com um relacionamento transparente e confiável." },
  { title: "Loja e relacionamento comercial", text: "Atendimento consultivo para compreender demandas, identificar oportunidades e aproximar os clientes da unidade mais adequada." },
  { title: "E-commerce e canais digitais", text: "Presença conectada aos novos hábitos de compra e pesquisa, levando a especialização da Stärke também aos ambientes digitais." },
  { title: "Gestão e desenvolvimento", text: "Áreas administrativas, financeiras e de pessoas que apoiam a organização e a evolução sustentável de todas as operações." },
];

const corporatePillars = [
  { label: "NOSSO PROPÓSITO", title: "Conectar qualidade a quem não pode parar.", text: "Aproximar fabricantes confiáveis e profissionais especializados por meio de uma distribuição que valoriza procedência, precisão técnica e atendimento responsável." },
  { label: "NOSSA VISÃO", title: "Ser referência em confiança no segmento premium.", text: "Fortalecer continuamente a presença da Stärke Parts no mercado brasileiro de reposição premium, evoluindo a estrutura, o relacionamento e a experiência dos clientes." },
  { label: "NOSSO COMPROMISSO", title: "Transformar conhecimento em segurança.", text: "Tratar cada consulta com a atenção que uma aplicação automotiva exige, respeitando as características do veículo, a origem da peça e a necessidade real de quem compra." },
];

const applicationCriteria = [
  { title: "Montadora e modelo", text: "Identificamos o fabricante, a família e a configuração do veículo para estabelecer o ponto de partida correto da consulta." },
  { title: "Ano e geração", text: "Diferenças de geração, período de produção e atualização de projeto podem alterar significativamente a aplicação de um componente." },
  { title: "Motorização e versão", text: "Cilindrada, combustível, potência, câmbio e especificações de acabamento ajudam a distinguir peças visualmente semelhantes." },
  { title: "Chassi e referência", text: "Quando necessário, o chassi completo e os códigos originais permitem uma verificação mais precisa da compatibilidade técnica." },
];

const productContexts = [
  { title: "Manutenção preventiva", text: "Filtros, componentes de desgaste, fluidos e itens periódicos que ajudam a preservar a operação do veículo dentro da especificação correta." },
  { title: "Reparação especializada", text: "Peças e conjuntos destinados às demandas identificadas por oficinas e centros automotivos com experiência no segmento premium." },
  { title: "Segurança e dirigibilidade", text: "Linhas relacionadas a freios, suspensão, direção e estabilidade, selecionadas para acompanhar as exigências de cada aplicação." },
  { title: "Tecnologia e gerenciamento", text: "Sensores, ignição, injeção e componentes eletrônicos presentes em plataformas cada vez mais conectadas e tecnicamente complexas." },
];

const featuredManufacturers = [
  { name: "febi", group: "BILSTEIN GROUP · ALEMANHA", specialty: "Distribuição oficial no Brasil", text: "Como distribuidora oficial febi, a Stärke Parts trabalha com produtos recebidos diretamente da fábrica do Bilstein Group na Alemanha, reforçando a procedência e a confiança em componentes para diferentes sistemas automotivos." },
  { name: "TRW · LEMFÖRDER · SACHS", group: "ZF AFTERMARKET", specialty: "Freios, direção, suspensão e amortecimento", text: "O ecossistema ZF reúne marcas reconhecidas por soluções ligadas à segurança, à dinâmica e ao comportamento dos veículos, com aplicações relevantes no mercado premium." },
  { name: "Brembo · Textar", group: "FRENAGEM PREMIUM", specialty: "Discos, pastilhas e componentes de freio", text: "Fabricantes associados a sistemas de frenagem que exigem desempenho consistente, resposta previsível e compatibilidade com projetos automotivos sofisticados." },
  { name: "Hengst · MAHLE · UFI", group: "FILTRAGEM E PROTEÇÃO", specialty: "Óleo, ar, combustível e cabine", text: "Especialistas em filtragem que ajudam a preservar conjuntos mecânicos e o funcionamento adequado dos sistemas, respeitando as necessidades de cada motorização." },
  { name: "Forschen", group: "MARCA PRÓPRIA STÄRKE", specialty: "Identidade, seleção e disponibilidade", text: "A marca própria da Stärke Parts amplia as alternativas do portfólio e traduz a experiência da empresa em uma linha alinhada ao seu compromisso com aplicação, qualidade e confiança." },
];

const operationalJourney = [
  { step: "01", title: "Planejamento e importação", text: "Analisamos o mercado, fortalecemos o relacionamento com fornecedores e estruturamos um portfólio aderente às necessidades do segmento premium." },
  { step: "02", title: "Recebimento e organização", text: "Os componentes passam por rotinas de recebimento, identificação e organização de estoque para apoiar consultas e separações mais precisas." },
  { step: "03", title: "Atendimento e validação", text: "A equipe comercial e técnica identifica a demanda, verifica a aplicação e orienta o cliente sobre fabricantes, disponibilidade e condições." },
  { step: "04", title: "Separação e conferência", text: "Após a confirmação, o pedido é organizado com atenção às referências, às quantidades e às características necessárias para a expedição." },
  { step: "05", title: "Entrega e acompanhamento", text: "A modalidade logística é definida conforme o destino e a operação, mantendo o relacionamento ativo também no pós-venda." },
];

const logisticsCoverage = [
  { title: "Grande São Paulo", badge: "ENTREGAS RÁPIDAS", text: "Atendimento voltado à rotina de oficinas e clientes da região metropolitana, com modalidades rápidas e programadas conforme área de cobertura." },
  { title: "Interior paulista", badge: "ESTRUTURA REGIONAL", text: "A presença do centro de distribuição de Sorocaba e da operação de Campinas fortalece o relacionamento e o apoio aos mercados do interior." },
  { title: "Baixada Santista", badge: "PROXIMIDADE LOCAL", text: "A filial Santos aproxima a Stärke dos clientes do litoral e contribui para uma experiência comercial mais conectada à região." },
  { title: "Demais estados", badge: "ENVIO NACIONAL", text: "Pedidos podem ser organizados para outras regiões do Brasil, respeitando disponibilidade, modalidade, prazo e condições de frete aplicáveis." },
];

const commonQuestions = [
  { question: "A Stärke Parts atende somente oficinas?", answer: "Não. Atendemos oficinas, centros automotivos, lojistas, parceiros comerciais e proprietários que procuram orientação para aplicações premium. O direcionamento depende da necessidade apresentada." },
  { question: "Quais informações preciso enviar para consultar uma peça?", answer: "Informe montadora, modelo, ano, motorização e, se possível, o código da peça. Quando a aplicação exigir uma confirmação mais precisa, nossa equipe poderá solicitar o chassi completo." },
  { question: "A Stärke trabalha com peças usadas?", answer: "Não. Nosso portfólio é voltado a componentes novos, de fabricantes reconhecidos e linhas selecionadas conforme disponibilidade e aplicação." },
  { question: "Vocês são distribuidores oficiais febi?", answer: "Sim. A Stärke Parts é distribuidora oficial febi e recebe produtos diretamente da fábrica do Bilstein Group na Alemanha, reforçando a procedência da linha." },
  { question: "A entrega está disponível para todo o Brasil?", answer: "Sim. Trabalhamos com expedição nacional e modalidades regionais. Prazos, disponibilidade, cobertura e valores devem ser confirmados com o time de atendimento." },
  { question: "Quando o frete grátis a partir de R$ 300 se aplica?", answer: "A condição se refere às entregas via motoboy dentro da área de atendimento aplicável. Consulte a equipe para confirmar cobertura, pedido mínimo e regras comerciais vigentes." },
];

const serviceSteps = [
  { number: "01", title: "Entendemos a sua necessidade", text: "Você informa a peça procurada, o veículo e o perfil do atendimento: oficina, centro automotivo, lojista ou proprietário." },
  { number: "02", title: "Validamos a aplicação", text: "Nossa equipe considera montadora, modelo, ano, motorização e, quando necessário, o chassi completo para reduzir dúvidas de compatibilidade." },
  { number: "03", title: "Apresentamos as alternativas", text: "Consultamos a disponibilidade e indicamos opções de fabricantes e componentes adequados à necessidade identificada." },
  { number: "04", title: "Organizamos a entrega", text: "O atendimento segue com a unidade mais adequada, considerando disponibilidade, localização e a modalidade logística aplicável." },
];

function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"enter" | "visible" | "exit">("enter");

  useEffect(() => {
    const showTimer = setTimeout(() => setPhase("visible"), 50);
    const exitTimer = setTimeout(() => setPhase("exit"), 2200);
    const doneTimer = setTimeout(onComplete, 3000);
    return () => { clearTimeout(showTimer); clearTimeout(exitTimer); clearTimeout(doneTimer); };
  }, [onComplete]);

  return (
    <div className={`splash splash--${phase}`} aria-hidden="true">
      <div className="splash-inner">
        <div className="splash-logo">
          <span>STÄRKE</span>
          <b>PARTS</b>
        </div>
        <div className="splash-divider" />
        <p className="splash-tagline">Bem-vindo à Stärke</p>
        <p className="splash-sub">Premium Automotive Parts</p>
      </div>
    </div>
  );
}

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <p className={`eyebrow ${light ? "" : "eyebrow--dark"}`}><span />{children}</p>;
}

function PanelHeading({ kicker, title, text }: { kicker: string; title: string; text: string }) {
  return <div className="panel-heading"><Eyebrow>{kicker}</Eyebrow><h3>{title}</h3><p>{text}</p></div>;
}

function InstitutionalPanel({ onContact }: { onContact: () => void }) {
  return <>
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

    <div className="subsection-heading"><Eyebrow>A IDENTIDADE QUE NOS MOVE</Eyebrow><h4>Um posicionamento claro.<br /><em>Uma entrega consistente.</em></h4><p className="subsection-description">A nossa atuação é orientada por princípios que conectam os interesses do mercado, a responsabilidade técnica e a construção de relacionamentos duradouros.</p></div>
    <div className="identity-grid">{corporatePillars.map(item => <article className="identity-card" key={item.label}><span>{item.label}</span><h5>{item.title}</h5><p>{item.text}</p></article>)}</div>

    <div className="subsection-heading company-story-heading"><Eyebrow>QUEM SOMOS E COMO EVOLUÍMOS</Eyebrow><h4>O que existe por trás<br />de cada peça <em>Stärke.</em></h4><p>Nossa história reúne propósito, especialização, relações com fabricantes e uma estrutura que acompanha o desenvolvimento do mercado premium brasileiro.</p></div>

    <div className="company-chapters">{companyChapters.map(chapter => <article className="company-chapter" key={chapter.number}><div className="chapter-index"><span>{chapter.number}</span><b>{chapter.eyebrow}</b></div><div className="chapter-copy"><h5>{chapter.title}</h5>{chapter.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div></article>)}</div>

    <aside className="brand-promise"><span>O QUE NOS MOVE TODOS OS DIAS</span><h4>Potência em qualidade.<br /><em>Excelência em cada detalhe.</em></h4><p>Um compromisso que orienta o nosso portfólio, o relacionamento com fabricantes, a atenção à aplicação correta e a experiência de cada cliente.</p></aside>

    <div className="subsection-heading"><Eyebrow>NOSSA TRAJETÓRIA</Eyebrow><h4>Uma história de evolução,<br />proximidade e <em>especialização.</em></h4></div>
    <div className="company-roadmap" aria-label="Roadmap de evolução da Stärke Parts entre 2016 e 2026">{companyRoadmap.map((item, index) => <article className="roadmap-item" key={item.year}><div className="roadmap-marker"><span>{String(index + 1).padStart(2, "0")}</span></div><div className="roadmap-year"><strong>{item.year}</strong><span>{item.stage}</span></div><div className="roadmap-copy"><h5>{item.title}</h5><p>{item.text}</p></div></article>)}</div>

    <div className="subsection-heading operations-heading"><Eyebrow>OS BASTIDORES DA NOSSA OPERAÇÃO</Eyebrow><h4>Uma estrutura conectada<br />por um mesmo <em>propósito.</em></h4><p>Por trás de cada atendimento, diferentes áreas trabalham de forma integrada para aproximar o mercado premium das soluções de que ele precisa.</p></div>
    <div className="operations-grid">{companyOperations.map((item, index) => <article className="operation-card" key={item.title}><span>{String(index + 1).padStart(2, "0")}</span><h5>{item.title}</h5><p>{item.text}</p></article>)}</div>

    <div className="principle-grid"><article><span>01</span><h5>Procedência</h5><p>Fabricantes reconhecidos e seleção técnica de componentes para aplicações premium.</p></article><article><span>02</span><h5>Especialização</h5><p>Atendimento preparado para considerar veículo, motorização, ano e chassi.</p></article><article><span>03</span><h5>Proximidade</h5><p>Operações regionais e relacionamento próximo com quem move o aftermarket.</p></article><article><span>04</span><h5>Confiança</h5><p>Uma experiência construída com clareza, suporte e atenção a cada detalhe.</p></article></div>
    <div className="institutional-manifesto"><Eyebrow>O QUE SIGNIFICA SER STÄRKE</Eyebrow><p>Para nós, uma autopeça nunca representa apenas um item em estoque. Ela representa o trabalho de uma oficina, a confiança de um cliente, a precisão de um projeto e a responsabilidade de colocar o veículo novamente em movimento.</p><strong>É por isso que oferecemos peças.<br /><em>E entregamos confiança.</em></strong></div>
  </>;
}
function ApplicationsPanel({ onContact }: { onContact: () => void }) {
  const [selected, setSelected] = useState(0);
  const vehicle = vehicleBrands[selected];
  return <>
    <PanelHeading kicker="APLICAÇÕES PREMIUM E DE ALTA PERFORMANCE" title="Veículos extraordinários exigem escolhas à altura." text="Trabalhamos com aplicações para algumas das montadoras mais relevantes do segmento premium e superesportivo. Nossa equipe avalia cada veículo individualmente para orientar a identificação da peça e do fabricante adequados." />
    <div className="brand-explorer"><div className="brand-selector" aria-label="Selecione uma montadora">{vehicleBrands.map((item, index) => <button key={item.name} className={selected === index ? "selected" : ""} onClick={() => setSelected(index)} aria-pressed={selected === index}><span>{String(index + 1).padStart(2, "0")}</span>{item.name}<b>↗</b></button>)}</div><article className="brand-feature" key={vehicle.name}><div className="brand-feature-photo" style={{ backgroundImage: `linear-gradient(0deg,rgba(4,4,4,.88),transparent 67%),url('${vehicle.image}')` }}><span>{vehicle.territory}</span><h4>{vehicle.name}</h4></div><div className="brand-feature-copy"><Eyebrow>{vehicle.focus.toUpperCase()}</Eyebrow><p>{vehicle.text}</p><button className="text-link" onClick={onContact}>Consultar uma aplicação <span>↗</span></button></div></article></div>
    <aside className="info-strip"><strong>A aplicação correta começa pelo veículo certo.</strong><span>Montadora · modelo · ano · motorização · chassi completo, quando necessário.</span></aside>
    <div className="subsection-heading"><Eyebrow>COMO IDENTIFICAMOS CADA APLICAÇÃO</Eyebrow><h4>Precisão técnica começa<br />pelas <em>informações corretas.</em></h4><p className="subsection-description">Automóveis premium podem apresentar diferenças relevantes mesmo dentro de uma mesma família. Nossa análise considera os detalhes necessários para orientar a escolha do componente.</p></div>
    <div className="detail-grid">{applicationCriteria.map((item, index) => <article className="detail-card" key={item.title}><span>{String(index + 1).padStart(2, "0")}</span><h5>{item.title}</h5><p>{item.text}</p></article>)}</div>
    <aside className="editorial-note"><strong>Não é apenas sobre a marca do veículo.</strong><p>É sobre identificar a combinação correta entre projeto, sistema, fabricante e referência para que a peça atenda à aplicação com a atenção que o segmento exige.</p></aside>
  </>;
}

function ProductsPanel({ onContact }: { onContact: () => void }) {
  return <>
    <PanelHeading kicker="LINHAS E SISTEMAS AUTOMOTIVOS" title="Um portfólio completo para quem conhece cada detalhe." text="Da manutenção preventiva aos componentes de sistemas mais exigentes, reunimos linhas selecionadas para diferentes montadoras e aplicações premium. A disponibilidade deve ser confirmada com nossa equipe conforme o veículo e o fabricante." />
    <div className="product-spotlight"><div className="product-spotlight-photo" aria-label="Autopeças premium: discos de freio, amortecedores e filtros" /><div className="product-spotlight-copy"><Eyebrow>PEÇAS QUE MOVEM CONFIANÇA</Eyebrow><h4>Cada sistema.<br /><em>A peça certa.</em></h4><p>Da frenagem ao arrefecimento, nossa seleção reúne componentes essenciais para uma manutenção compatível com o padrão de exigência dos veículos premium.</p></div></div>
    <div className="product-grid">{productLines.map(item => <article className="product-card" key={item.title}><div className="product-card-top"><span>{item.number}</span><span>{item.family}</span></div><h4>{item.title}</h4><p>{item.text}</p><ul>{item.items.map(part => <li key={part}>{part}</li>)}</ul><button onClick={onContact}>Consultar disponibilidade <span>↗</span></button></article>)}</div>
    <div className="subsection-heading"><Eyebrow>ONDE NOSSO PORTFÓLIO FAZ A DIFERENÇA</Eyebrow><h4>Soluções pensadas para<br />diferentes momentos da <em>manutenção.</em></h4></div>
    <div className="detail-grid">{productContexts.map((item, index) => <article className="detail-card" key={item.title}><span>{String(index + 1).padStart(2, "0")}</span><h5>{item.title}</h5><p>{item.text}</p></article>)}</div>
    <div className="quality-banner"><span>CRITÉRIOS STÄRKE PARTS</span><h4>Procedência. Compatibilidade.<br /><em>Confiança em cada componente.</em></h4><p>A disponibilidade, o fabricante e a referência exata são sempre confirmados de acordo com a aplicação e a necessidade apresentada pelo cliente.</p></div>
    <aside className="info-strip"><strong>Não encontrou o componente que procura?</strong><button className="text-link" onClick={onContact}>Fale com um especialista <span>↗</span></button></aside>
  </>;
}

function ManufacturersPanel({ onContact }: { onContact: () => void }) {
  return <>
    <PanelHeading kicker="PARCERIAS E FABRICANTES INTERNACIONAIS" title="Marcas globais. Um mesmo compromisso com a qualidade." text="Nosso portfólio reúne fabricantes reconhecidos por sua atuação em diferentes sistemas automotivos. A composição da linha e a disponibilidade de cada item variam conforme a aplicação e devem ser confirmadas no atendimento." />
    <div className="supplier-grid">{supplierGroups.map((group, index) => <article className={`supplier-card ${index === 0 ? "supplier-card--featured" : ""}`} key={group.title}><span className="supplier-category">{group.category}</span><h4>{group.title}</h4><p>{group.description}</p><div className="supplier-brands">{group.brands.map(brand => <span key={brand}>{brand}</span>)}</div></article>)}</div>
    <div className="subsection-heading"><Eyebrow>CONHEÇA ALGUMAS DAS NOSSAS REFERÊNCIAS</Eyebrow><h4>Fabricantes que ajudam<br />a sustentar nossa <em>especialização.</em></h4><p className="subsection-description">Cada parceria contribui com conhecimento, linhas específicas e soluções alinhadas às necessidades de oficinas e profissionais que trabalham com aplicações premium.</p></div>
    <div className="manufacturer-profiles">{featuredManufacturers.map((item, index) => <article className="manufacturer-profile" key={item.name}><span>{String(index + 1).padStart(2, "0")}</span><div><span>{item.group}</span><h5>{item.name}</h5><strong>{item.specialty}</strong><p>{item.text}</p></div></article>)}</div>
    <div className="official-distribution"><Eyebrow light>DISTRIBUIDORA OFICIAL FEBI</Eyebrow><h4>Da Alemanha para quem<br />valoriza <em>procedência.</em></h4><p>A Stärke Parts é distribuidora oficial febi e recebe produtos diretamente da fábrica do Bilstein Group na Alemanha. Uma relação que reforça transparência, origem e confiança em cada consulta.</p></div>
    <aside className="manufacturer-note"><div><Eyebrow>DISTRIBUIÇÃO ESPECIALIZADA</Eyebrow><h4>Procedência que fortalece cada escolha.</h4></div><button className="button button--yellow" onClick={onContact}>Consultar fabricante <span>→</span></button></aside>
  </>;
}

function StructurePanel({ onContact }: { onContact: () => void }) {
  return <>
    <PanelHeading kicker="MATRIZ · CENTRO DE DISTRIBUIÇÃO · FILIAIS" title="Uma estrutura pensada para estar cada vez mais perto." text="Nossa presença no estado de São Paulo conecta atendimento especializado, disponibilidade regional e eficiência operacional. Cada unidade integra uma rede preparada para apoiar clientes em diferentes mercados." />
    <div className="locations-grid">{locations.map(location => <article className="location-card" key={location.code}><div className="location-top"><span>{location.code}</span><span>{location.type}</span></div><h4>{location.city}</h4><p className="location-area">{location.area}</p><p>{location.description}</p><ul>{location.capabilities.map(item => <li key={item}>{item}</li>)}</ul><button onClick={onContact}>Consultar atendimento <span>↗</span></button></article>)}</div>
    <aside className="coverage-banner"><Eyebrow light>REDE STÄRKE PARTS</Eyebrow><h4>Quatro operações.<br /><em>Um mesmo padrão.</em></h4><p>Atendimento próximo, conhecimento técnico e uma operação conectada ao mercado brasileiro de autopeças premium.</p></aside>
    <div className="subsection-heading"><Eyebrow>COMO AS ÁREAS SE CONECTAM</Eyebrow><h4>Uma operação completa,<br />do fornecedor ao <em>pós-venda.</em></h4><p className="subsection-description">A distribuição especializada depende de uma cadeia integrada, na qual cada etapa contribui para uma experiência mais segura e organizada.</p></div>
    <div className="journey-list">{operationalJourney.map(item => <article className="journey-item" key={item.step}><span>{item.step}</span><h5>{item.title}</h5><p>{item.text}</p></article>)}</div>
    <aside className="editorial-note"><strong>Presença regional com visão nacional.</strong><p>Matriz, centro de distribuição e filiais trabalham de forma complementar para aproximar conhecimento técnico, disponibilidade e atendimento especializado dos clientes.</p></aside>
  </>;
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
  return <>
    <PanelHeading kicker="ATENDIMENTO TÉCNICO E RELACIONAMENTO" title="A peça certa começa com a pergunta certa." text="Nosso time está preparado para atender oficinas, centros automotivos, lojistas e proprietários que procuram componentes para veículos premium. O objetivo é entender a necessidade, validar a aplicação e orientar a consulta com clareza." />
    <div className="service-audiences"><article><span>01</span><h4>Oficinas e centros automotivos</h4><p>Suporte especializado para a rotina de manutenção e reparação de veículos premium e importados.</p></article><article><span>02</span><h4>Lojistas e parceiros comerciais</h4><p>Atendimento voltado ao mercado de reposição, com consulta de aplicações e fabricantes disponíveis.</p></article><article><span>03</span><h4>Proprietários de veículos premium</h4><p>Orientação para identificar a linha, o componente e o canal de atendimento mais adequados.</p></article></div>
    <div className="subsection-heading"><Eyebrow>COMO FUNCIONA</Eyebrow><h4>Um atendimento orientado<br />por informação e confiança.</h4></div>
    <div className="service-steps">{serviceSteps.map(step => <article key={step.number}><span>{step.number}</span><div><h5>{step.title}</h5><p>{step.text}</p></div></article>)}</div>
    <aside className="chassis-note"><strong>Tenha as informações do veículo em mãos.</strong><span>Marca · modelo · ano · motorização · código da peça, se disponível · chassi completo, quando necessário.</span></aside>
    <div className="subsection-heading"><Eyebrow>DÚVIDAS FREQUENTES</Eyebrow><h4>Informações importantes<br />antes de falar com a <em>equipe.</em></h4></div>
    <div className="faq-list">{commonQuestions.map(item => <details className="faq-item" key={item.question}><summary>{item.question}<span>+</span></summary><p>{item.answer}</p></details>)}</div>
    <div className="after-sales"><span>RELACIONAMENTO E PÓS-VENDA</span><h5>A conversa não termina<br />quando o pedido é confirmado.</h5><p>Nosso compromisso inclui orientar o cliente durante o processo comercial e apoiar questões relacionadas à garantia, ao direcionamento correto e ao relacionamento com a unidade responsável.</p></div>
    <div className="contact-card"><Eyebrow light>CONTATO STÄRKE PARTS</Eyebrow><h4>Vamos encontrar<br />a solução <em>certa.</em></h4><p>Entre em contato pelo nosso perfil oficial e solicite o direcionamento para um especialista ou para a unidade mais adequada.</p><a className="button button--yellow" href={INSTAGRAM} target="_blank" rel="noreferrer">Falar com a Stärke Parts <span>↗</span></a><span className="contact-handle">@starkepremiumparts</span></div>
  </>;
}

function HomeLanding({ scrolled }: { scrolled: boolean }) {
  const specialties = [
    { href: "/produtos", image: "/autoparts-brakes.webp", number: "01", title: "Portfólio premium", text: "Freios, suspensão, motor, filtragem e sistemas técnicos para aplicações exigentes." },
    { href: "/montadoras", image: "/autoparts-editorial.webp", number: "02", title: "Aplicações", text: "Atendimento especializado para veículos importados, premium e superesportivos." },
    { href: "/fabricantes", image: "/autoparts-filters.webp", number: "03", title: "Fabricantes globais", text: "Marcas reconhecidas e procedência para escolhas mais seguras em cada reparação." },
  ];

  return <main id="topo" className="landing">
    <header className={`masthead ${scrolled ? "masthead--scrolled" : ""}`}>
      <Link className="wordmark" href="/" aria-label="Stärke Parts, início"><span>STÄRKE</span><b>PARTS</b></Link>
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

    <footer className="footer"><Link className="wordmark" href="/"><span>STÄRKE</span><b>PARTS</b></Link><span>Oferecemos peças. Entregamos confiança.</span><a href={INSTAGRAM} target="_blank" rel="noreferrer">@starkepremiumparts ↗</a></footer>
  </main>;
}

export function StarkePage({ initialSection = "institucional", showSplash = false }: { initialSection?: TabId; showSplash?: boolean }) {
  const [active, setActive] = useState<TabId>(initialSection);
  const [scrolled, setScrolled] = useState(false);
  const [splashDone, setSplashDone] = useState(!showSplash);
  const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number }>({ left: 0, width: 0 });
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const tabListRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleSplashComplete = useCallback(() => {
    sessionStorage.setItem("starke-welcome-seen", "true");
    setSplashDone(true);
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
        document.getElementById("explore")?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }

  function onTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === "Home" ? 0 : event.key === "End" ? tabs.length - 1 : (index + (event.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
    changeTab(tabs[next].id, false);
    tabRefs.current[next]?.focus();
  }

  const onContact = () => changeTab("atendimento");

  return <>
    {showSplash && !splashDone && <SplashScreen onComplete={handleSplashComplete} />}
    <main id="topo" className={splashDone ? "" : "main--hidden"}>
    <header className={`masthead ${scrolled ? "masthead--scrolled" : ""}`}><a className="wordmark" href="#topo" aria-label="Stärke Parts, voltar ao início"><span>STÄRKE</span><b>PARTS</b></a><nav className="desktop-nav" aria-label="Navegação principal"><button onClick={() => changeTab("institucional")}>A empresa</button><button onClick={() => changeTab("aplicacoes")}>Montadoras</button><button onClick={() => changeTab("produtos")}>Portfólio</button><button onClick={() => changeTab("estrutura")}>Unidades</button></nav><button className="header-cta" onClick={onContact}>Falar com especialista <span>↗</span></button></header>
    <section className="hero" aria-labelledby="hero-title"><div className="hero-photo" aria-hidden="true" /><div className="hero-content"><Eyebrow light>PREMIUM AUTOMOTIVE PARTS · BRASIL</Eyebrow><h1 id="hero-title">A excelência<br />começa <em>na peça certa.</em></h1><p className="hero-description">Desde 2016, conectamos fabricantes reconhecidos, autopeças premium e conhecimento técnico para entregar confiança em cada aplicação.</p><div className="hero-actions"><button className="button button--yellow" onClick={() => changeTab("produtos")}>Explorar o portfólio <span>→</span></button><button className="button button--quiet" onClick={() => changeTab("institucional")}>Conheça a Stärke <span>↓</span></button></div></div><div className="hero-meta"><span>SÃO PAULO · SOROCABA · CAMPINAS · SANTOS</span><span>EST. 2016</span></div></section>
    <section className="ticker" aria-label="Montadoras atendidas"><div className="ticker-track">{[...vehicleBrands, ...vehicleBrands].map((item, index) => <span key={`${item.name}-${index}`}>{item.name.toUpperCase()}<b>✳</b></span>)}</div></section>
    <section className="experience" id="explore" aria-labelledby="explore-heading"><div className="section-intro"><Eyebrow>EXPLORE A STÄRKE</Eyebrow><h2 id="explore-heading">Conheça cada dimensão<br />da nossa <em>especialidade.</em></h2><p>Selecione uma área para conhecer nossa história, aplicações, fabricantes, estrutura e tudo o que torna a Stärke uma referência em autopeças premium.</p></div><div className="tab-list" ref={tabListRef} role="tablist" aria-label="Áreas da Stärke Parts"><motion.div className="tab-indicator" layoutId="tab-indicator" transition={{ type: "spring", stiffness: 420, damping: 32 }} style={{ left: indicatorStyle.left, width: indicatorStyle.width }} /><motion.span className="tab-droplet" layoutId="tab-droplet" transition={{ type: "spring", stiffness: 420, damping: 32 }} style={{ left: indicatorStyle.left + indicatorStyle.width / 2 }} />{tabs.map((tab, index) => <motion.button key={tab.id} ref={element => { tabRefs.current[index] = element; }} id={`tab-${tab.id}`} className={`tab ${active === tab.id ? "tab--active" : ""}`} role="tab" aria-selected={active === tab.id} aria-controls={`panel-${tab.id}`} tabIndex={active === tab.id ? 0 : -1} onClick={() => changeTab(tab.id, false)} onKeyDown={event => onTabKeyDown(event, index)} whileHover={{ color: "#11110f" }} whileTap={{ scale: .95 }} transition={{ type: "spring", stiffness: 500, damping: 25 }}><span>{tab.number}</span>{tab.label}</motion.button>)}</div><AnimatePresence mode="wait"><motion.article key={active} className="tab-panel" role="tabpanel" id={`panel-${active}`} aria-labelledby={`tab-${active}`} tabIndex={0} initial={{ opacity: 0, y: 20, filter: "blur(4px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: -12, filter: "blur(2px)" }} transition={{ duration: .35, ease: [.4, 0, .15, 1] }}>{active === "institucional" && <InstitutionalPanel onContact={onContact} />}{active === "aplicacoes" && <ApplicationsPanel onContact={onContact} />}{active === "produtos" && <ProductsPanel onContact={onContact} />}{active === "fabricantes" && <ManufacturersPanel onContact={onContact} />}{active === "estrutura" && <StructurePanel onContact={onContact} />}{active === "logistica" && <LogisticsPanel onContact={onContact} />}{active === "atendimento" && <ServicePanel />}</motion.article></AnimatePresence></section>
    <section className="closing-statement"><Eyebrow light>STÄRKE PARTS · PREMIUM AUTOMOTIVE</Eyebrow><h2>Potência em qualidade.<br /><em>Excelência em cada detalhe.</em></h2><button className="button button--yellow" onClick={onContact}>Fale com um especialista <span>↗</span></button></section>
    <footer className="footer"><a className="wordmark" href="#topo"><span>STÄRKE</span><b>PARTS</b></a><span>Oferecemos peças. Entregamos confiança.</span><a href={INSTAGRAM} target="_blank" rel="noreferrer">@starkepremiumparts ↗</a></footer>
  </main>
  </>;
}

export default function Home() {
  return <StarkePage showSplash />;
}
