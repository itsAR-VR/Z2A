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
        alt ? "bg-[var(--color-bg-850)]" : ""
      } ${className}`}
    >
      <div className="container-content">{children}</div>
    </section>
  );
}
