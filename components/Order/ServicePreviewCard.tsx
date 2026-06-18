import Image from "next/image";
import { Product } from "@/data/types";

interface ServicePreviewCardProps {
  product: Product;
}

export const ServicePreviewCard: React.FC<ServicePreviewCardProps> = ({
  product,
}) => {
  return (
    <div className="bg-bg-card border border-white/10 rounded-2xl overflow-hidden flex flex-col sm:flex-row">
      <div className="relative w-full sm:w-48 aspect-square sm:aspect-auto shrink-0">
        {product.type === "video" ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={product.mediaUrls[0]} type="video/mp4" />
          </video>
        ) : (
          <Image
            fill
            src={product.mediaUrls[0]}
            alt={product.title}
            className="object-cover"
            sizes="200px"
          />
        )}
      </div>

      <div className="p-5 flex flex-col justify-center">
        <span className="text-xs text-brand font-semibold uppercase tracking-wide mb-1">
          {product.category}
        </span>
        <h3 className="text-text-main mb-1">{product.title}</h3>
        <p className="text-text-muted text-sm">
          {product.isStartingPrice ? "Від " : ""}${product.price} ·{" "}
          {product.turnaroundTime}
        </p>
      </div>
    </div>
  );
};
