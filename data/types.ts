// src/data/types.ts

// Shared interface for all product categories
export interface Product {
  id: string;
  type: "video" | "photo";
  category: string;
  categorySlug: string;
  mediaUrl: string;
  title: string;
  description: string;
  price: number;
  isStartingPrice: boolean;
  turnaroundTime: string;
}
