import React from "react";
import { notFound } from "next/navigation";
import { photoProducts } from "@/data/photo";
import { videoProducts } from "@/data/video";
import { spinProducts } from "@/data/3d-spin";
import { ProductModal } from "@/components/ProductModal/ProductModal";
import { Metadata } from "next";

type Props = {
  params: Promise<{ category: string; id: string }>;
};

const getProductById = (id: string) => {
  const allProducts = [...photoProducts, ...videoProducts, ...spinProducts];
  return allProducts.find((p) => p.id === id);
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
                ? product.mediaUrls[0] // відео з Cloudinary — вже абсолютні
                : `${BASE_URL}${product.mediaUrls[0]}`, // фото — додаємо домен
              width: 1200,
              height: 630,
            },
          ]
        : [],
    },
  };
}

export default async function FullProductPage({ params }: Props) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  return <ProductModal product={product} />;
}
