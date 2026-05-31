import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { HorizonDivider } from "@/components/horizon/HorizonDivider";
import { cn } from "@/lib/utils";

type Tone = "light" | "dark" | "abyss";
type DividerPos = "top" | "bottom" | "both";

interface SectionBandProps {
  tone?: Tone;
  width?: "contained" | "bleed";
  eyebrow?: string;
  eyebrowTone?: "saddle" | "gold";
  heading?: React.ReactNode;
  lead?: React.ReactNode;
  divider?: DividerPos;
  /** Dark bands may carry the near-invisible Petrol→Abyss vertical gradient (§07). */
  gradient?: boolean;
  /** Tighten the vertical rhythm (e.g. compact hero/contact). */
  compact?: boolean;
  id?: string;
  className?: string;
  /** Inner content wrapper class (grid setup, etc.). */
  innerClassName?: string;
  children?: React.ReactNode;
}

const TONE_BG: Record<Tone, string> = {
  light: "bg-fog text-ink",
  dark: "bg-petrol text-paper-on-dark",
  abyss: "bg-abyss text-paper-on-dark",
};

/**
 * The fundamental layout unit (§08). Each page is an ordered stack of these,
 * alternating tone to create the light/dark "horizon" rhythm (§03). Renders an
 * optional eyebrow + h2 + lead header (revealed on scroll) above its children,
 * with optional horizon dividers at the seams.
 */
export function SectionBand({
  tone = "light",
  width = "contained",
  eyebrow,
  eyebrowTone = "saddle",
  heading,
  lead,
  divider,
  gradient = false,
  compact = false,
  id,
  className,
  innerClassName,
  children,
}: SectionBandProps) {
  const dividerTone = tone === "light" ? "light" : "dark";
  const showTop = divider === "top" || divider === "both";
  const showBottom = divider === "bottom" || divider === "both";
  const hasHeader = Boolean(eyebrow || heading || lead);

  return (
    <section
      id={id}
      className={cn(
        TONE_BG[tone],
        gradient && tone !== "light" && "bg-petrol-abyss",
        compact ? "py-s8" : "py-[clamp(96px,12vw,192px)]",
        className,
      )}
    >
      {showTop && <HorizonDivider tone={dividerTone} />}

      <Container width={width} className={innerClassName}>
        {hasHeader && (
          <Reveal className={cn("flex flex-col gap-s4", children && "mb-s8")}>
            {eyebrow && <Eyebrow tone={eyebrowTone}>{eyebrow}</Eyebrow>}
            {heading && (
              <h2 className="max-w-measure font-display text-h2 font-semibold text-current">
                {heading}
              </h2>
            )}
            {lead && (
              <p
                className={cn(
                  "max-w-lead text-lead",
                  tone === "light" ? "text-ink-soft" : "text-paper-soft",
                )}
              >
                {lead}
              </p>
            )}
          </Reveal>
        )}
        {children}
      </Container>

      {showBottom && <HorizonDivider tone={dividerTone} />}
    </section>
  );
}
