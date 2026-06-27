// src/components/Header.tsx
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button/Button";
import { MobileMenu } from "./MobileMenu/MobileMenu";
import { Navigation } from "./Navigation/Navigation";

const navItems = [
  { label: "Головна", href: "/" },
  { label: "Каталог", href: "/catalog" },
];

export const Header = () => {
  return (
    // UI: Header background uses semantic dark theme token with blur
    <header className="fixed top-0 left-0 w-full z-50 bg-bg-dark/80 backdrop-blur-md border-b border-surface-inverse/10">
      <div className="container h-20 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight text-text-main"
        >
          AI<span className="text-brand">Media</span>
        </Link>

        <Navigation navItems={navItems} />

        <div className="flex items-center gap-4">
          <Button
            href="/order"
            variant="primary"
            className="hidden sm:inline-flex"
          >
            Замовити відео
          </Button>

          <MobileMenu navItems={navItems} />
        </div>
      </div>
    </header>
  );
};
