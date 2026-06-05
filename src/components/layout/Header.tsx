"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { RequestQuoteButton } from "@/components/quote/RequestQuoteButton";
import { primaryNav, primaryCta, type NavSection } from "@/content/nav";
import { cn } from "@/lib/utils";
import { MobileDrawer } from "./MobileDrawer";

/**
 * Persistent header (§08). Transparent over the dark hero, then gains a
 * --fog-raised background + --shadow-float + hairline once scrolled past it.
 * Section parents are links AND dropdown toggles (fixes orphaned /charter &
 * /company). Logo swaps reversed→positive on solidify. Sticky Request a Quote.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();

  // On the home page the hero shows a large centred logo while at the top, so
  // the header logo stays hidden until the page scrolls past it.
  const hideLogo = pathname === "/" && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close any open dropdown on Escape.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenIndex(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const linkColor = scrolled ? "text-ink" : "text-paper-on-dark";

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-colors duration-base ease-calm",
        scrolled
          ? "border-b border-line bg-fog-raised shadow-float"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <a
        href="#main"
        className="sr-only z-50 rounded-md bg-fog-raised px-s4 py-s2 text-ink focus:not-sr-only focus:absolute focus:left-s4 focus:top-s2"
      >
        Skip to content
      </a>

      <div className="mx-auto flex h-[72px] max-w-content items-center justify-between px-[var(--page-margin)]">
        <Link
          href="/"
          id="header-logo"
          aria-label="CSM Aviation — home"
          className={cn(
            "flex items-center transition-opacity duration-base ease-calm",
            hideLogo && "pointer-events-none opacity-0",
          )}
          aria-hidden={hideLogo}
          tabIndex={hideLogo ? -1 : undefined}
        >
          <Logo tone={scrolled ? "positive" : "reversed"} width={168} priority />
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-s6 lg:flex">
          <ul className="flex items-center gap-s6">
            {primaryNav.map((section, i) => (
              <NavItem
                key={section.href + section.label}
                section={section}
                color={linkColor}
                open={openIndex === i}
                onOpen={() => setOpenIndex(i)}
                onClose={() => setOpenIndex((cur) => (cur === i ? null : cur))}
                onToggle={() => setOpenIndex((cur) => (cur === i ? null : i))}
              />
            ))}
          </ul>
          <RequestQuoteButton variant="sand">{primaryCta.label}</RequestQuoteButton>
        </nav>

        {/* Mobile trigger */}
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          aria-label="Open menu"
          aria-expanded={drawerOpen}
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-md transition-colors duration-fast lg:hidden",
            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus",
            linkColor,
          )}
        >
          <Menu size={26} strokeWidth={1.5} />
        </button>
      </div>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </header>
  );
}

interface NavItemProps {
  section: NavSection;
  color: string;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
}

function NavItem({ section, color, open, onOpen, onClose, onToggle }: NavItemProps) {
  const hasChildren = Boolean(section.children?.length);
  const ref = useRef<HTMLLIElement>(null);
  const menuId = `nav-${section.label.replace(/\s+/g, "-").toLowerCase()}`;

  // Close when focus leaves the item entirely (keyboard tab-out).
  const onBlurCapture = (e: React.FocusEvent<HTMLLIElement>) => {
    if (!ref.current?.contains(e.relatedTarget as Node)) onClose();
  };

  // A small grace period on mouse-leave so a quick diagonal exit toward the
  // menu doesn't snap it shut. Re-entering cancels the pending close.
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };
  const handleEnter = () => {
    cancelClose();
    onOpen();
  };
  const handleLeave = () => {
    cancelClose();
    closeTimer.current = setTimeout(onClose, 160);
  };
  useEffect(() => cancelClose, []);

  if (!hasChildren) {
    return (
      <li>
        <Link
          href={section.href}
          className={cn(
            "rounded-sm text-body font-medium transition-colors duration-fast hover:text-gold",
            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus",
            color,
          )}
        >
          {section.label}
        </Link>
      </li>
    );
  }

  return (
    <li
      ref={ref}
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onBlurCapture={onBlurCapture}
    >
      <span className="flex items-center gap-s1">
        <Link
          href={section.href}
          className={cn(
            "rounded-sm text-body font-medium transition-colors duration-fast hover:text-gold",
            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus",
            color,
          )}
        >
          {section.label}
        </Link>
        <button
          type="button"
          aria-label={`${section.label} menu`}
          aria-haspopup="menu"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={onToggle}
          className={cn(
            "rounded-sm p-0.5 transition-colors duration-fast hover:text-gold",
            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus",
            color,
          )}
        >
          <ChevronDown
            size={16}
            strokeWidth={2}
            className={cn("transition-transform duration-base", open && "rotate-180")}
          />
        </button>
      </span>

      {/* The outer wrapper's top padding is a transparent, hoverable bridge
          across the visual gap — the cursor never leaves the <li> on its way
          to the menu, so it stays open. */}
      <div
        className={cn(
          "absolute left-0 top-full pt-s3 transition-opacity duration-base ease-calm",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <ul
          id={menuId}
          role="menu"
          aria-label={section.label}
          aria-hidden={!open}
          className={cn(
            "min-w-[248px] rounded-md border border-line bg-fog-raised p-s2 shadow-float transition-transform duration-base ease-calm",
            open ? "translate-y-0" : "-translate-y-1",
          )}
        >
          {section.children!.map((child) => (
          <li key={child.href} role="none">
            <Link
              role="menuitem"
              href={child.href}
              onClick={onClose}
              className="group flex flex-col gap-0.5 rounded-sm px-s4 py-s3 transition-colors duration-fast hover:bg-fog-sunk focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
            >
              <span className="text-body font-medium text-ink transition-colors group-hover:text-gold">
                {child.label}
              </span>
              {child.hint && <span className="text-small text-ink-faint">{child.hint}</span>}
            </Link>
          </li>
          ))}
        </ul>
      </div>
    </li>
  );
}
