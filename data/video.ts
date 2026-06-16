// src/data/video.ts
import { Product } from "./types";

// Array containing all video-related products
export const videoProducts: Product[] = [
  {
    id: "video-10s",
    type: "video",
    category: "AI Відеоролики",
    categorySlug: "video",
    // Using optimized Cloudinary URL structure
    mediaUrl:
      "https://res.cloudinary.com/demo/video/upload/q_auto,f_auto/v1690000000/sample1.mp4",
    title: "AI-Відео (10 секунд)",
    description:
      "Повноцінний кінематографічний ролик. Складні переходи та ефекти для Reels/TikTok.",
    price: 60,
    isStartingPrice: true,
    turnaroundTime: "Драфт через 24-48 годин",
  },
  // Add more video products here...
];
