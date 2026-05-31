import type { Metadata } from "next";
import { management } from "@/content/management";
import { PageHero } from "@/components/layout/PageHero";
import { SectionBand } from "@/components/layout/SectionBand";
import { CtaBand } from "@/components/layout/CtaBand";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/seo/JsonLd";
import { serviceSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Aircraft Management",
  description:
    "Lower the cost of aircraft ownership without lowering the standard — an on-demand flight department with transparent monthly reporting and in-house Part 145 maintenance.",
  alternates: { canonical: "/management" },
};

export default function ManagementPage() {
  const { hero, pitch, transparency, why } = management;

  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: "Aircraft Management",
          serviceType: "Aircraft management",
          description:
            "On-demand flight department services with transparent monthly reporting and in-house Part 145 maintenance — lowering the cost of ownership without lowering the standard.",
          path: "/management",
        })}
      />
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        lead={hero.lead}
        actions={
          <Button href={hero.cta.href} variant="primary">
            {hero.cta.label}
          </Button>
        }
      />

      {/* The pitch — Fog, editorial 5/7 */}
      <SectionBand tone="light">
        <div className="grid gap-s8 lg:grid-cols-12">
          <Reveal className="flex flex-col gap-s4 lg:col-span-5">
            <Eyebrow tone="saddle">{pitch.eyebrow}</Eyebrow>
            <h2 className="font-display text-h2 font-semibold text-ink">{pitch.heading}</h2>
            <p className="max-w-lead text-lead text-ink-soft">{pitch.lead}</p>
          </Reveal>

          <ul className="flex flex-col lg:col-span-7">
            {pitch.points.map((point, i) => (
              <Reveal
                as="li"
                key={point.title}
                delay={i * 60}
                className="flex flex-col gap-s2 border-t border-line py-s6 first:border-t-0 first:pt-0"
              >
                <h3 className="font-display text-h3 font-semibold text-ink">{point.title}</h3>
                <p className="max-w-measure text-body text-ink-soft">{point.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </SectionBand>

      {/* Transparency proof — Petrol, mock report */}
      <SectionBand tone="dark" gradient>
        <div className="grid gap-s8 lg:grid-cols-2 lg:items-center">
          <Reveal className="flex flex-col gap-s4">
            <Eyebrow tone="gold">{transparency.eyebrow}</Eyebrow>
            <h2 className="font-display text-h2 font-semibold text-paper-on-dark">
              {transparency.heading}
            </h2>
            <p className="max-w-lead text-lead text-paper-soft">{transparency.lead}</p>
          </Reveal>

          <Reveal>
            <figure className="rounded-lg border border-line-dark bg-petrol-600 p-s6">
              <figcaption className="mb-s4 flex items-center justify-between border-b border-line-dark pb-s3">
                <span className="text-eyebrow font-semibold uppercase tracking-[0.26em] text-gold">
                  {transparency.report.period}
                </span>
              </figcaption>
              <dl className="tnum">
                {transparency.report.rows.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-baseline justify-between gap-s4 border-b border-line-dark py-s3 last:border-b-0"
                  >
                    <dt className="text-body text-paper-soft">{row.label}</dt>
                    <dd className="text-right text-body font-medium text-paper-on-dark">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-s4 text-small text-paper-soft">{transparency.report.note}</p>
            </figure>
          </Reveal>
        </div>
      </SectionBand>

      {/* Why CSM — Fog */}
      <SectionBand tone="light" eyebrow={why.eyebrow} heading={why.heading}>
        <p className="max-w-measure text-lead text-ink-soft">{why.body}</p>
      </SectionBand>

      <CtaBand
        eyebrow="For owners"
        heading="Run the numbers with us."
        lead="Tell us about your aircraft and how you fly. We'll show you what management with CSM looks like — in plain figures."
        primaryLabel="Talk to our team"
        primaryHref="/company/contact?inquiry=management"
      />
    </>
  );
}
