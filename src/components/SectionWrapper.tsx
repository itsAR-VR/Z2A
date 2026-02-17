interface SectionWrapperProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  /** Use alternate background color */
  alt?: boolean;
}

export function SectionWrapper({
  id,
  children,
  className = "",
  alt = false,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={`section-padding ${
        alt
          ? "bg-[color-mix(in_oklch,var(--color-accent)_2%,var(--color-bg))]"
          : ""
      } ${className}`}
    >
      <div className="container-content">{children}</div>
    </section>
  );
}
