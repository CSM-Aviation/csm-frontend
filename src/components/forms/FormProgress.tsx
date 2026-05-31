import { cn } from "@/lib/utils";

/**
 * Multi-step progress shown as a drawing horizon line (§08), not a chunky
 * stepper. The Gold line fills to the current step; small nodes mark each step
 * with its label beneath.
 */
export function FormProgress({ steps, current }: { steps: string[]; current: number }) {
  const last = Math.max(1, steps.length - 1);
  const pct = Math.min(1, current / last);

  return (
    <div className="flex flex-col gap-s3" aria-hidden>
      <div className="relative h-px w-full bg-line">
        <div
          className="absolute inset-y-0 left-0 bg-gold transition-[width] duration-base ease-calm"
          style={{ width: `${pct * 100}%` }}
        />
        {steps.map((label, i) => (
          <span
            key={label}
            className={cn(
              "absolute top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-colors duration-base",
              i <= current ? "bg-gold" : "bg-line",
            )}
            style={{ left: `${(i / last) * 100}%` }}
          />
        ))}
      </div>
      <ol className="flex justify-between">
        {steps.map((label, i) => (
          <li
            key={label}
            className={cn(
              "text-small",
              i <= current ? "font-medium text-ink" : "text-ink-faint",
            )}
          >
            {label}
          </li>
        ))}
      </ol>
    </div>
  );
}
