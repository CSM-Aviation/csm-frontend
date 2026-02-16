"use client";
import React from "react";
import MaintManage from "../components/MaintManage";
import ServicesCards from "../components/ServiceCard";
import PopularDestinations from "../components/PopularDestinations";
import Testimonials from "../components/Testimonials";
import AnimatedCSMVideoText from "../components/Hero";
import FleetPageSec from "../components/FleetPageSec";

export default function HomeBody() {
  const videoSource = "/videos/compressed/CSM_Hero.mp4";

  return (
    <div className="-mt-24 md:-mt-20">
      <AnimatedCSMVideoText videoSource={videoSource} />
      <ServicesCards />
      <FleetPageSec />
      <MaintManage />
      <PopularDestinations />
      {/* <Testimonials /> */}
    </div>
  );
}
