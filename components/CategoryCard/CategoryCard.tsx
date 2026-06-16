// src/components/CategoryCard.tsx
import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

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
  return (
    <Link
      href={href}
      className="group relative w-full h-[450px] rounded-2xl overflow-hidden block"
    >
      {/* Background media with slow scaling effect on hover */}
      <div className="absolute inset-0 z-0">
        {mediaType === "video" ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          >
            <source src={mediaUrl} type="video/mp4" />
          </video>
        ) : (
          <img
            src={mediaUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        )}
      </div>

      {/* Dark overlay that gets slightly darker on hover for better text contrast */}
      <div className="absolute inset-0 bg-black/50 transition-colors duration-500 group-hover:bg-black/70 z-10"></div>

      {/* Content container positioned to center, moving elements on hover */}
      <div className="absolute inset-0 z-20 p-8 flex flex-col justify-center items-center text-center transition-transform duration-500 transform group-hover:-translate-y-8">
        {/* Title is always visible, scales up and moves up slightly on hover */}
        <h2 className="text-white m-0 transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-4 drop-shadow-md">
          {title}
        </h2>

        {/* Description and arrow container, hidden by default, fades in and slides up on hover */}
        <div className="absolute top-1/2 mt-8 opacity-0 transition-all duration-500 group-hover:opacity-100 flex flex-col items-center w-full px-6">
          <p className="text-gray-200 mb-6 max-w-sm line-clamp-3">
            {description}
          </p>

          {/* Action button icon appearing from the bottom */}
          <div className="w-12 h-12 rounded-full bg-brand flex items-center justify-center text-white transform translate-y-4 transition-transform duration-500 group-hover:translate-y-0 shadow-lg">
            <ArrowRight size={24} />
          </div>
        </div>
      </div>
    </Link>
  );
};
