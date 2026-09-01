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
<<<<<<< HEAD
=======
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
>>>>>>> 42fe1f74236589f6c8b7169d7bee5405b51e4c9e
        src: "/starke-parts-logo.png",
        sizes: "any",
        type: "image/png",
      },
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
