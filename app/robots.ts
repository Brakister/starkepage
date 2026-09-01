import type { MetadataRoute } from "next";

const base = "https://starkeparts.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/en/"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base.replace("https://", ""),
  };
}
