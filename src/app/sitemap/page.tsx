import type { Metadata } from "next";
import Link from "next/link";
import { footerNav } from "@/content/nav";
import { PageHero } from "@/components/layout/PageHero";
import { SectionBand } from "@/components/layout/SectionBand";
import { Eyebrow } from "@/components/ui/Eyebrow";

export const metadata: Metadata = {
  title: "Sitemap",
  description: "Every page on the CSM Aviation site, in one place.",
  alternates: { canonical: "/sitemap" },
};

export default function SitemapPage() {
  return (
    <>
      <PageHero eyebrow="Sitemap" title="Everything, in one place." />

      <SectionBand tone="light">
        <ul className="grid gap-s8 sm:grid-cols-2 lg:grid-cols-4">
          <li className="flex flex-col gap-s3">
            <Eyebrow tone="gold">Home</Eyebrow>
            <Link
              href="/"
              className="w-fit text-body text-ink-soft transition-colors hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
            >
              Home
            </Link>
          </li>
          {footerNav.map((col) => (
            <li key={col.heading} className="flex flex-col gap-s3">
              <Eyebrow tone="gold">{col.heading}</Eyebrow>
              <ul className="flex flex-col gap-s2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-body text-ink-soft transition-colors hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </SectionBand>
    </>
  );
}
