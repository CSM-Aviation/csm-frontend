import React from 'react';
import Image from 'next/image';
import Head from 'next/head';
import JetInsightComponent from './JetInsight/JetInsightComponent3';

interface HeroProps {
  desktopImage?: string;
  mobileImage?: string;
  videoSource?: string;
  title: string;
  subtitle: string;
  isHome: boolean;
  showJetInsight?: boolean;
}

const Hero: React.FC<HeroProps> = ({
  desktopImage,
  mobileImage,
  videoSource,
  title,
  subtitle,
  isHome,
  showJetInsight = false
}) => {
  return (
    <>
      <Head>
        {isHome && videoSource && (
          <link
            rel="preload"
            href={videoSource}
            as="video"
            type="video/mp4"
          />
        )}
      </Head>
      <section className="relative w-full h-screen overflow-hidden">
        {videoSource ? (
          <>
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="absolute top-0 left-0 w-full h-full object-cover"
              style={{ pointerEvents: 'none' }}
            >
              <source src={videoSource} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {/* Subtle video overlay to hide granulation */}
            <div 
              className="absolute top-0 left-0 w-full h-full pointer-events-none"
              style={{ 
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.3))',
                mixBlendMode: 'overlay'
              }}
            ></div>
          </>
        ) : (
          <div className="absolute top-0 left-0 w-full h-full">
            {/* Desktop Image */}
            <div className="hidden md:block w-full h-full">
              <Image
                src={desktopImage || '/images/default-desktop.jpg'}
                alt="Background"
                layout="fill"
                // objectFit="cover"
                objectPosition="center"
                quality={85}
                priority
                className="transition-opacity duration-300"
              />
            </div>

            {/* Mobile Image */}
            <div className="block md:hidden w-full h-full">
              <Image
                src={mobileImage || '/images/default-mobile.jpg'}
                alt="Background"
                layout="fill"
                // objectFit="cover"
                objectPosition="center"
                quality={85}
                priority
                className="transition-opacity duration-300"
              />
            </div>
            <div className="absolute inset-0 bg-black opacity-10"></div>
          </div>
        )}

        <div className="relative z-20 flex flex-col justify-center items-center h-full text-white px-4">
          <div className="max-sm:mb-52">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center [text-shadow:5px_5px_8px_rgba(0,0,0,0.5)]">
              {title}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-center [text-shadow:5px_5px_8px_rgba(0,0,0,0.5)]">
              {subtitle}
            </p>

            {showJetInsight && (
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