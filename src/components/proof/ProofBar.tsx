import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
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
  /** Stat columns at desktop: 4 (classic strip) or 2 (roomier 2×2 for long values). */
  columns?: 2 | 4;
}

/**
 * A row of stat/proof blocks — the trust down-payment placed high on a page
 * (§09 step 2). Responsive grid; reveals with a calm stagger.
 */
export function ProofBar({ items, tone = "light", underline = true, columns = 4 }: ProofBarProps) {
  return (
    <ul
      className={cn(
        "grid gap-x-s6 gap-y-s8",
        columns === 4 ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-1 sm:grid-cols-2",
      )}
    >
      {items.map((item, i) => (
        <Reveal as="li" key={i} delay={Math.min(i, 4) * 80}>
          <StatBlock value={item.value} label={item.label} underline={underline} tone={tone} />
        </Reveal>
      ))}
    </ul>
  );
}
