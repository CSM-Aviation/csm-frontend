import { RequestForm } from "./RequestForm";

/** "Plan a Trip" flow — the secondary CTA. Same shape as the quote request. */
export function TripForm(props: { defaultCategory?: string; defaultAircraft?: string }) {
  return <RequestForm variant="trip" {...props} />;
}
