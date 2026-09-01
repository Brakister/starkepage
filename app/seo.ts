import type { Metadata } from "next";

const base = new URL("https://starkeparts.com");
const ogImage = new URL("/og.png", base).toString();

export const siteConfig = {
  name: "Stärke Parts",
  origin: base,
  ogImage,
  contact: {
    phone: "+55 11 95206-3102",
    whatsapp: "https://wa.me/5511952063102",
  },
};

export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = new URL(path, base);
  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      url,
      siteName: "Stärke Parts",
      title: `${title} · Stärke Parts`,
      description,
      images: [{ url: ogImage, width: 1731, height: 909 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · Stärke Parts`,
      description,
      images: [ogImage],
    },
  };
}
