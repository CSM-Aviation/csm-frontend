// src/components/analytics/AnalyticsScripts.tsx
"use client";

import { usePathname } from 'next/navigation';
import Script from 'next/script';
import { useEffect } from 'react';
import { trackEvent } from './googleAnalytics';

const AnalyticsScripts = () => {
    const pathname = usePathname();

    useEffect(() => {
        // Track page views
        if (pathname) {
            trackEvent('page_view', 'navigation', pathname);
        }
    }, [pathname]);

    return (
        <>
            {/* Google Tag Manager - Script */}
            <Script
                id="google-tag-manager"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-KJVF5RFH');
          `
                }}
            />

            {/* Google Ads */}
            <Script
                src="https://www.googletagmanager.com/gtag/js?id=AW-364956149"
                strategy="afterInteractive"
            />
            <Script
                id="google-analytics"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-2FC101FT90');
            gtag('config', 'AW-364956149');
          `,
                }}
            />
        </>
    );
};

export default AnalyticsScripts;