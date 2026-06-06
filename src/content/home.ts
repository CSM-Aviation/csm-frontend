/**
 * Home page copy (§09). Voice: calm command — lead with reassurance, then the
 * detail; one italic Gold accent word in the hero (§16). OPEN CONTENT GAP (§10):
 * final hero headline and exact claims are stakeholder-owned; these are
 * on-brand drafts.
 */
export const home = {
  hero: {
    eyebrow: "Private charter · Acquisition · Management",
    // Two-tone hero (§16): "Safety" is white/upright (the grounded setup);
    // "Without Compromise" is gold + italic (the emphasized promise).
    titleLead: "Safety",
    titleMid: "Without",
    titleAccent: "Compromise",
    lead: "24/7 Live Support | Global Reach | Private Jet Charter",
  },

  whatWeDo: {
    eyebrow: "What we do",
    heading: "Three services, one standard.",
    lead: "Not three identical offers — a charter operation, an owner's flight department, and the affiliated services that reinforce each other.",
    charter: {
      title: "Charter",
      body: "Retail, medical, and wholesale charter — coast to coast and worldwide. The right aircraft for the mission, briefed and tracked the whole way.",
      href: "/charter",
      cta: "Explore charter",
    },
    supporting: [
      {
        title: "Aircraft Management",
        body: "Lower the cost of ownership without lowering the standard — with transparent monthly reporting you can actually read.",
        href: "/management",
        cta: "For owners",
      },
    ],
  },

  beyond: {
    eyebrow: "The whole aircraft lifecycle",
    heading: "Beyond charter.",
    body: "Most operators do one thing. CSM brings charter and management together with the maintenance and aircraft-care services of our affiliated companies — one accountable relationship for the life of the aircraft, and no seams for problems to hide in.",
    stats: [
      { value: "1", label: "Accountable team, end to end" },
      { value: "24/7", label: "Live specialist support" },
    ],
    links: [
      { label: "Aircraft Management", href: "/management" },
    ],
  },

  reach: {
    eyebrow: "Worldwide reach",
    heading: "Wherever the mission takes you.",
    lead: "From domestic hops to intercontinental trips, we fly nationwide and worldwide.",
    cta: { label: "All destinations", href: "/destinations" },
  },

  accreditation: {
    eyebrow: "Accredited & audited",
    heading: "Independently verified, not self-declared.",
  },
} as const;
