// src/components/MobileMenu.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

interface MobileMenuProps {
  navItems: Array<{ label: string; href: string }>;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ navItems }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      {/* Updated burger icon color for dark theme */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-text-main hover:text-brand transition-colors focus:outline-none cursor-pointer"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 top-20 bg-black/60 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Updated mobile menu panel colors for dark theme */}
      <div
        className={`
        fixed top-20 right-0 w-64 h-[calc(100vh-5rem)] bg-bg-card border-l border-white/10 p-6 z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}
      `}
      >
        <nav className="flex flex-col gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="text-lg font-medium text-text-main hover:text-brand transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};
