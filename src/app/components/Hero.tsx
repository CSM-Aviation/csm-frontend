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

  // Check if dmbnevice is mobile and if it's iOS
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

  return (
    <>
      <AnimatePresence mode='wait'>
        <motion.div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
          }}
          className='z-100'
          initial='initial'
          animate={transition ? 'transition' : 'initial'}
          exit='exit'
          variants={initialTextVariants}
        >
          <h1 className='text-white text-8xl md:text-9xl font-bold tracking-wider'>
            <Link href='/' className=''>
              <Image
                src='/images/whitebgcsmlogo.png'
                alt='CSM Aviation'
                className=''
                width={100}
                height={100}
              />
            </Link>
          </h1>
        </motion.div>
      </AnimatePresence>

      <div
        style={{ top: 0, left: 0, backgroundColor: '#002040' }}
        className='relative w-full h-screen flex items-center justify-center'
        ref={containerRef}
      >
        {/* Full screen background video */}
        <div className='absolute inset-0 w-full h-full overflow-hidden'>
          {videoSource && (
            <video
              className='absolute w-full h-full object-contain lg:object-cover'
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
                src={!isMobile ? videoSource : '/videos/CSM_Mobile.mp4'}
                type='video/mp4'
              />
            </video>
          )}
          {/* Dark overlay for better text visibility */}
        </div>
        <div className='absolute md:bottom-[15%] bottom-1/4 left-0 right-0 text-black z-10'>
          <div className='flex flex-col gap-2 items-center justify-center w-full px-4'>
            <div className='text-white text-xs md:text-lg lg:text-2xl font-bold tracking-wider'>
              <p>Anywhere Anytime Private Jet Charter</p>
            </div>
            <JetInsightComponent />
          </div>
        </div>
      </div>
    </>
  );
};

export default AnimatedCSMVideoText;
