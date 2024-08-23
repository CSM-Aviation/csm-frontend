import React from 'react';
import Image from 'next/image';

interface HeroProps {
  backgroundImage: string;
  videoSource: string;
  title: string;
  subtitle: string;
  isHome: boolean;
}

const Hero: React.FC<HeroProps> = ({ backgroundImage, videoSource, title, subtitle, isHome }) => {
  return (
    <section className="relative w-screen h-screen overflow-hidden">
      {isHome ? (
        <video autoPlay loop muted className="absolute top-0 left-0 w-full h-full object-cover">
          <source src={videoSource} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <div 
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
          style={{ 
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})` 
          }}
        ></div>
      )}
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-white pt-20">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">{title}</h1>
        <p className="text-xl md:text-2xl mb-8">{subtitle}</p>
        {isHome && (
          <button className="bg-white text-black px-6 py-3 rounded-full font-bold flex items-center justify-center hover:bg-gray-200 transition-colors duration-300">
            <span>SCHEDULE TRIP</span>
            <svg className="ml-2 w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
            </svg>
          </button>
        )}
      </div>
    </section>
  );
};

export default Hero;