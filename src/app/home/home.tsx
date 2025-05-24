'use client';
import React, { useEffect, useState } from 'react';
import MaintManage from '../components/MaintManage';
import ServicesCards from '../components/ServiceCard';
import { useConfig } from '../contexts/ConfigContext';
import DonorNetworkSection from '../components/DonorNetworkSection';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import PopularDestinations from '../components/PopularDestinations';
import Testimonials from '../components/Testimonials';
import AnimatedCSMVideoText from '../components/Hero';
import AnimatedPlaneService2 from '../components/AnimatedPlaneService2';
import FleetPage from '../components/FleetPage';


export default function HomeBody() {
  const { config, error } = useConfig();
  const [scrollRange, setScrollRange] = useState(0);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0
  );
  const [windowHeight, setWindowHeight] = useState(
    typeof window !== 'undefined' ? window.innerHeight : 0
  );


  const videoSource = '/videos/compressed/CSM_desktop.mp4';

  useEffect(() => {
    const updateDimensions = () => {
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

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    const observer = new MutationObserver(updateDimensions);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      window.removeEventListener('resize', updateDimensions);
      observer.disconnect();
    };
  }, []);

  const scrollY = useMotionValue(0);

  // Transform scroll progress to x position
  const xTransform = useTransform(
    scrollY,
    [0, scrollRange],
    [0, windowWidth - 100] // Move from left to right
  );

  // Create curved path using quadratic bezier
  const yTransform = useTransform(scrollY, (value) => {
    const progress = value / scrollRange;
    // Quadratic bezier curve calculation
    const startY = windowHeight - 100; // Bottom left
    const controlY = windowHeight - 300; // Control point height
    const endY = windowHeight - 100; // Bottom right

    const t = progress;
    return (
      (1 - t) * (1 - t) * startY + 2 * (1 - t) * t * controlY + t * t * endY
    );
  });

  // Rotation based on curve tangent
  const rotateTransform = useTransform(
    scrollY,
    [0, scrollRange * 0.33, scrollRange * 0.66, scrollRange], // Three sections
    [0, 15, 25, 45] // No rotation → 45° down → 90° down
  );

  useEffect(() => {
    let rafId: number | null = null;
    let currentY = 0;
    const smoothness = 0.1;

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

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [scrollY]);

  return (
    <>
      <div className='-mt-24 md:-mt-20'>
        <AnimatedCSMVideoText
          videoSource={videoSource}

        />
        {/* <ServicesCards /> */}
        <AnimatedPlaneService2 />
        <h1 className="text-[#143D4F] text-4xl md:text-7xl text-center font-bold mb-10">Our Fleet</h1>
        <FleetPage />
        <div className="my-16"></div> {/* Added spacing between FleetPage and MaintManage */}
        <MaintManage />
        <PopularDestinations />
        <Testimonials />
      </div>
    </>
  );
}