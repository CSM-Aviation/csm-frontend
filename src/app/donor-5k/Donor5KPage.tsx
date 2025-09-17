"use client";
import React from 'react';
import Image from 'next/image';
import Head from 'next/head';

const Donor5KPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <Head>
        <title>Stride For Hope</title>
        <meta property="og:title" content="Stride For Hope Run/Walk" />
        <meta property="og:description" content="Register or support a team for the 2nd Annual Donor Network West Foundation Run/Walk." />
        <meta property="og:image" content="/images/header1_stride.png" />
        <meta property="og:url" content="https://csmaviation.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="/images/header1_stride.png" />
      </Head>

      <div className="w-full max-w-4xl bg-white shadow-md my-8">
        <div className="relative w-full h-auto">
          <Image
            src="/images/header1_stride.png"
            alt="Stride For Hope Run/Walk 2025"
            width={800}
            height={400}
            className="w-full h-auto"
            priority
          />
        </div>
        <div className="relative w-full h-auto">
          <Image
            src="/images/header2_stride.png"
            alt="Event Details and Teams"
            width={800}
            height={400}
            className="w-full h-auto"
            priority
          />
        </div>
      </div>

      <div className="w-full max-w-4xl flex flex-col items-center gap-6 p-6 bg-white shadow-md mb-8">
        <div className="flex flex-wrap justify-center gap-6 w-full">
          <a 
            href="https://raceroster.com/events/2025/101600/2nd-annual-donor-network-west-foundation-runwalk/pledge/team?id=15&locale=en" 
            className="bg-[#e91e63] hover:bg-[#ad1457] text-white font-bold py-4 px-8 rounded-full text-center min-w-[200px] transition-colors duration-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            Support Team Dr. Julie!
          </a>
          
          <a 
            href="https://raceroster.com/events/2025/101600/2nd-annual-donor-network-west-foundation-runwalk/pledge/team?id=14&locale=en" 
            className="bg-[#ff9800] hover:bg-[#fb8c00] text-white font-bold py-4 px-8 rounded-full text-center min-w-[200px] transition-colors duration-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            Support Team Zeke!
          </a>
        </div>
        
        <a 
          href="https://raceroster.com/events/2025/101600/2nd-annual-donor-network-west-foundation-runwalk" 
          className="bg-[#2196f3] hover:bg-[#1976d2] text-white font-bold py-4 px-8 rounded-full text-center min-w-[200px] transition-colors duration-300"
          target="_blank"
          rel="noopener noreferrer"
        >
          Register to Run/Walk
        </a>
      </div>

      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        }
        
        @media (max-width: 600px) {
          .w-full {
            padding: 0 1rem;
          }
          
          .max-w-4xl {
            max-width: 100%;
          }
          
          .flex-wrap {
            flex-direction: column;
            align-items: center;
          }
          
          a {
            width: 100%;
            margin-bottom: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Donor5KPage;