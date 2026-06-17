"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Product } from "@/data/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { ProductModal } from "../ProductModal/ProductModal";

interface ProductCardProps {
  product: Product;
}

// Minimalistic square card that only shows the media and opens a modal on click
export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <article
        className="bg-black border border-white/10 rounded-2xl overflow-hidden aspect-square group/swiper cursor-pointer hover:border-brand/50 transition-colors relative"
        onClick={() => setIsModalOpen(true)}
      >
        {/* Category Tag overlay */}
        <div className="absolute top-4 left-4 z-20 bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-white/10">
          {product.category}
        </div>

        {product.type === "video" ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover z-0 relative"
          >
            <source src={product.mediaUrls[0]} type="video/mp4" />
          </video>
        ) : (
          <div
            className="w-full h-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <Swiper
              modules={[Pagination, Navigation]}
              pagination={{ clickable: true }}
              navigation={true}
              loop={true}
              className="w-full h-full my-swiper z-0"
            >
              {product.mediaUrls.map((url, index) => (
                <SwiperSlide key={url} onClick={() => setIsModalOpen(true)}>
                  <Image
                    fill
                    src={url}
                    alt={`${product.title} - ${index + 1}`}
                    className="object-cover"
                    sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
                    quality={100}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        {/* Subtle dark gradient for aesthetic depth */}
        <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-black/60 to-transparent z-10 pointer-events-none"></div>
      </article>

      {/* Render the details modal when active */}
      {isModalOpen && (
        <ProductModal product={product} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
};
