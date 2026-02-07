interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.14em] uppercase px-3 py-1 rounded-full border border-[var(--color-border)] bg-[color-mix(in_oklch,var(--color-accent)_8%,var(--color-surface))] text-[var(--color-text-muted)] ${className}`}
    >
      {children}
    </span>
  );
}
