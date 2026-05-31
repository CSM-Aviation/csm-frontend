import { Reveal } from "@/components/ui/Reveal";
import { StatBlock } from "./StatBlock";

export interface ProofStat {
  value: React.ReactNode;
  label: React.ReactNode;
}

interface ProofBarProps {
  items: ProofStat[];
  tone?: "light" | "dark";
  /** Gold underline under each number. */
  underline?: boolean;
}

/**
 * A row of stat/proof blocks — the trust down-payment placed high on a page
 * (§09 step 2). Responsive grid; reveals with a calm stagger.
 */
export function ProofBar({ items, tone = "light", underline = true }: ProofBarProps) {
  return (
    <ul className="grid grid-cols-2 gap-x-s6 gap-y-s8 sm:grid-cols-4">
      {items.map((item, i) => (
        <Reveal as="li" key={i} delay={Math.min(i, 4) * 80}>
          <StatBlock value={item.value} label={item.label} underline={underline} tone={tone} />
        </Reveal>
      ))}
    </ul>
  );
}
