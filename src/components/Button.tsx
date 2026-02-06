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
    "bg-[var(--color-accent-500)] text-[var(--color-bg-900)] hover:bg-[var(--color-accent-600)] hover:shadow-[0_0_24px_rgba(33,226,124,0.25)] hover:-translate-y-0.5",
  secondary:
    "border border-[var(--color-border-700)] text-[var(--color-text-100)] hover:border-[var(--color-accent-500)] hover:text-[var(--color-accent-500)]",
  ghost:
    "text-[var(--color-text-300)] hover:text-[var(--color-accent-500)]",
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
    "inline-flex items-center justify-center gap-2 font-heading font-semibold text-sm px-6 py-3 rounded-lg transition-all duration-200 ease-out cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

  if (href) {
    return (
      <Link href={href} className={`${base} ${variantStyles[variant]} ${className}`}>
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
