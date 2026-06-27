// src/components/sections/BeforeAfterSection.tsx
import React from "react";
import uaLocale from "../../locales/ua.json";
import { BeforeAfterSlider } from "./BeforeAfterSlider/BeforeAfterSlider";

export const BeforeAfterSection = () => {
  const t = uaLocale.home;

  return (
    <section
      id="before-after"
      className="relative w-full bg-bg-dark py-24 md:py-32 scroll-mt-20"
    >
      <div className="container px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text column */}
          <div className="flex flex-col items-start text-left order-2 lg:order-1">
            <span className="text-brand text-sm font-semibold uppercase tracking-wider mb-4">
              {t.beforeAfterEyebrow}
            </span>
            <h2 className="text-text-main mb-6 text-4xl md:text-5xl font-bold leading-tight">
              {t.beforeAfterTitle}
            </h2>
            <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-8 max-w-md">
              {t.beforeAfterSubtitle}
            </p>
            <p className="text-gray-500 text-sm flex items-center gap-2">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-brand shrink-0"
              >
                <path
                  d="M3 8H13M13 8L9 4M13 8L9 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {t.beforeAfterHint}
            </p>
          </div>

          {/* Slider column — vertical, Reels/TikTok-style, fixed height */}
          <div className="order-1 lg:order-2 flex justify-center w-full">
            <BeforeAfterSlider
              beforeImage="/before-after/before.jpg"
              afterVideo="/before-after/after.mp4"
              alt="Товар до і після AI-обробки"
              beforeLabel={t.beforeAfterBeforeLabel}
              afterLabel={t.beforeAfterAfterLabel}
              heightMobile={480}
              heightDesktop={640}
              maxWidth={440}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
