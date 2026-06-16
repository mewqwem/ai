// src/components/sections/HeroSection.tsx
import React from "react";
import uaLocale from "../../locales/ua.json";
import { Button } from "../ui/Button/Button";

export const HeroSection = () => {
  const t = uaLocale.home;

  return (
    // The section itself takes full width and height, acting as the wrapper
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/60 z-10"></div>

      {/* Full-width background video stretching across the entire section */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source
          src="https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4"
          type="video/mp4"
        />
      </video>

      {/* The container is placed INSIDE to restrict only the text and buttons width */}
      <div className="container relative z-20 flex flex-col items-center text-center px-4 pt-20">
        <h1 className="text-text-main mb-6 max-w-4xl drop-shadow-lg">
          {t.title}
        </h1>

        <p className="text-gray-300 mb-10 max-w-2xl text-lg md:text-xl drop-shadow-md">
          {t.subtitle}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Button href="/catalog" variant="primary">
            {t.ctaPrimary}
          </Button>
          <Button href="/order" variant="secondary">
            {t.ctaSecondary}
          </Button>
        </div>
      </div>
    </section>
  );
};
