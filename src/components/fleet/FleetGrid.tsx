import { Reveal } from "@/components/ui/Reveal";
import { FleetCard } from "./FleetCard";
import type { Aircraft } from "@/lib/api/types";

/**
 * Responsive fleet grid (1 → 2 → 3 columns, §11). Cards reveal with a calm
 * stagger; because filtering is URL-driven, navigating re-mounts the grid and
 * the reveal replays as a gentle fade — no layout jank. Renders an in-voice
 * empty state when there are no matches (or the API is unavailable, §16).
 */
export function FleetGrid({ aircraft }: { aircraft: Aircraft[] }) {
  if (aircraft.length === 0) {
    return (
      <div className="rounded-md border border-line bg-fog-raised px-s6 py-s9 text-center">
        <p className="font-display text-h3 text-ink">No aircraft to show just yet.</p>
        <p className="mt-s3 text-body text-ink-soft">
          Our fleet listing is briefly unavailable. Call{" "}
          <span className="tnum">(888) I-FLY-CSM</span> and our team will match you to the right
          aircraft.
        </p>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-s6 sm:grid-cols-2 lg:grid-cols-3">
      {aircraft.map((a, i) => (
        <Reveal as="li" key={a.id} delay={Math.min(i, 5) * 80}>
          <FleetCard aircraft={a} />
        </Reveal>
      ))}
    </ul>
  );
}
