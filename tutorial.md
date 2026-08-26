# Tutorial Completo: Modificando o Site Starke Parts

Guia passo a passo para alterar qualquer elemento do site. Cada seção explica **onde** está o código e **como** alterar.

---

## Sumário

1. [Estrutura do Projeto](#1-estrutura-do-projeto)
2. [Design Tokens (Cores, Tipografia, Espaçamentos)](#2-design-tokens)
3. [Alterar Cores](#3-alterar-cores)
4. [Alterar Tipografia](#4-alterar-tipografia)
5. [Alterar Textos e Conteúdo](#5-alterar-textos-e-conteúdo)
6. [Alterar Imagens](#6-alterar-imagens)
7. [Alterar Layout e Espaçamentos](#7-alterar-layout-e-espaçamentos)
8. [Alterar Seções Específicas](#8-alterar-seções-específicas)
9. [Alterar Navegação e Links](#9-alterar-navegação-e-links)
10. [Design Responsivo](#10-design-responsivo)
11. [Referência Rápida: Onde Editar Cada Coisa](#11-referência-rápida)
12. [Editando o Site no Figma — Guia Passo a Passo](#12-editando-o-site-no-figma--guia-passo-a-passo)

---

## 1. Estrutura do Projeto

```
starkepage/
├── app/
│   ├── globals.css          ← Tokens de design + estilos base
│   ├── expanded.css         ← Estilos de todas as seções
│   ├── page.tsx             ← Componente principal (dados + JSX)
│   ├── layout.tsx           ← Layout raiz (HTML, metadata)
│   ├── empresa/page.tsx     ← Rota /empresa
│   ├── montadoras/page.tsx  ← Rota /montadoras
│   ├── produtos/page.tsx    ← Rota /produtos
│   ├── fabricantes/page.tsx ← Rota /fabricantes
│   ├── unidades/page.tsx    ← Rota /unidades
│   ├── logistica/page.tsx   ← Rota /logistica
│   └── atendimento/page.tsx ← Rota /atendimento
├── public/
│   ├── autoparts-hero.webp      ← Imagem hero
│   ├── autoparts-brakes.webp    ← Imagem freios
│   ├── autoparts-editorial.webp ← Imagem editorial
│   ├── autoparts-filters.webp   ← Imagem filtros
│   ├── autoparts-suspension.webp← Imagem suspensão
│   ├── og.png                   ← Imagem Open Graph
│   └── favicon.svg              ← Favicon
└── tutorial.md              ← Este arquivo
```

**Arquivos-chave:**
- `globals.css` → Tokens de design (cores, fontes, variáveis CSS)
- `expanded.css` → Estilos visuais de cada componente/seção
- `page.tsx` → Todo o conteúdo textual, dados e estrutura JSX
- `layout.tsx` → Metadata do site (título, descrição, OG image)

---

## 2. Design Tokens

Os tokens estão em `app/globals.css` (linhas 3-19) e `app/expanded.css` (linhas 1-5).

### Tokens de Cores

```css
:root {
  --yellow: #fccc2c;        /* Amarelo da marca (CTAs, destaques) */
  --black: #040404;         /* Preto principal */
  --deep: #040404;          /* Alias para --black */
  --red: #e42434;           /* Vermelho (acentos, números, indicadores) */
  --paper: #f7f6f2;         /* Fundo claro (off-white quente) */
  --ink: #11110f;           /* Texto principal */
  --muted: #777770;         /* Texto secundário */
  --border: rgba(4, 4, 4, .12);  /* Bordas e divisórias */
  --line: rgba(4, 4, 4, .12);    /* Alias para --border */
  --surface: #fff;          /* Fundo de cards (branco) */
  --surface-muted: #eeede8; /* Fundo de cards sutis */
}
```

### Tokens de Tipografia

```css
:root {
  font-family: Inter, "Helvetica Neue", "Arial Nova", Arial, sans-serif;
}
```

### Tokens de Layout

```css
/* Em expanded.css */
:root {
  --measure: 76ch;  /* Largura máxima de conteúdo para leitura */
}
```

### Tokens no Tailwind (pouco usado)

```css
/* Em globals.css */
@theme inline {
  --color-background: var(--paper);
  --color-foreground: var(--ink);
  --font-sans: "Helvetica Neue", "Arial Nova", Arial, sans-serif;
}
```

---

## 3. Alterar Cores

### 3.1 Alterar a Cor Principal (Amarelo da Marca)

**Arquivo:** `app/globals.css`, linha 4

```css
/* ANTES */
--yellow: #fccc2c;

/* DEPOIS - coloque sua cor */
--yellow: #FFD700;  /* Exemplo: dourado */
```

**Impacto:** Muda todos os botões amarelos, CTAs, destaques de texto, ticker bar, e barras de destaque.

### 3.2 Alterar o Vermelho de Acento

**Arquivo:** `app/globals.css`, linha 7

```css
/* ANTES */
--red: #e42434;

/* DEPOIS */
--red: #FF4444;  /* Vermelho mais claro */
```

**Impacto:** Muda indicadores numerados, bordas laterais, highlights de texto `<em>` em seções claras, splash screen divider.

### 3.3 Alterar o Fundo Claro

**Arquivo:** `app/globals.css`, linha 8

```css
/* ANTES */
--paper: #f7f6f2;

/* DEPOIS */
--paper: #FFFFFF;  /* Branco puro */
--paper: #F0F0F0;  /* Cinza claro */
```

**Impacto:** Muda o fundo de todo o site (seções claras).

### 3.4 Alterar o Texto Principal

**Arquivo:** `app/globals.css`, linha 9

```css
/* ANTES */
--ink: #11110f;

/* DEPOIS */
--ink: #333333;  /* Cinza escuro */
```

### 3.5 Alterar o Texto Secundário

**Arquivo:** `app/globals.css`, linha 10

```css
/* ANTES */
--muted: #777770;

/* DEPOIS */
--muted: #999999;  /* Cinza mais claro */
```

### 3.6 Alterar Bordas e Divisórias

**Arquivo:** `app/globals.css`, linha 11-12

```css
/* ANTES */
--border: rgba(4, 4, 4, .12);

/* DEPOIS */
--border: rgba(0, 0, 0, .08);  /* Mais sutil */
--border: rgba(0, 0, 0, .20);  /* Mais visível */
```

### 3.7 Alterar Fundo de Cards

**Arquivo:** `app/expanded.css`, linhas 2-3

```css
:root {
  --surface: #fff;           /* Cards brancos */
  --surface: #FAFAFA;        /* Cards com cinza sutil */
  --surface-muted: #eeede8;  /* Cards com fundo muted */
  --surface-muted: #F5F5F5;  /* Mais neutro */
}
```

---

## 4. Alterar Tipografia

### 4.1 Alterar a Fonte do Site

**Arquivo:** `app/globals.css`, linha 14

```css
/* ANTES */
font-family: Inter, "Helvetica Neue", "Arial Nova", Arial, sans-serif;

/* DEPOIS - usando Google Fonts (adicione no layout.tsx) */
font-family: "Poppins", "Helvetica Neue", Arial, sans-serif;
```

**Para usar Google Fonts**, adicione no `app/layout.tsx`:

```tsx
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
```

### 4.2 Alterar Tamanhos de Fonte

Os tamanhos usam `clamp()` para serem fluidos. Onde estão:

| Elemento | Arquivo | Linha | Valor Atual |
|----------|---------|-------|-------------|
| H1 Hero | globals.css | 53 | `clamp(65px, 8.6vw, 124px)` |
| H2 Seção | globals.css | 70 | `clamp(46px, 6.1vw, 88px)` |
| H3 Panel | expanded.css | 33 | `clamp(52px, 6.5vw, 92px)` |
| H4 Cards | expanded.css | 186 | `clamp(36px, 4.2vw, 61px)` |
| H5 Títulos | expanded.css | 289 | `clamp(27px, 3.2vw, 44px)` |
| Splash Logo | globals.css | 104 | `42px` |
| Landing H1 | expanded.css | 1248 | `clamp(68px, 9.5vw, 145px)` |

**Para alterar**, edite o valor em `clamp(minimo, preferido, maximo)`:

```css
/* ANTES */
.panel-heading h3 {
  font-size: clamp(52px, 6.5vw, 92px);
}

/* DEPOIS - maior */
.panel-heading h3 {
  font-size: clamp(56px, 7vw, 100px);
}
```

### 4.3 Alterar Espaçamento entre Letras (Letter Spacing)

```css
/* Texto mais aberto */
.hero h1 { letter-spacing: -.05em; }

/* Texto mais fechado (mais denso) */
.hero h1 { letter-spacing: -.10em; }

/* Labels e eyebrow (mais aberto) */
.eyebrow { letter-spacing: .16em; }
```

### 4.4 Alterar Peso da Fonte

```css
/* Títulos principais */
font-weight: 740;  /* Semi-bold plus */

/* Títulos de card */
font-weight: 730;

/* Texto de label */
font-weight: 780;

/* Texto normal */
font-weight: 620;
```

---

## 5. Alterar Textos e Conteúdo

### 5.1 Alterar o Título do Site

**Arquivo:** `app/layout.tsx`, linha 9

```tsx
// ANTES
title: "Stärke Parts — Premium Automotive",

// DEPOIS
title: "Seu Novo Título — Subtítulo",
```

### 5.2 Alterar a Descrição do Site

**Arquivo:** `app/layout.tsx`, linha 11

```tsx
description: "Sua nova descrição aqui.",
```

### 5.3 Alterar Textos do Hero (Página Inicial)

**Arquivo:** `app/page.tsx`, linha 410

```tsx
// Busque por: hero-content
<h1 id="hero-title">
  A excelência<br />
  começa <em>na peça certa.</em>
</h1>
<p className="hero-description">
  Desde 2016, conectamos fabricantes reconhecidos...
</p>
```

### 5.4 Alterar Textos da Landing Page

**Arquivo:** `app/page.tsx`, linha 336-366

```tsx
// Título principal da landing
<h1 id="landing-title">
  Engenharia exige<br />
  <em>a peça certa.</em>
</h1>

// Subtítulo
<p>Distribuição especializada, fabricantes globais...</p>

// Seção "Quem Somos"
<h2>Especialistas no universo<br />automotivo <em>premium.</em></h2>
```

### 5.5 Alterar as Abas (Navegação por Tabs)

**Arquivo:** `app/page.tsx`, linhas 7-15

```tsx
const tabs = [
  { id: "institucional", label: "A Stärke", number: "01" },
  { id: "aplicacoes", label: "Montadoras", number: "02" },
  { id: "produtos", label: "Produtos", number: "03" },
  { id: "fabricantes", label: "Fabricantes", number: "04" },
  { id: "estrutura", label: "Estrutura", number: "05" },
  { id: "logistica", label: "Logística", number: "06" },
  { id: "atendimento", label: "Atendimento", number: "07" },
];
```

Para **adicionar uma nova aba**, adicione um objeto no array e crie o componente correspondente.

### 5.6 Alterar Marcas de Veículos (Montadoras)

**Arquivo:** `app/page.tsx`, linhas 29-41

```tsx
const vehicleBrands = [
  {
    name: "Porsche",           // Nome da marca
    territory: "STUTTGART · ALEMANHA",  // Localização
    focus: "Precisão esportiva",        // Foco
    text: "Componentes para as linhas 911...", // Descrição
    image: "/autoparts-brakes.webp"     // Imagem
  },
  // ... mais marcas
];
```

### 5.7 Alterar Produtos

**Arquivo:** `app/page.tsx`, linhas 43-54

```tsx
const productLines = [
  {
    number: "01",          // Número do card
    family: "SEGURANÇA",   // Categoria
    title: "Freios",       // Título
    text: "Precisão e confiança...",  // Descrição
    items: ["Discos de freio", "Pastilhas", ...]  // Lista
  },
  // ... mais produtos
];
```

### 5.8 Alterar Fabricantes/Parceiros

**Arquivo:** `app/page.tsx`, linhas 56-64

```tsx
const supplierGroups = [
  {
    title: "Bilstein Group",           // Nome do grupo
    brands: ["febi", "SWAG", ...],    // Marcas
    category: "AFTERMARKET PREMIUM",   // Categoria
    description: "Portfólio de componentes..." // Descrição
  },
  // ... mais grupos
];
```

### 5.9 Alterar Locais/Unidades

**Arquivo:** `app/page.tsx`, linhas 66-71

```tsx
const locations = [
  {
    code: "SP·01",           // Código
    city: "São Paulo",       // Cidade
    type: "MATRIZ",          // Tipo
    area: "Chácara Santo Antônio",  // Bairro/Região
    description: "Nossa operação central...",  // Descrição
    capabilities: ["Atendimento especializado", ...]  // Capacidades
  },
  // ... mais locais
];
```

### 5.10 Alterar Perguntas Frequentes (FAQ)

**Arquivo:** `app/page.tsx`, linhas 155-162

```tsx
const commonQuestions = [
  {
    question: "A Stärke Parts atende somente oficinas?",
    answer: "Não. Atendemos oficinas, centros automotivos..."
  },
  // ... mais perguntas
];
```

### 5.11 Alterar Números/Métricas

**Arquivo:** `app/page.tsx`, linha 241

```tsx
// Métricas na seção institucional
<div className="metric-grid">
  <div><strong>2016</strong><span>O início da nossa história</span></div>
  <div><strong>04</strong><span>Operações estratégicas</span></div>
  <div><strong>11</strong><span>Montadoras premium</span></div>
  <div><strong>BR</strong><span>Atendimento nacional</span></div>
</div>
```

### 5.12 Alterar o Ticker Bar (Faixa Amarela)

**Arquivo:** `app/page.tsx`, linha 411

O ticker mostra as montadoras automaticamente a partir do array `vehicleBrands`. Para adicionar um texto manual, edite:

```tsx
<section className="ticker">
  <div className="ticker-track">
    {[...vehicleBrands, ...vehicleBrands].map((item, index) => (
      <span key={`${item.name}-${index}`}>
        {item.name.toUpperCase()}
        <b>✳</b>
      </span>
    ))}
  </div>
</section>
```

---

## 6. Alterar Imagens

### 6.1 Substituir Imagens

Todas as imagens ficam na pasta `public/`. Para trocar:

1. Coloque sua nova imagem em `public/` (use o mesmo nome ou mude o path no código)
2. Formatos aceitos: `.webp` (recomendado), `.png`, `.jpg`

| Imagem Atual | Onde é Usada | Arquivo no Código |
|---|---|---|
| `autoparts-hero.webp` | Hero section | `globals.css:47`, `expanded.css:1246` |
| `autoparts-brakes.webp` | Cards de produtos, brands | `page.tsx` nos arrays `vehicleBrands` e `specialties` |
| `autoparts-editorial.webp` | Seção editorial, product spotlight | `expanded.css:158`, `expanded.css:818` |
| `autoparts-filters.webp` | Cards de produtos, brands | `page.tsx` nos arrays |
| `autoparts-suspension.webp` | Cards, landing CTA | `page.tsx`, `expanded.css:1275` |
| `og.png` | Open Graph (redes sociais) | `layout.tsx:19` |
| `favicon.svg` | Ícone do navegador | `layout.tsx:34` |

### 6.2 Alterar Imagem do Hero

**Arquivo:** `app/globals.css`, linha 47

```css
.hero-photo {
  /* Troque o path da imagem */
  background-image: linear-gradient(90deg, ...), url("/sua-nova-imagem.webp");
}
```

### 6.3 Alterar Imagem da Landing

**Arquivo:** `app/expanded.css`, linha 1246

```css
.landing-hero__photo {
  background: linear-gradient(180deg, ...), 
    linear-gradient(90deg, ...), 
    url("/sua-nova-imagem.webp") center 48% / cover;
}
```

### 6.4 Alterar Imagens dos Cards de Marcas

**Arquivo:** `app/page.tsx`, no array `vehicleBrands`

```tsx
{
  name: "Porsche",
  image: "/sua-imagem-porsche.webp"  // Substitua aqui
}
```

---

## 7. Alterar Layout e Espaçamentos

### 7.1 Largura Máxima do Conteúdo

**Arquivo:** `app/expanded.css`, linha 4

```css
:root {
  --measure: 76ch;  /* Largura máxima para texto */
  --measure: 68ch;  /* Mais estreito */
  --measure: 85ch;  /* Mais largo */
}
```

### 7.2 Espaçamento entre Seções

Os espaçamentos verticais estão em `expanded.css`. Princípio geral:

```css
/* Seção com muito espaço */
.subsection-heading {
  margin: 105px 0 49px;
}

/* Card com padding interno */
.product-card,
.supplier-card {
  padding: 31px;
}

/* Grid com gap */
.product-grid {
  gap: 18px;
}
```

### 7.3 Grid de Cards (Produtos, Fabricantes)

**Arquivo:** `app/expanded.css`, linhas 800-805

```css
.product-grid,
.supplier-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));  /* 3 colunas */
  gap: 18px;
}

/* Para 2 colunas */
grid-template-columns: repeat(2, minmax(0, 1fr));

/* Para 4 colunas */
grid-template-columns: repeat(4, minmax(0, 1fr));
```

### 7.4 Grid de Localizações

**Arquivo:** `app/expanded.css`, linhas 959-965

```css
.locations-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 19px;
}
```

### 7.5 Altura Mínima de Cards

```css
/* Card de produto */
.product-card { min-height: 265px; }

/* Card de localização */
.location-card { min-height: 410px; }

/* Card de logística */
.logistics-card { min-height: 350px; }
```

### 7.6 Seção Hero - Altura

**Arquivo:** `app/globals.css`, linha 46

```css
.hero {
  min-height: 760px;
  height: 100svh;     /* 100% da viewport */
  max-height: 980px;
}
```

---

## 8. Alterar Seções Específicas

### 8.1 Splash Screen (Tela Inicial)

**Arquivo:** `app/page.tsx`, linhas 171-194

```tsx
function SplashScreen({ onComplete }) {
  // Para mudar o texto:
  <div className="splash-logo">
    <span>STÄRKE</span>
    <b>PARTS</b>
  </div>
  <p className="splash-tagline">Bem-vindo à Stärke</p>
  <p className="splash-sub">Premium Automotive Parts</p>
}
```

**Para desabilitar o splash**, mude em `app/page.tsx`, linha 420:

```tsx
// ANTES
export default function Home() {
  return <StarkePage showSplash />;
}

// DEPOIS - splash desabilitado
export default function Home() {
  return <StarkePage />;
}
```

### 8.2 Header/Masthead

**Arquivo:** `app/globals.css`, linhas 35-44

```css
.masthead {
  height: 86px;        /* Altura do header */
  padding: 0 max(6.2vw, 28px);  /* Padding horizontal */
}

.wordmark {
  font-size: 18px;     /* Tamanho do logo texto */
  font-weight: 850;
  letter-spacing: .08em;
}

.header-cta {
  padding: 13px 16px;
  background: var(--yellow);
  color: var(--black);
  font-size: 11px;
  font-weight: 750;
}
```

### 8.3 Footer

**Arquivo:** `app/globals.css`, linha 83

```css
.footer {
  display: flex;
  min-height: 120px;
  align-items: center;
  justify-content: space-between;
  padding: 28px max(8vw, 34px);
  background: var(--black);
  color: #fff;
}
```

Para mudar o texto do footer, edite em `app/page.tsx`, linha 414:

```tsx
<footer className="footer">
  <a className="wordmark" href="#topo">
    <span>STÄRKE</span><b>PARTS</b>
  </a>
  <span>Oferecemos peças. Entregamos confiança.</span>
  <a href={INSTAGRAM} target="_blank" rel="noreferrer">
    @starkepremiumparts ↗
  </a>
</footer>
```

### 8.4 Seção de Contato

**Arquivo:** `app/page.tsx`, linha 332

```tsx
<div className="contact-card">
  <Eyebrow light>CONTATO STÄRKE PARTS</Eyebrow>
  <h4>Vamos encontrar<br />a solução <em>certa.</em></h4>
  <p>Entre em contato pelo nosso perfil oficial...</p>
  <a className="button button--yellow" href={INSTAGRAM} target="_blank">
    Falar com a Stärke Parts <span>↗</span>
  </a>
  <span className="contact-handle">@starkepremiumparts</span>
</div>
```

### 8.5 Seção "Closing Statement" (Final)

**Arquivo:** `app/page.tsx`, linha 413

```tsx
<section className="closing-statement">
  <Eyebrow light>STÄRKE PARTS · PREMIUM AUTOMOTIVE</Eyebrow>
  <h2>Potência em qualidade.<br /><em>Excelência em cada detalhe.</em></h2>
  <button className="button button--yellow" onClick={onContact}>
    Fale com um especialista <span>↗</span>
  </button>
</section>
```

---

## 9. Alterar Navegação e Links

### 9.1 Link do Instagram

**Arquivo:** `app/page.tsx`, linha 5

```tsx
const INSTAGRAM = "https://www.instagram.com/starkepremiumparts/";

// Para mudar para outro link:
const INSTAGRAM = "https://www.seusite.com.br/";
```

### 9.2 Rotas do Site

**Arquivo:** `app/page.tsx`, linhas 19-27

```tsx
const routes: Record<TabId, string> = {
  institucional: "/empresa",
  aplicacoes: "/montadoras",
  produtos: "/produtos",
  fabricantes: "/fabricantes",
  estrutura: "/unidades",
  logistica: "/logistica",
  atendimento: "/atendimento",
};
```

### 9.3 Links da Navegação Desktop

**Arquivo:** `app/page.tsx`, linha 409

```tsx
<nav className="desktop-nav">
  <button onClick={() => changeTab("institucional")}>A empresa</button>
  <button onClick={() => changeTab("aplicacoes")}>Montadoras</button>
  <button onClick={() => changeTab("produtos")}>Portfólio</button>
  <button onClick={() => changeTab("estrutura")}>Unidades</button>
</nav>
```

### 9.4 Link do Open Graph

**Arquivo:** `app/layout.tsx`, linha 5

```tsx
const siteOrigin = new URL("https://starke-parts-premium.wiildias.chatgpt.site");

// Mude para seu domínio:
const siteOrigin = new URL("https://seudominio.com.br");
```

---

## 10. Design Responsivo

### Breakpoints Usados

| Breakpoint | Onde está | O que muda |
|---|---|---|
| `1120px` | `expanded.css:1126` | Grids mudam de 3 para 2 colunas |
| `1020px` | `globals.css:112` | Navegação desktop diminui |
| `900px` | `expanded.css:1280` | Landing page cards viram 1 coluna |
| `760px` | `globals.css:117`, `expanded.css:1135` | Mobile: nav some, grids viram 1-2 colunas |
| `460px` | `expanded.css:1233` | Mobile pequeno: tudo em 1 coluna |

### Como Testar Responsivo

1. No navegador, pressione `F12` (DevTools)
2. Clique no ícone de dispositivo (tablet/celular)
3. Teste em: `375px` (iPhone), `768px` (iPad), `1024px` (laptop), `1440px` (desktop)

### Para Alterar Comportamento Mobile

**Exemplo:** Em `expanded.css`, para mudar grids no mobile:

```css
@media (max-width: 760px) {
  .product-grid {
    grid-template-columns: 1fr;  /* 1 coluna no mobile */
  }
}
```

---

## 11. Referência Rápida

### Onde Editar Cada Coisa

| O que quer mudar | Arquivo | Linha(s) |
|---|---|---|
| **Cores do site** | `globals.css` | 4-12 |
| **Fonte do site** | `globals.css` | 14 |
| **Títulos (tamanhos)** | `globals.css` + `expanded.css` | Busque por `font-size: clamp` |
| **Textos (conteúdo)** | `page.tsx` | Busque pelo texto que quer mudar |
| **Imagens** | `public/` + `page.tsx` + CSS | `page.tsx` nos arrays, CSS nos `url()` |
| **Links externos** | `page.tsx` | Linha 5 (`INSTAGRAM`) |
| **Nomes das abas** | `page.tsx` | Linhas 7-15 (`tabs`) |
| **Marcas de veículos** | `page.tsx` | Linhas 29-41 (`vehicleBrands`) |
| **Produtos** | `page.tsx` | Linhas 43-54 (`productLines`) |
| **Fabricantes** | `page.tsx` | Linhas 56-64 (`supplierGroups`) |
| **Locais** | `page.tsx` | Linhas 66-71 (`locations`) |
| **FAQ** | `page.tsx` | Linhas 155-162 (`commonQuestions`) |
| **Navegação do header** | `page.tsx` | Linha 409 |
| **Footer** | `page.tsx` | Linha 414 |
| **Metadata (SEO)** | `layout.tsx` | Linhas 7-40 |
| **Splash screen** | `page.tsx` | Linhas 171-194 |
| **Animações** | `globals.css` | Linhas 87-92 |
| **Espaçamentos gerais** | `expanded.css` | Busque por `margin`, `padding`, `gap` |
| **Layout dos grids** | `expanded.css` | Busque por `grid-template-columns` |
| **Responsivo** | `globals.css` + `expanded.css` | Busque por `@media` |

### Fluxo de Trabalho Recomendado

1. **Abra o Figma** e identifique o que quer mudar
2. **Anote** a cor, fonte, tamanho, espaçamento
3. **Encontre** o local correto usando a tabela acima
4. **Faça a alteração** no arquivo correto
5. **Execute** `npm run dev` para ver as mudanças ao vivo
6. **Teste** em diferentes tamanhos de tela

### Comandos Úteis

```bash
# Rodar o site localmente
npm run dev

# Build de produção
npm run build

# Verificar erros
npm run lint

# Gerar migrations do banco (se necessário)
npm run db:generate
```

### Dicas Importantes

- **Nunca** edite `node_modules/`
- **Sempre** salve e veja o resultado no navegador antes de continuar
- **Use** `clamp()` para tamanhos de fonte — faz o site ser responsivo automaticamente
- **Cores com alpha** (como `rgba(4, 4, 4, .12)`) controlam a transparência
- **`var(--nome)`** pega o valor de um token — se mudar o token, tudo atualiza
- **`<em>`** nos títulos aplica a cor de destaque (amarelo ou vermelho dependendo do contexto)
- **Imagens em `.webp`** são menores e carregam mais rápido

---

## 12. Editando o Site no Figma — Guia Passo a Passo

### Pré-requisito

1. Crie uma conta gratuita no [figma.com](https://figma.com)
2. Instale o app desktop (mais rápido que o navegador)

---

### PASSO 1: Importar o Site para o Figma

1. **Rode o site:**
   ```bash
   npm run dev
   ```
   Anote a porta (ex: `http://localhost:5173`)

2. **Abra o Figma** → crie um arquivo novo → nomeie "Starke Parts Edição"

3. **Instale o plugin "HTML to Figma":**
   - No Figma, aperte `/` (barra) → digite "html to figma" → Enter
   - Clique em **"Run"** (ou instale primeiro se pedir)
   - Uma janela flutuante aparece

4. **Cole a URL** do site (`http://localhost:5173`) no campo do plugin

5. **Importe seção por seção** (IMPORTANTE — senão fica bagunçado):
   - Abra o site no navegador e faça scroll até a **Hero** ( topo)
   - Volte no Figma → clique **"Capture"** no plugin
   - Volte no navegador → scroll até a **Ticker** (faixa amarela)
   - Volte no Figma → **"Capture"** de novo
   - Repita para cada seção

**Seções para capturar (em ordem):**

| # | Seção | O que capturar |
|---|---|---|
| 1 | Header | Barra de navegação no topo |
| 2 | Hero | Área principal com título grande |
| 3 | Ticker | Faixa amarela com nomes das montadoras |
| 4 | Tabs + Conteúdo | Abas (A Stärke, Montadoras, etc.) + painel aberto |
| 5 | Closing | Seção final preta com CTA |
| 6 | Footer | Rodapé |

> Se quiser capturar as **sub-páginas** (produtos, fabricantes, etc.), abra cada rota no navegador e capture separadamente.

---

### PASSO 2: Organizar no Figma

Depois de importar, você vai ter vários frames no Figma. Organize assim:

1. **Renomeie cada frame** clicando duas vezes no nome na camada lateral esquerda
2. **Agrupe por página** — crie um frame "Desktop" e coloque tudo dentro
3. **Crie uma página "Tokens"** para guardar cores, fontes e espaçamentos de referência

---

### PASSO 3: Editar Componentes no Figma

Agora que está tudo no Figma, você pode editar livremente:

#### Como Trocar Cores

1. Clique no elemento (botão, fundo, card, etc.)
2. No painel direito → seção **"Fill"** (preenchimento)
3. Clique na cor → escolha uma nova
4. Anote o código hex (ex: `#3B82F6`) para usar no código

#### Como Trocar Fontes

1. Clique no texto
2. No painel direito → seção **"Text"**
3. Mude a **fonte**, **tamanho**, **peso** (bold/regular), **letter-spacing**
4. Anote os valores para usar no código

#### Como Trocar Espaçamentos

1. Clique no elemento
2. No painel direito → seção **"Auto Layout"** ou **"Layout"**
3. Ajuste **padding** (espaço interno) e **gap** (espaço entre itens)

#### Como Trocar Largura/Altura

1. Clique no elemento
2. No painel direito → ajuste **W** (largura) e **H** (altura)

#### Como Trocar Bordas

1. Clique no elemento
2. No painel direito → seção **"Stroke"**
3. Mude cor, espessura e `border-radius`

---

### PASSO 4: Pegar os Valores do Figma e Aplicar no Código

Depois de editar no Figma, você precisa transferir os valores para o código. Tem 3 formas:

#### Forma A: Dev Mode (Mais Rápida)

1. No Figma, ative o **Dev Mode** → ícone de chave inglesa (canto superior direito)
2. Clique no elemento que você editou
3. O painel mostra o **CSS exato**:

```
background: #3B82F6;
font-size: 72px;
font-weight: 700;
padding: 24px 32px;
border-radius: 8px;
```

4. **Copie** e cole no arquivo correto do projeto

#### Forma B: Plugin "Locofy Lightning"

1. Instale "Locofy Lightning" no Figma
2. Selecione o frame editado
3. Botão direito → **Locofy > Export code**
4. Escolha **HTML/CSS** ou **React**
5. Copie o código gerado

#### Forma C: Manual (Mais Controle)

1. No Figma, selecione o elemento
2. Anote os valores do painel direito:
   - Cor: `#3B82F6`
   - Font-size: `72px`
   - Font-weight: `700`
   - Padding: `24px 32px`
3. Abra o arquivo CSS correspondente no VS Code
4. Altere manualmente

---

### PASSO 5: Mapeamento Completo — Qual Componente Editar no Figma → Qual Arquivo no Código

Use esta tabela para saber onde colar cada mudança:

| Componente no Figma | Classe CSS no Código | Arquivo |
|---|---|---|
| **Header/Nav** | `.masthead`, `.wordmark`, `.desktop-nav`, `.header-cta` | `globals.css` |
| **Hero** | `.hero`, `.hero-photo`, `.hero-content`, `.hero h1` | `globals.css` |
| **Ticker (faixa amarela)** | `.ticker`, `.ticker-track` | `globals.css` |
| **Abas** | `.tab-list`, `.tab`, `.tab--active` | `globals.css` |
| **Título da seção** | `.section-intro h2`, `.panel-heading h3` | `globals.css` + `expanded.css` |
| **Cards de produto** | `.product-card`, `.product-card-top` | `expanded.css` |
| **Cards de fabricante** | `.supplier-card`, `.supplier-card--featured` | `expanded.css` |
| **Cards de localização** | `.location-card` | `expanded.css` |
| **Cards de logística** | `.logistics-card`, `.logistics-card--highlight` | `expanded.css` |
| **Cards de marca (explorer)** | `.brand-explorer`, `.brand-feature` | `expanded.css` |
| **FAQ** | `.faq-item` | `expanded.css` |
| **Botão amarelo** | `.button--yellow` | `globals.css` |
| **Texto link** | `.text-link` | `globals.css` |
| **Footer** | `.footer` | `globals.css` |
| **Splash screen** | `.splash`, `.splash-logo` | `globals.css` |
| **Seção preta (CTA)** | `.closing-statement` | `expanded.css` |
| **Grid de métricas** | `.metric-grid` | `expanded.css` |
| **Landing page** | `.landing-hero`, `.landing-intro`, `.landing-specialties`, etc. | `expanded.css` (final) |

---

### PASSO 6: Exemplo Prático Completo

**Cenário: Quero mudar o hero para fundo azul escuro com título branco maior**

**No Figma:**
1. Selecione o frame do Hero
2. Mude o fundo de `#0a0a09` para `#0F172A`
3. Selecione o título → mude `font-size` de `124px` para `140px`
4. Anote os valores

**No código:**

`globals.css`, linha 46:
```css
/* ANTES */
.hero { background: #0a0a09; }

/* DEPOIS */
.hero { background: #0F172A; }
```

`globals.css`, linha 53:
```css
/* ANTES */
.hero h1 { font-size: clamp(65px, 8.6vw, 124px); }

/* DEPOIS */
.hero h1 { font-size: clamp(65px, 8.6vw, 140px); }
```

---

### PASSO 7: Editar Cores Globais (Afeta Tudo de Uma Vez)

Se você mudar as **variáveis CSS**, todos os elementos que usam aquela cor atualizam automaticamente:

**No Figma:** Descubra qual cor você quer usar (ex: `#6366F1` para roxo)

**No código** (`globals.css`, linhas 4-12):
```css
:root {
  --yellow: #6366F1;   /* Muda TODOS os botões e destaques */
  --red: #EF4444;      /* Muda TODOS os indicadores e accents */
  --paper: #F8FAFC;    /* Muda TODOS os fundos claros */
  --ink: #1E293B;      /* Muda TODO o texto principal */
  --muted: #94A3B8;    /* Muda TODO o texto secundário */
  --surface: #FFFFFF;  /* Muda TODOS os cards brancos */
}
```

---

### Resumo Visual do Workflow

```
┌─────────────────────────────────────────────┐
│  1. npm run dev (roda o site)               │
└──────────────────┬──────────────────────────┘
                   ▼
┌─────────────────────────────────────────────┐
│  2. Abrir Figma → Plugin "HTML to Figma"   │
│     → Colar URL → Capture por seção        │
└──────────────────┬──────────────────────────┘
                   ▼
┌─────────────────────────────────────────────┐
│  3. Editar visualmente no Figma:           │
│     - Cores (Fill)                         │
│     - Fontes (Text)                        │
│     - Espaçamentos (Auto Layout)           │
│     - Bordas (Stroke)                      │
│     - Tamanhos (W/H)                       │
└──────────────────┬──────────────────────────┘
                   ▼
┌─────────────────────────────────────────────┐
│  4. Ativar Dev Mode (chave inglesa)        │
│     → Clicar no elemento                   │
│     → Copiar o CSS mostrado                │
└──────────────────┬──────────────────────────┘
                   ▼
┌─────────────────────────────────────────────┐
│  5. Colar no arquivo correto:              │
│     - globals.css (cores, header, hero)    │
│     - expanded.css (cards, seções, grids)  │
│     - page.tsx (textos, dados)             │
└──────────────────┬──────────────────────────┘
                   ▼
┌─────────────────────────────────────────────┐
│  6. Salvar → site atualiza automaticamente │
└─────────────────────────────────────────────┘
```

### Dicas Finais

- **Capture seção por seção** — senão o Figma fica confuso com tudo junto
- **Renomeie os frames** no Figma pra facilitar achar cada coisa
- **Use a página "Tokens"** no Figma pra guardar as cores/fontes oficiais
- **Salve frequentemente** no Figma (Ctrl+S)
- **Teste no navegador** depois de cada mudança no código
- **Imagens** precisam ser trocadas manualmente na pasta `public/`
- **Textos** (conteúdo das frases) são editados no `page.tsx`, não no CSS
