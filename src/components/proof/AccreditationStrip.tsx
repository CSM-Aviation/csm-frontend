import Image from "next/image";
import { accreditations as defaultItems, type Accreditation } from "@/content/accreditations";

interface AccreditationStripProps {
  items?: Accreditation[];
}

/**
 * Accreditation strip (§08): ARGUS Gold, NBAA, NATA, ACSF, Wyvern in a
 * dignified row on Fog — grayscale, lifting to full color on hover, each
 * linking out. Meant for a dedicated band, never footer fine print. Place
 * inside a light SectionBand.
 */
export function AccreditationStrip({ items = defaultItems }: AccreditationStripProps) {
  return (
    <ul className="flex flex-wrap items-center justify-center gap-x-s8 gap-y-s6 sm:justify-between">
      {items.map((item) => (
        <li key={item.name}>
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            title={item.full}
            aria-label={item.full}
            className="block grayscale transition duration-base ease-calm hover:grayscale-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
          >
            <Image
              src={item.src}
              alt={item.full}
              width={120}
              height={72}
              className="h-14 w-auto object-contain sm:h-16"
            />
          </a>
        </li>
      ))}
    </ul>
  );
}
