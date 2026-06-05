import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { home } from "@/content/home";
import { homeProof } from "@/content/proof";
import { site } from "@/content/site";
import { PageHero } from "@/components/layout/PageHero";
import { SectionBand } from "@/components/layout/SectionBand";
import { CtaBand } from "@/components/layout/CtaBand";
import { ProofBar } from "@/components/proof/ProofBar";
import { StatBlock } from "@/components/proof/StatBlock";
import { AccreditationStrip } from "@/components/proof/AccreditationStrip";
import { Button } from "@/components/ui/Button";
import { HeroLogo } from "@/components/layout/HeroLogo";
import { LogoFlight } from "@/components/layout/LogoFlight";
import { RequestQuoteButton } from "@/components/quote/RequestQuoteButton";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  description:
    "CSM Aviation — ARGUS Gold private charter and transparent aircraft management, flown to a single standard of safety, nationwide and worldwide.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <LogoFlight />
      <PageHero
        titleSize="display"
        align="center"
        media={
          <Image
            src="/images/image_jetcenter_aerial_010.jpeg"
            alt=""
            aria-hidden
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        }
        logo={<HeroLogo />}
        eyebrow={home.hero.eyebrow}
        eyebrowClassName="text-body md:text-lead"
        leadClassName="text-lead sm:text-h3"
        title={
          <>
            <span className="text-white">{home.hero.titleLead}</span>{" "}
            <em className="font-display italic text-gold">
              {home.hero.titleMid} {home.hero.titleAccent}
            </em>
          </>
        }
        lead={home.hero.lead}
        actions={
          <>
            <RequestQuoteButton variant="sand">Request a Quote</RequestQuoteButton>
            <Button href={site.phone.href} variant="ghost">
              Call Now
            </Button>
          </>
        }
      />

      {/* Proof bar — Fog */}
      <SectionBand tone="light" eyebrow="Trusted in the air" heading="The proof, up front.">
        <ProofBar items={homeProof} tone="light" />
      </SectionBand>

      {/* What we do — Fog, 7/5 asymmetric (charter leads) */}
      <SectionBand
        tone="light"
        divider="top"
        eyebrow={home.whatWeDo.eyebrow}
        heading={home.whatWeDo.heading}
        lead={home.whatWeDo.lead}
      >
        <div className="grid gap-s6 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <Link
              href={home.whatWeDo.charter.href}
              className="group flex h-full flex-col justify-between gap-s8 rounded-lg bg-petrol p-s7 text-paper-on-dark transition-colors duration-base hover:bg-petrol-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
            >
              <div className="flex flex-col gap-s4">
                <h3 className="font-display text-h2 font-semibold">{home.whatWeDo.charter.title}</h3>
                <p className="max-w-measure text-lead text-paper-soft">
                  {home.whatWeDo.charter.body}
                </p>
              </div>
              <span className="inline-flex items-center gap-s2 font-semibold text-gold">
                {home.whatWeDo.charter.cta}
                <ArrowRight
                  size={18}
                  className="transition-transform duration-base group-hover:translate-x-1"
                />
              </span>
            </Link>
          </Reveal>

          <div className="flex flex-col gap-s6 lg:col-span-5">
            {home.whatWeDo.supporting.map((item, i) => (
              <Reveal key={item.href} delay={(i + 1) * 80} className="h-full">
                <Link
                  href={item.href}
                  className="group flex h-full flex-col justify-between gap-s5 rounded-md border border-line bg-fog-raised p-s6 transition-colors duration-base hover:border-saddle focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                >
                  <div className="flex flex-col gap-s3">
                    <h3 className="font-display text-h3 font-semibold text-ink">{item.title}</h3>
                    <p className="text-body text-ink-soft">{item.body}</p>
                  </div>
                  <span className="inline-flex items-center gap-s2 font-semibold text-saddle transition-colors group-hover:text-gold">
                    {item.cta}
                    <ArrowUpRight
                      size={16}
                      className="transition-transform duration-base group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </SectionBand>

      {/* Beyond charter — Petrol */}
      <SectionBand
        tone="dark"
        gradient
        eyebrow={home.beyond.eyebrow}
        heading={home.beyond.heading}
        lead={home.beyond.body}
      >
        <div className="mt-s4 grid gap-s8 lg:grid-cols-2 lg:items-end">
          <ul className="flex flex-wrap gap-s9">
            {home.beyond.stats.map((s) => (
              <li key={s.label}>
                <StatBlock value={s.value} label={s.label} tone="dark" underline />
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-s4 lg:justify-end">
            {home.beyond.links.map((l) => (
              <Button key={l.href} href={l.href} variant="ghost">
                {l.label}
              </Button>
            ))}
          </div>
        </div>
      </SectionBand>

      {/* Reach — Fog (typographic destinations) */}
      <SectionBand
        tone="light"
        eyebrow={home.reach.eyebrow}
        heading={home.reach.heading}
        lead={home.reach.lead}
      >
        <p className="max-w-measure text-lead text-ink-soft">
          Tell us where you need to be and we position the right aircraft for the mission —
          the same single standard of safety on every leg, coast to coast and across oceans.
        </p>
        <div className="mt-s7">
          <Button href={home.reach.cta.href} variant="secondary">
            {home.reach.cta.label}
          </Button>
        </div>
      </SectionBand>

      {/* Accreditation strip — Fog */}
      <SectionBand
        tone="light"
        divider="top"
        eyebrow={home.accreditation.eyebrow}
        heading={home.accreditation.heading}
      >
        <AccreditationStrip />
      </SectionBand>

      {/* CTA band + cheatline into footer — Petrol */}
      <CtaBand />
    </>
  );
}
