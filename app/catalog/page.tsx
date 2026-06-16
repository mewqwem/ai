// src/app/catalog/page.tsx
import React from "react";
import { Metadata } from "next";
import { CategoryCard } from "@/components/CategoryCard/CategoryCard";

export const metadata: Metadata = {
  title: "Каталог послуг | AI Відео",
  description: "Оберіть напрямок: AI фото, AI відео або 3D обертання.",
};

// Hardcoded categories with specific media types for video background support
const categories = [
  {
    id: "photo",
    title: "Фотографії",
    description:
      "Створення унікальних зображень з вашим товаром у будь-яких локаціях та стилях.",
    mediaUrl: "/categoryImages/photo.png",
    mediaType: "photo" as const,
    href: "/catalog/photo",
  },
  {
    id: "video",
    title: "Відеоролики",
    description:
      "Динамічні відео для соціальних мереж на основі фотографій вашого продукту.",
    // Direct optimized Cloudinary URL for background video
    mediaUrl:
      "https://res.cloudinary.com/dwwvwzghm/video/upload/q_auto/f_auto/v1781645998/video_qbu682.mp4",
    mediaType: "video" as const,
    href: "/catalog/video",
  },
  {
    id: "3d-spin",
    title: "3D Візуалізація",
    description:
      "Обліт товару на 360 градусів на красивому згенерованому фоні.",
    // Direct optimized Cloudinary URL for 3D spin background video
    mediaUrl:
      "https://res.cloudinary.com/dwwvwzghm/video/upload/q_auto/f_auto/v1781646010/malina_l8sx16.mp4",
    mediaType: "video" as const,
    href: "/catalog/3d-spin",
  },
];

export default function CatalogPage() {
  return (
    <section className="w-full">
      <div className="container">
        <div className="text-center mb-16">
          <h1 className="mb-4 text-text-main">Що саме вам потрібно?</h1>
          <p className="text-text-muted max-w-2xl mx-auto text-lg">
            Оберіть категорію, щоб переглянути доступні пакети та приклади
            робіт.
          </p>
        </div>

        {/* Grid layout for the three main categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              title={category.title}
              description={category.description}
              mediaUrl={category.mediaUrl}
              mediaType={category.mediaType}
              href={category.href}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
