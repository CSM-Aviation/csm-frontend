"use client"

import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import JetInsightComponent from './JetInsight/JetInsightComponent3';
import Link from 'next/link';
import Image from 'next/image';

const AnimatedCSMVideoText = ({ videoSource }: { videoSource: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [showInitialText, setShowInitialText] = useState(true);
  const [transition, setTransition] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Set initial value
    checkMobile();
    
    // Add listener for window resize
    window.addEventListener('resize', checkMobile);
    
    // Clean up
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  useEffect(() => {
    if (!videoRef.current || !containerRef.current) return;
    
    // Ensure video is loaded and ready
    const video = videoRef.current as HTMLVideoElement;
    video.load();
    video.muted = true;
    video.playsInline = true;
    
    // Play video once loaded
    const handleCanPlay = () => {
      video.play().catch(error => {
        console.error("Video autoplay failed:", error);
      });
      
      // Start transition animation sequence
      setTimeout(() => {
        setTransition(true); // Begin scaling/fading transition
        
        setTimeout(() => {
          setShowInitialText(false); // Remove initial text
          setTimeout(() => {
            setIsVideoLoaded(true); // Show video cutout letters
          }, 200);
        }, 800); // Time for the transition animation
      }, 1000); // Initial delay before starting transition
    };
    
    video.addEventListener('canplay', handleCanPlay);
    
    return () => {
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, [videoSource]);

  // Animation variants for text reveal
  const textVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.5,
        ease: "easeInOut",
        staggerChildren: 0.15
      }
    }
  };

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(10px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };
  
  const [viewport, setViewport] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    handleResize(); // initialize
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  // Adjust scale based on screen size - smaller scale for mobile
  const targetScale = viewport.width < 768 ? 0.4 : viewport.width < 1024 ? 0.7 : 1;

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
        ease: "easeInOut"
      }
    },
    exit: {
      x: isMobile ? mobileXPosition : desktopXPosition,
      y: isMobile ? mobileYPosition : desktopYPosition,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div 
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform:"translate(-50%,-50%)"
          }}
          className="z-100"
          initial="initial"
          animate={transition ? "transition" : "initial"}
          exit="exit"
          variants={initialTextVariants}
        >
          <h1 className="text-white text-8xl md:text-9xl font-bold tracking-wider">
            <Link href="/" className="">
              <Image src="/images/whitebgcsmlogo.png" alt="CSM Aviation" className='' width={100} height={100} />
            </Link>
          </h1>
        </motion.div>
      </AnimatePresence>
      
      <div style={{top:0, left:0}} className="relative w-full h-screen flex items-center justify-center" ref={containerRef}>
        {/* Gradient background with radial gradient from blue to dark blue */}
        <div className="absolute inset-0 z-0" style={{
          background: '#002040'
        }}></div>
        
        {/* Hidden video element that serves as the source */}
        <video 
          ref={videoRef}
          className="hidden"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        >
          <source src={videoSource} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Main content container - adjust vertical positioning for mobile */}
        <motion.div 
          className={`relative w-full max-w-4xl mx-auto flex flex-col items-center justify-center px-4 ${isMobile ? 'mt-16' : ''}`}
          initial={{ opacity: 0 }}
          animate={isVideoLoaded ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeIn" }}
          style={{ height: "100%" }}
        >
          {/* Content now tightly packed without excess space */}
          <div className="flex flex-col items-center justify-center w-full">
            {/* SVG for CSM letters - adjust viewBox for mobile */}
            <div className="w-full">
              <svg 
                className="w-full h-auto" 
                viewBox={isMobile ? "0 0 840 700" : "0 0 840 600"} 
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  {/* Define clip paths for each letter to contain the video */}
                  <clipPath id="clip-c">
                    <path 
                      d="M150,50 C80,50 30,120 30,200 C30,280 80,350 150,350 C200,350 240,320 260,280 L200,240 C190,260 170,275 150,275 C110,275 80,240 80,200 C80,160 110,125 150,125 C170,125 190,140 200,160 L260,120 C240,80 200,50 150,50 Z" 
                    />
                  </clipPath>
                  
                  <clipPath id="clip-s">
                    <path 
                      d="M 406 48 C 326 48 286 96 286 144 C 286 230.4 406 230.4 406 268.8 C 406 288 386 297.6 366 297.6 C 346 297.6 326 288 316 268.8 L 266 307.2 C 286 336 326 355.2 366 355.2 C 446 355.2 486 307.2 486 259.2 C 486 172.8 366 172.8 366 134.4 C 366 115.2 386 105.6 406 105.6 C 426 105.6 446 115.2 456 134.4 L 506 96 C 486 67.2 446 48 406 48 Z" 
                    />
                  </clipPath>
                  
                  <clipPath id="clip-m">
                    <path 
                      d="M550,50 L550,350 L630,350 L630,160 L680,280 L730,160 L730,350 L810,350 L810,50 L730,50 L680,170 L630,50 Z" 
                    />
                  </clipPath>
                  
                  {/* Video filter for texture */}
                  <filter id="noise" x="0%" y="0%" width="100%" height="100%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="3" result="noise" />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="G" />
                  </filter>
                  
                  {/* ENHANCED Blue glow filter with stronger effect */}
                  <filter id="blue-glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="15" result="blur" />
                    <feFlood floodColor="#23B2EE" floodOpacity="0.9" result="color" />
                    <feComposite in="color" in2="blur" operator="in" result="glow" />
                    <feMerge>
                      <feMergeNode in="glow" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  
                  {/* ENHANCED Drop shadow filter for letter outlines - MUCH STRONGER */}
                  <filter id="letter-shadow" x="-10%" y="-10%" width="120%" height="120%">
                    <feDropShadow dx="0" dy="0" stdDeviation="10" floodColor="#ffffff" floodOpacity="0.3"/>
                    <feDropShadow dx="2" dy="2" stdDeviation="5" floodColor="#ffffff" floodOpacity="0.3"/>
                    <feDropShadow dx="4" dy="4" stdDeviation="3" floodColor="#aaddff" floodOpacity="0.3"/>
                    <feDropShadow dx="-3" dy="-3" stdDeviation="4" floodColor="#ffffff" floodOpacity="0.3"/>
                  </filter>
                  
                  {/* Blue gradient for letter outlines */}
                  <linearGradient id="blue-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#87CEEB" /> {/* Light blue */}
                    <stop offset="100%" stopColor="#23B2EE" /> {/* Electric blue */}
                  </linearGradient>
                </defs>
                
                {/* Animated letter C */}
                <motion.g variants={letterVariants}>
                  {/* Blue glow around letter C */}
                  <path 
                    d="M150,50 C80,50 30,120 30,200 C30,280 80,350 150,350 C200,350 240,320 260,280 L200,240 C190,260 170,275 150,275 C110,275 80,240 80,200 C80,160 110,125 150,125 C170,125 190,140 200,160 L260,120 C240,80 200,50 150,50 Z" 
                    fill="none" 
                    stroke="url(#blue-gradient)" 
                    strokeWidth="8" 
                    filter="url(#blue-glow)"
                    opacity="0.9"
                  />
                  
                  {/* Using a foreignObject with clipping to contain the video within the letter C */}
                  <foreignObject x="30" y="50" width="230" height="300" clipPath="url(#clip-c)" xmlns="http://www.w3.org/1999/xhtml">
                    <div className="w-full h-full overflow-hidden">
                      {videoSource && (
                        <video 
                          className="w-full h-full object-cover"
                          autoPlay
                          loop
                          muted
                          playsInline
                          preload="auto"
                          style={{ transform: isMobile ? "scale(1.8)" : "scale(1.6)" }}
                        >
                          <source src={videoSource} type="video/mp4" />
                        </video>
                      )}
                    </div>
                  </foreignObject>
                  
                  {/* Outline for letter C - ENHANCED with thicker stroke and better shadow */}
                  <path 
                    d="M150,50 C80,50 30,120 30,200 C30,280 80,350 150,350 C200,350 240,320 260,280 L200,240 C190,260 170,275 150,275 C110,275 80,240 80,200 C80,160 110,125 150,125 C170,125 190,140 200,160 L260,120 C240,80 200,50 150,50 Z" 
                    fill="none" 
                    stroke="rgba(255,255,255,1)" 
                    strokeWidth="3.5"
                    filter="url(#letter-shadow)" 
                  />
                </motion.g>
                
                {/* Animated letter S */}
                <motion.g variants={letterVariants}>
                  {/* Blue glow around letter S */}
                  <path 
                    d="M 406 48 C 326 48 286 96 286 144 C 286 230.4 406 230.4 406 268.8 C 406 288 386 297.6 366 297.6 C 346 297.6 326 288 316 268.8 L 266 307.2 C 286 336 326 355.2 366 355.2 C 446 355.2 486 307.2 486 259.2 C 486 172.8 366 172.8 366 134.4 C 366 115.2 386 105.6 406 105.6 C 426 105.6 446 115.2 456 134.4 L 506 96 C 486 67.2 446 48 406 48 Z" 
                    fill="none" 
                    stroke="url(#blue-gradient)" 
                    strokeWidth="8" 
                    filter="url(#blue-glow)"
                    opacity="0.9"
                  />
                
                  {/* Using a foreignObject with clipping to contain the video within the letter S */}
                  <foreignObject x="260" y="50" width="240" height="320" clipPath="url(#clip-s)" xmlns="http://www.w3.org/1999/xhtml">
                    <div className="w-full h-full overflow-hidden">
                      {videoSource && (
                        <video 
                          className="w-full h-full object-cover"
                          autoPlay
                          loop
                          muted
                          playsInline
                          preload="auto"
                          style={{ transform: isMobile ? "scale(1.8) translateX(-10%)" : "scale(1.6) translateX(-10%)" }}
                        >
                          <source src={videoSource} type="video/mp4" />
                        </video>
                      )}
                    </div>
                  </foreignObject>
                  
                  {/* Outline for letter S - ENHANCED with thicker stroke and better shadow */}
                  <path 
                    d="M 406 48 C 326 48 286 96 286 144 C 286 230.4 406 230.4 406 268.8 C 406 288 386 297.6 366 297.6 C 346 297.6 326 288 316 268.8 L 266 307.2 C 286 336 326 355.2 366 355.2 C 446 355.2 486 307.2 486 259.2 C 486 172.8 366 172.8 366 134.4 C 366 115.2 386 105.6 406 105.6 C 426 105.6 446 115.2 456 134.4 L 506 96 C 486 67.2 446 48 406 48 Z" 
                    fill="none" 
                    stroke="rgba(255,255,255,1)" 
                    strokeWidth="3.5"
                    filter="url(#letter-shadow)"
                  />
                </motion.g>
                
                {/* Animated letter M */}
                <motion.g variants={letterVariants}>
                  {/* Blue glow around letter M */}
                  <path 
                    d="M550,50 L550,350 L630,350 L630,160 L680,280 L730,160 L730,350 L810,350 L810,50 L730,50 L680,170 L630,50 Z" 
                    fill="none" 
                    stroke="url(#blue-gradient)" 
                    strokeWidth="8" 
                    filter="url(#blue-glow)"
                    opacity="0.9"
                  />
                
                  {/* Using a foreignObject with clipping to contain the video within the letter M */}
                  <foreignObject x="550" y="50" width="260" height="300" clipPath="url(#clip-m)" xmlns="http://www.w3.org/1999/xhtml">
                    <div className="w-full h-full overflow-hidden">
                      {videoSource && (
                        <video 
                          className="w-full h-full object-cover"
                          autoPlay
                          loop
                          muted
                          playsInline
                          preload="auto"
                          style={{ transform: isMobile ? "scale(2.4) translateX(-15%) translateY(-5%)" : "scale(2.2) translateX(-15%) translateY(-5%)" }}
                        >
                          <source src={videoSource} type="video/mp4" />
                        </video>
                      )}
                    </div>
                  </foreignObject>
                  
                  {/* Outline for letter M - ENHANCED with thicker stroke and better shadow */}
                  <path 
                    d="M550,50 L550,350 L630,350 L630,160 L680,280 L730,160 L730,350 L810,350 L810,50 L730,50 L680,170 L630,50 Z" 
                    fill="none" 
                    stroke="rgba(255,255,255,1)" 
                    strokeWidth="3.5"
                    filter="url(#letter-shadow)"
                  />
                </motion.g>
              </svg>
            </div>
            
            {/* Tagline text - moved directly below CSM with minimal spacing */}
            <motion.div 
              className={`text-white text-xl md:text-2xl lg:text-3xl text-center font-light w-full ${isMobile ? 'mt-[-60px]' : 'mt-[-100px]'}`}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    delay: 1.2, 
                    duration: 0.8 
                  }
                }
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={isVideoLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Anywhere. Anytime. Private Air Charter.
            </motion.div>
            
            {/* JetInsight component - adjusted for mobile */}
            <motion.div 
              className={`w-full flex justify-center ${isMobile ? 'mt-4' : 'mt-6'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={isVideoLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <JetInsightComponent />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default AnimatedCSMVideoText;