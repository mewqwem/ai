import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Image, Video, Rotate3d } from "lucide-react";
import { Product } from "@/data/types";

import { photoProducts } from "@/data/photo";
import { videoProducts } from "@/data/video";
import { spinProducts } from "@/data/3d-spin";
import { ProductCard } from "@/components/ProductCard/ProductCard";
import { Metadata } from "next";

type Props = {
  params: { category: string };
};

const categoryMeta: Record<string, { title: string; description: string }> = {
  video: {
    title:
      "AI відеоролики для товарів — промо для Instagram та TikTok | AIMedia",
    description:
      "Динамічні промо-відео на основі фото вашого товару. Авто, взуття, косметика. Термін: 48 годин.",
  },
  photo: {
    title: "AI фотографії товарів для магазинів | AIMedia",
    description:
      "Генеруємо AI-фото вашого товару в будь-яких локаціях і стилях для Instagram та маркетплейсів.",
  },
  "3d-spin": {
    title: "3D-візуалізація товару 360° | AIMedia",
    description:
      "Обліт товару на 360 градусів на AI-фоні. Ефектна презентація без дорогої студії.",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const meta = categoryMeta[params.category];

  if (!meta) {
    return {
      title: "Каталог AI-послуг | AIMedia",
      description: "Перегляньте приклади AI-реклами для вашого бізнесу.",
    };
  }

  return {
    title: meta.title,
    description: meta.description,
  };
}

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

const navigationItems = [
  { slug: "photo", label: "Фото", icon: Image },
  { slug: "video", label: "Відео", icon: Video },
  { slug: "3d-spin", label: "3D", icon: Rotate3d },
];

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const resolvedParams = await params;
  const currentCategory = resolvedParams.category;
  const data = getCategoryData(currentCategory);

  if (!data) {
    notFound();
  }

  return (
    <section className="w-full">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-6 mb-12">
          <div>
            <h1 className="text-3xl font-semibold text-white mb-2">
              {data.title}
            </h1>
            <p className="text-gray-400">
              Оберіть формат, який найкраще підходить для вашого бізнесу.
            </p>
          </div>

          <div className="inline-flex items-center gap-1 bg-white/5 border border-white/10 p-1.5 rounded-2xl w-max backdrop-blur-sm">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentCategory === item.slug;

              return (
                <Link
                  key={item.slug}
                  href={`/catalog/${item.slug}`}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-white/10 text-white shadow-sm"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {data.products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
