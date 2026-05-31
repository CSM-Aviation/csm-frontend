"use client";

import Script from "next/script";

/**
 * Google Tag Manager loader (§07). GTM owns GA4 (G-2FC101FT90) and Google Ads
 * (AW-364956149) tags inside the container, so the site only needs the GTM
 * snippet + <noscript> + a route page_view push (see RouteTracker).
 *
 * Fires only in production with a configured container — no dev/preview noise.
 * MUST-FIX before launch (§07/§10): confirm GTM-KJVF5RFH and its GA4/Ads tags
 * are the live properties.
 */
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-KJVF5RFH";

export function SiteAnalytics() {
  if (process.env.NODE_ENV !== "production" || !GTM_ID) return null;

  return (
    <>
      <Script id="gtm-base" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
      </Script>
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
          title="Google Tag Manager"
        />
      </noscript>
    </>
  );
}
