import React from 'react';
import { NextPage } from 'next';
import Hero from '@/app/components/Hero';
import AboutBody from './AboutBody';

const AboutPage: NextPage = () => {
  return (

    <>
      <Hero
        backgroundImage="/images/about_us.jpg"
        videoSource="/videos/Home1.mp4"
        title="About US"
        subtitle="Experience luxury air travel like never before"
        isHome={false}
      />

      <AboutBody />
      {/* <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Dedicated People Dedicated to Private Aviation</h1>
        <p>CSM started in private aviation in 2008 with our roots in Aircraft Maintenance and MRO services to aircraft owners in the Central Valley of California.  With the success of the Maintenance operations, Managing Aircraft for local valley farmers and executives followed suit.  Ownership and leadership offering twenty years of Commerical flying experience and thirty years of FAA regulatory experience ultimately led to CSM Aviation operating as a Part 135 Air Charter provider in 2013.  Our focus stays true; provide exceptional and reliable Private Charter and Flight Department services on the backbone of Safety and Maintenance protocols.  </p>
      </div> */}
      <div className="h-20"></div>
    </>
  );
};

export default AboutPage;