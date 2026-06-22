"use client";

import React from "react";
import Image from "next/image";

interface HeroSplitBackgroundProps {
  /** Шлях/URL до фото товару (статичний кадр, ліва частина) */
  productImageUrl: string;
  /** Шлях/URL до готового рекламного відео (права частина, грає в лупі без звуку) */
  promoVideoUrl: string;
}

/**
 * Фон для hero-секції: ліворуч — статичне фото товару "як є",
 * праворуч — готове AI-промо відео в лупі.
 * Лінія-розділювач рухається сама, автоматично, вліво-вправо і назад.
 */
export const HeroSplitBackground: React.FC<HeroSplitBackgroundProps> = ({
  productImageUrl,
  promoVideoUrl,
}) => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-black">
      {/* --- Інлайн keyframes для автоматичного руху розділювача --- */}
      <style>{`
        @keyframes split-sweep {
          0%, 100% {
            clip-path: inset(0 0 0 38%);
          }
          50% {
            clip-path: inset(0 0 0 62%);
          }
        }
        @keyframes divider-sweep {
          0%, 100% {
            left: 38%;
          }
          50% {
            left: 62%;
          }
        }
        .animate-split-sweep {
          animation: split-sweep 10s ease-in-out infinite;
        }
        .animate-divider-sweep {
          animation: divider-sweep 10s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-split-sweep,
          .animate-divider-sweep {
            animation: none;
          }
        }
      `}</style>

      {/* Базовий шар: фото товару на всю ширину */}
      <div className="absolute inset-0">
        <Image
          src={productImageUrl}
          alt="Оригінальне фото товару"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* Верхній шар: відео, обрізане clip-path, що рухається автоматично */}
      <div className="absolute inset-0 animate-split-sweep">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={promoVideoUrl} type="video/mp4" />
        </video>
      </div>

      {/* Тонка лінія-розділювач, що синхронно гуляє по тій самій траєкторії */}
      <div
        className="absolute top-0 bottom-0 w-px bg-white/70 shadow-[0_0_12px_rgba(255,255,255,0.6)] animate-divider-sweep"
        style={{ transform: "translateX(-50%)" }}
      >
        {/* невелика "ручка" по центру лінії — суто декоративна, підкреслює, що це порівняння */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
          <div className="flex gap-0.5">
            <div className="w-0.5 h-3 bg-neutral-700 rounded-full" />
            <div className="w-0.5 h-3 bg-neutral-700 rounded-full" />
          </div>
        </div>
      </div>

      {/* Підказки "до" / "після" — невеликі, ненав'язливі */}
      <div className="absolute top-6 left-6 z-10 text-xs font-medium uppercase tracking-wider text-white/50">
        до
      </div>
      <div className="absolute top-6 right-6 z-10 text-xs font-medium uppercase tracking-wider text-white/50">
        після
      </div>

      {/* Темний оверлей під текст hero-секції */}
      <div className="absolute inset-0 bg-black/65" />
    </div>
  );
};
