import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const AnimatedCSMVideoText = ({ videoSource }) => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  
  useEffect(() => {
    if (!videoRef.current || !containerRef.current) return;
    
    // Ensure video is loaded and ready
    const video = videoRef.current;
    video.load();
    video.muted = true;
    video.playsInline = true;
    
    // Play video once loaded
    const handleCanPlay = () => {
      video.play().catch(error => {
        console.error("Video autoplay failed:", error);
      });
      setIsVideoLoaded(true);
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
  
  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-[#004080]" ref={containerRef}>
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
      
      {/* SVG for the text with animation - centered with adjusted viewBox */}
      <motion.div 
        className="relative w-full max-w-4xl mx-auto h-screen flex items-center justify-center overflow-hidden"
        initial="hidden"
        animate={isVideoLoaded ? "visible" : "hidden"}
        variants={textVariants}
      >
        <svg 
          className="w-full h-auto" 
          viewBox="0 0 840 400" 
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
                d="M400,50 C320,50 280,100 280,150 C280,240 400,240 400,280 C400,300 380,310 360,310 C340,310 320,300 310,280 L260,320 C280,350 320,370 360,370 C440,370 480,320 480,270 C480,180 360,180 360,140 C360,120 380,110 400,110 C420,110 440,120 450,140 L500,100 C480,70 440,50 400,50 Z" 
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
          </defs>
          
          {/* Animated letter C */}
          <motion.g variants={letterVariants}>
            {/* Using a foreignObject with clipping to contain the video within the letter C */}
            <foreignObject x="30" y="50" width="230" height="300" style={{ clipPath: "url(#clip-c)" }}>
              <div className="w-full h-full overflow-hidden">
                {videoSource && (
                  <video 
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    style={{ transform: "scale(1.5)" }}
                  >
                    <source src={videoSource} type="video/mp4" />
                  </video>
                )}
              </div>
            </foreignObject>
            {/* Outline for letter C */}
            <path 
              d="M150,50 C80,50 30,120 30,200 C30,280 80,350 150,350 C200,350 240,320 260,280 L200,240 C190,260 170,275 150,275 C110,275 80,240 80,200 C80,160 110,125 150,125 C170,125 190,140 200,160 L260,120 C240,80 200,50 150,50 Z" 
              fill="none" 
              stroke="rgba(255,255,255,0.7)" 
              strokeWidth="2" 
            />
          </motion.g>
          
          {/* Animated letter S */}
          <motion.g variants={letterVariants}>
            {/* Using a foreignObject with clipping to contain the video within the letter S */}
            <foreignObject x="260" y="50" width="240" height="320" style={{ clipPath: "url(#clip-s)" }}>
              <div className="w-full h-full overflow-hidden">
                {videoSource && (
                  <video 
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    style={{ transform: "scale(1.5) translateX(-10%)" }}
                  >
                    <source src={videoSource} type="video/mp4" />
                  </video>
                )}
              </div>
            </foreignObject>
            {/* Outline for letter S */}
            <path 
              d="M400,50 C320,50 280,100 280,150 C280,240 400,240 400,280 C400,300 380,310 360,310 C340,310 320,300 310,280 L260,320 C280,350 320,370 360,370 C440,370 480,320 480,270 C480,180 360,180 360,140 C360,120 380,110 400,110 C420,110 440,120 450,140 L500,100 C480,70 440,50 400,50 Z" 
              fill="none" 
              stroke="rgba(255,255,255,0.7)" 
              strokeWidth="2" 
            />
          </motion.g>
          
          {/* Animated letter M */}
          <motion.g variants={letterVariants}>
            {/* Using a foreignObject with clipping to contain the video within the letter M */}
            <foreignObject x="550" y="50" width="260" height="300" style={{ clipPath: "url(#clip-m)" }}>
              <div className="w-full h-full overflow-hidden">
                {videoSource && (
                  <video 
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    style={{ transform: "scale(1.5) translateX(-20%)" }}
                  >
                    <source src={videoSource} type="video/mp4" />
                  </video>
                )}
              </div>
            </foreignObject>
            {/* Outline for letter M */}
            <path 
              d="M550,50 L550,350 L630,350 L630,160 L680,280 L730,160 L730,350 L810,350 L810,50 L730,50 L680,170 L630,50 Z" 
              fill="none" 
              stroke="rgba(255,255,255,0.7)" 
              strokeWidth="2" 
            />
          </motion.g>
        </svg>
        
        {/* Optional tagline that appears after the animation */}
        <motion.div 
          className="absolute bottom-16 text-white text-xl md:text-2xl text-center font-light w-full"
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
        >
          Anywhere. Anytime. Private Air Charter.
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AnimatedCSMVideoText;