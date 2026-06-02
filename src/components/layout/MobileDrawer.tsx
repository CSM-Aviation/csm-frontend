"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { X, Phone } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { RequestQuoteButton } from "@/components/quote/RequestQuoteButton";
import { primaryNav, primaryCta } from "@/content/nav";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Full-height Fog drawer (§08). Large Cormorant nav items; Request a Quote and
 * Call Now pinned at the bottom so the 24/7 promise is always one tap away.
 * Locks body scroll, closes on Escape / overlay tap, and moves focus in on open.
 */
export function MobileDrawer({ open, onClose }: MobileDrawerProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  return (
    <div
      className={cn("lg:hidden", open ? "pointer-events-auto" : "pointer-events-none")}
      aria-hidden={!open}
    >
      {/* Overlay */}
      <div
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-[55] bg-abyss/50 transition-opacity duration-base",
          open ? "opacity-100" : "opacity-0",
        )}
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className={cn(
          "fixed inset-y-0 right-0 z-[60] flex w-full max-w-[420px] flex-col bg-fog transition-transform duration-base ease-calm",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-line px-s5 py-s4">
          <Logo tone="positive" width={120} />
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-11 w-11 items-center justify-center rounded-md text-ink transition-colors duration-fast hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
          >
            <X size={26} strokeWidth={1.5} />
          </button>
        </div>

        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-s5 py-s6">
          <ul className="flex flex-col gap-s6">
            {primaryNav.map((section) => (
              <li key={section.href + section.label} className="flex flex-col gap-s3">
                <Link
                  href={section.href}
                  onClick={onClose}
                  className="font-display text-h3 font-semibold text-ink transition-colors hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                >
                  {section.label}
                </Link>
                {section.children && (
                  <ul className="flex flex-col gap-s2 border-l border-line pl-s4">
                    {section.children
                      .filter((c) => c.href !== section.href)
                      .map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={onClose}
                            className="text-body text-ink-soft transition-colors hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-s3 border-t border-line px-s5 py-s5">
          <RequestQuoteButton variant="sand" className="w-full" onClick={onClose}>
            {primaryCta.label}
          </RequestQuoteButton>
          <Button href={site.phone.href} variant="secondary" className="w-full">
            <Phone size={18} strokeWidth={1.75} />
            Call {site.phone.display}
          </Button>
        </div>
      </div>
    </div>
  );
}
