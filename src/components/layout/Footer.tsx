import Link from "next/link";
import Image from "next/image";
import { Logo } from "@/components/ui/Logo";
import { Container } from "@/components/ui/Container";
import { HorizonRule } from "@/components/horizon/HorizonRule";
import { footerNav } from "@/content/nav";
import { site } from "@/content/site";
import { accreditations } from "@/content/accreditations";

/** Brand glyphs (24×24 simple-icons paths) keyed by the social label. */
const socialIcons: Record<string, string> = {
  LinkedIn:
    "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  Instagram:
    "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
  Facebook:
    "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  X: "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z",
};

/**
 * Comprehensive footer (§02/§08): four nav columns + contact block +
 * accreditation row + legal line on the Abyss ground, Fog text, --line-dark
 * hairlines, Gold only on hover. Links to /sitemap. The five historical 404
 * links are intentionally absent (§02 IA fix log).
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-petrol text-paper-soft">
      <Container className="py-s9">
        <div className="grid gap-s8 lg:grid-cols-12">
          {/* Brand + contact */}
          <div className="flex flex-col gap-s5 lg:col-span-4">
            <Logo tone="reversed" width={180} />
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
              <div className="flex gap-s4">
                {site.social.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`CSM Aviation on ${s.label}`}
                    className="text-paper-soft transition-colors duration-fast hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width={20}
                      height={20}
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d={socialIcons[s.label]} />
                    </svg>
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
