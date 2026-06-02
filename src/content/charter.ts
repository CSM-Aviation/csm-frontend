/**
 * Charter landing copy (§10). The three modes are CSM's real differentiators —
 * each gets dignity and its own proof point, not a stock-photo card.
 */
export const charter = {
  hero: {
    eyebrow: "Charter",
    title: "Charter, intake to wheels-down.",
    lead: "Tell us where you need to be. We match the aircraft to the mission, brief the crew, and keep you informed at every step — the kind of constant communication that earns repeat trips.",
  },

  modes: {
    eyebrow: "Three kinds of charter",
    heading: "Different missions. The same standard.",
    items: [
      {
        title: "Direct charter",
        body: "Retail and repeat clients who want a price and a trip, fast — with the reassurance that safety is never the variable.",
        proof: "ARGUS Gold rated",
      },
      {
        title: "Medical & organ transport",
        body: "On-demand, time-critical flights where failure is not an option. This is the work that defines us.",
        proof: "Perfect safety record · 10+ years",
      },
      {
        title: "Wholesale & broker",
        body: "Responsive, verifiable lift for brokers who need a partner that answers the phone and stands behind its operation.",
        proof: "24/7 specialist response",
      },
    ],
  },

  howItWorks: {
    eyebrow: "How it works",
    heading: "Four steps, constant communication.",
    steps: [
      { title: "Request", body: "Send your route and dates. A specialist picks it up — day or night." },
      { title: "Tailored options", body: "We match aircraft to the mission and come back with clear options and pricing." },
      { title: "Confirm", body: "You approve. We handle crew, ground, and the details you'd rather not think about." },
      { title: "Fly", body: "Wheels-up on schedule, with updates the whole way to wheels-down." },
    ],
  },

  fleetTeaser: {
    eyebrow: "The fleet",
    heading: "The right aircraft for the trip.",
    lead: "We are positioned to fly globally and meet your travel requirements anywhere. Our dedicated fleet below and large network of partners allow us to support trips and missions of any size",
    cta: { label: "See the full fleet", href: "/charter/fleet" },
  },

  reach: {
    eyebrow: "Reach",
    heading: "Where our clients fly.",
    lead: "From our Central Valley base to the destinations asked for most.",
    cta: { label: "All destinations", href: "/destinations" },
  },
} as const;
