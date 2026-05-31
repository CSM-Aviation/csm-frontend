import Link from "next/link";
import { destinations as allDestinations, type Destination } from "@/content/destinations";

/**
 * Typographic destinations grid (§09 Reach) — a clean, calm list, not a
 * photo-gimmick map. A Gold rule slides under each city on hover. Shared by
 * Home and Charter.
 */
export function DestinationsTeaser({ items = allDestinations }: { items?: Destination[] }) {
  return (
    <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-4">
      {items.map((d) => (
        <li key={d.slug}>
          <Link
            href={`/destinations/${d.slug}`}
            className="group flex h-full flex-col gap-s2 bg-fog-raised p-s5 transition-colors duration-base hover:bg-fog-sunk focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
          >
            <span className="font-display text-h3 font-semibold text-ink">{d.city}</span>
            <span className="text-small text-ink-faint">{d.state}</span>
            <span
              aria-hidden
              className="mt-s2 h-px w-8 origin-left scale-x-0 bg-gold transition-transform duration-base group-hover:scale-x-100"
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}
