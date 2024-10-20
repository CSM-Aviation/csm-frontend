"use client"


import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { apiService, PageViewData } from '../../services/apiService';

const AnalyticsTracker: React.FC = () => {
    useEffect(() => {
        const trackPageView = async () => {
            let sessionId = localStorage.getItem('sessionId');
            if (!sessionId) {
                sessionId = uuidv4();
                localStorage.setItem('sessionId', sessionId);
            }

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

            apiService.trackPageView(pageViewData);
        };

        trackPageView();
    }, []);

    return null;
};

export default AnalyticsTracker;