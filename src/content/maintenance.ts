/**
 * Maintenance copy (§13). Establish Part 145 credibility for owners and third
 * parties. AOG (aircraft-on-ground) gets emphasis — the urgent, high-trust job.
 */
export const maintenance = {
  hero: {
    eyebrow: "Maintenance",
    title: "FAA-Certified Part 145 Repair Station.",
    lead: "The credential leads. In-house maintenance for our managed fleet and for third-party operators who need the work done right the first time.",
    cta: { label: "Request service", href: "/company/contact?inquiry=maintenance" },
  },

  services: {
    eyebrow: "Services",
    heading: "What we do in the hangar.",
    items: [
      {
        title: "AOG response",
        body: "Aircraft on the ground is the call we answer first. Rapid diagnosis and return-to-service to get you flying again — the urgent work, handled.",
        urgent: true,
      },
      {
        title: "MRO services",
        body: "Scheduled inspections, maintenance, and repair to keep airframes and systems airworthy and on program.",
        urgent: false,
      },
      {
        title: "Engine repair",
        body: "Engine maintenance and troubleshooting performed to manufacturer and Part 145 standards.",
        urgent: false,
      },
      {
        title: "Aircraft parts",
        body: "Sourcing and management of parts and components, so the right piece is on hand when the work needs it.",
        urgent: false,
      },
    ],
  },

  standards: {
    eyebrow: "Standards",
    heading: "Certified, audited, accountable.",
    lead: "Part 145 certification plus the same accreditations that back our charter operation — the work is verifiable, not just promised.",
    points: [
      { value: "Part 145", label: "FAA-certified repair station" },
      { value: "In-house", label: "Maintenance for our managed fleet" },
      { value: "ARGUS", label: "Gold-rated operation" },
    ],
  },

  cta: {
    eyebrow: "Aircraft on the ground?",
    heading: "Call the AOG line.",
    lead: "Urgent maintenance doesn't wait for business hours. Neither do we.",
  },
} as const;
