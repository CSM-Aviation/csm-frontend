"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

/**
 * Single, app-wide host for the JetInsight "Request a Quote" form (§07 CTAs).
 *
 * Replaces prod's brute-force approach (three near-identical components, each
 * re-injecting the embed script on mount and rendering its own hidden modal +
 * iframe). Here there is exactly one modal in the tree, the embed script is
 * loaded lazily once on first open, and any button anywhere opens it via the
 * `useQuoteModal()` hook — see {@link RequestQuoteButton}.
 */

/** JetInsight embed config (CSM Aviation). */
const EMBED_FORM_URL = "https://client.jetinsight.com/embed/csm-aviation/Web-Request?";
const EMBED_SCRIPT_URL =
  "https://client.jetinsight.com/embed/126d130e-be91-4071-a8dc-2f94b609c239/Web-Request.js";

interface QuoteModalContextValue {
  /** Open the quote form. `label` is forwarded to GTM for CTA attribution. */
  open: (label?: string) => void;
  close: () => void;
}

const QuoteModalContext = createContext<QuoteModalContextValue | null>(null);

/** Load the JetInsight embed script a single time, app-wide. */
let scriptPromise: Promise<void> | null = null;
function loadEmbedScript(): Promise<void> {
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise<void>((resolve) => {
    const script = document.createElement("script");
    script.src = EMBED_SCRIPT_URL;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => resolve(); // iframe works standalone; never block the modal
    document.body.appendChild(script);
  });
  return scriptPromise;
}

function pushQuoteEvent(label: string) {
  if (process.env.NODE_ENV !== "production") return;
  const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({
    event: "cta_button_click",
    category: "conversion",
    label,
  });
}

export function QuoteModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  useEffect(() => setMounted(true), []);

  const open = useCallback((label = "REQUEST_QUOTE") => {
    lastFocused.current = document.activeElement as HTMLElement | null;
    pushQuoteEvent(label);
    void loadEmbedScript();
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    lastFocused.current?.focus();
  }, []);

  // Lock scroll, wire ESC, and move focus into the dialog while open.
  useEffect(() => {
    if (!isOpen) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);
    closeButtonRef.current?.focus();
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, close]);

  return (
    <QuoteModalContext.Provider value={{ open, close }}>
      {children}
      {mounted &&
        isOpen &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Request a quote"
            className="fixed inset-0 z-[100] flex items-center justify-center p-s4"
          >
            <button
              type="button"
              aria-label="Close quote form"
              onClick={close}
              className="absolute inset-0 bg-petrol/70 backdrop-blur-sm"
            />
            <div className="relative flex h-[92vh] max-h-[700px] w-full max-w-[900px] flex-col overflow-hidden rounded-md bg-fog-raised shadow-float">
              <div className="flex justify-end border-b border-line px-s4 py-s3">
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={close}
                  className="rounded-md px-s3 py-s2 font-body text-body font-semibold text-ink transition-colors duration-fast ease-calm hover:bg-fog-sunk focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                >
                  Close
                </button>
              </div>
              <iframe
                title="Request a quote"
                src={EMBED_FORM_URL}
                className="h-full w-full flex-1 border-0"
              />
            </div>
          </div>,
          document.body,
        )}
    </QuoteModalContext.Provider>
  );
}

export function useQuoteModal(): QuoteModalContextValue {
  const ctx = useContext(QuoteModalContext);
  if (!ctx) {
    throw new Error("useQuoteModal must be used within <QuoteModalProvider>");
  }
  return ctx;
}
