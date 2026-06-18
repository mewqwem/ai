import React from "react";
import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4 text-brand">
        <LoaderCircle className="w-16 h-16 animate-spin" />
        <span className="text-sm font-medium tracking-wide text-text-muted">
          Завантаження...
        </span>
      </div>
    </div>
  );
}
