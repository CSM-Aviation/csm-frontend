import type { Metadata } from "next";
import { getFleet, availableCategories } from "@/lib/api/fleet";
import type { FleetCategory } from "@/lib/api/types";
import { PageHero } from "@/components/layout/PageHero";
import { SectionBand } from "@/components/layout/SectionBand";
import { CtaBand } from "@/components/layout/CtaBand";
import { CategoryFilter } from "@/components/fleet/CategoryFilter";
import { FleetGrid } from "@/components/fleet/FleetGrid";
import { Button } from "@/components/ui/Button";
import { RequestQuoteButton } from "@/components/quote/RequestQuoteButton";

export const metadata: Metadata = {
  title: "Our Fleet",
  description:
    "Midsize jets, light jets, and turboprops — matched to your mission. Explore the CSM Aviation charter fleet by category.",
  alternates: { canonical: "/charter/fleet" },
};

const VALID = new Set<FleetCategory>(["light", "midsize", "heavy", "turboprop"]);

export default async function FleetPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const fleet = await getFleet();
  const categories = availableCategories(fleet);

  const raw = searchParams.category?.toLowerCase();
  const active: FleetCategory | "all" =
    raw && VALID.has(raw as FleetCategory) ? (raw as FleetCategory) : "all";

  const shown = active === "all" ? fleet : fleet.filter((a) => a.categories.includes(active));

  return (
    <>
      <PageHero
        eyebrow="Charter"
        title="Our Fleet"
        lead="Every trip starts with the right aircraft. Filter by category, then look closer — the specs, the cabin, the range that fits your mission."
        actions={
          <>
            <RequestQuoteButton variant="sand">Request a Quote</RequestQuoteButton>
            <Button href="/charter/trip" variant="ghost">
              Plan a Trip
            </Button>
          </>
        }
      />

      <SectionBand
        tone="light"
        eyebrow="The fleet"
        heading="Find your aircraft"
        lead="This is the fleet we own and maintain to our own standard — but it's only the starting point. Tell us your mission and we can source any aircraft to match."
      >
        <CategoryFilter categories={categories} active={active} />
        <div className="mt-s8">
          <FleetGrid aircraft={shown} />
        </div>
      </SectionBand>

      <CtaBand
        eyebrow="Flown to one standard"
        heading="Every tail, held to the same safety bar."
        lead="ARGUS Gold rated and Wyvern registered. Tell us your trip and we'll match the aircraft."
      />
    </>
  );
}
