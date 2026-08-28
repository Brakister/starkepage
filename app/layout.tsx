import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import "./expanded.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-site",
  display: "swap",
  preload: true,
});

const siteOrigin = new URL("https://starke-parts-premium.wiildias.chatgpt.site");

export const metadata: Metadata = {
  metadataBase: siteOrigin,
  title: "Stärke Parts — Premium Automotive",
  description:
    "Desde 2016, a Stärke Parts conecta autopeças premium, fabricantes reconhecidos, conhecimento técnico e atendimento especializado a clientes de todo o Brasil.",
  openGraph: {
    title: "Stärke Parts — Premium Automotive",
    description: "Peças premium. Confiança em cada detalhe.",
    type: "website",
    locale: "pt_BR",
    url: siteOrigin,
    images: [
      {
        url: new URL("/og.png", siteOrigin).toString(),
        width: 1731,
        height: 909,
        alt: "Stärke Parts — Peças premium. Confiança em cada detalhe.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stärke Parts — Premium Automotive",
    description: "Peças premium. Confiança em cada detalhe.",
    images: [new URL("/og.png", siteOrigin).toString()],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  other: {
    "codex-preview": "development",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" data-theme="dark">
      <body className={`antialiased ${montserrat.variable}`}>{children}</body>
    </html>
  );
}
