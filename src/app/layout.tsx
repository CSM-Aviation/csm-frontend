import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { ConfigProvider } from "./contexts/ConfigContext";
import AnalyticsTracker from "./admin/analytics/AnalyticsTracker";
import Breadcrumb from "./components/Breadcrumb";
import AnalyticsScripts from "./analytics/AnalyticsScripts";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CSM Aviation",
  description: "Luxury air travel services",
  icons: {
    icon: '/favicon.png',
  },
  openGraph: {
    title: "CSM Aviation",
    description: "Luxury air travel services",
    images: [
      {
        url: '/images/service/Aviation.jpg',
        width: 1200,
        height: 630,
        alt: 'CSM Aviation Services',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "CSM Aviation",
    description: "Luxury air travel services",
    images: ['/images/service/Aviation.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <AnalyticsScripts />
      </head>
      <body className={inter.className}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KJVF5RFH"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <ConfigProvider>
          <Header />
          <Breadcrumb />
          <main className="mt-24 md:mt-20">{children}
            <Analytics />
            <SpeedInsights />
            <AnalyticsTracker />
          </main>
          <Footer />
        </ConfigProvider>
      </body>
    </html>
  );
}