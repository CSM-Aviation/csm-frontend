/**
 * Fleet API types. `FleetItem` is the raw contract from /api/fleet (recovered
 * from the old apiService.ts and confirmed against the live response).
 * `Aircraft` is the clean view-model the UI consumes — grouped into the
 * design's Cabin / Performance / Range spec groups (§08) with stat fields
 * surfaced for cards and at-a-glance blocks.
 */

export interface FleetItem {
  _id: string;
  aircraftName: string;
  registration: string; // tail number
  seats: string;
  lavatory: string;
  altitude: string;
  cabinHeight: string;
  cabinLength: string;
  cabinWidth: string;
  doorHeight: string;
  doorWidth: string;
  description: string;
  luggageCapacity: string;
  range: string;
  speed: string;
  wifi: string;
  amenities: string;
  category: string; // RAW, free-form — must be normalized
  yor: string; // year of refurbishment / manufacture
  imageUrls: string[];
}

/** Design-doc filter buckets (§11). The API's raw category maps onto these. */
export type FleetCategory = "light" | "midsize" | "heavy" | "turboprop";

export interface SpecRow {
  label: string;
  value: string;
}

export interface SpecGroup {
  title: string;
  rows: SpecRow[];
}

export interface Stat {
  label: string;
  value: string;
}

export interface Aircraft {
  id: string;
  name: string;
  registration: string;
  /** One or more normalized buckets (a "light | midsize" jet is in both). */
  categories: FleetCategory[];
  /** Human label for the card eyebrow, e.g. "Light · Midsize Jet". */
  categoryLabel: string;
  description: string;
  year: string;
  images: string[];
  heroImage?: string;

  // Surfaced stat fields (cards + at-a-glance).
  passengers: string;
  range: string;
  speed: string;
  cabinHeight: string;

  /** Three headline specs for the FleetCard (pax · range · speed). */
  cardStats: Stat[];
  /** Cabin / Performance / Range groups for the detail SpecTable. */
  specGroups: SpecGroup[];
}
