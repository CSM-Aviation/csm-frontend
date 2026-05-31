import type { Metadata } from "next";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { PageHero } from "@/components/layout/PageHero";
import { SectionBand } from "@/components/layout/SectionBand";
import { SupportAside } from "@/components/sections/SupportAside";

export const metadata: Metadata = {
  title: "Request a Quote",
  description:
    "Tell us your route, dates, and party — a CSM Aviation specialist will respond personally with tailored options, 24 hours a day.",
  alternates: { canonical: "/charter/quote" },
};

export default function QuotePage({
  searchParams,
}: {
  searchParams: { category?: string; aircraft?: string };
}) {
  return (
    <>
      <PageHero
        eyebrow="Request a Quote"
        title="Tell us your trip."
        lead="A few details and a specialist will come back with options — typically within the hour, any hour."
      />

      <SectionBand tone="light">
        <div className="grid gap-s8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <QuoteForm
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
