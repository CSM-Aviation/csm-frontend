"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import JetInsightComponent from "./JetInsight/JetInsightComponent3";
import Image from "next/image";

const AnimatedCSMVideoText = ({ videoSource }: { videoSource: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  const handleCallNow = () => {
    window.location.href = "tel:+18884359276";
  };

  return (
    <div
      className="relative w-full h-[85vh] md:h-screen flex items-end justify-center bg-csm-navy"
      ref={containerRef}
    >
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {videoSource && (
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            style={{ filter: "brightness(0.8)" }}
          >
            <source
              src={videoSource}
              type="video/mp4"
            />
          </video>
        )}
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-csm-navy via-csm-navy/50 to-csm-navy/10" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-end w-full px-5 sm:px-6 pb-16 sm:pb-20 md:pb-24 lg:pb-28">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative w-56 sm:w-72 md:w-96 lg:w-[28rem] h-auto mb-5 md:mb-7"
        >
          <Image
            src="/images/CSM_Logo_WHITE-01_no_plane.png"
            alt="CSM Aviation Logo"
            width={500}
            height={200}
            priority
            className="object-contain w-full h-auto drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]"
          />
        </motion.div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-8 md:mb-10"
        >
          <p className="text-center text-white/80 font-light tracking-[0.2em] uppercase text-xs sm:text-sm md:text-base lg:text-lg flex items-center justify-center flex-wrap gap-x-4 gap-y-1">
            <span>24/7 Live Support</span>
            <span className="w-px h-3 bg-white/30 hidden sm:inline-block"></span>
            <span>Global Reach</span>
            <span className="w-px h-3 bg-white/30 hidden sm:inline-block"></span>
            <span>Private Jet Charter</span>
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="flex flex-row gap-3 md:gap-4 items-center justify-center w-full max-w-xs sm:max-w-sm md:max-w-md"
        >
          {/* Get A Quote - Primary CTA */}
          <div className="flex-1">
            <JetInsightComponent />
          </div>

          {/* Call Now - Secondary CTA */}
          <button
            onClick={handleCallNow}
            className="flex-1 group px-4 sm:px-6 py-3 md:py-4 bg-transparent border border-white/30 text-white font-medium text-xs sm:text-sm uppercase tracking-wider rounded-full hover:bg-white hover:text-csm-navy hover:border-white transition-all duration-300 h-12 md:h-14 flex items-center justify-center gap-2"
            aria-label="Call CSM Aviation at +1-888-435-9276"
          >
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:scale-110"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            <span>Call Now</span>
          </button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 6, 0] }}
          transition={{
            opacity: { delay: 1.5, duration: 0.5 },
            y: { delay: 1.5, duration: 2, repeat: Infinity, ease: "easeInOut" },
          }}
          className="mt-10 md:mt-14"
        >
          <svg
            className="w-5 h-5 text-white/40"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7"
            />
          </svg>
        </motion.div>
      </div>
    </div>
  );
};

export default AnimatedCSMVideoText;
