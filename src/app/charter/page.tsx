import type { Metadata } from "next";
import { charter } from "@/content/charter";
import { getFleet } from "@/lib/api/fleet";
import { PageHero } from "@/components/layout/PageHero";
import { SectionBand } from "@/components/layout/SectionBand";
import { CtaBand } from "@/components/layout/CtaBand";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { DestinationsTeaser } from "@/components/sections/DestinationsTeaser";
import { FleetGrid } from "@/components/fleet/FleetGrid";
import { Button } from "@/components/ui/Button";
import { RequestQuoteButton } from "@/components/quote/RequestQuoteButton";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { serviceSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Charter",
  description:
    "Retail, medical, and wholesale private charter from CSM Aviation — the right aircraft for the mission, with constant communication from intake to wheels-down.",
  alternates: { canonical: "/charter" },
};

export default async function CharterPage() {
  const fleet = await getFleet();
  const teaser = fleet.slice(0, 3);

  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: "Private Jet Charter",
          serviceType: "Private jet charter",
          description:
            "Retail, medical, and wholesale private charter from CSM Aviation — the right aircraft for the mission, with constant communication from intake to wheels-down.",
          path: "/charter",
        })}
      />
      <PageHero
        eyebrow={charter.hero.eyebrow}
        title={charter.hero.title}
        lead={charter.hero.lead}
        actions={
          <>
            <RequestQuoteButton variant="primary">Request a Quote</RequestQuoteButton>
            <Button href="/charter/trip" variant="ghost">
              Plan a Trip
            </Button>
          </>
        }
      />

      {/* The three charter modes — Fog */}
      <SectionBand
        tone="light"
        eyebrow={charter.modes.eyebrow}
        heading={charter.modes.heading}
      >
        <ul className="grid gap-s8 md:grid-cols-3">
          {charter.modes.items.map((mode, i) => (
            <Reveal as="li" key={mode.title} delay={i * 80} className="flex flex-col gap-s4">
              <h3 className="font-display text-h3 font-semibold text-ink">{mode.title}</h3>
              <p className="flex-1 text-body text-ink-soft">{mode.body}</p>
              <span aria-hidden className="h-px w-full bg-line" />
              <div className="flex flex-col gap-s1">
                <Eyebrow tone="gold">Proof</Eyebrow>
                <span className="tnum text-body font-medium text-ink">{mode.proof}</span>
              </div>
            </Reveal>
          ))}
        </ul>
      </SectionBand>

      {/* How it works — Petrol, horizon steps */}
      <SectionBand
        tone="dark"
        gradient
        eyebrow={charter.howItWorks.eyebrow}
        heading={charter.howItWorks.heading}
      >
        <ProcessSteps steps={charter.howItWorks.steps} tone="dark" />
      </SectionBand>

      {/* Fleet teaser — Fog */}
      <SectionBand
        tone="light"
        eyebrow={charter.fleetTeaser.eyebrow}
        heading={charter.fleetTeaser.heading}
        lead={charter.fleetTeaser.lead}
      >
        <FleetGrid aircraft={teaser} />
        <div className="mt-s7">
          <Button href={charter.fleetTeaser.cta.href} variant="secondary">
            {charter.fleetTeaser.cta.label}
          </Button>
        </div>
      </SectionBand>

      {/* Reach — Fog */}
      <SectionBand
        tone="light"
        divider="top"
        eyebrow={charter.reach.eyebrow}
        heading={charter.reach.heading}
        lead={charter.reach.lead}
      >
        <DestinationsTeaser />
        <div className="mt-s7">
          <Button href={charter.reach.cta.href} variant="secondary">
            {charter.reach.cta.label}
          </Button>
        </div>
      </SectionBand>

      <CtaBand />
    </>
  );
}
