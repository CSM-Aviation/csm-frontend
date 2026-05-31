"use client";

import { cn } from "@/lib/utils";
import { useReveal } from "@/lib/useReveal";

interface HorizonRuleProps {
  /** Stroke color by band (§07). */
  color?: "line" | "line-dark" | "gold";
  /** Draw left-to-right on reveal (the signature gesture). Off = static line. */
  animate?: boolean;
  className?: string;
}

const STROKE: Record<NonNullable<HorizonRuleProps["color"]>, string> = {
  line: "stroke-line",
  "line-dark": "stroke-line-dark",
  gold: "stroke-gold",
};

/**
 * The horizon rule — a single fine line that subtly arcs (echoing the logo's
 * curved baseline), not a flat <hr>. Decorative, so aria-hidden. When
 * `animate`, it draws across on reveal over --dur-line / --ease-horizon;
 * useReveal short-circuits to a drawn (static) line under reduced motion.
 */
export function HorizonRule({ color = "line", animate = false, className }: HorizonRuleProps) {
  const { ref, shown } = useReveal<HTMLDivElement>({ threshold: 0.2 });
  const drawn = !animate || shown;

  return (
    <div ref={ref} className={cn("w-full", className)} aria-hidden>
      <svg
        viewBox="0 0 1200 12"
        preserveAspectRatio="none"
        className="h-[12px] w-full"
        role="presentation"
      >
        <path
          d="M0,9 Q600,3 1200,9"
          fill="none"
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
          pathLength={1}
          className={STROKE[color]}
          style={{
            strokeDasharray: 1,
            strokeDashoffset: drawn ? 0 : 1,
            transition: "stroke-dashoffset var(--dur-line) var(--ease-horizon)",
          }}
        />
      </svg>
    </div>
  );
}
