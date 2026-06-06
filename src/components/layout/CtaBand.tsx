import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Cheatline } from "@/components/horizon/Cheatline";
import { Phone } from "lucide-react";
import { site } from "@/content/site";
import { primaryCta } from "@/content/nav";

interface CtaBandProps {
  eyebrow?: string;
  heading?: React.ReactNode;
  lead?: React.ReactNode;
  /** Override the primary action (defaults to Request a Quote). */
  primaryLabel?: string;
  primaryHref?: string;
  /** Show the 24/7 Call Now action alongside the primary CTA. */
  showCall?: boolean;
  /** Draw the cheatline at the seam into the footer (once per page max). */
  cheatline?: boolean;
}

/**
 * The closing CTA band (§09 step 7) — Petrol ground, centered, with the brand
 * cheatline drawing into the Abyss footer. Built once, reused on every page.
 */
export function CtaBand({
  eyebrow = "Speak to our team",
  heading = "Tell us where you need to be.",
  lead = "A specialist will respond personally — 24 hours a day, every day.",
  primaryLabel = primaryCta.label,
  primaryHref = primaryCta.href,
  showCall = true,
  cheatline = true,
}: CtaBandProps) {
  return (
    <section className="relative isolate overflow-hidden bg-petrol text-paper-on-dark">
      <Container className="py-[clamp(80px,11vw,160px)]">
        <Reveal className="mx-auto flex max-w-[44ch] flex-col items-center gap-s5 text-center">
          <Eyebrow tone="gold">{eyebrow}</Eyebrow>
          <h2 className="font-display text-h2 font-semibold text-paper-on-dark">{heading}</h2>
          <p className="text-lead text-paper-soft">{lead}</p>
          <div className="mt-s3 flex flex-wrap justify-center gap-s4">
            <Button href={primaryHref} variant="primary">
              {primaryLabel}
            </Button>
            {showCall && (
              <Button href={site.phone.href} variant="ghost">
                <Phone size={18} strokeWidth={1.75} />
                {site.phone.display}
              </Button>
            )}
          </div>
        </Reveal>
      </Container>

      {cheatline && (
        <div className="flex justify-center pb-s7">
          <Cheatline />
        </div>
      )}
    </section>
  );
}
