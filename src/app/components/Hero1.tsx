"use client"

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import JetInsightComponent from './JetInsight/JetInsightComponent3';

interface HeroProps {
  backgroundImage: string;
  videoSource: string;
  title: string;
  subtitle: string;
  isHome: boolean;
}

const Hero: React.FC<HeroProps> = ({ backgroundImage, videoSource, title, subtitle, isHome }) => {
  const [isMuted, setIsMuted] = useState(true);
  const [showPermissionDialog, setShowPermissionDialog] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const enableAudio = async () => {
    try {
      // Create a temporary audio context to request permission
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      await audioContext.resume();

      if (videoRef.current) {
        videoRef.current.muted = false;
        setIsMuted(false);
      }
      setShowPermissionDialog(false);
    } catch (error) {
      console.log('Audio permission denied or error occurred');
    }
  };

  useEffect(() => {
    if (isHome) {
      setShowPermissionDialog(true);
    }
  }, [isHome]);

  return (
    <>
      <Head>
        {isHome && (
          <link
            rel="preload"
            href={videoSource}
            as="video"
            type="video/mp4"
          />
        )}
      </Head>
      <section className="relative w-full h-screen overflow-hidden">
        {isHome ? (
          <>
            <video
              ref={videoRef}
              autoPlay
              loop
              playsInline
              muted={isMuted}
              preload="auto"
              className="absolute top-0 left-0 w-full h-full object-cover"
              style={{ pointerEvents: 'none' }}
            >
              <source src={videoSource} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {showPermissionDialog && (
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20 bg-black/80 text-white p-4 rounded-lg shadow-lg">
                <p className="mb-3">Would you like to enable sound for this video?</p>
                <div className="flex justify-center gap-3">
                  <button
                    onClick={enableAudio}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
                  >
                    Enable Sound
                  </button>
                  <button
                    onClick={() => setShowPermissionDialog(false)}
                    className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded"
                  >
                    Keep Muted
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="absolute top-0 left-0 w-full h-full">
            <Image
              src={backgroundImage}
              alt="Background"
              fill
              style={{ objectFit: "cover", objectPosition: "center" }}
              quality={100}
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-csm-navy via-csm-navy/50 to-csm-navy/10" />
          </div>
        )}
        <div className="relative z-10 flex flex-col justify-center items-center h-full text-white px-4">
          <div className="max-sm:mb-52">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center [text-shadow:5px_5px_8px_rgba(0,0,0,0.5)]">
              {title}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-center [text-shadow:5px_5px_8px_rgba(0,0,0,0.5)]">
              {subtitle}
            </p>

            {isHome && (
              <div className="flex justify-center items-center w-full">
                <JetInsightComponent />
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;