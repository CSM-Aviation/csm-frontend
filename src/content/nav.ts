/**
 * Header + footer link model (design doc §02). Section parents are clickable
 * links AND dropdown toggles — this is what fixes the orphaned /charter and
 * /company landings. The five historical 404 footer links
 * (/charter/empty-legs, /services/sales, /services/consulting, /company/team,
 * /safety) are deliberately NOT recreated (§02 IA fix log).
 */

export interface NavLink {
  label: string;
  href: string;
  /** Optional one-line gloss shown in mega-style dropdowns. */
  hint?: string;
}

export interface NavSection extends NavLink {
  /** Dropdown children. Section parent still navigates to `href` on click. */
  children?: NavLink[];
}

/** Primary header navigation. */
export const primaryNav: NavSection[] = [
  {
    label: "Charter",
    href: "/charter",
    children: [
      { label: "Charter Overview", href: "/charter", hint: "How we fly" },
      // { label: "Our Fleet", href: "/charter/fleet", hint: "Aircraft by category" },
      { label: "Destinations", href: "/destinations", hint: "Where we go" },
      { label: "Request a Quote", href: "/charter/quote", hint: "Start a trip" },
      { label: "Plan a Trip", href: "/charter/trip", hint: "Tell us your itinerary" },
    ],
  },
  { label: "Aircraft Management", href: "/management" },
  { label: "Sales & Acquisitions", href: "/sales-acquisitions" },
  {
    label: "Company",
    href: "/company/about",
    children: [
      { label: "About CSM", href: "/company/about", hint: "Our standard" },
      { label: "Contact", href: "/company/contact", hint: "Speak to our team" },
    ],
  },
];

/** The one persistent accent action, present on every page. */
export const primaryCta: NavLink = { label: "Request a Quote", href: "/charter/quote" };

/** Footer — four columns of legitimate secondary nav (§02 / §08). */
export interface FooterColumn {
  heading: string;
  links: NavLink[];
}

export const footerNav: FooterColumn[] = [
  {
    heading: "Charter",
    links: [
      { label: "Charter Overview", href: "/charter" },
      // { label: "Our Fleet", href: "/charter/fleet" },
      { label: "Request a Quote", href: "/charter/quote" },
      { label: "Plan a Trip", href: "/charter/trip" },
      { label: "Destinations", href: "/destinations" },
    ],
  },
  {
    heading: "Services",
    links: [
      { label: "Aircraft Management", href: "/management" },
      { label: "Sales & Acquisitions", href: "/sales-acquisitions" },
      { label: "Customer Experience", href: "/customer-experience" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About CSM", href: "/company/about" },
      { label: "Contact", href: "/company/contact" },
      { label: "FAQs", href: "/faqs" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Sitemap", href: "/sitemap" },
      { label: "Privacy Policy", href: "/privacy-policy" },
    ],
  },
];
