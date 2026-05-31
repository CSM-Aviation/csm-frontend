"use client";

import { cn } from "@/lib/utils";
import { useReveal } from "@/lib/useReveal";

interface CheatlineProps {
  /** Draw the bars in on reveal (once). */
  animate?: boolean;
  className?: string;
}

/**
 * The brand cheatline (§07/brand §08): heavy Saddle over fine Gold, 2:1,
 * parallel, never angled, never more than two bars. Use at MOST once per page —
 * typically the seam between a dark CTA band and the footer. Decorative.
 */
export function Cheatline({ animate = true, className }: CheatlineProps) {
  const { ref, shown } = useReveal<HTMLDivElement>({ threshold: 0.4 });
  const drawn = !animate || shown;

  return (
    <div ref={ref} aria-hidden className={cn("flex w-24 flex-col gap-s1", className)}>
      <span
        className="h-1 w-full origin-left bg-saddle transition-transform duration-line ease-horizon"
        style={{ transform: `scaleX(${drawn ? 1 : 0})` }}
      />
      <span
        className="h-0.5 w-full origin-left bg-gold transition-transform duration-line ease-horizon"
        style={{ transform: `scaleX(${drawn ? 1 : 0})`, transitionDelay: "120ms" }}
      />
    </div>
  );
}
