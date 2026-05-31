import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { destinations } from "@/content/destinations";
import { PageHero } from "@/components/layout/PageHero";
import { SectionBand } from "@/components/layout/SectionBand";
import { CtaBand } from "@/components/layout/CtaBand";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Destinations",
  description:
    "From our Central Valley base to the destinations asked for most — Miami, Los Angeles, New York, Las Vegas, and beyond.",
  alternates: { canonical: "/destinations" },
};

export default function DestinationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Reach"
        title="Where our clients fly."
        lead="Positioned to serve all of California and Nevada — and to fly anywhere from there. A few of the routes we run most."
      />

      <SectionBand tone="light">
        <ul className="grid gap-s6 sm:grid-cols-2">
          {destinations.map((d, i) => (
            <Reveal as="li" key={d.slug} delay={Math.min(i, 4) * 80}>
              <Link
                href={`/destinations/${d.slug}`}
                className="group block overflow-hidden rounded-md border border-line bg-fog-raised focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-fog-sunk">
                  <Image
                    src={d.thumbnail || d.heroImage}
                    alt={`${d.city}, ${d.state}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition duration-base ease-calm group-hover:brightness-[1.04]"
                  />
                </div>
                <div className="flex flex-col gap-s2 p-s5">
                  <Eyebrow tone="gold">{d.state}</Eyebrow>
                  <h2 className="font-display text-h2 font-semibold text-ink">{d.city}</h2>
                  <p className="text-body text-ink-soft">{d.tagline}</p>
                  <span className="mt-s2 inline-flex items-center gap-s2 font-semibold text-saddle transition-colors group-hover:text-gold">
                    Explore {d.city}
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-base group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </SectionBand>

      <CtaBand />
    </>
  );
}
