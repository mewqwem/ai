// src/components/sections/HeroSection.tsx
import React from "react";
import Image from "next/image";
import uaLocale from "../../locales/ua.json";
import { Button } from "../ui/Button/Button";

export const HeroSection = () => {
  const t = uaLocale.home;

  return (
    // UI: The section takes full width and height, acting as the relative wrapper for absolute media
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-bg-dark">
      {/* --- HERO IMAGE BACKGROUND --- */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/PhotoData/Mora-images/9.png" // Path to your hero image in the public folder
          alt="AIMedia Production Hero Background"
          fill
          priority // Tells Next.js to load this image immediately (LCP optimization)
          className="object-cover"
          sizes="100vw"
          quality={90}
        />
        {/* UI: Overlay to guarantee high text contrast and readability */}
        <div className="absolute inset-0 bg-bg-dark/40 backdrop-blur-[2px]" />
      </div>
      {/* ----------------------------- */}

      {/* The container is placed INSIDE to restrict only the text and buttons width */}
      <div className="container relative z-20 flex flex-col items-center text-center px-4 pt-20">
        {/* UI: Title uses main semantic text token */}
        <h1 className="text-text-main mb-6 max-w-4xl drop-shadow-sm">
          {t.title}
        </h1>

        {/* UI: Subtitle shifted from hardcoded text-gray-300 to semantic text-text-muted */}
        <p className="text-text-muted mb-10 max-w-2xl text-lg md:text-xl drop-shadow-sm">
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
