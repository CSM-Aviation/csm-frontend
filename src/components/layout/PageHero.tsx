import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { HorizonRule } from "@/components/horizon/HorizonRule";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  /** display = home-scale Cormorant; h1 = standard page title. */
  titleSize?: "display" | "h1";
  align?: "left" | "center";
  /** Petrol→Abyss vertical gradient for atmospheric depth (§07). */
  gradient?: boolean;
  /** CTA cluster (Buttons). */
  actions?: React.ReactNode;
  /** Extra content below the actions (e.g. hero stat row). */
  children?: React.ReactNode;
  /**
   * Optional full-bleed background behind the content (e.g. <HeroVideo />). When
   * present, the hero grows to a near-full viewport and a Petrol/Abyss overlay
   * is laid over the media for text legibility (§09 owned-asset hook).
   */
  media?: React.ReactNode;
}

// Token-bound legibility scrim: darker at top (logo/header) and bottom (CTAs),
// Petrol through the middle. color-mix keeps it on the tokens (no raw hex).
const MEDIA_OVERLAY =
  "linear-gradient(180deg, color-mix(in srgb, var(--abyss) 62%, transparent) 0%, color-mix(in srgb, var(--petrol) 42%, transparent) 48%, color-mix(in srgb, var(--abyss) 82%, transparent) 100%)";

/**
 * Standard dark page hero (§08/§09): reversed-logo header sits over it. Cormorant
 * title, optional Gold eyebrow + lead + CTAs, and the signature Gold horizon
 * rule drawing across the base. Top padding clears the fixed header.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  titleSize = "h1",
  align = "left",
  gradient = true,
  actions,
  children,
  media,
}: PageHeroProps) {
  const centered = align === "center";

  return (
    <section
      className={cn(
        "relative isolate overflow-hidden text-paper-on-dark",
        gradient ? "bg-petrol-abyss" : "bg-petrol",
        media && "flex min-h-screen flex-col justify-center",
      )}
    >
      {media && (
        <>
          <div className="absolute inset-0 z-0">{media}</div>
          <div aria-hidden className="absolute inset-0 z-10" style={{ backgroundImage: MEDIA_OVERLAY }} />
        </>
      )}
      <Container
        className={cn(
          media ? "relative z-20 py-s8" : "pb-[clamp(64px,9vw,128px)] pt-[clamp(128px,16vw,200px)]",
        )}
      >
        <Reveal
          className={cn(
            "flex flex-col gap-s5",
            centered ? "mx-auto items-center text-center" : "items-start",
          )}
        >
          {eyebrow && <Eyebrow tone="gold">{eyebrow}</Eyebrow>}
          <h1
            className={cn(
              "font-display font-semibold tracking-display text-paper-on-dark",
              titleSize === "display" ? "max-w-[18ch] text-display" : "max-w-[20ch] text-h1",
            )}
          >
            {title}
          </h1>
          {lead && (
            <p className={cn("max-w-lead text-lead text-paper-soft", centered && "mx-auto")}>
              {lead}
            </p>
          )}
          {actions && (
            <div className={cn("mt-s3 flex flex-wrap gap-s4", centered && "justify-center")}>
              {actions}
            </div>
          )}
          {children}
        </Reveal>
      </Container>

      {media ? (
        // Full-screen hero: content is centered (above) and the signature
        // horizon rule is pinned to the base of the viewport.
        <Container className="absolute inset-x-0 bottom-0 z-20 pb-s8">
          <HorizonRule color="gold" animate />
        </Container>
      ) : (
        <>
          <Container>
            <HorizonRule color="gold" animate />
          </Container>
          <div className="h-s8" />
        </>
      )}
    </section>
  );
}
