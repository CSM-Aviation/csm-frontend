import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import type { Aircraft } from "@/lib/api/types";

/**
 * Fleet card (§08): 16:10 image, Gold category eyebrow, Cormorant name, three
 * tabular specs (pax · range · speed), and a "View aircraft" affordance. On
 * hover the image brightens ~4% and a thin Gold horizon rule slides in under
 * the name. Separation via --line — no drop shadow.
 */
export function FleetCard({ aircraft }: { aircraft: Aircraft }) {
  return (
    <Link
      href={`/charter/fleet/${aircraft.id}`}
      className="group block overflow-hidden rounded-md border border-line bg-fog-raised transition-colors duration-base focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-fog-sunk">
        {aircraft.heroImage ? (
          <Image
            src={aircraft.heroImage}
            alt={`${aircraft.name} — exterior`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition duration-base ease-calm group-hover:brightness-[1.04]"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-small text-ink-faint">
            Imagery coming soon
          </div>
        )}
      </div>

      <div className="flex flex-col gap-s4 p-s5">
        <div className="flex flex-col gap-s2">
          <Eyebrow tone="gold">{aircraft.categoryLabel}</Eyebrow>
          <h3 className="font-display text-h3 font-semibold text-ink">{aircraft.name}</h3>
          <span className="h-px w-12 origin-left scale-x-0 bg-gold transition-transform duration-base ease-calm group-hover:scale-x-100" />
        </div>

        <dl className="tnum grid grid-cols-3 gap-s3 border-t border-line pt-s4">
          {aircraft.cardStats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-0.5">
              <dt className="text-small text-ink-faint">{stat.label}</dt>
              <dd className="text-body font-medium text-ink">{stat.value}</dd>
            </div>
          ))}
        </dl>

        <span className="inline-flex items-center gap-s2 text-body font-semibold text-saddle transition-colors duration-fast group-hover:text-gold">
          View aircraft
          <ArrowRight
            size={16}
            strokeWidth={2}
            className="transition-transform duration-base ease-calm group-hover:translate-x-1"
          />
        </span>
      </div>
    </Link>
  );
}
