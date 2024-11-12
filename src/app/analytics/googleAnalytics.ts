// src/lib/analytics/googleAnalytics.ts

declare global {
    interface Window {
        dataLayer: any[];
        gtag: (...args: any[]) => void;
    }
}

// Initialize dataLayer
export const initializeGoogleAnalytics = () => {
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
        window.dataLayer.push(arguments);
    }
    window.gtag = gtag;

    gtag('js', new Date());

    // Google Ads tracking
    gtag('config', 'AW-364956149');

    // If you have GA4, add its configuration
    gtag('config', 'G-XXXXXXXXXX'); // Replace with your GA4 measurement ID
};

// Custom event tracking
export const trackEvent = (
    action: string,
    category: string,
    label: string,
    value?: number
) => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', action, {
            event_category: category,
            event_label: label,
            value: value,
        });
    }
};

// Campaign specific conversion tracking
export const trackConversion = (
    conversionId: string,
    conversionLabel: string,
    value?: number
) => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'conversion', {
            send_to: `AW-364956149/${conversionLabel}`,
            value: value,
            currency: 'USD',
        });
    }
};