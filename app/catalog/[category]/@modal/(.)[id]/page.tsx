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
