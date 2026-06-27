// src/components/ProductContent/ProductContent.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Clock } from "lucide-react";
import { Button } from "../ui/Button/Button";
import { Product } from "@/data/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface ProductContentProps {
  product: Product;
  /**
   * Optional close button, rendered top-right over the media area.
   * Pass this only when ProductContent is shown inside a modal overlay.
   * A standalone page should omit it — there's nothing to "close" there.
   */
  onClose?: () => void;
}

/**
 * Pure product content: media (video/swiper), title, description,
 * price and CTA. No fixed positioning, no overlay, no backdrop click
 * handling — this can be dropped into a modal OR a full standalone page.
 */
export const ProductContent: React.FC<ProductContentProps> = ({
  product,
  onClose,
}) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState<boolean>(false);
  const [loadedSlides, setLoadedSlides] = useState<Record<number, boolean>>({});

  const handleSlideLoad = (index: number) => {
    setLoadedSlides((prev) => ({ ...prev, [index]: true }));
  };

  return (
    <div className="w-full h-full flex flex-col md:flex-row relative">
      {onClose && (
        <button
          onClick={onClose}
          aria-label="Закрити"
          // UI: Close button uses dark overlay tokens as it sits on top of media
          className="absolute top-4 right-4 z-50 bg-overlay-dark/50 hover:bg-overlay-dark/80 text-surface-inverse p-2 rounded-full backdrop-blur-md border border-surface-inverse/10 transition-colors cursor-pointer"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 5L15 15M15 5L5 15"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}

      {/* UI: Media container background */}
      <div className="w-full md:w-1/2 h-[40vh] md:h-auto relative bg-overlay-dark flex-shrink-0 group/swiper">
        {product.type === "video" ? (
          <>
            {!isVideoLoaded && (
              // UI: Light theme skeleton loader
              <div className="absolute inset-0 z-10 overflow-hidden bg-bg-card">
                <div className="absolute inset-0 bg-gradient-to-br from-bg-card via-border-subtle to-bg-card animate-skeleton-pulse" />
                <div
                  className="absolute top-0 left-0 h-full w-1/2 animate-shimmer"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent 0%, var(--overlay-scrim) 50%, transparent 100%)",
                  }}
                />
              </div>
            )}
            <video
              autoPlay
              loop
              muted
              playsInline
              controls
              onLoadedData={() => setIsVideoLoaded(true)}
              className={`w-full h-full object-cover transition-opacity duration-700 ${
                isVideoLoaded ? "opacity-100" : "opacity-0"
              }`}
            >
              <source src={product.mediaUrls[0]} type="video/mp4" />
            </video>
          </>
        ) : (
          <Swiper
            modules={[Pagination, Navigation]}
            pagination={{ clickable: true }}
            navigation={true}
            loop={true}
            className="w-full h-full my-swiper"
          >
            {product.mediaUrls.map((url, index) => (
              <SwiperSlide key={url}>
                <div className="relative w-full h-full">
                  {!loadedSlides[index] && (
                    // UI: Light theme skeleton loader for images
                    <div className="absolute inset-0 z-10 overflow-hidden bg-bg-card">
                      <div className="absolute inset-0 bg-gradient-to-br from-bg-card via-border-subtle to-bg-card animate-skeleton-pulse" />
                      <div
                        className="absolute top-0 left-0 h-full w-1/2 animate-shimmer"
                        style={{
                          background:
                            "linear-gradient(90deg, transparent 0%, var(--overlay-scrim) 50%, transparent 100%)",
                        }}
                      />
                    </div>
                  )}
                  <Image
                    fill
                    src={url}
                    alt={`${product.title} - ${index + 1}`}
                    onLoad={() => handleSlideLoad(index)}
                    className={`object-cover transition-opacity duration-700 ${
                      loadedSlides[index] ? "opacity-100" : "opacity-0"
                    }`}
                    sizes="(max-w-768px) 100vw, 50vw"
                    quality={100}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col overflow-y-auto max-h-[50vh] md:max-h-[90vh]">
        {/* UI: Category badge adapted to light theme */}
        <div className="inline-block bg-bg-card border border-border-subtle text-text-muted text-xs font-semibold px-3 py-1 rounded-full w-fit mb-4">
          {product.category}
        </div>

        {/* UI: Title uses main text token */}
        <h2 className="text-2xl md:text-3xl font-bold text-text-main mb-4">
          {product.title}
        </h2>

        {/* UI: Description uses muted text token */}
        <p className="text-text-muted text-sm md:text-base leading-relaxed mb-6 flex-grow">
          {product.description}
        </p>

        {/* UI: Info badge adapted to light theme */}
        <div className="flex items-center gap-2 text-sm text-text-muted bg-bg-card p-3 rounded-xl mb-6 border border-border-subtle w-fit">
          <Clock size={18} className="text-brand shrink-0" />
          <span>{product.turnaroundTime}</span>
        </div>

        {/* UI: Footer area with subtle top border */}
        <div className="pt-6 border-t border-border-subtle flex items-center justify-between mt-auto shrink-0">
          <div className="flex flex-col">
            {product.isStartingPrice && (
              <span className="text-xs text-text-muted mb-0.5">
                вартість від
              </span>
            )}
            <span className="text-2xl md:text-3xl font-bold text-text-main">
              ${product.price}
            </span>
          </div>

          <Button href={`/order?service=${product.id}`} variant="primary">
            Замовити
          </Button>
        </div>
      </div>
    </div>
  );
};
