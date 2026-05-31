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
    pullQuote: "The standard that flies an organ-transport mission is the standard that flies every mission.",
    paragraphs: [
      "CSM Aviation operates from California's Central Valley, positioned to serve all of California and Nevada and to fly anywhere from there. Charter, aircraft management, and an in-house Part 145 repair station sit under one roof.",
      "That structure is deliberate. When the same team charters, manages, and maintains, there are no seams for problems to hide in — and one accountable group answers for the aircraft across its whole life.",
      "Our medical and organ-transport work sets the bar. These are time-critical flights where there is no room for error, and the discipline they demand carries into every trip we fly — retail, wholesale, or a quiet weekend away.",
      "We say less and verify more. Our accreditations are independent audits, not marketing. Our reporting is plain. And our phone is answered, 24 hours a day, by someone who can help.",
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
