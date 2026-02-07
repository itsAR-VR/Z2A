interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

export function Card({ children, className = "", hoverable = true }: CardProps) {
  return (
    <div
      className={`rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 md:p-8 shadow-[var(--shadow-sm)] ${
        hoverable
          ? "transition-[transform,box-shadow,border-color] duration-200 ease-out hover:-translate-y-1 hover:shadow-[var(--shadow-md)] hover:border-[color-mix(in_oklch,var(--color-accent)_25%,var(--color-border-strong))]"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
