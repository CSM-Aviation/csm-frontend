import { Eyebrow } from "@/components/ui/Eyebrow";
import type { SpecGroup } from "@/lib/api/types";

/**
 * Fleet detail spec table (§08): two-column key/value, Inter tnum, hairline
 * --line row dividers, label in --ink-soft, value in --ink. Grouped into
 * Cabin / Performance / Range. Reads as a definition list, so it stacks
 * cleanly on mobile.
 */
export function SpecTable({ groups }: { groups: SpecGroup[] }) {
  if (groups.length === 0) return null;

  return (
    <div className="flex flex-col gap-s8">
      {groups.map((group) => (
        <section key={group.title}>
          <Eyebrow tone="saddle" className="mb-s4">
            {group.title}
          </Eyebrow>
          <dl className="tnum">
            {group.rows.map((row) => (
              <div
                key={row.label}
                className="flex items-baseline justify-between gap-s4 border-b border-line py-s3 last:border-b-0"
              >
                <dt className="text-body text-ink-soft">{row.label}</dt>
                <dd className="text-right text-body font-medium text-ink">{row.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
    </div>
  );
}
