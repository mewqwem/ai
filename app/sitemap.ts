import { MetadataRoute } from "next";
import { photoProducts } from "@/data/photo";
import { videoProducts } from "@/data/video";
import { spinProducts } from "@/data/3d-spin";

const SITE_URL = "https://aimedia.pp.ua";

const allProducts = [...photoProducts, ...videoProducts, ...spinProducts];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/catalog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/order`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // Унікальні категорії (photo, video, 3d-spin) → /catalog/[category]
  const categorySlugs = Array.from(
    new Set(allProducts.map((product) => product.categorySlug)),
  );

  const categoryRoutes: MetadataRoute.Sitemap = categorySlugs.map((slug) => ({
    url: `${SITE_URL}/catalog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Кожен товар → /catalog/[category]/[id]
  const productRoutes: MetadataRoute.Sitemap = allProducts.map((product) => ({
    url: `${SITE_URL}/catalog/${product.categorySlug}/${product.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
