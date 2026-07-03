/**
 * Proof statistics — the trust down-payment (§09/§14). Values mirror the
 * positioning pillars (§01). NOTE (§10 content gap): exact safety/years figures
 * are stakeholder-confirmed; "Perfect", "18+", and accreditation counts below
 * track the design doc's own claims and should be verified before launch.
 */
export interface ProofStat {
  value: string;
  label: string;
}

export const homeProof: ProofStat[] = [
  { value: "18+ Years", label: "Serving Aircraft Owners and Travellers" },
  { value: "Safety", label: "Independent accreditations and rigorous standards" },
  { value: "24/7 Availability", label: "Real People. Real Support. Around the Clock." },
  { value: "Complete Aviation Support", label: "Charter, Management, Sales, affiliated MRO and Owner Services" },
];

export const aboutProof: ProofStat[] = [
  { value: "Perfect", label: "Safety record" },
  { value: "18+", label: "Years of excellence" },
  { value: "Flights", label: "Thousands per year" },
  { value: "Team", label: "Best in the industry" },
];
