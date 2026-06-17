import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/data/types";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link href={`/catalog/${product.categorySlug}/${product.id}`}>
      <article className="bg-black border border-white/10 rounded-2xl overflow-hidden aspect-square group/swiper cursor-pointer hover:border-brand/50 transition-colors relative block">
        <div className="absolute top-4 left-4 z-20 bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-white/10">
          {product.category}
        </div>

        {product.type === "video" ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover z-0 relative pointer-events-none"
          >
            <source src={product.mediaUrls[0]} type="video/mp4" />
          </video>
        ) : (
          <div className="w-full h-full relative pointer-events-none">
            <Image
              fill
              src={product.mediaUrls[0]}
              alt={product.title}
              className="object-cover"
              sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
              quality={100}
            />
          </div>
        )}

        <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-black/60 to-transparent z-10 pointer-events-none"></div>
      </article>
    </Link>
  );
};
