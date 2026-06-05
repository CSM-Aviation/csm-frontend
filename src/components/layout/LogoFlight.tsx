"use client";

import { useEffect, useRef } from "react";
import { Logo } from "@/components/ui/Logo";

/**
 * Scroll-linked "shared element" morph (home page only). As the page scrolls, a
 * fixed decorative clone of the brand mark travels and shrinks from the centred
 * hero logo (#hero-logo) into the header logo slot (#header-logo), crossfading
 * tone reversed→positive as the header solidifies. The two real logos remain the
 * accessible/interactive elements — we just hand visibility off to whichever sits
 * at an endpoint and let the clone cover the in-between.
 *
 * Imperative rAF + passive listeners mirror <ScrollProgress>; no per-frame React
 * re-render. Disabled entirely under prefers-reduced-motion, restoring each
 * component's own opacity logic.
 */
const HERO_WIDTH = 400;

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const smoothstep = (t: number) => t * t * (3 - 2 * t);

export function LogoFlight() {
  const cloneRef = useRef<HTMLDivElement>(null);
  const reversedRef = useRef<HTMLDivElement>(null);
  const positiveRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const clone = cloneRef.current;
    const reversed = reversedRef.current;
    const positive = positiveRef.current;
    const heroEl = document.getElementById("hero-logo");
    const headerEl = document.getElementById("header-logo");
    if (!clone || !reversed || !positive || !heroEl || !headerEl) return;

    // Take over the header logo's visibility for the duration of the flight; the
    // instant (transition-less) handoff matches the clone's instant hide so there
    // is no fade dip at the endpoints.
    headerEl.style.transition = "none";

    let heroTop0 = 0;
    let heroLeft0 = 0;
    let headerTop = 0;
    let headerLeft = 0;
    let scaleEnd = HERO_WIDTH ? 168 / HERO_WIDTH : 0.42;
    let distance = 1;

    const measure = () => {
      const heroRect = heroEl.getBoundingClientRect();
      const headerRect = headerEl.getBoundingClientRect();
      // Document-absolute top == viewport top at scrollY 0 (our p=0 anchor).
      heroTop0 = heroRect.top + window.scrollY;
      heroLeft0 = heroRect.left;
      headerTop = headerRect.top;
      headerLeft = headerRect.left;
      scaleEnd = headerRect.width / heroRect.width;
      distance = Math.max(1, heroTop0 - headerTop);
    };

    let frame = 0;
    const render = () => {
      frame = 0;
      const p = Math.min(1, Math.max(0, window.scrollY / distance));
      const scale = lerp(1, scaleEnd, p);
      clone.style.transform = `translate(${lerp(heroLeft0, headerLeft, p)}px, ${lerp(
        heroTop0,
        headerTop,
        p,
      )}px) scale(${scale})`;

      const s = smoothstep(p);
      reversed.style.opacity = String(1 - s);
      positive.style.opacity = String(s);

      // Endpoint handoff: clone covers the in-between, reals own the endpoints.
      clone.style.opacity = p > 0 && p < 1 ? "1" : "0";
      heroEl.style.opacity = p === 0 ? "1" : "0";
      const docked = p >= 1;
      headerEl.style.opacity = docked ? "1" : "0";
      headerEl.style.pointerEvents = docked ? "" : "none";
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };
    const onResize = () => {
      measure();
      render();
    };

    measure();
    render();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (frame) cancelAnimationFrame(frame);
      // Hand control back to each component's own opacity logic.
      heroEl.style.opacity = "";
      headerEl.style.opacity = "";
      headerEl.style.pointerEvents = "";
      headerEl.style.transition = "";
    };
  }, []);

  return (
    <div
      ref={cloneRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-50"
      style={{ width: HERO_WIDTH, transformOrigin: "top left", opacity: 0, willChange: "transform" }}
    >
      <div ref={reversedRef}>
        <Logo tone="reversed" width={HERO_WIDTH} decorative />
      </div>
      <div ref={positiveRef} className="absolute left-0 top-0" style={{ opacity: 0 }}>
        <Logo tone="positive" width={HERO_WIDTH} decorative />
      </div>
    </div>
  );
}
