/**
 * Site-wide constants (contact, identity). Single source for the header CTA,
 * footer, mobile call action, and structured data. NAP per build spec §07.
 *
 * OPEN CONTENT GAP (§10): street address and the exact base city are
 * stakeholder-confirmed items — placeholders flagged below.
 */
export const site = {
  name: "CSM Aviation",
  tagline: "Safety Without Compromise.",
  url: "https://www.csmaviation.com",

  phone: {
    display: "(888) I-FLY-CSM",
    href: "tel:+18884359276",
  },
  email: {
    charter: "charter@csmaviation.com",
    href: "mailto:charter@csmaviation.com",
  },

  // NAP base — region confirmed (Central Valley, CA); full street TODO (§10).
  address: {
    region: "California",
    locality: "Central Valley",
    country: "US",
  },

  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/csm-aviation" },
    { label: "Instagram", href: "https://www.instagram.com/csm_aviation" },
    { label: "Facebook", href: "https://www.facebook.com/CSMaviation/" },
    { label: "X", href: "https://twitter.com/CSMAviation" },
  ],
} as const;
