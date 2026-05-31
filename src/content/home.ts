/**
 * Home page copy (§09). Voice: calm command — lead with reassurance, then the
 * detail; one italic Gold accent word in the hero (§16). OPEN CONTENT GAP (§10):
 * final hero headline and exact claims are stakeholder-owned; these are
 * on-brand drafts.
 */
export const home = {
  hero: {
    eyebrow: "Private charter · Management · Maintenance",
    // The single accent word renders in italic Gold (see page).
    titleLead: "Trusted with what",
    titleAccent: "matters",
    titleTail: "most.",
    lead: "24/7 Live Support | Global Reach | Private Jet Charter",
  },

  whatWeDo: {
    eyebrow: "What we do",
    heading: "Three services, one standard.",
    lead: "Not three identical offers — a charter operation, an owner's flight department, and an in-house repair station that reinforce each other.",
    charter: {
      title: "Charter",
      body: "Retail, medical, and wholesale charter across California, Nevada, and beyond. The right aircraft for the mission, briefed and tracked the whole way.",
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
      {
        title: "Maintenance",
        body: "An FAA-certified Part 145 repair station in-house, including AOG response when an aircraft is on the ground.",
        href: "/maintenance",
        cta: "Part 145",
      },
    ],
  },

  beyond: {
    eyebrow: "The whole aircraft lifecycle",
    heading: "Beyond charter.",
    body: "Most operators do one thing. CSM keeps charter, management, and Part 145 maintenance under one roof — which means one accountable team for the life of the aircraft, and no seams for problems to hide in.",
    stats: [
      { value: "1", label: "Accountable team, end to end" },
      { value: "145", label: "In-house FAA repair station" },
    ],
    links: [
      { label: "Aircraft Management", href: "/management" },
      { label: "Maintenance", href: "/maintenance" },
    ],
  },

  reach: {
    eyebrow: "Central Valley reach",
    heading: "One base. All of California and Nevada.",
    lead: "Positioned to serve the West and fly anywhere from there. A few routes our clients ask for most:",
    cta: { label: "All destinations", href: "/destinations" },
  },

  accreditation: {
    eyebrow: "Accredited & audited",
    heading: "Independently verified, not self-declared.",
  },
} as const;
