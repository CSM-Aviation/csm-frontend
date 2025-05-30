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
  metadataBase: new URL('https://www.csmaviation.com'),
  title: 'CSM Aviation - Luxury Private Jet Charter Services',
  description: 'Experience luxury private jet charter services with CSM Aviation. 24/7 on-demand charter, aircraft management, and maintenance services across California and nationwide.',
  keywords: ['private jet charter', 'luxury aviation', 'aircraft management', 'private flights', 'CSM Aviation'],
  icons: {
    icon: '/favicon.png',
  },
  // Enhanced Open Graph metadata
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.csmaviation.com',
    siteName: 'CSM Aviation',
    title: "CSM Aviation - Luxury Private Jet Charter Services",
    description: "Experience luxury private jet charter services with CSM Aviation. 24/7 on-demand charter, aircraft management, and maintenance services.",
    images: [
      {
        url: 'https://www.csmaviation.com/images/CSM-Logo-WHITE-01-web300.jpg',
        width: 1200,
        height: 630,
        alt: 'CSM Aviation - Luxury Private Jet Charter Services',
        type: 'image/jpeg',
      },
      // {
      //   url: 'https://www.csmaviation.com/images/whitebgcsmlogo.png',
      //   width: 800,
      //   height: 800,
      //   alt: 'CSM Aviation Logo',
      //   type: 'image/png',
      // }
    ],
  },
  // Enhanced Twitter metadata
  twitter: {
    card: 'summary_large_image',
    site: '@CSMAviation',
    creator: '@CSMAviation',
    title: "CSM Aviation - Luxury Private Jet Charter Services",
    description: "Experience luxury private jet charter services with CSM Aviation. 24/7 on-demand charter, aircraft management, and maintenance services.",
    images: {
      url: 'https://www.csmaviation.com/images/CSM-Logo-WHITE-01-web300.jpg',
      alt: 'CSM Aviation - Luxury Private Jet Charter Services',
    },
  },
  // Additional metadata for better crawler support
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://www.csmaviation.com',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Additional meta tags for better social media preview control */}
        <meta property="og:image:secure_url" content="https://www.csmaviation.com/images/G150.png" />
        
        {/* Prevent indexing of service images */}
        <meta name="robots" content="noimageindex" />
        
        {/* Link preview optimization */}
        <link rel="image_src" href="https://www.csmaviation.com/images/CSM-Logo-WHITE-01-web300.jpg" />
        
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