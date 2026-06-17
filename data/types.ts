export interface Product {
  id: string;
  pack?: string;
  type: "photo" | "video" | "3d-spin";
  category: string;
  categorySlug: string;
  mediaUrls: string[];
  title: string;
  description: string;
  price: number;
  isStartingPrice?: boolean;
  turnaroundTime: string;
}
