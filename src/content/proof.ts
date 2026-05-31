/**
 * Proof statistics — the trust down-payment (§09/§14). Values mirror the
 * positioning pillars (§01). NOTE (§10 content gap): exact safety/years figures
 * are stakeholder-confirmed; "Perfect", "10+", and accreditation counts below
 * track the design doc's own claims and should be verified before launch.
 */
export interface ProofStat {
  value: string;
  label: string;
}

export const homeProof: ProofStat[] = [
  { value: "Perfect", label: "Safety record" },
  { value: "ARGUS", label: "Gold rated" },
  { value: "10+", label: "Years of medical transport" },
  { value: "24/7", label: "Specialist response" },
];

export const aboutProof: ProofStat[] = [
  { value: "10+", label: "Years operating" },
  { value: "Perfect", label: "Medical-transport record" },
  { value: "5", label: "Industry accreditations" },
  { value: "CA + NV", label: "Served from one base" },
];
