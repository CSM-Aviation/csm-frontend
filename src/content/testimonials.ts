/**
 * Testimonials — now STATIC content (not the old API/admin, build spec §00/§06).
 * OPEN CONTENT GAP (§10): real, attributed testimonials are stakeholder-owned;
 * these are on-brand, role-based placeholders pending approved quotes.
 */
export interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

export const experiencePromise = {
  eyebrow: "Customer experience",
  heading: "Seamless, from intake to wheels-down.",
  lead: "The flight is the easy part. What clients remember is the communication around it — knowing where things stand, every step, without having to ask.",
  pillars: [
    {
      title: "One point of contact",
      body: "A specialist owns your trip end to end. No handoffs, no repeating yourself.",
    },
    {
      title: "Constant communication",
      body: "Updates before you need them — confirmations, timing, and any change, proactively.",
    },
    {
      title: "Handled on the ground",
      body: "Ramp access, ground transport, and the small details coordinated ahead of time.",
    },
  ],
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "They treat a 3 a.m. medical flight with the same calm as a planned trip. That consistency is why we keep calling.",
    author: "Operations Lead",
    role: "Medical transport partner",
  },
  {
    quote:
      "Managing our aircraft with CSM finally made the numbers legible. The monthly report tells me exactly where things stand.",
    author: "Aircraft Owner",
    role: "Managed fleet",
  },
  {
    quote:
      "Responsive, verifiable, and they answer the phone. As a broker, that's the whole job.",
    author: "Charter Broker",
    role: "Wholesale partner",
  },
];
