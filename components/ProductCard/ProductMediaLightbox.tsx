"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Product } from "@/data/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import Lightbox from "yet-another-react-lightbox";
import Video from "yet-another-react-lightbox/plugins/video"; // 1. Імпортуємо плагін для відео

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "yet-another-react-lightbox/styles.css";

export const ProductMediaLightbox = ({ product }: { product: Product }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  // 2. Правильно форматуємо об'єкти для лайтбоксу залежно від типу
  const slides =
    product.type === "video"
      ? product.mediaUrls.map((url) => ({
          type: "video" as const, // Вказуємо тип для плагіна
          autoPlay: true,
          loop: true,
          controls: true,
          sources: [{ src: url, type: "video/mp4" }],
        }))
      : product.mediaUrls.map((url) => ({ src: url }));

  return (
    <>
      <div className="relative w-full aspect-[4/5] bg-black flex-shrink-0 overflow-hidden group/swiper cursor-pointer">
        <div className="absolute top-4 left-4 z-20 bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-white/10">
          {product.category}
        </div>

        {product.type === "video" ? (
          <div
            onClick={() => setIsOpen(true)}
            className="w-full h-full relative"
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover z-0 relative"
            >
              <source src={product.mediaUrls[0]} type="video/mp4" />
            </video>
          </div>
        ) : (
          <Swiper
            modules={[Pagination, Navigation]}
            pagination={{ clickable: true }}
            navigation={true}
            loop={true}
            className="w-full h-full my-swiper z-0"
          >
            {product.mediaUrls.map((url, index) => (
              <SwiperSlide
                key={url}
                onClick={() => {
                  setPhotoIndex(index);
                  setIsOpen(true);
                }}
              >
                <Image
                  fill
                  src={url}
                  alt={`${product.title} - ${index + 1}`}
                  className="object-cover"
                  sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#121212] to-transparent z-10 pointer-events-none"></div>
      </div>

      <Lightbox
        open={isOpen}
        close={() => setIsOpen(false)}
        index={photoIndex}
        slides={slides}
        plugins={[Video]} // 3. Підключаємо плагін сюди
      />
    </>
  );
};
