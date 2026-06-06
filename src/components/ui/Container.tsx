import { cn } from "@/lib/utils";

type ContainerWidth = "contained" | "bleed";

interface ContainerProps extends React.HTMLAttributes<HTMLElement> {
  /** contained = max content width + page margins; bleed = full width. */
  width?: ContainerWidth;
  as?: React.ElementType;
}

/**
 * Horizontal layout constraint. `contained` caps content at --content-max with
 * the fluid --page-margin gutters (§05). `bleed` runs edge-to-edge for media
 * that should escape the measure; band backgrounds are handled by SectionBand.
 */
export function Container({
  width = "contained",
  as: Tag = "div",
  className,
  children,
  ...rest
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "w-full px-[var(--page-margin)]",
        width === "contained" && "mx-auto max-w-content",
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
