interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

export function Card({ children, className = "", hoverable = true }: CardProps) {
  return (
    <div
      className={`rounded-xl border border-[var(--color-border-700)] bg-[var(--color-bg-800)] p-6 md:p-8 ${
        hoverable
          ? "transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.35)] hover:border-[var(--color-text-500)]/20"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
