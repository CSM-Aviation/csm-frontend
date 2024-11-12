// src/components/analytics/F1Analytics.tsx
"use client";

import Script from 'next/script';
import { useEffect } from 'react';

// Define gtag as a global function type
declare global {
    interface Window {
        dataLayer: any[];
        gtag: (...args: any[]) => void;
    }
}

interface F1AnalyticsProps {
    onLoad?: () => void;
}

const F1Analytics: React.FC<F1AnalyticsProps> = ({ onLoad }) => {
    useEffect(() => {
        // Initialize custom F1 event tracking
        if (typeof window !== 'undefined') {
            window.dataLayer = window.dataLayer || [];
            // Use function expression instead of declaration
            window.gtag = function (...args: any[]) {
                window.dataLayer.push(arguments);
            };
        }
    }, []);

    const handleScriptLoad = () => {
        // Track F1 page view
        if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'f1_page_view', {
                'page_title': 'F1 Las Vegas Race Experience',
                'event_category': 'F1',
                'event_label': 'F1 Page View'
            });
        }
        onLoad?.();
    };

    return (
        <>
            {/* Google Ads Tag */}
            <Script
                src="https://www.googletagmanager.com/gtag/js?id=AW-364956149"
                strategy="afterInteractive"
                onLoad={handleScriptLoad}
            />

            {/* Google Analytics Configuration */}
            <Script
                id="f1-analytics"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
            window.dataLayer = window.dataLayer || [];
            window.gtag = function(){dataLayer.push(arguments);}
            window.gtag('js', new Date());
            window.gtag('config', 'AW-364956149', {
              'page_title': 'F1 Las Vegas Race Experience',
              'page_path': '/f1race',
              'custom_map': {
                'dimension1': 'f1_event_type',
                'dimension2': 'f1_interaction_type'
              }
            });
          `
                }}
            />
        </>
    );
};

export default F1Analytics;