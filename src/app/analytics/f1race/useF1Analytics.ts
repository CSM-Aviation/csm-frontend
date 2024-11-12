// src/hooks/useF1Analytics.ts
"use client";

// Ensure we're using the global gtag type
declare global {
    interface Window {
        dataLayer: any[];
        gtag: (...args: any[]) => void;
    }
}

export const useF1Analytics = () => {
    const trackF1Event = (
        eventName: string,
        eventCategory: string,
        eventLabel: string,
        eventValue?: number
    ) => {
        if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', eventName, {
                event_category: eventCategory,
                event_label: eventLabel,
                value: eventValue,
                f1_event_type: eventCategory,
                f1_interaction_type: eventName
            });
        }
    };

    const trackF1Conversion = (value?: number) => {
        if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'conversion', {
                send_to: 'AW-364956149/f1_conversion_label', // Replace with your actual conversion label
                value: value,
                currency: 'USD',
                f1_event_type: 'conversion'
            });
        }
    };

    return {
        trackF1Event,
        trackF1Conversion
    };
};