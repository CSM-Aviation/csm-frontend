"use client"

import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { apiService, PageViewData } from '../../services/apiService';

const AnalyticsTracker: React.FC = () => {
    useEffect(() => {
        const shouldTrack = () => {
            const hostname = window.location.hostname;
            const port = window.location.port;
            
            // Skip tracking for development environments
            if (
                hostname === 'localhost' ||
                hostname === '127.0.0.1' ||
                hostname.includes('.local') ||
                // port === '3000' ||
                process.env.NODE_ENV === 'development'
            ) {
                return false;
            }
            return true;
        };

        const trackPageView = async () => {
            // Skip tracking if in development
            if (!shouldTrack()) {
                console.log('Analytics tracking skipped in development environment');
                return;
            }

            let sessionId = localStorage.getItem('sessionId');
            if (!sessionId) {
                sessionId = uuidv4();
                localStorage.setItem('sessionId', sessionId);
            }

            try {
                // Fetch geolocation data
                const geoResponse = await fetch('https://ipapi.co/json/');
                const geoData = await geoResponse.json();

                const pageViewData: PageViewData = {
                    sessionId,
                    timestamp: new Date().toISOString(),
                    url: window.location.href,
                    path: window.location.pathname,
                    referrer: document.referrer,
                    userAgent: navigator.userAgent,
                    screenResolution: `${window.screen.width}x${window.screen.height}`,
                    language: navigator.language,
                    pageViews: parseInt(localStorage.getItem('pageViews') || '0') + 1,
                    city: geoData.city,
                    region: geoData.region,
                    country: geoData.country_name
                };

                localStorage.setItem('pageViews', pageViewData.pageViews.toString());
                await apiService.trackPageView(pageViewData);
            } catch (error) {
                console.error('Error tracking page view:', error);
            }
        };

        trackPageView();
    }, []); // Empty dependency array means this runs once when component mounts

    return null;
};

export default AnalyticsTracker;