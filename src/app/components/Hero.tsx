"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence, m } from "framer-motion";
import JetInsightComponent from "./JetInsight/JetInsightComponent3";
import Link from "next/link";
import Image from "next/image";

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
          !(window as any).MSStream,
      );
    };

    // Set initial value
    checkDevice();

    // Add listener for window resize
    window.addEventListener("resize", checkDevice);

    // Clean up
    return () => window.removeEventListener("resize", checkDevice);
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
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
      x: "-50%",
      y: "-50%",
      zIndex: 50,
    },
    transition: {
      scale: targetScale,
      x: isMobile ? mobileXPosition : desktopXPosition,
      y: isMobile ? mobileYPosition : desktopYPosition,
      zIndex: 50,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
      },
    },
    exit: {
      x: isMobile ? mobileXPosition : desktopXPosition,
      y: isMobile ? mobileYPosition : desktopYPosition,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  // Handle call button click
  const handleCallNow = () => {
    window.location.href = "tel:+18884359276";
  };

  return (
    <>
      <div
        style={{ top: 0, left: 0, backgroundColor: "#002040" }}
        className="relative md:h-screen w-full h-[60vh] flex items-center justify-center"
        ref={containerRef}
      >
        {/* Full screen background video */}
        <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#002040]">
          {videoSource && (
            <video
              className="absolute md:scale-100 md:translate-y-0 scale-150 -translate-y-12 w-full h-full object-contain lg:object-cover"
              autoPlay
              loop
              muted
              playsInline
              onLoadedData={() => setIsVideoLoaded(true)}
              preload="auto"
              style={{
                filter: "brightness(1)",
              }}
            >
              <source
                src={
                  !isMobile
                    ? videoSource
                    : "/videos/compressed/CSM_Hero.mp4"
                }
                type="video/mp4"
              />
            </video>
          )}
          {/* Dark overlay for better text visibility (Optional - un-comment if logo needs more contrast) */}
          {/* <div className="absolute inset-0 bg-black/30" /> */}
        </div>

        {/* Content Overlay */}
        <div className="absolute md:bottom-[10%] bottom-[10%] left-0 right-0 text-black z-[1.5] ">
          <div className="flex flex-col gap-6 md:gap-9 items-center justify-center w-full px-4">
            
            {/* --- LOGO ADDED HERE --- */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-48 md:w-72 lg:w-96 h-auto mb-4 md:mb-6"
            >
              <Image 
                src="/images/CSM_Logo_WHITE-01_no_plane.png"
                alt="CSM Aviation Logo"
                width={500}
                height={200}
                priority
                className="object-contain w-full h-auto drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]"
              />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="md:translate-y-0 text-white font-medium tracking-[0.15em] uppercase text-xs sm:text-sm md:text-lg lg:text-xl"
            >
              <p className="text-center drop-shadow-md flex items-center justify-center flex-wrap gap-2 md:gap-4">
                <span>24/7 Live Support</span>
                <span className="opacity-50 hidden sm:inline">|</span>
                <span>Global Reach</span>
                <span className="opacity-50 hidden sm:inline">|</span>
                <span>Private Jet Charter</span>
              </p>
            </motion.div>

            {/* Button Container - Centered with controlled spacing */}
            <div className="flex flex-row gap-2 md:gap-4 items-center justify-center w-full max-w-xs sm:max-w-md md:max-w-lg">
              {/* JetInsight Component - Match width with Call Now button */}
              <div
                className="flex-1"
                style={{ maxWidth: "calc(50% - 0.25rem)", width: "100%" }}
              >
                <JetInsightComponent />
              </div>

              {/* Call Now Button */}
              <button
                onClick={handleCallNow}
                className="flex-1 group px-6 py-3 sm:py-3 md:py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white font-medium text-xs sm:text-sm md:text-base uppercase tracking-widest rounded-full hover:bg-white hover:text-[#002040] hover:border-white transition-all duration-300 ease-out shadow-[0_4px_30px_rgba(0,0,0,0.1)] hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] h-12 sm:h-12 md:h-16 flex items-center justify-center gap-2"
                style={{ maxWidth: "calc(50% - 0.25rem)", width: "100%" }}
                aria-label="Call CSM Aviation at +1-888-435-9276"
              >
                <div className="flex items-center justify-center gap-2">
                  <svg
                    className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:scale-110"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span>Call Now</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnimatedCSMVideoText;