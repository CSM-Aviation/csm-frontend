import type { Metadata } from "next";
import Link from "next/link";
import { salesAcquisitions } from "@/content/sales-acquisitions";
import { PageHero } from "@/components/layout/PageHero";
import { SectionBand } from "@/components/layout/SectionBand";
import { CtaBand } from "@/components/layout/CtaBand";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/seo/JsonLd";
import { serviceSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Sales & Acquisitions",
  description:
    "Trusted guidance through aircraft acquisitions and sales — market insight, mission-driven evaluation, and support for long-term ownership success.",
  alternates: { canonical: "/sales-acquisitions" },
};

const linkClass =
  "text-saddle underline decoration-line underline-offset-4 transition-colors hover:text-gold";

export default function SalesAcquisitionsPage() {
  const { hero, acquisition, sales, beyond } = salesAcquisitions;

  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: "Aircraft Sales & Acquisitions",
          serviceType: "Aircraft sales and acquisitions",
          description:
            "Guidance through aircraft acquisitions and sales — from sourcing, evaluation, and inspections to positioning, market insight, and closing coordination — with support for long-term ownership.",
          path: "/sales-acquisitions",
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

      {/* Aircraft Acquisition — Fog */}
      <SectionBand tone="light" eyebrow={acquisition.eyebrow} heading={acquisition.heading}>
        <div className="flex flex-col gap-s4">
          {acquisition.body.map((p) => (
            <p key={p} className="max-w-measure text-lead text-ink-soft">
              {p}
            </p>
          ))}
        </div>
      </SectionBand>

      {/* Aircraft Sales — Fog */}
      <SectionBand tone="light" eyebrow={sales.eyebrow} heading={sales.heading}>
        <div className="flex flex-col gap-s4">
          {sales.body.map((p) => (
            <p key={p} className="max-w-measure text-lead text-ink-soft">
              {p}
            </p>
          ))}
        </div>
      </SectionBand>

      {/* Beyond the Transaction — Fog, with inline links to live service pages */}
      <SectionBand tone="light" eyebrow={beyond.eyebrow} heading={beyond.heading}>
        <div className="flex flex-col gap-s4">
          <p className="max-w-measure text-lead text-ink-soft">
            Our relationship does not end when an aircraft changes hands. Through our integrated
            capabilities, CSM Aviation can support owners beyond acquisition with{" "}
            <Link href="/management" className={linkClass}>
              aircraft management
            </Link>
            , maintenance coordination,{" "}
            <Link href="/charter" className={linkClass}>
              charter solutions
            </Link>
            , detailing, and ownership administration.
          </p>
          <p className="max-w-measure text-lead text-ink-soft">{beyond.body[1]}</p>
        </div>
      </SectionBand>

      <CtaBand
        eyebrow="Speak to our team"
        heading="Buying or selling? Let's talk."
        lead="Tell us about your mission and where you are in the ownership journey. Our team will guide the next step with market insight and care."
        primaryLabel="Talk to our team"
        primaryHref="/company/contact?inquiry=sales-acquisitions"
      />
    </>
  );
}
