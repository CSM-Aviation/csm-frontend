import React from 'react';
import Image from "next/image";
import Hero from './components/Hero';
import ServicesCards from './components/ServiceCard';
import MaintManage from './components/MaintManage';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <Hero
        backgroundImage="/images/hero-background.jpg"
        videoSource="/videos/Home1.mp4"
        title="Welcome to CSM Aviation"
        subtitle="Experience luxury air travel like never before"
        isHome={true}
      />
      <ServicesCards />
      <MaintManage />

      <div className="h-24 bg-white w-full" style={{ backgroundColor: 'white' }}></div>
      {/* This empty div adds extra space before the footer */}
      {/* <div className="h-16" bg-white></div> */}
    </>
  );
}