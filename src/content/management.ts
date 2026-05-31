/**
 * Aircraft Management copy (§12). Owners weigh two things: money and
 * transparency. Lead with both. Editorial, not a card grid.
 */
export const management = {
  hero: {
    eyebrow: "Aircraft Management",
    title: "Lower the cost of ownership. Not the standard.",
    lead: "An on-demand flight department for your aircraft — run by the same team that holds a perfect medical-transport safety record, with reporting you can actually read.",
    cta: { label: "Talk to our team", href: "/company/contact" },
  },

  pitch: {
    eyebrow: "What you get",
    heading: "A flight department without the overhead.",
    lead: "Everything an in-house department does — crew, scheduling, maintenance oversight, compliance — without carrying it all on your own books.",
    points: [
      {
        title: "On-demand flight department",
        body: "Crewing, scheduling, dispatch, and compliance handled by a team that does this every day, so your aircraft is ready when you are.",
      },
      {
        title: "Lower cost of ownership",
        body: "Shared infrastructure, negotiated rates, and optional charter revenue offset the fixed costs of owning — without compromising on how the aircraft is flown.",
      },
      {
        title: "Transparent monthly reporting",
        body: "A clear monthly statement of flights, hours, maintenance, and costs. No black boxes, no surprises at year end.",
      },
      {
        title: "In-house maintenance program",
        body: "Your aircraft is maintained in our own Part 145 station — a lifecycle advantage most managers have to outsource.",
      },
    ],
  },

  transparency: {
    eyebrow: "Transparency, shown",
    heading: "You see what we see.",
    lead: "A representative month — the kind of statement owners receive, in plain figures.",
    report: {
      period: "Monthly statement · sample",
      rows: [
        { label: "Flights flown", value: "14" },
        { label: "Flight hours", value: "28.6" },
        { label: "Charter revenue applied", value: "Itemized" },
        { label: "Maintenance events", value: "2 · scheduled" },
        { label: "Variance to estimate", value: "Within plan" },
      ],
      note: "Illustrative sample for layout. Figures provided by stakeholders before launch (§10).",
    },
  },

  why: {
    eyebrow: "Why CSM",
    heading: "Safety record and a repair station, under one roof.",
    body: "The same standard that flies organ-transport missions oversees your aircraft. And because our Part 145 station is in-house, maintenance is a lifecycle advantage — not a vendor relationship you have to manage.",
  },
} as const;
