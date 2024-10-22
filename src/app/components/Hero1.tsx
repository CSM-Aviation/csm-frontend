import React from 'react';
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
          <video
            autoPlay
            loop
            // muted
            playsInline
            preload="auto"
            className="absolute top-0 left-0 w-full h-full object-cover"
            style={{ pointerEvents: 'none' }}
          >
            <source src={videoSource} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <div className="absolute top-0 left-0 w-full h-full">
            <Image
              src={backgroundImage}
              alt="Background"
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              quality={100}
              priority
            />
            <div className="absolute inset-0 bg-black opacity-50"></div>
          </div>
        )}
        <div className="relative z-10 flex flex-col  justify-center items-center h-full text-white px-4">
          <div className=' max-sm:mb-52'>
            <h1 className="text-4xl md:text-6xl font-bold  mb-4 text-center">{title}</h1>
            <p className="text-xl md:text-2xl mb-8  text-center">{subtitle}</p>

            {isHome && (
              <div className="flex justify-center items-center w-full"> {/* Ensure JetInsight is centered */}
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