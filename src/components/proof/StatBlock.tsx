import { cn } from "@/lib/utils";

interface StatBlockProps {
  value: React.ReactNode;
  label: React.ReactNode;
  /** Optional Gold horizon underline beneath the number (§08). */
  underline?: boolean;
  /** Ground the block sits on — sets the label/underline contrast. */
  tone?: "light" | "dark";
  className?: string;
}

/**
 * Stat / proof block (§08): a big Cormorant number over an Inter label, with an
 * optional Gold horizon underline. Used for trust proof ("Perfect safety
 * record", "ARGUS Gold", "10+ yrs medical transport"). The number is tabular.
 */
export function StatBlock({ value, label, underline = false, tone = "dark", className }: StatBlockProps) {
  return (
    <div className={cn("flex flex-col gap-s2", className)}>
      <span className="tnum font-display text-h1 font-semibold leading-none text-current">
        {value}
      </span>
      {underline && <span aria-hidden className="h-px w-10 bg-gold" />}
      <span className={cn("text-body", tone === "dark" ? "text-paper-soft" : "text-ink-soft")}>
        {label}
      </span>
    </div>
  );
}
