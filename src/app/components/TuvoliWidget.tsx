'use client';
import React, { useEffect, useRef } from 'react';

const TuvoliWidget: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (wrapperRef.current) {
      // Check if the script already exists
      if (!document.getElementById('tuvoli-iframe-script')) {
        const script = document.createElement('script');
        script.defer = true;
        script.id = 'tuvoli-iframe-script';
        script.src = 'https://widgets-ecs.tuvoli.com/assets/js/loader.js';
        script.dataset.guid = 'cffc8821-3d40-4f6f-a12f-b97166fa2e70';
        script.dataset.height = '800';
        script.dataset.type = 'itinerary';

        // Append script to the wrapperRef's current container
        wrapperRef.current.appendChild(script);

        // Ensure the script is fully loaded before setting up event listeners
        script.onload = () => {
          console.log('Tuvoli widget script loaded successfully');
        };

        script.onerror = () => {
          console.error('Failed to load Tuvoli widget script');
        };
      }

      const handleMessage = (event: MessageEvent) => {
        const message = event.data;

        if (message.type == null) {
          return;
        }

        switch(message.type) {
          case 'tv_ga': {
            // Handle Google Analytics events
            break;
          }
          case 'tv_redirect': {
            try {
              const url = new URL(message.data.redirectUrl);
              if (window.top) {
                window.top.location.href = url.href;
              } else {
                // Fallback if window.top is not available
                window.location.href = url.href;
              }
            } catch {
              // Handle invalid URL
              console.error('Invalid redirect URL');
            }
            break;
          }
        }
      };

      window.addEventListener('message', handleMessage);

      return () => {
        window.removeEventListener('message', handleMessage);
      };
    }
  }, []);

  return <div id="tuvoli-iframe-wrapper" ref={wrapperRef} />;
};

export default TuvoliWidget;
