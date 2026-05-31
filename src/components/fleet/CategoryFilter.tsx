import Link from "next/link";
import { CATEGORY_LABELS } from "@/lib/api/fleet";
import type { FleetCategory } from "@/lib/api/types";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  /** Categories actually present in the fleet (heavy is hidden when empty). */
  categories: FleetCategory[];
  /** "all" or the active category from ?category=. */
  active: FleetCategory | "all";
}

/**
 * URL-driven fleet filter (§08/§11). Each option is a real link to ?category=,
 * so state lives in the URL (shareable, back-button-friendly). The active
 * option gets a Gold underline + aria-current. No client JS, no layout jank.
 */
export function CategoryFilter({ categories, active }: CategoryFilterProps) {
  const options: { key: FleetCategory | "all"; label: string; href: string }[] = [
    { key: "all", label: "All Aircraft", href: "/charter/fleet" },
    ...categories.map((c) => ({
      key: c,
      label: CATEGORY_LABELS[c],
      href: `/charter/fleet?category=${c}`,
    })),
  ];

  return (
    <nav aria-label="Filter fleet by category">
      <ul className="flex flex-wrap gap-x-s6 gap-y-s3">
        {options.map((opt) => {
          const isActive = opt.key === active;
          return (
            <li key={opt.key}>
              <Link
                href={opt.href}
                scroll={false}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "relative inline-block pb-s2 text-body font-medium transition-colors duration-fast focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus",
                  isActive ? "text-ink" : "text-ink-faint hover:text-ink",
                )}
              >
                {opt.label}
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-x-0 bottom-0 h-px origin-left bg-gold transition-transform duration-base ease-calm",
                    isActive ? "scale-x-100" : "scale-x-0",
                  )}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
