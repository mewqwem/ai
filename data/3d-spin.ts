// src/data/3d-spin.ts
import { Product } from "./types";

// Array containing all 3D spin products
export const spinProducts: Product[] = [
  {
    id: "spin-360",
    // 3D spins are typically rendered as video files (mp4/webm)
    type: "video",
    category: "3D Прокрутка",
    categorySlug: "3d-spin",
    mediaUrl:
      "https://res.cloudinary.com/demo/video/upload/q_auto,f_auto/v1690000000/spin-sample.mp4",
    title: "3D Обліт на 360°",
    description:
      "Детальна 3D-прокрутка вашого товару на згенерованому студійному фоні.",
    price: 100,
    isStartingPrice: true,
    turnaroundTime: "Готовність від 72 годин",
  },
  // Add more 3D spin products here...
];
