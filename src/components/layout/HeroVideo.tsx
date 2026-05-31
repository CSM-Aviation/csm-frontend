"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface HeroVideoProps {
  src: string;
  className?: string;
}

/**
 * Decorative background video for the hero (§09 owned-asset hook). Muted +
 * playsInline so mobile browsers allow autoplay; aria-hidden + pointer-events
 * none so it's invisible to AT and never steals interaction.
 *
 * Loading: the source MP4 is faststart-encoded (moov atom at the front), so the
 * browser begins playback after a few KB rather than the whole file;
 * `preload="auto"` lets it buffer eagerly. Until it can play — and as the
 * reduced-motion fallback — a heavily-blurred still stands in (a soft wash of
 * the scene, no hard photo flash). The video cross-fades in the moment it's
 * ready (§07: never blocks the text LCP, which paints from the preloaded font
 * independently).
 */
export function HeroVideo({ src, className }: HeroVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [allowed, setAllowed] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setAllowed(false);
      return;
    }
    // Muted autoplay; ignore the promise rejection some browsers throw.
    ref.current?.play().catch(() => {});
  }, []);

  return (
    <div aria-hidden className={cn("absolute inset-0 overflow-hidden bg-petrol-abyss", className)}>
      {/* Heavily-blurred still as a soft placeholder (and reduced-motion
          fallback). Scaled up so the blur's faded edges stay off-screen. */}
      <div
        className={cn(
          "absolute inset-0 scale-125 bg-cover bg-center blur-[8px] transition-opacity duration-slow ease-calm",
          ready ? "opacity-0" : "opacity-50",
        )}
        style={{ backgroundImage: "url(/images/hero.jpg)" }}
      />

      {allowed && (
        <video
          ref={ref}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          tabIndex={-1}
          onCanPlay={() => setReady(true)}
          style={{ pointerEvents: "none" }}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-base ease-calm",
            ready ? "opacity-100" : "opacity-0",
          )}
        >
          <source src={src} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
