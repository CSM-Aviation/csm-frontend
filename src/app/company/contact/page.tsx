import type { Metadata } from "next";
import { Phone, Mail, MapPin } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageHero } from "@/components/layout/PageHero";
import { SectionBand } from "@/components/layout/SectionBand";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { HorizonRule } from "@/components/horizon/HorizonRule";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Speak with CSM Aviation — 24 hours a day. Call (888) I-FLY-CSM, email charter@csmaviation.com, or send a message and a specialist will reply personally.",
  alternates: { canonical: "/company/contact" },
};

const VALID_INQUIRY = new Set(["charter", "management", "maintenance", "general"]);

export default function ContactPage({
  searchParams,
}: {
  searchParams: { inquiry?: string };
}) {
  const inquiry =
    searchParams.inquiry && VALID_INQUIRY.has(searchParams.inquiry)
      ? searchParams.inquiry
      : "charter";

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Speak with us."
        lead="A specialist is reachable 24 hours a day, every day. Call, email, or send a message below — whichever's easiest."
      />

      {/* Contact grid — Fog, asymmetric */}
      <SectionBand tone="light">
        <div className="grid gap-s9 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow tone="saddle" className="mb-s5">
              Send a message
            </Eyebrow>
            <ContactForm defaultInquiry={inquiry} />
          </div>

          <aside className="flex flex-col gap-s6 lg:col-span-5">
            <Eyebrow tone="saddle">Direct channels</Eyebrow>

            <a
              href={site.phone.href}
              className="group flex items-start gap-s4 rounded-md border border-line bg-fog-raised p-s5 transition-colors duration-base hover:border-saddle focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
            >
              <Phone size={22} strokeWidth={1.75} className="mt-1 text-saddle" />
              <span className="flex flex-col">
                <span className="text-small text-ink-faint">Call · 24/7</span>
                <span className="tnum font-display text-h3 font-semibold text-ink transition-colors group-hover:text-gold">
                  {site.phone.display}
                </span>
              </span>
            </a>

            <a
              href={site.email.href}
              className="group flex items-start gap-s4 rounded-md border border-line bg-fog-raised p-s5 transition-colors duration-base hover:border-saddle focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
            >
              <Mail size={22} strokeWidth={1.75} className="mt-1 text-saddle" />
              <span className="flex flex-col">
                <span className="text-small text-ink-faint">Email</span>
                <span className="text-body font-medium text-ink transition-colors group-hover:text-gold">
                  {site.email.charter}
                </span>
              </span>
            </a>

            <div className="flex items-start gap-s4 rounded-md border border-line bg-fog-raised p-s5">
              <MapPin size={22} strokeWidth={1.75} className="mt-1 text-saddle" />
              <span className="flex flex-col">
                <span className="text-small text-ink-faint">Base</span>
                <span className="text-body font-medium text-ink">
                  {site.address.locality}, {site.address.region}
                </span>
                <span className="text-small text-ink-faint">
                  Serving clients nationwide &amp; worldwide
                </span>
              </span>
            </div>

            {site.social.length > 0 && (
              <div className="flex flex-col gap-s2">
                <span className="text-small text-ink-faint">Follow</span>
                <div className="flex gap-s4">
                  {site.social.map((s) => (
                    <a
                      key={s.href}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-body font-medium text-saddle transition-colors hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </SectionBand>

      {/* Location — branded, not a raw embed */}
      <SectionBand tone="dark" gradient eyebrow="Find us" heading="Built for reach.">
        <div className="relative overflow-hidden rounded-lg border border-line-dark bg-petrol-600 p-s8">
          <div className="flex flex-col gap-s5">
            <HorizonRule color="gold" animate />
            <p className="max-w-measure text-lead text-paper-soft">
              We fly nationwide and worldwide, positioning the right aircraft wherever the
              mission begins. For ramp details and arrival coordination, call ahead and our
              team will handle it.
            </p>
            <HorizonRule color="line-dark" />
          </div>
        </div>
      </SectionBand>
    </>
  );
}
