import type { Metadata } from "next";
import { faqs } from "@/content/faqs";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { PageHero } from "@/components/layout/PageHero";
import { SectionBand } from "@/components/layout/SectionBand";
import { CtaBand } from "@/components/layout/CtaBand";

export const metadata: Metadata = {
  title: "FAQs",
  description:
    "Straight answers about chartering, safety ratings, medical transport, aircraft management, and Part 145 maintenance with CSM Aviation.",
  alternates: { canonical: "/faqs" },
};

export default function FaqsPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQs"
        title="Questions, answered plainly."
        lead="No jargon, no overselling. If yours isn't here, call us — we answer 24/7."
      />

      <SectionBand tone="light">
        <div className="max-w-[840px]">
          <FaqAccordion items={faqs} />
        </div>
      </SectionBand>

      <CtaBand
        eyebrow="Still have a question?"
        heading="Ask a specialist."
        lead="We'd rather give you a straight answer than leave you guessing."
      />
    </>
  );
}
