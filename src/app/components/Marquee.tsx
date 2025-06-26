"use client";
import React from "react";
import HeroMarquee from "react-fast-marquee";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Marquee = () => {
  return (
    <HeroMarquee autoFill={true} className="p-4">
      <div className="flex items-center">
        <div className="text-[#002449] ml-6 text-3xl md:text-5xl font-bold uppercase h-[60px] flex items-center">
          Let Freedom Sparkle!
        </div>
        <div className="h-[60px] w-[120px] ml-6  scale-[2]">
          <DotLottieReact
            src="https://lottie.host/117fe277-c06a-478e-a7dc-19e9c5ee5833/eLHjrouGlZ.lottie"
            loop
            autoplay
          />
        </div>
        <div className="text-3xl md:text-5xl font-bold uppercase h-[60px] flex items-center ml-6">
          <span className="bg-gradient-to-r from-[#002868] to-[#be0b31] bg-clip-text text-transparent">
            Honoring Liberty, Celebrating America
          </span>
        </div>
        <div className="h-[60px] w-[120px] ml-6  scale-[1.2]">
          <DotLottieReact
            src="https://lottie.host/0522f5bb-1575-49d9-b6cf-a4da4278053d/fYpmpEIHzY.lottie"
            loop
            autoplay
          />
        </div>
      </div>
    </HeroMarquee>
  );
};

export default Marquee;
