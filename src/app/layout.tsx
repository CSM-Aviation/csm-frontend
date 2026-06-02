import type { Metadata } from "next";
import { Suspense } from "react";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileCallBar } from "@/components/layout/MobileCallBar";
import { ScrollProgress } from "@/components/horizon/ScrollProgress";
import { SiteAnalytics } from "@/components/analytics/SiteAnalytics";
import { RouteTracker } from "@/components/analytics/RouteTracker";
import { JsonLd } from "@/components/seo/JsonLd";
import { QuoteModalProvider } from "@/components/quote/QuoteModalProvider";
import { organizationSchema } from "@/lib/seo";
import "./globals.css";

/**
 * Self-hosted brand faces (design doc §04/§17). One variable axis per family
 * covers all weights. next/font/local adds font-display:swap + adjusted
 * fallback metrics (no CLS) and exposes the token CSS vars consumed by
 * tokens.css (--font-body / --font-display).
 */
const inter = localFont({
  src: [
    { path: "../../public/fonts/Inter-Variable.ttf", style: "normal" },
    { path: "../../public/fonts/Inter-Italic-Variable.ttf", style: "italic" },
  ],
  variable: "--font-body",
  display: "swap",
  preload: true,
});

const cormorant = localFont({
  src: [
    { path: "../../public/fonts/CormorantGaramond-Variable.ttf", style: "normal" },
    { path: "../../public/fonts/CormorantGaramond-Italic-Variable.ttf", style: "italic" },
  ],
  variable: "--font-display",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.csmaviation.com"),
  title: {
    default: "CSM Aviation — Private Charter, Aircraft Management & Maintenance",
    template: "%s · CSM Aviation",
  },
  description:
    "CSM Aviation delivers ARGUS-rated private jet charter and transparent aircraft management — flown to a single standard of safety.",
  openGraph: {
    type: "website",
    siteName: "CSM Aviation",
    url: "https://www.csmaviation.com",
  },
  twitter: {
    card: "summary_large_image",
    site: "@CSMAviation",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body>
        <SiteAnalytics />
        <JsonLd data={organizationSchema} />
        <ScrollProgress />
        <QuoteModalProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <MobileCallBar />
        </QuoteModalProvider>
        <Suspense fallback={null}>
          <RouteTracker />
        </Suspense>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
