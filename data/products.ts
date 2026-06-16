// src/data/products.ts

// Defining specific types for categories to ensure consistency
export type ProductCategory =
  | "Авто-естетика"
  | "Комерційна реклама"
  | "UGC Креативи"
  | "Картка товару"
  | "Продуктове відео";

export interface Product {
  id: string;
  type: "video" | "photo";
  category: ProductCategory;
  categorySlug: string; // Used for URL generation (e.g., /catalog/cars)
  mediaUrl: string;
  title: string;
  description: string;
  price: number;
  isStartingPrice: boolean; // Determines if we should show "від X$"
  turnaroundTime: string; // E.g., "від 24 годин"
}

export const products: Product[] = [
  {
    id: "ai-photo-1",
    type: "photo",
    category: "Картка товару",
    categorySlug: "product-cards",
    mediaUrl: "/images/sample-1.jpg",
    title: "AI Зображення (1 шт)",
    description:
      "Генерація одного унікального зображення з інтеграцією фото вашого товару.",
    price: 8,
    isStartingPrice: false,
    turnaroundTime: "Перші результати за 24 год",
  },
  {
    id: "ai-photo-pack-5",
    type: "photo",
    category: "Картка товару",
    categorySlug: "product-cards",
    mediaUrl: "/images/sample-5.jpg",
    title: "Пакет 5 AI Зображень",
    description:
      "Оптимальний набір для маркетплейсів. Різні ракурси та фони для одного товару.",
    price: 35,
    isStartingPrice: false,
    turnaroundTime: "Готовність від 24 годин",
  },
  {
    id: "ai-photo-pack-10",
    type: "photo",
    category: "UGC Креативи",
    categorySlug: "ugc",
    mediaUrl: "/images/sample-10.jpg",
    title: "Пакет 10 AI Зображень",
    description:
      "Максимальне охоплення. Ідеально для заповнення стрічки Instagram на місяць.",
    price: 60,
    isStartingPrice: false,
    turnaroundTime: "Готовність від 48 годин",
  },
  {
    id: "ai-video-5s",
    type: "video",
    category: "Продуктове відео",
    categorySlug: "product-videos",
    mediaUrl:
      "https://res.cloudinary.com/demo/video/upload/v1690000000/sample1.mp4",
    title: "AI-Відео (5 секунд)",
    description:
      "Коротке динамічне відео з фото вашого товару. Ідеально для Stories та таргетингу.",
    price: 35,
    isStartingPrice: true,
    turnaroundTime: "Драфт через 24 години",
  },
  {
    id: "ai-video-10s",
    type: "video",
    category: "Авто-естетика",
    categorySlug: "cars",
    mediaUrl:
      "https://res.cloudinary.com/demo/video/upload/v1690000000/sample2.mp4",
    title: "AI-Відео (10 секунд)",
    description:
      "Повноцінний кінематографічний ролик. Складні переходи та ефекти для Reels/TikTok.",
    price: 60,
    isStartingPrice: true,
    turnaroundTime: "Драфт через 24-48 годин",
  },
];
