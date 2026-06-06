"use client";

import { useEffect, useRef, useState } from "react";

interface UseRevealOptions {
  /** Visible fraction of the element required to trigger. Design doc §06 ≈ 15%. */
  threshold?: number;
  /** Reveal only once, then stop observing (default true). */
  once?: boolean;
  /** Shrink the trigger area; e.g. "0px 0px -10% 0px" to fire slightly early. */
  rootMargin?: string;
}

/**
 * IntersectionObserver-backed reveal hook. Returns a ref to attach and a
 * `shown` flag. Every scroll reveal and horizon draw routes through this.
 *
 * A11y (design doc §06/§18): when `prefers-reduced-motion: reduce`, the hook
 * short-circuits to instantly visible — no observer, no transition wait — so
 * animations never gate content for motion-sensitive users.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.15,
  once = true,
  rootMargin = "0px 0px -8% 0px",
}: UseRevealOptions = {}) {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Respect reduced-motion: reveal immediately, skip observation entirely.
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setShown(true);
      return;
    }

    // SSR / unsupported guard.
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            if (once) observer.disconnect();
          } else if (!once) {
            setShown(false);
          }
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, once, rootMargin]);

  return { ref, shown };
}
