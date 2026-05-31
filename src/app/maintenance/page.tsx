import type { Metadata } from "next";
import { maintenance } from "@/content/maintenance";
import { PageHero } from "@/components/layout/PageHero";
import { SectionBand } from "@/components/layout/SectionBand";
import { CtaBand } from "@/components/layout/CtaBand";
import { ProofBar } from "@/components/proof/ProofBar";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/seo/JsonLd";
import { serviceSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Maintenance",
  description:
    "An FAA-certified Part 145 repair station — AOG response, MRO, engine repair, and parts for CSM's managed fleet and third-party operators.",
  alternates: { canonical: "/maintenance" },
};

export default function MaintenancePage() {
  const { hero, services, standards, cta } = maintenance;
  const aog = services.items.find((s) => s.urgent);
  const rest = services.items.filter((s) => !s.urgent);

  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: "Aircraft Maintenance — Part 145",
          serviceType: "Aircraft maintenance",
          description:
            "FAA-certified Part 145 repair station — AOG response, MRO, engine repair, and parts for CSM's managed fleet and third-party operators.",
          path: "/maintenance",
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

      {/* Services — Fog, AOG emphasized */}
      <SectionBand tone="light" eyebrow={services.eyebrow} heading={services.heading}>
        {aog && (
          <Reveal className="mb-s6">
            <div className="flex flex-col gap-s4 rounded-lg border border-line bg-petrol p-s7 text-paper-on-dark md:flex-row md:items-center md:justify-between">
              <div className="flex max-w-measure flex-col gap-s3">
                <Eyebrow tone="gold">Priority service</Eyebrow>
                <h3 className="font-display text-h2 font-semibold">{aog.title}</h3>
                <p className="text-lead text-paper-soft">{aog.body}</p>
              </div>
              <Button href="/company/contact?inquiry=maintenance" variant="ghost">
                Request AOG support
              </Button>
            </div>
          </Reveal>
        )}

        <ul className="grid gap-s6 sm:grid-cols-3">
          {rest.map((service, i) => (
            <Reveal as="li" key={service.title} delay={i * 80} className="flex flex-col gap-s3">
              <h3 className="font-display text-h3 font-semibold text-ink">{service.title}</h3>
              <span aria-hidden className="h-px w-full bg-line" />
              <p className="text-body text-ink-soft">{service.body}</p>
            </Reveal>
          ))}
        </ul>
      </SectionBand>

      {/* Standards — Petrol */}
      <SectionBand
        tone="dark"
        gradient
        eyebrow={standards.eyebrow}
        heading={standards.heading}
        lead={standards.lead}
      >
        <ProofBar
          tone="dark"
          items={standards.points.map((p) => ({ value: p.value, label: p.label }))}
        />
      </SectionBand>

      {/* Contact for service — Petrol CTA */}
      <CtaBand
        eyebrow={cta.eyebrow}
        heading={cta.heading}
        lead={cta.lead}
        primaryLabel="Request service"
        primaryHref="/company/contact?inquiry=maintenance"
      />
    </>
  );
}
