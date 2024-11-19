"use client";
import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import Hero from "../components/Hero";
import MaintManage from "../components/MaintManage";
import ServicesCards from "../components/ServiceCard";
import { useConfig } from "../contexts/ConfigContext";
import DonorNetworkSection from "../components/DonorNetworkSection";

export default function HomeBody() {
  const { config, error } = useConfig();
  const [scrollRange, setScrollRange] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  const [windowHeight, setWindowHeight] = useState(typeof window !== 'undefined' ? window.innerHeight : 0);

  // Get dynamic scrollable range and update it when content changes
  useEffect(() => {
    const updateDimensions = () => {
      // Wait for next frame to ensure accurate measurements
      requestAnimationFrame(() => {
        const scrollHeight = Math.max(
          document.documentElement.scrollHeight,
          document.body.scrollHeight
        );
        const windowHeight = window.innerHeight;
        setScrollRange(scrollHeight - windowHeight);
        setWindowWidth(window.innerWidth);
        setWindowHeight(window.innerHeight);
      });
    };

    // Initial update
    updateDimensions();
    
    // Update on resize
    window.addEventListener("resize", updateDimensions);
    
    // Update when content might change
    const observer = new MutationObserver(updateDimensions);
    observer.observe(document.body, { 
      childList: true, 
      subtree: true 
    });

    return () => {
      window.removeEventListener("resize", updateDimensions);
      observer.disconnect();
    };
  }, []);

  // Motion values for the airplane's position
  const scrollY = useMotionValue(0);
  
  // Calculate midpoint of scroll range for circular animation
  const midScrollPoint = scrollRange * 0.5; // Middle of the page
  const circleRadius = Math.min(100, windowWidth * 0.1); // Responsive radius
  const circleDuration = scrollRange * 0.3; // Longer duration for circular movement

  // Transform scroll progress to animation progress
  const xTransform = useTransform(
    scrollY,
    [0, midScrollPoint - circleDuration, midScrollPoint, midScrollPoint + circleDuration, scrollRange],
    [
      20, // Start position
      windowWidth * 0.3, // Before circle
      windowWidth * 0.5, // Circle center
      windowWidth * 0.7, // After circle
      windowWidth - 100, // End position
    ]
  );

  const yTransform = useTransform(
    scrollY,
    [0, midScrollPoint - circleDuration, midScrollPoint, midScrollPoint + circleDuration, scrollRange],
    [
      80, // Start position
      windowHeight * 0.4, // Before circle
      windowHeight * 0.5, // Circle center
      windowHeight * 0.6, // After circle
      windowHeight - 60, // End position
    ]
  );

  // Smoother rotation transform
  const rotateTransform = useTransform(
    scrollY,
    [0, midScrollPoint - circleDuration, midScrollPoint, midScrollPoint + circleDuration, scrollRange],
    [0, 0, 180, 360, 360] // More gradual rotation
  );

  // Update scrollY value based on window scroll with smooth interpolation
  useEffect(() => {
  let rafld:number |null=null;
    let currentY = 0;
    const smoothness = 0.1; // Adjust for smoother or more responsive movement

    const handleScroll = () => {
      const updateScroll = () => {
        const targetY = window.scrollY;
        const diff = targetY - currentY;
        
        if (Math.abs(diff) > 0.1) {
          currentY += diff * smoothness;
          scrollY.set(currentY);
          rafId = requestAnimationFrame(updateScroll);
        } else {
          currentY = targetY;
          scrollY.set(currentY);
        }
      };

      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      rafId = requestAnimationFrame(updateScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [scrollY]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!config) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <motion.div
        style={{
          position: "fixed",
          top: yTransform,
          left: xTransform,
          rotate: rotateTransform,
          zIndex: 10,
        }}
      >
        <img
          src="/images/airplane-arrival1.svg"
          alt="Airplane icon"
          className="w-20 h-20 object-contain"
        />
      </motion.div>

      <div>
        <Hero
          desktopImage="/images/hero/home-desktop.jpg"
          mobileImage="/images/hero/home-mobile.jpg"
          videoSource={config?.home_video}
          title="Welcome to CSM Aviation"
          subtitle="Director Broker Services | Wholesale Private Charter Direct to Public"
          isHome={true}
          showJetInsight={true}
        />
        <ServicesCards />
        <MaintManage />
        <DonorNetworkSection />
      </div>
    </>
  );
}