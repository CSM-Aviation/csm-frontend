"use client";
import Image from "next/image";
import Plane from "../../../public/images/plane.png";
import {
  animate,
  motion,
  useMotionValue,
  useScroll,
  useTransform,
} from "framer-motion";
import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function AnimatedCard({
  direction,
  children,
  link,
}: {
  direction: "1" | "-1";
  children: ReactNode;
  link: string | null;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end center"],
    smooth: 0.1,
  });

  const cloudX = useMotionValue(0);
  const [windowWidth, setWindowWidth] = useState(1200);

  const updateWindowWidth = () => setWindowWidth(window.innerWidth);
  const router = useRouter();

  useEffect(() => {
    updateWindowWidth();
    window.addEventListener("resize", updateWindowWidth);
    return () => window.removeEventListener("resize", updateWindowWidth);
  }, []);

  const { planeWidth, cloudWidth, gap } = useMemo(() => {
    const plane = 400;
    const cloud =
      windowWidth < 768
        ? 260
        : windowWidth < 1024
        ? 400
        : windowWidth < 1640
        ? 500
        : windowWidth < 2440
        ? 700
        : 1050;
    const spacing = windowWidth < 768 ? 40 : windowWidth < 1024 ? 70 : 90;
    return { planeWidth: plane, cloudWidth: cloud, gap: spacing };
  }, [windowWidth]);

  const planeX = useTransform(
    scrollYProgress,
    [0, 1],
    [
      direction === "1"
        ? -planeWidth
        : windowWidth <= 768
        ? planeWidth
        : windowWidth + planeWidth,
      direction === "1" ? windowWidth + planeWidth : -planeWidth,
    ]
  );

  useEffect(() => {
    const stopTriggerPosition =
      direction === "-1"
        ? windowWidth / 2 - planeWidth * 2
        : windowWidth / 2 + planeWidth / 2;
    const cloudStopPosition = windowWidth / 2 - cloudWidth / 2;

    let isStopped = false;

    const unsubscribe = planeX.on("change", (latestPlaneX) => {
      const followX =
        direction === "-1"
          ? latestPlaneX + cloudWidth + gap
          : latestPlaneX - cloudWidth - gap;

      const shouldStop =
        direction === "-1"
          ? latestPlaneX <= stopTriggerPosition
          : latestPlaneX >= stopTriggerPosition;

      if (shouldStop && !isStopped) {
        animate(cloudX, cloudStopPosition);
        isStopped = true;
      } else if (!shouldStop) {
        cloudX.set(followX);
        isStopped = false;
      }
    });

    return () => {
      unsubscribe();
    };
  }, [planeX, windowWidth, cloudWidth, planeWidth, gap, cloudX, direction]);

  useEffect(() => {
    const initialPlaneX = -planeWidth;
    const initialCloudX = initialPlaneX - cloudWidth - gap;
    cloudX.set(initialCloudX);
  }, [cloudX, cloudWidth, planeWidth, gap]);

  const handleClick = (link: string | null) => {
    if (link) {
      router.push(link);
    }
  };

  return (
    <div ref={containerRef} className="w-full h-full">
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center">
        <div className="relative w-full h-full">
          {/* Cloud */}
          <motion.div
            onClick={() => handleClick(link)}
            style={{
              x: cloudX,
              position: "absolute",
              top: "50%",
              translateY: "-50%",
              zIndex: 10,
              width: `${cloudWidth}px`,
              height: `${cloudWidth}px`,
              willChange: "transform",
            }}
          >
            {children}
          </motion.div>

          {/* Plane */}
          <motion.div
            initial={{ rotate: direction === "1" ? 0 : 180 }}
            style={{ x: planeX, willChange: "transform" }} // Add this
            className="absolute md:top-[40%] top-1/2 -translate-y-1/2 w-auto flex gap-10"
          >
            <Image
              src={Plane}
              alt="Plane"
              className="w-[180px] sm:w-[300px] lg:w-[400px] h-auto" // Simplified
              priority
              sizes="(max-width: 768px) 180px, (max-width: 1024px) 300px, 400px" // Add sizes
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
