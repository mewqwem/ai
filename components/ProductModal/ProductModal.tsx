"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { X, Clock } from "lucide-react";
import { Button } from "../ui/Button/Button";
import { Product } from "@/data/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

// Modern modal component with integrated smooth mount animations
export const ProductModal = ({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) => {
  // Lock body scrolling and handle Escape key to close modal
  useEffect(() => {
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <>
      <style>{`
        @keyframes overlayFadeIn {
          from { opacity: 0; backdrop-filter: blur(0px); }
          to { opacity: 1; backdrop-filter: blur(4px); }
        }
        @keyframes modalSlideUp {
          from { opacity: 0; transform: scale(0.95) translateY(15px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-modal-bg {
          animation: overlayFadeIn 0.3s ease-out forwards;
        }
        .animate-modal-card {
          animation: modalSlideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 md:p-6 animate-modal-bg"
        onClick={onClose}
      >
        <div
          className="bg-[#121212] border border-white/10 rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row relative animate-modal-card shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full backdrop-blur-md border border-white/10 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>

          {/* Left Column: Swiper or Video */}
          <div className="w-full md:w-1/2 h-[40vh] md:h-auto relative bg-black flex-shrink-0 group/swiper">
            {product.type === "video" ? (
              <video
                autoPlay
                loop
                muted
                playsInline
                controls
                className="w-full h-full object-cover"
              >
                <source src={product.mediaUrls[0]} type="video/mp4" />
              </video>
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
                    <Image
                      fill
                      src={url}
                      alt={`${product.title} - ${index + 1}`}
                      className="object-cover"
                      sizes="(max-w-768px) 100vw, 50vw"
                      quality={100}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>

          {/* Right Column: Product Information */}
          <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col overflow-y-auto max-h-[50vh] md:max-h-[90vh]">
            <div className="inline-block bg-white/5 border border-white/10 text-gray-300 text-xs font-semibold px-3 py-1 rounded-full w-fit mb-4">
              {product.category}
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              {product.title}
            </h2>

            <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6 flex-grow">
              {product.description}
            </p>

            <div className="flex items-center gap-2 text-sm text-gray-300 bg-white/5 p-3 rounded-xl mb-6 border border-white/5 w-fit">
              <Clock size={18} className="text-brand shrink-0" />
              <span>{product.turnaroundTime}</span>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between mt-auto shrink-0">
              <div className="flex flex-col">
                {product.isStartingPrice && (
                  <span className="text-xs text-gray-500 mb-0.5">
                    вартість від
                  </span>
                )}
                <span className="text-2xl md:text-3xl font-bold text-white">
                  ${product.price}
                </span>
              </div>

              <Button href={`/order?service=${product.id}`} variant="primary">
                Замовити
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
