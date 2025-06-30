'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence, m } from 'framer-motion';
import JetInsightComponent from './JetInsight/JetInsightComponent3';
import Link from 'next/link';
import Image from 'next/image';

const AnimatedCSMVideoText = ({ videoSource }: { videoSource: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [showInitialText, setShowInitialText] = useState(true);
  const [transition, setTransition] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  // Check if device is mobile and if it's iOS
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768);
      setIsIOS(
        /iPad|iPhone|iPod/.test(navigator.userAgent) &&
        !(window as any).MSStream
      );
    };

    // Set initial value
    checkDevice();

    // Add listener for window resize
    window.addEventListener('resize', checkDevice);

    // Clean up
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    // Start transition animation sequence after a delay
    const timer = setTimeout(() => {
      setTransition(true); // Begin scaling/fading transition

      setTimeout(() => {
        setShowInitialText(false); // Remove initial text
        setTimeout(() => {
          setIsVideoLoaded(true); // Show video cutout letters
        }, 200);
      }, 800); // Time for the transition animation
    }, 1000); // Initial delay before starting transition

    return () => clearTimeout(timer);
  }, []);

  const [viewport, setViewport] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize(); // initialize
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Adjust scale based on screen size - smaller scale for mobile
  const targetScale =
    viewport.width < 768 ? 0.4 : viewport.width < 1024 ? 0.7 : 1;

  // Adjust position for mobile
  const mobileXPosition = -viewport.width / 2 + 15;
  const mobileYPosition = -viewport.height / 2 + 25;

  const desktopXPosition = -viewport.width / 2 + 25;
  const desktopYPosition = -viewport.height / 2 + 10;

  // Initial text animation variants for smooth morphing to cutout
  const initialTextVariants = {
    initial: {
      scale: isMobile ? 1.5 : 2,
      x: '-50%',
      y: '-50%',
      zIndex: 50,
    },
    transition: {
      scale: targetScale,
      x: isMobile ? mobileXPosition : desktopXPosition,
      y: isMobile ? mobileYPosition : desktopYPosition,
      zIndex: 50,
      transition: {
        duration: 0.8,
        ease: 'easeInOut',
      },
    },
    exit: {
      x: isMobile ? mobileXPosition : desktopXPosition,
      y: isMobile ? mobileYPosition : desktopYPosition,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  // Handle call button click
  const handleCallNow = () => {
    window.location.href = 'tel:+18884359276';
  };

  return (
    <>

      <div
        style={{ top: 0, left: 0, backgroundColor: '#002040' }}
        className='relative md:h-screen w-full h-[60vh] flex items-center justify-center'
        ref={containerRef}
      >
        {/* Full screen background video */}
        <div className='absolute inset-0 w-full h-full overflow-hidden bg-[#002040]'>
          {videoSource && (
            <video
              className='absolute md:scale-100 md:-translate-y-6 scale-150 -translate-y-12 w-full h-full object-contain lg:object-cover'
              autoPlay
              loop
              muted
              playsInline
              onLoadedData={() => setIsVideoLoaded(true)}
              preload='auto'
              style={{
                filter: 'brightness(1)',
              }}
            >
              <source
                src={
                  !isMobile ? videoSource : '/videos/compressed/newdesktopvideo.mp4'
                }
                type='video/mp4'
              />
            </video>
          )}
          {/* Dark overlay for better text visibility */}
        </div>
        <div className='absolute md:bottom-[10%] bottom-[10%] left-0 right-0 text-black z-[1.5] '>
          <div className='flex flex-col gap-9 items-center justify-center w-full px-4'>
            <div className='md:translate-y-0 text-white text-base md:text-xl lg:text-4xl font-bold tracking-wider'>
              <p className='text-center'>24/7 Live Support - Global Reach - Private Jet Charter</p>
            </div>

            {/* Button Container - Centered with controlled spacing */}
            <div className='flex flex-row gap-2 md:gap-4 items-center justify-center w-full max-w-xs sm:max-w-md md:max-w-lg'>
              {/* JetInsight Component - Match width with Call Now button */}
              <div className='flex-1' style={{ maxWidth: 'calc(50% - 0.25rem)', width: '100%' }}>
                <JetInsightComponent />
              </div>

              {/* Call Now Button */}
              <button
                onClick={handleCallNow}
                className='flex-1 px-3 py-3 sm:px-6 sm:py-3 md:px-8 md:py-4 bg-electric-blue text-black font-semibold text-xs sm:text-sm md:text-base lg:text-lg rounded-full hover:bg-white hover:text-[#002040] transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 h-12 sm:h-12 md:h-16'
                style={{ maxWidth: 'calc(50% - 0.25rem)', width: '100%' }}
                aria-label='Call CSM Aviation at +1-888-435-9276'
              >
                <span className='flex items-center justify-center gap-1 sm:gap-2'>
                  <svg
                    className='w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d='M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z' />
                  </svg>
                  Call Now
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnimatedCSMVideoText;