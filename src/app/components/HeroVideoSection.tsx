'use client';

import { useState, useRef, useEffect } from 'react';

const HeroVideoSection = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleLoadedData = () => {
        console.log('Video loaded successfully');
        setIsVideoLoaded(true);
      };

      const handleError = (e: Event) => {
        console.error('Video error:', e);
        setHasError(true);
      };

      const handleCanPlay = () => {
        console.log('Video can play');
        // Attempt to play video
        video.play().catch((error) => {
          console.log('Autoplay was prevented:', error);
          // You might want to show a play button here
        });
      };

      // Add event listeners
      video.addEventListener('loadeddata', handleLoadedData);
      video.addEventListener('error', handleError);
      video.addEventListener('canplay', handleCanPlay);

      // Force load the video
      video.load();

      // Cleanup
      return () => {
        video.removeEventListener('loadeddata', handleLoadedData);
        video.removeEventListener('error', handleError);
        video.removeEventListener('canplay', handleCanPlay);
      };
    }
  }, []);

  const handleScheduleTrip = () => {
    console.log('Schedule Trip clicked');
    // Add your scheduling logic here
  };

  const handleCallNow = () => {
    console.log('Call Now clicked');
    // Add your call logic here
    window.location.href = 'tel:+1234567890';
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Color Overlay */}
      <div 
        className="absolute inset-0 z-10 opacity-30"
        style={{ backgroundColor: '#002449' }}
      />
      
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        style={{ pointerEvents: 'none' }}
      >
        <source src="/videos/compressed/CSM_v2.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Error message for debugging */}
      {hasError && (
        <div className="absolute inset-0 z-5 flex items-center justify-center bg-red-500 bg-opacity-50">
          <p className="text-white text-center">
            Video failed to load. Check console for details.
            <br />
            {/* Path: /videos/compressed/CSM_v2.mp4 */}
          </p>
        </div>
      )}

      {/* Content Overlay */}
      <div className="relative z-20 flex flex-col items-center justify-end h-full px-4 pb-32 sm:pb-40 md:pb-48 lg:pb-56 text-center text-white">
        {/* Tagline */}
        <div className="mb-8 sm:mb-10 md:mb-12 max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl">
          <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-light tracking-wide leading-relaxed px-2">
            24/7 Live Support - Global Reach - Private Jet Charter
          </h2>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
          <button
            onClick={handleScheduleTrip}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-sm sm:text-base"
          >
            SCHEDULE TRIP
          </button>
          
          <button
            onClick={handleCallNow}
            className="flex-1 bg-blue-400 hover:bg-blue-500 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <span className="text-base sm:text-lg">📞</span>
            Call Now
          </button>
        </div>

        {/* Optional: Scroll indicator */}
        {/* <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-4 sm:w-5 md:w-6 h-8 sm:h-9 md:h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-0.5 sm:w-1 h-2 sm:h-2.5 md:h-3 bg-white rounded-full mt-1.5 sm:mt-2 animate-pulse"></div>
          </div>
        </div> */}
      </div>

      {/* Loading indicator */}
      {!isVideoLoaded && !hasError && (
        <div className="absolute inset-0 z-15 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      )}
    </div>
  );
};

export default HeroVideoSection;