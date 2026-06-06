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
        title: "Maintenance oversight",
        body: "We coordinate your aircraft's maintenance program with trusted, certified providers — so the work is tracked, scheduled, and accountable, without you managing vendors.",
      },
    ],
  },

  why: {
    eyebrow: "Why CSM",
    heading: "One accountable team for the life of the aircraft.",
    body: "The same standard that flies our most demanding missions guides how your aircraft is operated and cared for. Crewing, scheduling, compliance, and maintenance oversight sit with one team — so there are no seams for problems to hide in.",
  },
} as const;
