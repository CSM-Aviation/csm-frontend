import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Calm, architectural buttons (design doc §08). Near-square (--r-md), Inter
 * 600, generous --s-4 × --s-6 padding, no shadow, no gradient. Hover lifts via
 * background shift + a 1px underline-draw (never scale-bounce, §06). Focus is a
 * 2px --focus outline at 2px offset (ground-agnostic, never removed — §18).
 */
export const buttonVariants = cva(
  "group/btn relative inline-flex select-none items-center justify-center rounded-md font-body text-body font-semibold transition-colors duration-fast ease-calm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-gold px-s6 py-s4 text-petrol hover:bg-gold-hover active:bg-gold-press",
        sand: "bg-sand px-s6 py-s4 text-petrol hover:brightness-[0.96] active:brightness-90",
        secondary:
          "border border-petrol bg-transparent px-s6 py-s4 text-petrol hover:bg-petrol hover:text-fog",
        ghost:
          "border border-fog bg-transparent px-s6 py-s4 text-fog hover:bg-fog hover:text-petrol",
        text: "bg-transparent p-0 text-saddle hover:text-gold",
      },
    },
    defaultVariants: { variant: "primary" },
  },
);

type Variant = NonNullable<VariantProps<typeof buttonVariants>["variant"]>;

interface BaseProps {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
}

type ButtonAsButton = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    as?: "button";
    href?: undefined;
  };

type ButtonAsAnchor = BaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
    as?: "a";
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

function Underline() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-base ease-calm group-hover/btn:scale-x-100"
    />
  );
}

export function Button(props: ButtonProps) {
  const variant = props.variant ?? "primary";
  const cls = cn(buttonVariants({ variant }), props.className);
  const withUnderline = variant === "primary" || variant === "sand" || variant === "text";

  const label = (
    <span className="relative inline-flex items-center gap-s2">
      {props.children}
      {withUnderline && <Underline />}
    </span>
  );

  if (props.href !== undefined) {
    const { href, children, className, variant: _v, as: _a, ...rest } = props;
    void children;
    void className;
    if (href.startsWith("/")) {
      return (
        <Link href={href} className={cls} {...rest}>
          {label}
        </Link>
      );
    }
    return (
      <a href={href} className={cls} {...rest}>
        {label}
      </a>
    );
  }

  const { children, className, variant: _v, as: _a, ...rest } = props;
  void children;
  void className;
  return (
    <button className={cls} {...rest}>
      {label}
    </button>
  );
}
