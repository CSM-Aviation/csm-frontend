import React, { useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';

declare global {
  interface Window {
    MessageDeskChatbot?: {
      open: () => void;
    };
  }
}

const AnimatedChatPlane = () => {
  const [scrollRange, setScrollRange] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  const [windowHeight, setWindowHeight] = useState(typeof window !== 'undefined' ? window.innerHeight : 0);
  const [isReady, setIsReady] = useState(false);

  const checkChatbotAvailability = useCallback(() => {
    if (window.MessageDeskChatbot) {
      setIsReady(true);
      return true;
    }
    return false;
  }, []);

  useEffect(() => {
    // Check if script is already loaded
    const existingScript = document.querySelector('script[src*="snapdesk.app/chatbot"]');
    
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = "https://api.snapdesk.app/chatbot?key=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwidGVuYW50X2lkIjoxOTc4MCwiY3JlYXRlZF9hdCI6IjIwMjQtMDctMDVUMjM6MjQ6MjkuOTg4NDI2WiJ9.DAUXkHvLFzYsW-xcuoO6U2hEHUMplZTzYwyjc8Q-NVw";
      script.async = true;
      document.body.appendChild(script);
    }

    // Poll for MessageDesk availability
    const interval = setInterval(() => {
      if (checkChatbotAvailability()) {
        clearInterval(interval);
      }
    }, 500);

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
      subtree: true 
    });

    return () => {
      window.removeEventListener("resize", updateDimensions);
      observer.disconnect();
      clearInterval(interval);
    };
  }, [checkChatbotAvailability]);

  const scrollY = useMotionValue(0);
  
  const xTransform = useTransform(
    scrollY,
    [0, scrollRange],
    [0, windowWidth - 100]
  );

  const yTransform = useTransform(
    scrollY,
    (value) => {
      const progress = value / scrollRange;
      const startY = windowHeight - 100;
      const controlY = windowHeight - 300;
      const endY = windowHeight - 100;
      
      const t = progress;
      return (1 - t) * (1 - t) * startY + 2 * (1 - t) * t * controlY + t * t * endY;
    }
  );

  const rotateTransform = useTransform(
    scrollY,
    [0, scrollRange * 0.33, scrollRange * 0.66, scrollRange],
    [0, 15, 25, 45]
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

  const openChatbot = useCallback(() => {
    if (!isReady) {
      console.log('Waiting for MessageDesk to load...');
      return;
    }
    
    try {
      if (window.MessageDeskChatbot?.open) {
        window.MessageDeskChatbot.open();
      }
    } catch (error) {
      console.error('Error opening chatbot:', error);
    }
  }, [isReady]);

  return (
    <motion.div
      style={{
        position: "fixed",
        top: yTransform,
        left: xTransform,
        rotate: rotateTransform,
        zIndex: 10,
      }}
      className="flex items-center"
    >
      <img
        src="/images/airplane3.svg"
        alt="Airplane icon"
        className="w-32 h-32 object-contain"
      />
      <button
        onClick={openChatbot}
        className={`bg-white text-black p-3 rounded-full shadow-lg hover:bg-gray-200 transition duration-300 -ml-6 transform translate-y-2 ${
          isReady ? 'opacity-100' : 'opacity-50'
        }`}
        aria-label="Open chat"
        disabled={!isReady}
      >
        <FontAwesomeIcon icon={faComments} />
      </button>
    </motion.div>
  );
};

export default AnimatedChatPlane;