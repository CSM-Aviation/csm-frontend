import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { destinations, getDestination } from "@/content/destinations";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { RequestQuoteButton } from "@/components/quote/RequestQuoteButton";
import { HorizonRule } from "@/components/horizon/HorizonRule";
import { SectionBand } from "@/components/layout/SectionBand";
import { CtaBand } from "@/components/layout/CtaBand";

export function generateStaticParams() {
  return destinations.map((d) => ({ cityId: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { cityId: string };
}): Promise<Metadata> {
  const dest = getDestination(params.cityId);
  if (!dest) return { title: "Destination" };
  return {
    title: `Private Jet Charter to ${dest.city}`,
    description: dest.intro,
    alternates: { canonical: `/destinations/${dest.slug}` },
    openGraph: { images: [{ url: dest.heroImage }] },
  };
}

export default function DestinationDetailPage({ params }: { params: { cityId: string } }) {
  const dest = getDestination(params.cityId);
  if (!dest) notFound();

  return (
    <>
      {/* Hero — Petrol with the city image bleeding under the panel */}
      <section className="relative isolate overflow-hidden bg-petrol text-paper-on-dark">
        <Image
          src={dest.heroImage}
          alt={`${dest.city}, ${dest.state}`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(90deg, var(--petrol) 0%, var(--petrol) 42%, transparent 100%), linear-gradient(0deg, var(--abyss) 0%, transparent 45%)",
          }}
        />
        <Container className="relative pb-[clamp(48px,7vw,96px)] pt-[clamp(128px,16vw,200px)]">
          <Reveal className="flex max-w-[44ch] flex-col gap-s4">
            <Eyebrow tone="gold">{dest.state}</Eyebrow>
            <h1 className="font-display text-h1 font-semibold tracking-h1 text-paper-on-dark">
              Private charter to {dest.city}
            </h1>
            <p className="max-w-lead text-lead text-paper-soft">{dest.intro}</p>
            <div className="mt-s3 flex flex-wrap gap-s4">
              <RequestQuoteButton variant="sand">Request a Quote</RequestQuoteButton>
              <Button href="/charter/trip" variant="ghost">
                Plan a Trip
              </Button>
            </div>
          </Reveal>
        </Container>
        <Container className="relative">
          <HorizonRule color="gold" animate />
        </Container>
        <div className="h-s7" />
      </section>

      {/* Editorial sections — Fog */}
      <SectionBand tone="light" eyebrow={dest.tagline}>
        <div className="flex max-w-measure flex-col gap-s8">
          {dest.sections.map((section, i) => (
            <Reveal key={section.title} delay={i * 60} className="flex flex-col gap-s3">
              <h2 className="font-display text-h2 font-semibold text-ink">{section.title}</h2>
              {section.body.split("\n\n").map((para, j) => (
                <p key={j} className="text-body text-ink-soft">
                  {para}
                </p>
              ))}
            </Reveal>
          ))}
        </div>
      </SectionBand>

      {/* Popular routes — Petrol */}
      <SectionBand tone="dark" gradient eyebrow="Popular routes" heading={`Flights to ${dest.city}`}>
        <ul className="grid gap-px overflow-hidden rounded-md border border-line-dark bg-line-dark sm:grid-cols-2">
          {dest.popularRoutes.map((route) => (
            <li
              key={route}
              className="bg-petrol-600 px-s5 py-s5 text-body font-medium text-paper-on-dark"
            >
              {route}
            </li>
          ))}
        </ul>
      </SectionBand>

      <CtaBand
        heading={`Fly to ${dest.city} with CSM.`}
        lead="Tell us your dates and party — a specialist will tailor options, any hour."
      />
    </>
  );
}
