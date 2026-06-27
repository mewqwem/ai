// src/components/ui/BeforeAfterSlider/BeforeAfterSlider.tsx
"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";

interface BeforeAfterSliderProps {
  /** Фото "до" — статичне зображення */
  beforeImage: string;
  /** Підпис над зображенням "до" */
  beforeLabel?: string;
  /**
   * Контент "після" — або картинка, або відео.
   * Якщо передано afterVideo, рендериться <video>, інакше — afterImage.
   */
  afterImage?: string;
  afterVideo?: string;
  /** Підпис над зображенням/відео "після" */
  afterLabel?: string;
  /** Альт-текст для зображень (для SEO/доступності) */
  alt: string;
  /** Початкова позиція розділювача у відсотках (0-100), за замовчуванням 50 */
  initialPosition?: number;
  /**
   * Фіксована висота контейнера в пікселях (desktop).
   * Задається напряму, а не через aspect-ratio, для надійності
   * незалежно від CSS-підтримки/перекриття стилів.
   */
  heightDesktop?: number;
  /** Фіксована висота контейнера в пікселях (mobile, <640px) */
  heightMobile?: number;
  /** Максимальна ширина контейнера в пікселях */
  maxWidth?: number;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  beforeLabel = "До",
  afterImage,
  afterVideo,
  afterLabel = "Після",
  alt,
  initialPosition = 50,
  heightDesktop = 640,
  heightMobile = 480,
  maxWidth = 380,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);

  const updatePositionFromClientX = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const relativeX = clientX - rect.left;
    const percentage = (relativeX / rect.width) * 100;
    const clamped = Math.min(100, Math.max(0, percentage));

    setPosition(clamped);
  }, []);

  // Mouse handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    updatePositionFromClientX(e.clientX);
  };

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    updatePositionFromClientX(e.touches[0].clientX);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      updatePositionFromClientX(e.clientX);
    };
    const handleTouchMove = (e: TouchEvent) => {
      updatePositionFromClientX(e.touches[0].clientX);
    };
    const handleEnd = () => setIsDragging(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleEnd);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleEnd);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleEnd);
    };
  }, [isDragging, updatePositionFromClientX]);

  // Keyboard support — left/right arrows move the divider, for accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      setPosition((prev) => Math.max(0, prev - 5));
    } else if (e.key === "ArrowRight") {
      setPosition((prev) => Math.min(100, prev + 5));
    }
  };

  return (
    <div
      ref={containerRef}
      style={
        {
          height: heightMobile,
          maxWidth,
          // Desktop height takes over at the sm breakpoint via CSS var + media query below
          "--height-desktop": `${heightDesktop}px`,
        } as React.CSSProperties
      }
      className="relative w-full mx-auto rounded-2xl overflow-hidden select-none bg-neutral-900 cursor-ew-resize before-after-slider-root"
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      <style>{`
        @media (min-width: 640px) {
          .before-after-slider-root {
            height: var(--height-desktop) !important;
          }
        }
      `}</style>

      {/* "After" layer — full size, sits on bottom */}
      <div className="absolute inset-0">
        {afterVideo ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={afterVideo} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={afterImage ?? ""}
            alt={`${alt} — ${afterLabel.toLowerCase()}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        )}
      </div>

      {/* "Before" layer — clipped to reveal only up to the divider position */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={beforeImage}
          alt={`${alt} — ${beforeLabel.toLowerCase()}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs font-medium uppercase tracking-wider pointer-events-none">
        {beforeLabel}
      </div>
      <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-brand/80 backdrop-blur-sm text-white text-xs font-medium uppercase tracking-wider pointer-events-none">
        {afterLabel}
      </div>

      {/* Divider line + handle */}
      <div
        className="absolute top-0 bottom-0 z-20 w-0.5 bg-white shadow-[0_0_12px_rgba(0,0,0,0.4)] pointer-events-none"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
      >
        <div
          role="slider"
          tabIndex={0}
          aria-label="Розділювач порівняння до і після"
          aria-valuenow={Math.round(position)}
          aria-valuemin={0}
          aria-valuemax={100}
          onKeyDown={handleKeyDown}
          className="pointer-events-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 3L1.5 9L6 15"
              stroke="#171717"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 3L16.5 9L12 15"
              stroke="#171717"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
