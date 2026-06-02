"use client";

import { Button, type ButtonProps } from "@/components/ui/Button";
import { useQuoteModal } from "./QuoteModalProvider";

type RequestQuoteButtonProps = Omit<
  Extract<ButtonProps, { as?: "button" }>,
  "href" | "children"
> & {
  children?: React.ReactNode;
  /** GTM CTA attribution label (defaults to REQUEST_QUOTE). */
  analyticsLabel?: string;
};

/**
 * "Request a Quote" CTA that opens the shared JetInsight quote modal
 * ({@link useQuoteModal}) instead of navigating to /charter/quote. Reuses the
 * design-system {@link Button} so every quote CTA keeps identical styling. Any
 * `onClick` passed in runs before the modal opens (e.g. to close a drawer).
 */
export function RequestQuoteButton({
  children = "Request a Quote",
  analyticsLabel,
  variant = "sand",
  onClick,
  ...rest
}: RequestQuoteButtonProps) {
  const { open } = useQuoteModal();
  return (
    <Button
      variant={variant}
      onClick={(e) => {
        onClick?.(e);
        open(analyticsLabel);
      }}
      {...rest}
    >
      {children}
    </Button>
  );
}
