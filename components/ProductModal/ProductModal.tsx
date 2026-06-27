// src/components/ProductModal/ProductModal.tsx
"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/data/types";
import { ProductContent } from "../ProductContent/ProductContent";

/**
 * Modal overlay wrapper. Only responsible for the backdrop, the
 * open/close animation, and closing behavior (click outside, Escape,
 * close button). The actual product UI lives in ProductContent.
 * Renders ONLY in the @modal parallel route slot, never on the
 * standalone full page.
 */
export const ProductModal = ({ product }: { product: Product }) => {
  const router = useRouter();

  const handleClose = () => {
    // router.back() reliably releases the @modal slot back to
    // default.tsx in production.
    // Fallback to router.push() if accessed directly via URL
    // without catalog history, avoiding exiting the site entirely.
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(`/catalog/${product.categorySlug}`);
    }
  };

  useEffect(() => {
    // Lock background scrolling while modal is open
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      // Restore background scrolling when modal unmounts
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

      {/* UI: Overlay backdrop using dark overlay token */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-overlay-dark/80 p-4 md:p-6 animate-modal-bg"
        onClick={handleClose}
      >
        {/* UI: Modal container using specific dark surface token */}
        <div
          className="bg-bg-dark border border-surface-inverse/10 rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden relative animate-modal-card shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <ProductContent product={product} onClose={handleClose} />
        </div>
      </div>
    </>
  );
};
