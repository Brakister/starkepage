import type { MetadataRoute } from "next";

const base = "https://starkeparts.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const routes: { path: string; changefreq?: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
    { path: "", priority: 1.0, changefreq: "weekly" },
    { path: "/empresa", priority: 0.9, changefreq: "monthly" },
    { path: "/montadoras", priority: 0.9, changefreq: "monthly" },
    { path: "/produtos", priority: 0.9, changefreq: "weekly" },
    { path: "/fabricantes", priority: 0.8, changefreq: "monthly" },
    { path: "/unidades", priority: 0.8, changefreq: "monthly" },
    { path: "/logistica", priority: 0.7, changefreq: "monthly" },
    { path: "/atendimento", priority: 0.8, changefreq: "monthly" },
  ];

  return routes.map(({ path, priority, changefreq }) => ({
    url: `${base}${path}`,
    lastModified,
    changeFrequency: changefreq,
    priority,
    images: [
      `${base}/og.png`,
      `${base}/starke-parts-logo.png`,
      `${base}/autoparts-hero.webp`,
      `${base}/autoparts-brakes.webp`,
    ],
  }));
}
