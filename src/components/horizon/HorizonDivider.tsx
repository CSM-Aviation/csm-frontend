import { Container } from "@/components/ui/Container";
import { HorizonRule } from "./HorizonRule";

interface HorizonDividerProps {
  /** Band the divider sits on — picks the hairline color (§07). */
  tone?: "light" | "dark" | "gold";
  animate?: boolean;
}

/**
 * Section divider: a contained HorizonRule with vertical breathing room.
 * Used at the top/bottom seam between bands to carry the horizon motif.
 */
export function HorizonDivider({ tone = "light", animate = true }: HorizonDividerProps) {
  const color = tone === "dark" ? "line-dark" : tone === "gold" ? "gold" : "line";
  return (
    <Container className="py-s2">
      <HorizonRule color={color} animate={animate} />
    </Container>
  );
}
