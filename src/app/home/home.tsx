"use client";
import React, { useEffect, useState } from "react";
import MaintManage from "../components/MaintManage";
import ServicesCards from "../components/ServiceCard";
import { useConfig } from "../contexts/ConfigContext";
import DonorNetworkSection from "../components/DonorNetworkSection";
import { motion, useMotionValue, useTransform } from "framer-motion";
import PopularDestinations from "../components/PopularDestinations";
import Testimonials from "../components/Testimonials";
import AnimatedCSMVideoText from "../components/Hero";
import AnimatedPlaneService2 from "../components/AnimatedPlaneService2";
import FleetPage from "../components/FleetPage";
import MobileFleet from "../components/MobileFleet";
import FleetPageSec from "../components/FleetPageSec";
import HeroVideoSection from "../components/HeroVideoSection";
import Fireworks from "@fireworks-js/react";
import { HeroAnimated } from "../components/HeroAnimated";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Marquee from "../components/Marquee";

export default function HomeBody() {
  const { config, error } = useConfig();
  const [scrollRange, setScrollRange] = useState(0);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  const [windowHeight, setWindowHeight] = useState(
    typeof window !== "undefined" ? window.innerHeight : 0
  );


  const videoSource = '/videos/compressed/newdesktopvideo.mp4';


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
    window.addEventListener("resize", updateDimensions);

    const observer = new MutationObserver(updateDimensions);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      window.removeEventListener("resize", updateDimensions);
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

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [scrollY]);

  return (
    <>
      <div className="-mt-24 md:-mt-20">
        {/* <Marquee/> */}
        <HeroAnimated />
        <AnimatedCSMVideoText videoSource={videoSource} />
        {/* <HeroVideoSection /> */}
        <ServicesCards />
        {/* <AnimatedPlaneService2 /> */}
        {/* <MobileFleet /> */}
        <FleetPageSec />
        <div className="my-8"></div>
        <MaintManage />
        <PopularDestinations />
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.3 }}
          className="absolute top-[100%] "
        >
          <DotLottieReact
                  src="https://lottie.host/564dc67b-f10f-4db7-bdc6-d4224659c198/u7WeoCnmxa.lottie"
            loop
            autoplay
          />
        </motion.div>
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.3 }}
          className="absolute top-[110%] left-[20%]"
        >
          <DotLottieReact
                  src="https://lottie.host/564dc67b-f10f-4db7-bdc6-d4224659c198/u7WeoCnmxa.lottie"
            loop
            autoplay
          />
        </motion.div>
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.3 }}
          className="absolute top-[180%] left-[20%]"
        >
          <DotLottieReact
                  src="https://lottie.host/564dc67b-f10f-4db7-bdc6-d4224659c198/u7WeoCnmxa.lottie"
            loop
            autoplay
          />
        </motion.div>
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.3 }}
          className="absolute top-[120%] right-0 w-[400px]"
        >
          <DotLottieReact
            src="https://lottie.host/56b00b84-9561-4e2f-87cd-8d98bf1a822e/pkKgUqCk8a.lottie"
            loop
            autoplay
          />
        </motion.div>
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.3 }}
          className="absolute top-[180%] left-0 w-[400px]"
        >
          <DotLottieReact
            src="https://lottie.host/56b00b84-9561-4e2f-87cd-8d98bf1a822e/pkKgUqCk8a.lottie"
            loop
            autoplay
          />
        </motion.div>
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.3 }}
          className="absolute top-[180%] right-0 w-[400px]"
        >
          <DotLottieReact
            src="https://lottie.host/194c4d76-5445-48c0-8774-51a9e65a006f/34slhN4CDU.lottie"
            loop
            autoplay
          />
        </motion.div>
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.3 }}
          className="absolute top-[240%] right-0 w-[560px]"
        >
          {/* <DotLottieReact
            src="https://lottie.host/194c4d76-5445-48c0-8774-51a9e65a006f/34slhN4CDU.lottie"
            loop
            autoplay
          /> */}
        </motion.div>
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.3 }}
          className="absolute top-[240%] left-0"
        >
          <DotLottieReact
            src="https://lottie.host/194c4d76-5445-48c0-8774-51a9e65a006f/34slhN4CDU.lottie"
            loop
            autoplay
          />
        </motion.div>
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.3 }}
          className="absolute top-[280%] right-0 "
        >
          <DotLottieReact
            src="https://lottie.host/79da910c-62ae-41c5-ba8c-3a1df8fbaaea/DMuVRQdaYO.lottie"
            loop
            autoplay
          />
        </motion.div>
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.3 }}
          className="absolute top-[280%] left-0 w-[400px]"
        >
          <DotLottieReact
                src="https://lottie.host/27cc01b7-950e-4de5-b4d8-fce42e32f9a3/3QgCPRlZxS.lottie"
            loop
            autoplay
          />
        </motion.div>
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.3 }}
          className="absolute top-[320%] right-1/2 w-[560px]"
        >
          <DotLottieReact
                  src="https://lottie.host/037d6e58-d1cf-4930-b00a-f50c14bb7cd6/rCO1swXSla.lottie"

            loop
            autoplay
          />
        </motion.div>
      </div>
    </>
  );
}
