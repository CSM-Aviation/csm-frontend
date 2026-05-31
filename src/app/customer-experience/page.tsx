import type { Metadata } from "next";
import { experiencePromise, testimonials } from "@/content/testimonials";
import { PageHero } from "@/components/layout/PageHero";
import { SectionBand } from "@/components/layout/SectionBand";
import { CtaBand } from "@/components/layout/CtaBand";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Customer Experience",
  description:
    "What flying with CSM Aviation feels like — one point of contact, constant communication, and the details handled, from intake to wheels-down.",
  alternates: { canonical: "/customer-experience" },
};

export default function CustomerExperiencePage() {
  const [featured, ...rest] = testimonials;

  return (
    <>
      <PageHero
        eyebrow={experiencePromise.eyebrow}
        title="The trip, handled."
        lead="Calm command isn't just how we fly — it's how the whole experience feels."
      />

      {/* The promise — Fog */}
      <SectionBand
        tone="light"
        eyebrow="What it's like"
        heading={experiencePromise.heading}
        lead={experiencePromise.lead}
      >
        <ul className="grid gap-s8 md:grid-cols-3">
          {experiencePromise.pillars.map((pillar, i) => (
            <Reveal as="li" key={pillar.title} delay={i * 80} className="flex flex-col gap-s3">
              <h3 className="font-display text-h3 font-semibold text-ink">{pillar.title}</h3>
              <span aria-hidden className="h-px w-full bg-line" />
              <p className="text-body text-ink-soft">{pillar.body}</p>
            </Reveal>
          ))}
        </ul>
      </SectionBand>

      {/* Featured quote — Petrol */}
      {featured && (
        <SectionBand tone="dark" gradient>
          <Reveal className="mx-auto max-w-[40ch] text-center">
            <blockquote className="font-display text-h2 font-medium italic leading-tight text-paper-on-dark">
              <span className="text-gold">“</span>
              {featured.quote}
              <span className="text-gold">”</span>
            </blockquote>
            <p className="mt-s5 text-small text-paper-soft">
              {featured.author} · {featured.role}
            </p>
          </Reveal>
        </SectionBand>
      )}

      {/* Remaining quotes — Fog */}
      {rest.length > 0 && (
        <SectionBand tone="light" eyebrow="In their words">
          <ul className="grid gap-s8 md:grid-cols-2">
            {rest.map((t, i) => (
              <Reveal as="li" key={i} delay={i * 80} className="flex flex-col gap-s4">
                <blockquote className="font-display text-h3 font-medium leading-snug text-ink">
                  {t.quote}
                </blockquote>
                <div className="flex flex-col">
                  <Eyebrow tone="saddle">{t.author}</Eyebrow>
                  <span className="text-small text-ink-faint">{t.role}</span>
                </div>
              </Reveal>
            ))}
          </ul>
        </SectionBand>
      )}

      <CtaBand />
    </>
  );
}
