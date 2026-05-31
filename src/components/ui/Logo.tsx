import Image from "next/image";

export type LogoTone = "reversed" | "positive" | "block";

interface LogoConfig {
  src: string;
  /** Intrinsic aspect from the source artwork viewBox. */
  ratio: number;
  alt: string;
}

/**
 * Brand master artwork (§3.4) — reproduced only from these files, never
 * re-typeset:
 *  - reversed: Fog mark on dark/Petrol grounds (header over hero)
 *  - positive: Petrol mark on light/Fog grounds (solid header on scroll)
 *  - block:    Fog mark in a Petrol container (busy/photographic grounds, footer)
 */
const CONFIG: Record<LogoTone, LogoConfig> = {
  reversed: {
    src: "/images/logos/csm-mark-fog.svg",
    ratio: 66.39 / 23.73,
    alt: "CSM Aviation",
  },
  positive: {
    src: "/images/logos/csm-mark-petrol.svg",
    ratio: 66.39 / 23.73,
    alt: "CSM Aviation",
  },
  block: {
    src: "/images/logos/csm-block-petrol.svg",
    ratio: 84.05 / 61.18,
    alt: "CSM Aviation",
  },
};

interface LogoProps {
  tone?: LogoTone;
  /** Rendered width in px. Brand min is 90px for the wordmark (§04). */
  width?: number;
  className?: string;
  /** Set on the LCP/header instance; decorative duplicates can pass false. */
  priority?: boolean;
  /** Mark the duplicate footer/decorative instance as non-informative. */
  decorative?: boolean;
}

const MIN_WORDMARK_WIDTH = 90;

export function Logo({
  tone = "positive",
  width,
  className,
  priority = false,
  decorative = false,
}: LogoProps) {
  const { src, ratio, alt } = CONFIG[tone];
  const isBlock = tone === "block";
  // Enforce the 90px brand minimum on the open wordmark lockups.
  const resolvedWidth = width ?? (isBlock ? 96 : 132);
  const safeWidth = isBlock ? resolvedWidth : Math.max(resolvedWidth, MIN_WORDMARK_WIDTH);
  const height = Math.round(safeWidth / ratio);

  return (
    <Image
      src={src}
      alt={decorative ? "" : alt}
      aria-hidden={decorative || undefined}
      width={safeWidth}
      height={height}
      priority={priority}
      unoptimized
      className={className}
      style={{ width: safeWidth, height: "auto" }}
    />
  );
}
