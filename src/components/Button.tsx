"use client";

import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  href?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--color-accent)] text-[var(--color-accent-ink)] shadow-[var(--shadow-sm)] hover:bg-[var(--color-accent-600)] hover:shadow-[var(--shadow-md)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[var(--shadow-sm)]",
  secondary:
    "bg-[var(--color-surface)] border border-[var(--color-border-strong)] text-[var(--color-text)] shadow-[var(--shadow-sm)] hover:border-[color-mix(in_oklch,var(--color-accent)_42%,var(--color-border-strong))] hover:shadow-[var(--shadow-md)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[var(--shadow-sm)]",
  ghost:
    "text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[color-mix(in_oklch,var(--color-accent)_10%,transparent)]",
};

export function Button({
  children,
  variant = "primary",
  href,
  type = "button",
  disabled = false,
  className = "",
  onClick,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 font-heading font-semibold text-[15px] leading-none px-5 py-3 rounded-full transition-[transform,box-shadow,background-color,border-color,color] duration-200 ease-out cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)] disabled:opacity-50 disabled:cursor-not-allowed";

  if (href) {
    return (
      <Link
        href={href}
        className={`${base} ${variantStyles[variant]} ${disabled ? "pointer-events-none opacity-50" : ""} ${className}`}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : undefined}
        onClick={(e) => {
          if (disabled) {
            e.preventDefault();
            return;
          }
          onClick?.();
        }}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${base} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
