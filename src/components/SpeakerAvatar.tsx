"use client";

import { useMemo, useState } from "react";

function getInitialsFromName(name: string): string {
  const parts = name
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

type SpeakerAvatarProps = {
  name: string;
  initials?: string;
  src?: string;
  size?: number;
  className?: string;
};

export function SpeakerAvatar({
  name,
  initials,
  src,
  size = 56,
  className = "",
}: SpeakerAvatarProps) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const monogram = useMemo(
    () => initials?.trim() || getInitialsFromName(name),
    [initials, name],
  );

  const shouldRenderImage = Boolean(src) && !failed;

  return (
    <div
      className={`relative shrink-0 rounded-full overflow-hidden border border-[color-mix(in_oklch,var(--color-accent)_22%,var(--color-border))] bg-[color-mix(in_oklch,var(--color-accent)_10%,var(--color-surface))] ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-heading font-bold text-[var(--color-accent)] text-[18px] tracking-tight">
          {monogram}
        </span>
      </div>

      {shouldRenderImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-200 ${loaded ? "opacity-100" : "opacity-0"}`}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => {
            setFailed(true);
            setLoaded(false);
          }}
        />
      ) : null}
    </div>
  );
}
