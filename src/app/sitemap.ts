import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { destinations } from "@/content/destinations";
import { getFleet } from "@/lib/api/fleet";

/**
 * XML sitemap (Next metadata route → /sitemap.xml). Static routes plus the
 * dynamic fleet detail pages and destination pages. Fleet ids come from the
 * one fetcher; if the API is down, getFleet() degrades to [] and the rest of
 * the sitemap still generates.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes = [
    "",
    "/charter",
    "/charter/fleet",
    "/charter/quote",
    "/charter/trip",
    "/management",
    "/maintenance",
    "/company/about",
    "/company/contact",
    "/destinations",
    "/customer-experience",
    "/faqs",
    "/privacy-policy",
    "/sitemap",
  ].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const destinationRoutes = destinations.map((d) => ({
    url: `${site.url}/destinations/${d.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const fleet = await getFleet();
  const fleetRoutes = fleet.map((a) => ({
    url: `${site.url}/charter/fleet/${a.id}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...destinationRoutes, ...fleetRoutes];
}
