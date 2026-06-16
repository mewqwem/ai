import React from "react";
import { notFound } from "next/navigation";
import { Product } from "@/data/types";

// Importing the arrays from specific data files
import { photoProducts } from "@/data/photo";
import { videoProducts } from "@/data/video";
import { spinProducts } from "@/data/3d-spin";
import { ProductCard } from "@/components/ProductCard/ProductCard";

// Helper function to map the URL parameter to the correct data array and title
const getCategoryData = (categorySlug: string) => {
  switch (categorySlug) {
    case "photo":
      return { title: "AI Фотографії", products: photoProducts };
    case "video":
      return { title: "AI Відеоролики", products: videoProducts };
    case "3d-spin":
      return { title: "3D Прокрутка", products: spinProducts };
    default:
      return null;
  }
};

// Component must be async to unwrap the params Promise in Next.js 15+
export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  // Await the params to safely extract the category slug
  const resolvedParams = await params;
  const data = getCategoryData(resolvedParams.category);

  // Trigger Next.js 404 page if the category slug doesn't match our data
  if (!data) {
    notFound();
  }

  return (
    <main className="pt-32 pb-16 min-h-screen">
      <section className="w-full">
        <div className="container">
          <div className="mb-12">
            <h1 className="text-text-main mb-2">{data.title}</h1>
            <p className="text-text-muted">
              Оберіть пакет, який найкраще підходить для вашого бізнесу.
            </p>
          </div>

          {/* Reusing the ProductCard component in a grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {data.products.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
