import type { Metadata } from "next";
import { about } from "@/content/about";
import { aboutProof } from "@/content/proof";
import { PageHero } from "@/components/layout/PageHero";
import { SectionBand } from "@/components/layout/SectionBand";
import { CtaBand } from "@/components/layout/CtaBand";
import { ProofBar } from "@/components/proof/ProofBar";
import { AccreditationStrip } from "@/components/proof/AccreditationStrip";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "About CSM",
  description:
    "CSM Aviation is a private aviation operator trusted with what matters — private charter and aircraft management under one accountable roof.",
  alternates: { canonical: "/company/about" },
};

export default function AboutPage() {
  const { hero, story, standards } = about;

  return (
    <>
      <PageHero eyebrow={hero.eyebrow} title={hero.title} lead={hero.lead} />

      {/* Story — Fog, editorial single column */}
      <SectionBand tone="light" eyebrow={story.eyebrow}>
        <div className="flex flex-col gap-s5 lg:max-w-3xl">
          {story.paragraphs.map((p, i) => (
            <Reveal key={i} delay={i * 40}>
              <p className="text-lead text-ink-soft">{p}</p>
            </Reveal>
          ))}
        </div>
      </SectionBand>

      {/* By the numbers — Petrol */}
      <SectionBand
        tone="dark"
        gradient
        eyebrow="By the numbers"
        heading="What the record says."
      >
        <ProofBar items={aboutProof} tone="dark" />
      </SectionBand>

      {/* Standards & accreditations — Fog, with context */}
      <SectionBand
        tone="light"
        eyebrow={standards.eyebrow}
        heading={standards.heading}
        lead={standards.lead}
      >
        <div className="mb-s9">
          <AccreditationStrip />
        </div>
        <ul className="grid gap-s6 md:grid-cols-3">
          {standards.items.map((item, i) => (
            <Reveal as="li" key={item.name} delay={i * 80} className="flex flex-col gap-s3">
              <Eyebrow tone="saddle">{item.name}</Eyebrow>
              <span aria-hidden className="h-px w-full bg-line" />
              <p className="text-body text-ink-soft">{item.meaning}</p>
            </Reveal>
          ))}
        </ul>
      </SectionBand>

      <CtaBand />
    </>
  );
}
