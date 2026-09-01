import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Stärke Parts — Distribuidora de Autopeças Premium",
    short_name: "Stärke Parts",
    description:
      "Distribuidora de autopeças premium e originais para veículos importados e de alta performance.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0f",
    theme_color: "#0a0a0f",
    lang: "pt-BR",
    categories: ["business", "shopping"],
    icons: [
      {
        src: "/favicon-starke.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
