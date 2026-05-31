import { Phone } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { site } from "@/content/site";

const steps = [
  "A specialist picks up your request — day or night.",
  "We match aircraft to the mission and send clear options with pricing.",
  "You approve; we handle crew, ground, and the details.",
];

/**
 * Reassurance rail for the quote/trip flows — what happens after you submit,
 * plus the always-on Call action. Sticky on desktop.
 */
export function SupportAside() {
  return (
    <aside className="flex flex-col gap-s6 rounded-lg border border-line bg-fog-raised p-s6 lg:sticky lg:top-[120px]">
      <div className="flex flex-col gap-s3">
        <Eyebrow tone="saddle">What happens next</Eyebrow>
        <ol className="flex flex-col gap-s3">
          {steps.map((s, i) => (
            <li key={i} className="flex gap-s3 text-body text-ink-soft">
              <span className="tnum font-display text-h3 font-semibold leading-none text-gold">
                {i + 1}
              </span>
              <span>{s}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="flex flex-col gap-s3 border-t border-line pt-s5">
        <p className="text-small text-ink-faint">Prefer to talk? We answer 24/7.</p>
        <Button href={site.phone.href} variant="secondary">
          <Phone size={18} strokeWidth={1.75} />
          {site.phone.display}
        </Button>
      </div>

      <p className="text-small text-ink-faint">ARGUS Gold · Wyvern · Part 145 maintenance</p>
    </aside>
  );
}
