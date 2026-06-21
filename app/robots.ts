import { MetadataRoute } from "next";

const SITE_URL = "https://aimedia.pp.ua";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
