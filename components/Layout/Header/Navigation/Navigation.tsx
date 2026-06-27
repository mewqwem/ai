// src/components/Navigation/Navigation.tsx
import React from "react";
import Link from "next/link";

interface NavigationProps {
  navItems: Array<{ label: string; href: string }>;
}

export const Navigation: React.FC<NavigationProps> = ({ navItems }) => {
  return (
    <nav className="hidden md:flex items-center gap-8">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="text-text-muted hover:text-text-main transition-colors font-medium text-sm"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};
