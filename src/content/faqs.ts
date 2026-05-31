/**
 * FAQ content (§06 lighter-touch). Plain-spoken, in the brand voice — answers
 * lead with reassurance. OPEN CONTENT GAP (§10): confirm specifics (payment,
 * pets, exact response times) with stakeholders before launch.
 */
export interface Faq {
  q: string;
  a: string;
}

export const faqs: Faq[] = [
  {
    q: "How quickly can you arrange a flight?",
    a: "For most trips, we return tailored options within the hour — any hour. Short-notice and same-day requests are routine for us; call and we'll tell you straight away what's possible.",
  },
  {
    q: "What makes CSM different from a booking broker?",
    a: "We're an operator, not a middleman. We charter, manage, and maintain aircraft under one roof — so one accountable team stands behind your flight, from the crew to the maintenance that keeps the aircraft airworthy.",
  },
  {
    q: "Are you safety-rated?",
    a: "Yes. We're ARGUS Gold rated and Wyvern registered, with membership in NBAA, NATA, and the ACSF. These are independent audits, re-verified over time — not self-declared badges.",
  },
  {
    q: "Do you fly medical and organ-transport missions?",
    a: "We do, and it's work that defines us. These are time-critical flights where there's no room for error, flown to a perfect safety record over more than ten years. The discipline they demand carries into every trip we fly.",
  },
  {
    q: "Which aircraft will I fly on?",
    a: "We match the aircraft to the mission — range, party size, and the airfields involved. Browse the fleet to see the light jets, midsize jets, and turboprops we operate, or tell us your trip and we'll recommend.",
  },
  {
    q: "I own an aircraft. What does management involve?",
    a: "An on-demand flight department: crewing, scheduling, compliance, and maintenance oversight, with transparent monthly reporting you can actually read. The goal is a lower cost of ownership without lowering the standard.",
  },
  {
    q: "Do you maintain aircraft for outside operators?",
    a: "Yes. Our FAA-certified Part 145 repair station handles MRO, engine repair, parts, and AOG response for our managed fleet and for third-party operators who need the work done right the first time.",
  },
  {
    q: "How do I reach someone right now?",
    a: "Call (888) I-FLY-CSM — that's tel:+18884359276 — 24 hours a day, every day. A specialist answers, not a queue.",
  },
];
