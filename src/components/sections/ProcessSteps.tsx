import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export interface ProcessStep {
  title: string;
  body: string;
}

/**
 * Numbered process laid out along the horizon (§07/§10). Each step's index sits
 * on a fine Gold rule — the logo's line promoted to a layout device. Reveals
 * with a calm stagger; tone sets the body contrast for light/dark bands.
 */
export function ProcessSteps({
  steps,
  tone = "dark",
}: {
  steps: readonly ProcessStep[];
  tone?: "light" | "dark";
}) {
  return (
    <ol className="grid gap-s7 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, i) => (
        <Reveal as="li" key={step.title} delay={Math.min(i, 4) * 80} className="flex flex-col gap-s3">
          <span className="tnum font-display text-h2 font-semibold leading-none text-gold">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span aria-hidden className={cn("h-px w-full", tone === "dark" ? "bg-line-dark" : "bg-line")} />
          <h3 className="font-display text-h3 font-semibold text-current">{step.title}</h3>
          <p className={cn("text-body", tone === "dark" ? "text-paper-soft" : "text-ink-soft")}>
            {step.body}
          </p>
        </Reveal>
      ))}
    </ol>
  );
}
