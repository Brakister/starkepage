import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import "./expanded.css";
import { StarfieldBackground } from "./starfield";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-site",
  display: "swap",
  preload: true,
});

const siteOrigin = new URL("https://starkeparts.com");
const ogImage = new URL("/og.png", siteOrigin).toString();
const logo = new URL("/starke-parts-logo.png", siteOrigin).toString();

export const metadata: Metadata = {
  metadataBase: siteOrigin,
  title: {
    default: "Stärke Parts — Distribuidora de Autopeças Premium no Brasil",
    template: "%s · Stärke Parts",
  },
  description:
    "Desde 2016, a Stärke Parts distribui autopeças premium e originais para veículos importados e de alta performance. Freios, suspensão, motor e filtragem das melhores marcas: Brembo, Bosch, TRW, febi, MAHLE e mais. Atendimento especializado em São Paulo, Sorocaba, Campinas e Santos, com entrega para todo o Brasil.",
  keywords: [
    "autopeças premium",
    "distribuidora de autopeças",
    "peças originais",
    "peças para carros importados",
    "peças para carros de luxo",
    "disco de freio",
    "pastilha de freio Brembo",
    "amortecedor TRW",
    "peças Bosch",
    "filtros MAHLE",
    "suspensão LEMFÖRDER",
    "autopeças São Paulo",
    "autopeças Campinas",
    "autopeças Sorocaba",
    "Stärke Parts",
  ],
  applicationName: "Stärke Parts",
  authors: [{ name: "Stärke Parts" }],
  creator: "Stärke Parts",
  publisher: "Stärke Parts",
  category: "business",
    alternates: {
      canonical: siteOrigin,
      languages: { "pt-BR": siteOrigin.toString() },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    alternateLocale: "en_US",
    url: siteOrigin,
    siteName: "Stärke Parts",
    title: "Stärke Parts — Distribuidora de Autopeças Premium no Brasil",
    description:
      "Autopeças premium e originais para veículos importados e de alta performance. Brembo, Bosch, TRW, febi, MAHLE e mais. Atendimento especializado e entrega para todo o Brasil.",
    images: [
      {
        url: ogImage,
        width: 1731,
        height: 909,
        alt: "Stärke Parts — Distribuidora de autopeças premium",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@starkepremiumparts",
    creator: "@starkepremiumparts",
    title: "Stärke Parts — Distribuidora de Autopeças Premium no Brasil",
    description:
      "Autopeças premium e originais para veículos importados e de alta performance. Atendimento especializado e entrega para todo o Brasil.",
    images: [ogImage],
  },
  icons: {
    icon: [{ url: "/favicon-starke.png?v=2", type: "image/png", sizes: "512x512" }],
    shortcut: "/favicon-starke.png?v=2",
    apple: "/favicon-starke.png?v=2",
  },
  verification: {
    google: undefined,
  },
  other: {
    "theme-color": "#0a0a0f",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" data-theme="dark">
      <head>
        <link rel="icon" href="/favicon-starke.png?v=2" type="image/png" sizes="512x512" />
        <link rel="shortcut icon" href="/favicon-starke.png?v=2" type="image/png" />
        <link rel="preload" href="/unidade-sao-paulo.webp" as="image" type="image/webp" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <link rel="canonical" href={siteOrigin.toString()} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": `${siteOrigin}#organization`,
                  name: "Stärke Parts",
                  url: siteOrigin.toString(),
                  logo: logo,
                  image: ogImage,
                  foundingDate: "2016",
                  email: "contato@starkeparts.com",
                  telephone: "+55-11-95206-3102",
                  sameAs: [
                    "https://www.instagram.com/starkepremiumparts/",
                    "https://www.mercadolivre.com.br/pagina/starkeparts2600",
                  ],
                  areaServed: "BR",
                  address: {
                    "@type": "PostalAddress",
                    addressCountry: "BR",
                    addressLocality: "São Paulo",
                  },
                },
                {
                  "@type": "WebSite",
                  "@id": `${siteOrigin}#website`,
                  url: siteOrigin.toString(),
                  name: "Stärke Parts",
                  publisher: { "@id": `${siteOrigin}#organization` },
                  inLanguage: "pt-BR",
                },
              ],
            }),
          }}
        />
      </head>
      <body className={`antialiased ${montserrat.variable}`}>
        <StarfieldBackground />
        {children}
      </body>
    </html>
  );
}
