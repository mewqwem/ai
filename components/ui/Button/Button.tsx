// src/components/Button.tsx
import React, { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "outlined";

interface BaseButtonProps {
  variant?: ButtonVariant;
  href?: string;
  className?: string;
  children: React.ReactNode;
}

type ButtonProps = BaseButtonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps> &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseButtonProps>;

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  href,
  className = "",
  children,
  type = "button",
  ...props
}) => {
  // Updated base styles to use custom CSS variables
  const baseStyles =
    "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 active:scale-95 py-2.5 px-4 text-sm md:py-3 md:px-6 md:text-base cursor-pointer";

  // Fixed contrast for secondary and outlined buttons
  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-brand text-text-main hover:bg-brand-hover shadow-md hover:shadow-lg",
    secondary: "bg-white/10 text-text-main hover:bg-white/20 backdrop-blur-sm",
    outlined: "border-2 border-brand text-brand hover:bg-brand/10",
  };

  const combinedClassName = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link
        href={href}
        className={combinedClassName}
        {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={combinedClassName}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
};
