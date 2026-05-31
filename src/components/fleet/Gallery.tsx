"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Restrained fleet gallery (§11): one large image with a calm opacity crossfade
 * between shots — no dotted carousels. Thumbnails switch the active image and
 * are keyboard-operable with aria-pressed state.
 */
export function Gallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);
  if (images.length === 0) return null;

  return (
    <div className="flex flex-col gap-s4">
      <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-fog-sunk">
        {images.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt={`${name} — view ${i + 1}`}
            fill
            sizes="(max-width: 1280px) 100vw, 1280px"
            priority={i === 0}
            className={cn(
              "object-cover transition-opacity duration-slow ease-calm",
              i === active ? "opacity-100" : "opacity-0",
            )}
          />
        ))}
      </div>

      {images.length > 1 && (
        <ul className="flex flex-wrap gap-s3">
          {images.map((src, i) => (
            <li key={src}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show view ${i + 1} of ${images.length}`}
                aria-pressed={i === active}
                className={cn(
                  "relative h-14 w-20 overflow-hidden rounded-sm border transition duration-fast focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus",
                  i === active ? "border-gold" : "border-transparent opacity-70 hover:opacity-100",
                )}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
