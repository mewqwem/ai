import React from "react";
import { LoaderCircle } from "lucide-react";

export const Spinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-full h-full p-4 text-brand">
      <LoaderCircle className="w-10 h-10 animate-spin" />
    </div>
  );
};
