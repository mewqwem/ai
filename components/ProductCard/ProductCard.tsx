// src/components/ProductCard.tsx
import React from "react";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import { Button } from "../ui/Button/Button";
import { Product } from "@/data/types";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <article className="bg-bg-card border border-white/10 rounded-2xl overflow-hidden flex flex-col h-full hover:border-brand/50 transition-colors group">
      {/* Changed aspect ratio from 9/16 to 4/5 for better fit on laptop screens */}
      <div className="relative w-full aspect-[4/5] bg-black flex-shrink-0 overflow-hidden">
        {/* Category Badge overlay */}
        <div className="absolute top-4 left-4 z-20 bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-white/10">
          {product.category}
        </div>

        {/* Media rendering based on type */}
        {product.type === "video" ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 z-0 relative"
          >
            <source src={product.mediaUrl} type="video/mp4" />
          </video>
        ) : (
          <img
            src={product.mediaUrl}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 z-0 relative"
          />
        )}

        {/* Gradient overlay at the bottom of the media for smooth transition to text */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-bg-card to-transparent z-10"></div>
      </div>

      {/* Content area */}
      {/* Adjusted negative margin to blend nicely with the shorter image */}
      <div className="p-5 md:p-6 flex flex-col flex-grow relative z-20 -mt-10">
        <h3 className="mb-2 text-text-main line-clamp-1">{product.title}</h3>

        {/* Added line-clamp to ensure the description doesn't stretch the card indefinitely */}
        <p className="text-text-muted text-sm mb-4 flex-grow line-clamp-2">
          {product.description}
        </p>

        {/* Turnaround time highlighted with an icon */}
        <div className="flex items-center gap-2 text-sm text-gray-300 bg-white/5 p-2 rounded-lg mb-4 border border-white/5">
          <Clock size={16} className="text-brand shrink-0" />
          <span className="truncate">{product.turnaroundTime}</span>
        </div>

        {/* Link to category page to see more examples */}
        <Link
          href={`/catalog/${product.categorySlug}`}
          className="inline-flex items-center gap-1 text-sm text-brand hover:text-brand-hover transition-colors mb-4 font-medium"
        >
          <span>Дивитися більше прикладів</span>
          <ArrowRight size={16} className="shrink-0" />
        </Link>

        {/* Price and Action button */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
          <div className="flex flex-col">
            {product.isStartingPrice && (
              <span className="text-xs text-text-muted leading-tight mb-0.5">
                вартість від
              </span>
            )}
            <span className="text-xl md:text-2xl font-bold text-text-main leading-tight">
              ${product.price}
            </span>
          </div>

          <Button href={`/order?service=${product.id}`} variant="primary">
            Замовити
          </Button>
        </div>
      </div>
    </article>
  );
};
