import { RequestForm } from "./RequestForm";

/**
 * Multi-step quote flow (§08). Accepts a ?category= / aircraft prefill from the
 * fleet detail page. The primary CTA target site-wide.
 */
export function QuoteForm(props: { defaultCategory?: string; defaultAircraft?: string }) {
  return <RequestForm variant="quote" {...props} />;
}
