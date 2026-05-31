"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Faq } from "@/content/faqs";

/**
 * Keyboard-operable FAQ accordion (§06/§18). Each row is a real button with
 * aria-expanded + aria-controls; panels reveal with a calm height/opacity
 * transition. Multiple panels may be open at once.
 */
export function FaqAccordion({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<Set<number>>(new Set());

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });

  return (
    <ul className="flex flex-col">
      {items.map((item, i) => {
        const isOpen = open.has(i);
        return (
          <li key={i} className="border-b border-line first:border-t">
            <h2>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                id={`faq-trigger-${i}`}
                onClick={() => toggle(i)}
                className="flex w-full items-center justify-between gap-s4 py-s5 text-left transition-colors duration-fast hover:text-saddle focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
              >
                <span className="font-display text-h3 font-semibold text-ink">{item.q}</span>
                <Plus
                  size={22}
                  strokeWidth={1.75}
                  aria-hidden
                  className={cn(
                    "shrink-0 text-saddle transition-transform duration-base ease-calm",
                    isOpen && "rotate-45",
                  )}
                />
              </button>
            </h2>
            <div
              id={`faq-panel-${i}`}
              role="region"
              aria-labelledby={`faq-trigger-${i}`}
              hidden={!isOpen}
              className="pb-s6"
            >
              <p className="max-w-measure text-body text-ink-soft">{item.a}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
