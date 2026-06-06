import { Logo } from "@/components/ui/Logo";

/**
 * Home-hero brand mark carrying the #hero-logo anchor that <LogoFlight> measures
 * to morph the centred hero logo up into the header logo on scroll. Visuals are
 * identical to a bare <Logo> — the wrapper exists only to expose a stable id.
 */
export function HeroLogo() {
  return (
    <div id="hero-logo">
      <Logo tone="reversed" width={400} priority />
    </div>
  );
}
