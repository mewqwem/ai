"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

interface CategoryCardProps {
  title: string;
  description: string;
  mediaUrl: string;
  mediaType: "video" | "photo";
  href: string;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  description,
  mediaUrl,
  mediaType,
  href,
}) => {
  const [isMediaLoaded, setIsMediaLoaded] = useState<boolean>(false);

  return (
    // UI: Main card container using semantic dark surface background
    <Link
      href={href}
      className="group relative w-full h-[450px] rounded-2xl overflow-hidden block bg-bg-surface-dark"
    >
      {/* --- SKELETON LOADER --- */}
      {!isMediaLoaded && (
        <div className="absolute inset-0 z-10 overflow-hidden bg-bg-surface-dark">
          {/* Base pulsing gradient background using semantic tokens */}
          <div className="absolute inset-0 bg-gradient-to-br from-bg-surface-dark via-bg-panel/60 to-bg-surface-dark animate-skeleton-pulse" />

          {/* Moving diagonal shimmer (GPU transform, avoids background-position) */}
          <div
            className="absolute top-0 left-0 h-full w-1/2 -skew-x-12 animate-shimmer"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.16) 50%, transparent 100%)",
            }}
          />
        </div>
      )}
      {/* ------------------------ */}

      {/* Background media */}
      <div className="absolute inset-0 z-0">
        {mediaType === "video" ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            onLoadedData={() => setIsMediaLoaded(true)}
            className={`w-full h-full object-cover transition-opacity duration-700 ${
              isMediaLoaded ? "opacity-100" : "opacity-0"
            }`}
          >
            <source src={mediaUrl} type="video/mp4" />
          </video>
        ) : (
          <Image
            fill
            src={mediaUrl}
            alt={title}
            onLoad={() => setIsMediaLoaded(true)}
            className={`w-full h-full object-cover transition-opacity duration-700 ${
              isMediaLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        )}
      </div>

      {/* Dark overlay: ensures text readability over media */}
      <div className="absolute inset-0 bg-overlay-dark/50 transition-colors duration-500 group-hover:bg-overlay-dark/70 z-15"></div>

      {/* Content container */}
      <div className="absolute inset-0 z-20 p-8 flex flex-col justify-center items-center text-center transition-transform duration-500 transform group-hover:-translate-y-8">
        <h2 className="text-white m-0 transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-4 drop-shadow-md">
          {title}
        </h2>
        <div className="absolute top-1/2 mt-8 opacity-0 transition-all duration-500 group-hover:opacity-100 flex flex-col items-center w-full px-6">
          <p className="text-white/80 mb-6 max-w-sm line-clamp-3">
            {description}
          </p>
          {/* Note: bg-brand is already a valid token */}
          <div className="w-12 h-12 rounded-full bg-brand flex items-center justify-center text-white transform translate-y-4 transition-transform duration-500 group-hover:translate-y-0 shadow-lg">
            <ArrowRight size={24} />
          </div>
        </div>
      </div>
    </Link>
  );
};
