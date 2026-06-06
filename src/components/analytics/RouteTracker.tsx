"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

/**
 * Fires a `page_view` into the GTM dataLayer on every App-Router navigation
 * (§07). App Router doesn't trigger GTM's History-change listener the way MPA
 * navigation does, so we push it explicitly. Must be wrapped in <Suspense>
 * (useSearchParams) by the caller.
 */
export function RouteTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
    w.dataLayer = w.dataLayer || [];
    const qs = searchParams?.toString();
    w.dataLayer.push({
      event: "page_view",
      page_path: pathname + (qs ? `?${qs}` : ""),
    });
  }, [pathname, searchParams]);

  return null;
}
