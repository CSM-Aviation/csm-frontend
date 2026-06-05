import { site } from "@/content/site";

/**
 * Structured-data builders (§07). Organization + LocalBusiness ship site-wide
 * (in the root layout); Service schema ships on charter/management/maintenance.
 * NAP matches site.ts: (888) I-FLY-CSM / tel:+18884359276 · charter@csmaviation.com.
 */

const TELEPHONE = "+18884359276";

export const organizationSchema: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  "@id": `${site.url}/#organization`,
  name: site.name,
  url: site.url,
  telephone: TELEPHONE,
  email: site.email.charter,
  logo: `${site.url}/images/logos/csm-mark-petrol.svg`,
  image: `${site.url}/images/logos/csm-block-petrol.svg`,
  address: {
    "@type": "PostalAddress",
    addressLocality: site.address.locality,
    addressRegion: "CA",
    addressCountry: site.address.country,
  },
  areaServed: ["United States", "Worldwide"],
  sameAs: site.social.map((s) => s.href),
};

export function serviceSchema(opts: {
  name: string;
  description: string;
  path: string;
  serviceType: string;
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    serviceType: opts.serviceType,
    description: opts.description,
    url: `${site.url}${opts.path}`,
    areaServed: ["United States", "Worldwide"],
    provider: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
      telephone: TELEPHONE,
    },
  };
}
