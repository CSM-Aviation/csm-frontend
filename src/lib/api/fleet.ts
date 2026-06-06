import type { Aircraft, FleetCategory, FleetItem, SpecGroup } from "./types";

/**
 * The ONLY data fetcher in the app (build spec §04). Everything non-fleet is
 * static in-repo. Fleet is fetched in Server Components with ISR caching
 * (revalidate 300s) — keeps fleet pages static-fast while refreshing the
 * presigned S3 image URLs before they expire.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://www.csmaviation-api.com";
// Prefer a server-only key (build spec §10 #3); fall back to the public one
// that ships in the existing .env. Fleet fetches run server-side only.
const API_KEY = process.env.API_KEY ?? process.env.NEXT_PUBLIC_API_KEY ?? "";

const REVALIDATE_SECONDS = 300;

/**
 * Canonical filter/display order (§11): largest cabin to smallest, jets before
 * turboprops — so the fleet reads heavy → midsize → light → turboprop.
 */
export const CATEGORY_ORDER: FleetCategory[] = ["heavy", "midsize", "light", "turboprop"];

export const CATEGORY_LABELS: Record<FleetCategory, string> = {
  light: "Light Jets",
  midsize: "Midsize Jets",
  heavy: "Heavy Jets",
  turboprop: "Turboprops",
};

const CATEGORY_SINGULAR: Record<FleetCategory, string> = {
  light: "Light Jet",
  midsize: "Midsize Jet",
  heavy: "Heavy Jet",
  turboprop: "Turboprop",
};

/**
 * Normalize the free-form API category into one or more design buckets.
 * Live values seen: "TURBOPROPS", "LIGHT", "LIGHT | MIDSIZE JETS". An aircraft
 * is classified by its largest cabin class: a "LIGHT | MIDSIZE" jet (the G150)
 * is a Midsize, not a "Light · Midsize", so the smaller bucket is dropped when a
 * larger one is present. Unknown tokens are logged (never silently dropped) —
 * the aircraft still appears under "All".
 */
export function normalizeCategory(raw: string): FleetCategory[] {
  const tokens = raw
    .split(/[|/,&]+/)
    .map((t) => t.trim().toLowerCase())
    .filter(Boolean);

  const out = new Set<FleetCategory>();
  for (const token of tokens) {
    if (token.includes("turboprop") || token.includes("turbo prop")) out.add("turboprop");
    else if (token.includes("midsize") || token.includes("mid-size") || token.includes("super mid"))
      out.add("midsize");
    else if (token.includes("heavy") || token.includes("large") || token.includes("ultra"))
      out.add("heavy");
    else if (token.includes("light")) out.add("light");
    else console.warn(`[fleet] unmapped category token: "${token}" (raw: "${raw}")`);
  }

  // Classify by the largest cabin class only — collapse smaller co-tags so a
  // jet lands in (and is labeled with) a single tier.
  if (out.has("heavy")) {
    out.delete("midsize");
    out.delete("light");
  } else if (out.has("midsize")) {
    out.delete("light");
  }

  return CATEGORY_ORDER.filter((c) => out.has(c));
}

function categoryLabel(categories: FleetCategory[]): string {
  if (categories.length === 0) return "Aircraft";
  if (categories.length === 1) return CATEGORY_SINGULAR[categories[0]];
  return categories.map((c) => CATEGORY_SINGULAR[c].replace(/ Jet$/, "")).join(" · ") + " Jet";
}

/** Drop empty/placeholder values so the SpecTable never shows blank rows. */
function clean(value: string | undefined): string | undefined {
  if (!value) return undefined;
  const v = value.trim();
  if (!v || v === "-" || v.toLowerCase() === "n/a" || v.toLowerCase() === "na") return undefined;
  return v;
}

function buildSpecGroups(item: FleetItem): SpecGroup[] {
  const door = [clean(item.doorHeight), clean(item.doorWidth)].filter(Boolean).join(" × ");

  const groups: SpecGroup[] = [
    {
      title: "Cabin",
      rows: [
        { label: "Passengers", value: clean(item.seats) },
        { label: "Cabin Height", value: clean(item.cabinHeight) },
        { label: "Cabin Width", value: clean(item.cabinWidth) },
        { label: "Cabin Length", value: clean(item.cabinLength) },
        { label: "Lavatory", value: clean(item.lavatory) },
        { label: "Baggage", value: clean(item.luggageCapacity) },
        { label: "Wi-Fi", value: clean(item.wifi) },
        { label: "Door (H × W)", value: door || undefined },
      ].filter((r): r is { label: string; value: string } => Boolean(r.value)),
    },
    {
      title: "Performance",
      rows: [
        { label: "Cruise Speed", value: clean(item.speed) },
        { label: "Max Altitude", value: clean(item.altitude) },
      ].filter((r): r is { label: string; value: string } => Boolean(r.value)),
    },
    {
      title: "Range",
      rows: [
        { label: "Range", value: clean(item.range) },
        { label: "Year", value: clean(item.yor) },
      ].filter((r): r is { label: string; value: string } => Boolean(r.value)),
    },
  ];

  return groups.filter((g) => g.rows.length > 0);
}

function toAircraft(item: FleetItem): Aircraft {
  const categories = normalizeCategory(item.category ?? "");
  const images = Array.isArray(item.imageUrls) ? item.imageUrls.filter(Boolean) : [];

  return {
    id: item._id,
    name: item.aircraftName?.trim() || "Aircraft",
    registration: item.registration?.trim() || "",
    categories,
    categoryLabel: categoryLabel(categories),
    description: item.description?.trim() || "",
    year: clean(item.yor) ?? "",
    images,
    heroImage: images[0],
    passengers: clean(item.seats) ?? "—",
    range: clean(item.range) ?? "—",
    speed: clean(item.speed) ?? "—",
    cabinHeight: clean(item.cabinHeight) ?? "—",
    cardStats: [
      { label: "Passengers", value: clean(item.seats) ?? "—" },
      { label: "Range", value: clean(item.range) ?? "—" },
      { label: "Speed", value: clean(item.speed) ?? "—" },
    ],
    specGroups: buildSpecGroups(item),
  };
}

async function fetchFleetItems(): Promise<FleetItem[]> {
  const res = await fetch(`${API_BASE}/api/fleet`, {
    headers: API_KEY ? { "x-api-key": API_KEY } : undefined,
    next: { revalidate: REVALIDATE_SECONDS },
  });
  if (!res.ok) throw new Error(`Fleet API responded ${res.status}`);
  const data = await res.json();
  // Tolerate either a bare array or a wrapped envelope.
  const items = Array.isArray(data) ? data : (data?.data ?? data?.fleet ?? []);
  return items as FleetItem[];
}

/**
 * Fill imagery for any tail whose API record has an empty imageUrls (a data
 * gap, e.g. the G150 N518KH) by borrowing the gallery of a same-model sibling.
 * Cards/detail then show the actual aircraft type rather than a placeholder;
 * once real photos are uploaded for that tail, its own imagery takes over.
 */
function backfillImagery(aircraft: Aircraft[]): void {
  const galleryByName = new Map<string, string[]>();
  for (const a of aircraft) {
    if (a.images.length && !galleryByName.has(a.name)) galleryByName.set(a.name, a.images);
  }
  for (const a of aircraft) {
    if (a.images.length) continue;
    const fallback = galleryByName.get(a.name);
    if (fallback) {
      a.images = fallback;
      a.heroImage = fallback[0];
    }
  }
}

/**
 * All aircraft, normalized and sorted (by first category in canonical order,
 * then name). Degrades gracefully to [] if the API is unreachable so fleet
 * pages render an in-voice empty state instead of crashing the build/route.
 */
export async function getFleet(): Promise<Aircraft[]> {
  try {
    const items = await fetchFleetItems();
    const aircraft = items.map(toAircraft);
    backfillImagery(aircraft);
    return aircraft.sort((a, b) => {
      const ai = a.categories[0] ? CATEGORY_ORDER.indexOf(a.categories[0]) : 99;
      const bi = b.categories[0] ? CATEGORY_ORDER.indexOf(b.categories[0]) : 99;
      return ai - bi || a.name.localeCompare(b.name);
    });
  } catch (err) {
    console.error("[fleet] getFleet failed — returning empty fleet:", err);
    return [];
  }
}

/** A single aircraft by _id, or null if not found / API down. */
export async function getAircraft(id: string): Promise<Aircraft | null> {
  const fleet = await getFleet();
  return fleet.find((a) => a.id === id) ?? null;
}

/** Categories actually present in the fleet, in canonical order (for the filter). */
export function availableCategories(fleet: Aircraft[]): FleetCategory[] {
  const present = new Set<FleetCategory>();
  for (const a of fleet) for (const c of a.categories) present.add(c);
  return CATEGORY_ORDER.filter((c) => present.has(c));
}
