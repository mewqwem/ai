"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { X, Clock } from "lucide-react";
import { Button } from "../ui/Button/Button";
import { Product } from "@/data/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export const ProductModal = ({ product }: { product: Product }) => {
  const router = useRouter();

  const [isVideoLoaded, setIsVideoLoaded] = useState<boolean>(false);
  const [loadedSlides, setLoadedSlides] = useState<Record<number, boolean>>({});

  const handleClose = () => {
    const category = product.categorySlug;
    router.push(`/catalog/${category}`);
  };

  const handleSlideLoad = (index: number) => {
    setLoadedSlides((prev) => ({ ...prev, [index]: true }));
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

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
        onClick={handleClose}
      >
        <div
          className="bg-[#121212] border border-white/10 rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row relative animate-modal-card shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-50 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full backdrop-blur-md border border-white/10 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>

          <div className="w-full md:w-1/2 h-[40vh] md:h-auto relative bg-black flex-shrink-0 group/swiper">
            {product.type === "video" ? (
              <>
                {!isVideoLoaded && (
                  <div className="absolute inset-0 z-10 overflow-hidden bg-neutral-800">
                    <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 via-neutral-700/60 to-neutral-800 animate-skeleton-pulse" />
                    <div
                      className="absolute top-0 left-0 h-full w-1/2 animate-shimmer"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.16) 50%, transparent 100%)",
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
                        <div className="absolute inset-0 z-10 overflow-hidden bg-neutral-800">
                          <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 via-neutral-700/60 to-neutral-800 animate-skeleton-pulse" />
                          <div
                            className="absolute top-0 left-0 h-full w-1/2 animate-shimmer"
                            style={{
                              background:
                                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.16) 50%, transparent 100%)",
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
