interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono text-xs tracking-wide uppercase px-3 py-1 rounded-full border border-[var(--color-border-700)] text-[var(--color-text-500)] ${className}`}
    >
      {children}
    </span>
  );
}
