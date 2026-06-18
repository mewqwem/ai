"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button/Button";

interface MobileMenuProps {
  navItems: Array<{ label: string; href: string }>;
}

const socialLinks = [
  {
    href: "https://instagram.com",
    label: "Instagram",
    svg: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    href: "https://youtube.com",
    label: "YouTube",
    svg: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22.54 6.42A2.78 2.78 0 0 0 20.6 4.47C18.88 4 12 4 12 4s-6.88 0-8.6.47A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.4 19.53C5.12 20 12 20 12 20s6.88 0 8.6-.47a2.78 2.78 0 0 0 1.94-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon
          points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"
          fill="currentColor"
          stroke="none"
        />
      </svg>
    ),
  },
  {
    href: "https://facebook.com",
    label: "Facebook",
    svg: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
];

export const MobileMenu: React.FC<MobileMenuProps> = ({ navItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  // Lock scroll on both html and body
  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close when clicking outside the panel (not on burger)
  useEffect(() => {
    if (!isOpen) return;
    const handle = (e: PointerEvent) => {
      const target = e.target as Node;
      const inPanel = panelRef.current?.contains(target);
      const inBurger = burgerRef.current?.contains(target);
      if (!inPanel && !inBurger) {
        setIsOpen(false);
      }
    };
    document.addEventListener("pointerdown", handle, true);
    return () => document.removeEventListener("pointerdown", handle, true);
  }, [isOpen]);

  const close = () => setIsOpen(false);

  return (
    // Wrapper gets z-index context above the header (header is z-50 = 50)
    <div className="md:hidden" style={{ position: "relative", zIndex: 60 }}>
      {/* Burger button */}
      <button
        ref={burgerRef}
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative p-2 text-text-main hover:text-brand transition-colors focus:outline-none cursor-pointer"
        aria-label={isOpen ? "Закрити меню" : "Відкрити меню"}
      >
        <span
          className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
            isOpen ? "opacity-100 rotate-0" : "opacity-0 rotate-90"
          }`}
        >
          <X size={26} />
        </span>
        <span
          className={`flex items-center justify-center transition-all duration-300 ${
            isOpen ? "opacity-0 -rotate-90" : "opacity-100 rotate-0"
          }`}
        >
          <Menu size={26} />
        </span>
      </button>

      {/* Backdrop — z-index above header (z-50 = 50), so header is blocked too */}
      <div
        aria-hidden="true"
        style={{ zIndex: 61 }}
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Slide-in panel — above backdrop */}
      <div
        ref={panelRef}
        style={{ zIndex: 62, height: "100svh" }}
        className={`
          fixed top-0 right-0 w-72
          bg-[#111827]/95 backdrop-blur-md
          border-l border-white/10
          flex flex-col
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Top: logo + close */}
        <div className="flex items-center justify-between px-6 h-20 border-b border-white/10 shrink-0">
          <Link
            href="/"
            onClick={close}
            className="text-xl font-bold tracking-tight text-text-main"
          >
            AI<span className="text-brand">Media</span>
          </Link>
          <button
            onClick={close}
            className="p-1.5 rounded-md text-text-main/50 hover:text-text-main hover:bg-white/5 transition-all"
            aria-label="Закрити меню"
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav links — scrollable if many items */}
        <nav className="flex flex-col px-6 pt-6 gap-1 flex-1 overflow-y-auto">
          {navItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={close}
              className="group flex items-center gap-3 py-3.5 text-base font-medium text-text-main/80 hover:text-brand transition-colors border-b border-white/5 last:border-0"
              style={{ transitionDelay: isOpen ? `${index * 50}ms` : "0ms" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand/40 group-hover:bg-brand transition-colors shrink-0" />
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Bottom: CTA + socials */}
        <div className="px-6 pb-8 pt-4 flex flex-col gap-5 border-t border-white/10 shrink-0">
          <Button
            href="/order"
            variant="primary"
            className="w-full justify-center"
            onClick={close}
          >
            Замовити послугу
          </Button>

          <div className="flex items-center gap-3 justify-center">
            {socialLinks.map(({ svg, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 flex items-center justify-center rounded-full border border-white/10 text-text-main/60 hover:text-brand hover:border-brand/40 transition-all"
              >
                {svg}
              </a>
            ))}
          </div>

          <p className="text-center text-xs text-text-main/30 tracking-wide">
            © {new Date().getFullYear()} AIMedia
          </p>
        </div>
      </div>
    </div>
  );
};
