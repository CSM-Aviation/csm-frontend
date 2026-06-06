import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/layout/PageHero";
import { SectionBand } from "@/components/layout/SectionBand";
import { CtaBand } from "@/components/layout/CtaBand";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Destinations",
  description:
    "Private aviation to thousands of airports worldwide — nationwide and across the globe, any cabin type, coordinated around your schedule.",
  alternates: { canonical: "/destinations" },
};

export default function DestinationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Reach"
        title="Wherever you need to be."
        lead="From regional business travel to coast-to-coast journeys and international destinations, CSM Aviation provides private aviation solutions built around your schedule, priorities, and needs."
      />

      <SectionBand tone="light">
        <div className="grid items-center gap-s8 lg:grid-cols-2">
          <Reveal className="flex flex-col gap-s4">
            <Eyebrow tone="gold">Global reach</Eyebrow>
            <h2 className="max-w-measure font-display text-h2 font-semibold text-ink">
              A truly global network.
            </h2>
            <p className="max-w-lead text-lead text-ink-soft">
              With access to thousands of airports worldwide, and any cabin
              type, our team coordinates every detail so your experience remains
              seamless — whether you&rsquo;re traveling across the continental US
              or across the globe.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <Image
              src="/images/Global_destinations.png"
              alt="World map showing CSM Aviation routes from a US hub to destinations across the Americas, Europe, Asia, and Australia"
              width={1000}
              height={725}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="h-auto w-full"
            />
          </Reveal>
        </div>
      </SectionBand>

      <CtaBand />
    </>
  );
}
