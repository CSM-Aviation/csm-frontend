import Link from "next/link";
import Image from "next/image";
import { Logo } from "@/components/ui/Logo";
import { Container } from "@/components/ui/Container";
import { HorizonRule } from "@/components/horizon/HorizonRule";
import { footerNav } from "@/content/nav";
import { site } from "@/content/site";
import { accreditations } from "@/content/accreditations";

/**
 * Comprehensive footer (§02/§08): four nav columns + contact block +
 * accreditation row + legal line on the Abyss ground, Fog text, --line-dark
 * hairlines, Gold only on hover. Links to /sitemap. The five historical 404
 * links are intentionally absent (§02 IA fix log).
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-abyss text-paper-soft">
      <Container className="py-s9">
        <div className="grid gap-s8 lg:grid-cols-12">
          {/* Brand + contact */}
          <div className="flex flex-col gap-s5 lg:col-span-4">
            <Logo tone="block" width={88} />
            <p className="max-w-[34ch] text-body text-paper-soft">{site.tagline}</p>
            <div className="flex flex-col gap-s2 text-body">
              <a
                href={site.phone.href}
                className="tnum w-fit text-paper-on-dark transition-colors duration-fast hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
              >
                {site.phone.display}
              </a>
              <a
                href={site.email.href}
                className="w-fit text-paper-on-dark transition-colors duration-fast hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
              >
                {site.email.charter}
              </a>
            </div>
            {site.social.length > 0 && (
              <div className="flex gap-s4 text-small">
                {site.social.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-paper-soft transition-colors duration-fast hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Nav columns */}
          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-s6 sm:grid-cols-4 lg:col-span-8"
          >
            {footerNav.map((col) => (
              <div key={col.heading} className="flex flex-col gap-s3">
                <h2 className="text-eyebrow font-semibold uppercase tracking-[0.26em] text-gold">
                  {col.heading}
                </h2>
                <ul className="flex flex-col gap-s2">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-body text-paper-soft transition-colors duration-fast hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="my-s8">
          <HorizonRule color="line-dark" />
        </div>

        {/* Accreditation row — legible chips on the dark ground (dedicated
            AccreditationStrip band handles the prominent Fog treatment). */}
        <ul className="flex flex-wrap items-center gap-s4">
          {accreditations.map((a) => (
            <li key={a.name}>
              <a
                href={a.href}
                target="_blank"
                rel="noopener noreferrer"
                title={a.full}
                className="flex h-12 items-center rounded-sm bg-paper-on-dark/95 px-s3 transition-transform duration-fast hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
              >
                <Image
                  src={a.src}
                  alt={a.full}
                  width={64}
                  height={36}
                  className="h-7 w-auto object-contain"
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-s8 flex flex-col gap-s3 border-t border-line-dark pt-s5 text-small text-paper-soft sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <div className="flex gap-s5">
            <Link
              href="/privacy-policy"
              className="transition-colors duration-fast hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
            >
              Privacy Policy
            </Link>
            <Link
              href="/sitemap"
              className="transition-colors duration-fast hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
