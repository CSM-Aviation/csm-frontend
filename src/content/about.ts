/**
 * About copy (§14) — the trust narrative, where "calm command" is told, not
 * implied. Cormorant pull-quotes, plain-spoken body, no corporate filler.
 * OPEN CONTENT GAP (§10): the real company history/narrative is stakeholder-
 * owned; this is an on-brand draft scaffold.
 */
export const about = {
  hero: {
    eyebrow: "About CSM",
    title: "A Central Valley operator, trusted with what matters.",
    lead: "We're not the loudest name in private aviation. We're the one called when a flight cannot fail — and we've built everything around being worthy of that call.",
  },

  story: {
    eyebrow: "Who we are",
    paragraphs: [
      "CSM Aviation was built on a simple belief: private aviation requires more than access to an aircraft — it requires a trusted partner.",
      "Based in California's Central Valley and throughout the western United States, we provide comprehensive private aviation solutions globally. We bring together a comprehensive suite of expertise and service to support aircraft management, private charter, sales through CSM Aviation and through our family of affiliated companies, we provide maintenance, aircraft care and detailing, and outsourced family office services designed to simplify the financial and administrative responsibilities of aircraft ownership.",
      "Our integrated approach is intentional. When the teams responsible for operating, maintaining, and supporting an aircraft work together, owners benefit from greater accountability, transparency, and a deeper understanding of their aircraft throughout its life.",
      "The same commitment to safety, professionalism, and care for our clients, customers and fleet guides every part of our organization — from the cockpit to the hangar, to the teams supporting each flight behind the scenes.",
      "Behind every flight is a mission, a business, a family, and a person who places their trust in us. We honor that trust through consistent service, uncompromising standards, and building relationships grounded in safety, accountability and integrity.",
    ],
  },

  standards: {
    eyebrow: "Standards & accreditations",
    heading: "What these marks actually mean.",
    lead: "Most travelers don't know the difference between one badge and another. Here's what ours certify.",
    items: [
      {
        name: "ARGUS Gold",
        meaning: "An independent audit of safety systems, crew experience, and operational history. Gold is earned, then re-verified.",
      },
      {
        name: "Wyvern",
        meaning: "A safety registration with rigorous flight-leg risk reporting — the standard many Fortune 500 flight departments require.",
      },
      {
        name: "NBAA · NATA · ACSF",
        meaning: "Membership and safety-foundation participation that hold us to the business-aviation industry's shared standards.",
      },
    ],
  },
} as const;
