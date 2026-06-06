import { cn } from "@/lib/utils";

interface EyebrowProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Section label accent color (§04). Saddle on light, Gold for accent moments. */
  tone?: "saddle" | "gold" | "soft";
  as?: "span" | "p" | "div";
}

/**
 * Section label — uppercase letterspaced Inter SemiBold (the sanctioned
 * "eyebrow" role, design doc §04). Not a heading; pair above an h2.
 */
export function Eyebrow({
  tone = "saddle",
  as: Tag = "span",
  className,
  children,
  ...rest
}: EyebrowProps) {
  return (
    <Tag
      className={cn(
        "block font-body text-eyebrow font-semibold uppercase",
        tone === "saddle" && "text-saddle",
        tone === "gold" && "text-gold",
        tone === "soft" && "text-paper-soft",
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
