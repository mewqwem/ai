// src/data/photo.ts
import { Product } from "./types";

// Array containing all photo-related products
export const photoProducts: Product[] = [
  {
    id: "photo-pack-5",
    type: "photo",
    category: "AI Фотографії",
    categorySlug: "photo",
    mediaUrl: "/images/sample-5.jpg",
    title: "Пакет 5 AI Зображень",
    description:
      "Оптимальний набір для маркетплейсів. Різні ракурси та фони для одного товару.",
    price: 35,
    isStartingPrice: false,
    turnaroundTime: "Готовність від 24 годин",
  },
  // Add more photo products here...
];
