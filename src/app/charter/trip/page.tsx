import type { Metadata } from "next";
import { TripForm } from "@/components/forms/TripForm";
import { PageHero } from "@/components/layout/PageHero";
import { SectionBand } from "@/components/layout/SectionBand";
import { SupportAside } from "@/components/sections/SupportAside";

export const metadata: Metadata = {
  title: "Plan a Trip",
  description:
    "Share your itinerary and let CSM Aviation build the trip around it — the right aircraft, the right field, constant communication start to finish.",
  alternates: { canonical: "/charter/trip" },
};

export default function TripPage({
  searchParams,
}: {
  searchParams: { category?: string; aircraft?: string };
}) {
  return (
    <>
      <PageHero
        eyebrow="Plan a Trip"
        title="Let's build it around you."
        lead="Tell us where you're going and what matters. We'll shape the trip — aircraft, timing, ground — and keep you posted at every step."
      />

      <SectionBand tone="light">
        <div className="grid gap-s8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <TripForm
              defaultCategory={searchParams.category}
              defaultAircraft={searchParams.aircraft}
            />
          </div>
          <div className="lg:col-span-5">
            <SupportAside />
          </div>
        </div>
      </SectionBand>
    </>
  );
}
