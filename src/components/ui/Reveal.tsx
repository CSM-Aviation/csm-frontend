"use client";

import { useReveal } from "@/lib/useReveal";
import { cn } from "@/lib/utils";

interface RevealProps {
  as?: keyof JSX.IntrinsicElements;
  /** Stagger offset in ms for grouped reveals (§06 ≈ 80ms steps). */
  delay?: number;
  className?: string;
  children: React.ReactNode;
}

/**
 * Opt-in scroll reveal: content fades in and rises 24px once, ~15% into the
 * viewport (§06). Under reduced motion useReveal returns shown=true immediately,
 * so this degrades to a static, instantly-visible block. Lets server pages
 * sprinkle motion without becoming client components themselves.
 */
export function Reveal({ as: Tag = "div", delay = 0, className, children }: RevealProps) {
  const { ref, shown } = useReveal<HTMLElement>();
  const Component = Tag as React.ElementType;
  return (
    <Component
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : "translateY(24px)",
        transition: `opacity var(--dur-slow) var(--ease-calm) ${delay}ms, transform var(--dur-slow) var(--ease-calm) ${delay}ms`,
      }}
    >
      {children}
    </Component>
  );
}
