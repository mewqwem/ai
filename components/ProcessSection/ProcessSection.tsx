// src/components/sections/ProcessSection.tsx
import React from "react";
import uaLocale from "../../locales/ua.json";

export const ProcessSection = () => {
  const t = uaLocale.home;

  const steps = [
    { number: t.step1Number, title: t.step1Title, desc: t.step1Desc },
    { number: t.step2Number, title: t.step2Title, desc: t.step2Desc },
    { number: t.step3Number, title: t.step3Title, desc: t.step3Desc },
    { number: t.step4Number, title: t.step4Title, desc: t.step4Desc },
  ];

  return (
    <section
      id="process"
      className="relative w-full bg-bg-dark py-24 md:py-32 scroll-mt-20"
    >
      <div className="container px-4">
        {/* Section header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-20">
          <span className="text-brand text-sm font-semibold uppercase tracking-wider mb-3">
            {t.processEyebrow}
          </span>
          <h2 className="text-text-main max-w-2xl mb-4">{t.processTitle}</h2>
          <p className="text-gray-400 max-w-xl text-base md:text-lg">
            {t.processSubtitle}
          </p>
        </div>

        {/* Steps */}
        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6">
          {/* Connecting line — desktop only, sits behind the number markers */}
          <div className="hidden md:block absolute top-7 left-0 w-full h-px bg-white/10" />

          {steps.map((step, index) => (
            <div
              key={step.number}
              className="relative flex flex-col items-start text-left"
            >
              {/* Number marker */}
              <div className="relative z-10 w-14 h-14 rounded-full bg-bg-card border border-white/10 flex items-center justify-center mb-6">
                <span className="text-brand font-bold text-lg">
                  {step.number}
                </span>
              </div>

              <h3 className="text-text-main text-lg md:text-xl font-semibold mb-2">
                {step.title}
              </h3>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                {step.desc}
              </p>

              {/* Arrow connector between steps, desktop only, skip after the last item */}
              {index < steps.length - 1 && (
                <div className="hidden md:flex absolute top-6 -right-3 translate-x-1/2 text-white/20">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 8H15M15 8L9 2M15 8L9 14"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
