// app/catalog/[category]/@modal/(.)[id]/page.tsx
import React from "react";
import { notFound } from "next/navigation";
import { photoProducts } from "@/data/photo";
import { videoProducts } from "@/data/video";
import { spinProducts } from "@/data/3d-spin";
import { ProductModal } from "@/components/ProductModal/ProductModal";

const getProductById = (id: string) => {
  const allProducts = [...photoProducts, ...videoProducts, ...spinProducts];
  return allProducts.find((p) => p.id === id);
};

// This file only ever renders inside the @modal parallel route slot —
// i.e. only when navigation was intercepted from the catalog page.
// It renders the overlay version (ProductModal). The standalone
// [id]/page.tsx renders ProductContent directly, with no overlay.
export default async function InterceptedProductModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const product = getProductById(resolvedParams.id);

  if (!product) {
    notFound();
  }

  return <ProductModal product={product} />;
}
