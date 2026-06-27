// app/catalog/[category]/[id]/page.tsx
import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { photoProducts } from "@/data/photo";
import { videoProducts } from "@/data/video";
import { spinProducts } from "@/data/3d-spin";
import { ProductContent } from "@/components/ProductContent/ProductContent";
import { Button } from "@/components/ui/Button/Button";
import { Metadata } from "next";

type Props = {
  params: Promise<{ category: string; id: string }>;
};

// UTILS: Fetch product by ID across all categories
const getProductById = (id: string) => {
  const allProducts = [...photoProducts, ...videoProducts, ...spinProducts];
  return allProducts.find((p) => p.id === id);
};

// UTILS: Fetch all products for a specific category
const getCategoryProducts = (categorySlug: string) => {
  switch (categorySlug) {
    case "photo":
      return photoProducts;
    case "video":
      return videoProducts;
    case "3d-spin":
      return spinProducts;
    default:
      return [];
  }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);
  const BASE_URL = "http://www.aimedia.pp.ua";

  if (!product) {
    return { title: "AIMedia — Каталог" };
  }

  return {
    title: `${product.title} | AIMedia`,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: product.mediaUrls[0]
        ? [
            {
              url: product.mediaUrls[0].startsWith("http")
                ? product.mediaUrls[0] // Cloudinary videos are already absolute
                : `${BASE_URL}${product.mediaUrls[0]}`, // Local photos need domain
              width: 1200,
              height: 630,
            },
          ]
        : [],
    },
  };
}

// UI: This is a real, standalone page — reached when someone opens the
// product URL directly. It must NOT render as an overlay/modal.
export default async function FullProductPage({ params }: Props) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  const categoryProducts = getCategoryProducts(product.categorySlug).filter(
    (p) => p.id !== product.id,
  );
  const relatedProducts = categoryProducts.slice(0, 3);

  return (
    <section className="w-full min-h-screen py-12 md:py-20">
      <div className="container px-4">
        {/* UI: Back link using semantic text tokens */}
        <Link
          href={`/catalog/${product.categorySlug}`}
          className="inline-flex items-center gap-2 text-text-muted hover:text-text-main transition-colors mb-6 text-sm font-medium"
        >
          <ArrowLeft size={16} />
          Назад до каталогу
        </Link>

        {/* UI: Product wrapper now uses light theme tokens (bg-dark corresponds to #ffffff in your setup) */}
        <div className="bg-bg-dark border border-border-subtle rounded-2xl w-full max-w-5xl mx-auto overflow-hidden shadow-2xl md:h-[600px]">
          <ProductContent product={product} />
        </div>

        {/* UI: Extra content for cold/direct visitors */}
        {relatedProducts.length > 0 && (
          <div className="max-w-5xl mx-auto mt-20">
            <h2 className="text-text-main mb-8">Інші роботи в цій категорії</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((related) => (
                <Link
                  key={related.id}
                  href={`/catalog/${related.categorySlug}/${related.id}`}
                  className="group block bg-bg-card border border-border-subtle rounded-xl overflow-hidden hover:border-text-muted/50 transition-colors"
                >
                  <div className="relative w-full h-48 bg-overlay-dark">
                    <Image
                      fill
                      src={related.mediaUrls[0]}
                      alt={related.title}
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-text-main text-base font-semibold mb-1 truncate">
                      {related.title}
                    </h3>
                    <span className="text-brand text-sm font-medium">
                      ${related.price}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* UI: Call to action block */}
        <div className="max-w-5xl mx-auto mt-16 text-center bg-bg-card border border-border-subtle rounded-2xl p-10 md:p-14">
          <h2 className="text-text-main mb-3">
            Готові отримати своє AI-відео?
          </h2>
          <p className="text-text-muted mb-8 max-w-md mx-auto">
            Залиште заявку — підготуємо персональну пропозицію під ваш проєкт
            протягом години
          </p>
          <Button href={`/order?service=${product.id}`} variant="primary">
            Замовити прорахунок
          </Button>
        </div>
      </div>
    </section>
  );
}
