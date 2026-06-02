import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getFleet, getAircraft } from "@/lib/api/fleet";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { HorizonRule } from "@/components/horizon/HorizonRule";
import { SectionBand } from "@/components/layout/SectionBand";
import { CtaBand } from "@/components/layout/CtaBand";
import { ProofBar } from "@/components/proof/ProofBar";
import { SpecTable } from "@/components/fleet/SpecTable";
import { Gallery } from "@/components/fleet/Gallery";

/** Static detail pages from the live fleet _ids (§04/§11). */
export async function generateStaticParams() {
  const fleet = await getFleet();
  return fleet.map((a) => ({ id: a.id }));
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const aircraft = await getAircraft(params.id);
  if (!aircraft) return { title: "Aircraft" };
  const description =
    aircraft.description?.slice(0, 160) ||
    `${aircraft.name} — ${aircraft.categoryLabel}. ${aircraft.passengers} passengers, ${aircraft.range} range.`;
  return {
    title: aircraft.name,
    description,
    alternates: { canonical: `/charter/fleet/${aircraft.id}` },
    openGraph: aircraft.heroImage ? { images: [{ url: aircraft.heroImage }] } : undefined,
  };
}

export default async function AircraftDetailPage({ params }: { params: { id: string } }) {
  const aircraft = await getAircraft(params.id);
  if (!aircraft) notFound();

  const firstCategory = aircraft.categories[0];
  const quoteHref = `/charter/quote?aircraft=${aircraft.id}${
    firstCategory ? `&category=${firstCategory}` : ""
  }`;

  return (
    <>
      {/* Hero — Petrol with the aircraft image bleeding under the panel (the
          one permitted grid-break, §11). */}
      <section className="relative isolate overflow-hidden bg-petrol text-paper-on-dark">
        {aircraft.heroImage && (
          <Image
            src={aircraft.heroImage}
            alt={`${aircraft.name} — exterior`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(90deg, var(--petrol) 0%, var(--petrol) 42%, transparent 100%), linear-gradient(0deg, var(--abyss) 0%, transparent 45%)",
          }}
        />
        <Container className="relative pb-[clamp(48px,7vw,96px)] pt-[clamp(128px,16vw,200px)]">
          <Reveal className="flex max-w-[42ch] flex-col gap-s4">
            <Eyebrow tone="gold">{aircraft.categoryLabel}</Eyebrow>
            <h1 className="font-display text-h1 font-semibold tracking-h1 text-paper-on-dark">
              {aircraft.name}
            </h1>
            <div className="mt-s3 flex flex-wrap gap-s4">
              <Button href={quoteHref} variant="primary">
                Request this aircraft
              </Button>
              <Button href="/charter/fleet" variant="ghost">
                Back to fleet
              </Button>
            </div>
          </Reveal>
        </Container>
        <Container className="relative">
          <HorizonRule color="gold" animate />
        </Container>
        <div className="h-s7" />
      </section>

      {/* At a glance — Fog */}
      <SectionBand
        tone="light"
        eyebrow="At a glance"
        lead={aircraft.description || undefined}
      >
        <ProofBar
          tone="light"
          items={[
            { value: aircraft.passengers, label: "Passengers" },
            { value: aircraft.range, label: "Range" },
            { value: aircraft.speed, label: "Cruise speed" },
            { value: aircraft.cabinHeight, label: "Cabin height" },
          ]}
        />
      </SectionBand>

      {/* Gallery — Petrol */}
      {aircraft.images.length > 0 && (
        <SectionBand tone="dark" gradient eyebrow="Gallery" heading="A closer look">
          <Gallery images={aircraft.images} name={aircraft.name} />
        </SectionBand>
      )}

      {/* Full specs — Fog */}
      {aircraft.specGroups.length > 0 && (
        <SectionBand tone="light" eyebrow="Specifications" heading="Full specs">
          <div className="max-w-[720px]">
            <SpecTable groups={aircraft.specGroups} />
          </div>
        </SectionBand>
      )}

      {/* Inline quote CTA — Petrol (pre-fills category) */}
      <CtaBand
        eyebrow="Ready when you are"
        heading={`Request the ${aircraft.name}.`}
        lead="We'll confirm availability and tailor options to your trip — typically within the hour."
        primaryLabel="Request this aircraft"
        primaryHref={quoteHref}
      />
    </>
  );
}
