import React from 'react';
import Image from "next/image";
import Hero from './components/Hero';

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
      <section className="relative h-screen flex items-center justify-center">
        <Image
          src="/images/hero-background.jpg"
          alt="Private Jet"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl font-bold mb-4">Welcome to CSM Aviation</h1>
          <p className="text-xl mb-8">Experience luxury and efficiency in private aviation</p>
          <button className="bg-custom-gold text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-opacity-80 transition duration-300">
            Book Your Flight
          </button>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Charter</h3>
              <p className="text-gray-600">Experience the freedom of private jet travel tailored to your schedule.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Management</h3>
              <p className="text-gray-600">Optimize your aircraft ownership with our comprehensive management services.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Maintenance</h3>
              <p className="text-gray-600">Keep your aircraft in top condition with our expert maintenance team.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-800 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Why Choose CSM Aviation?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Unparalleled Experience</h3>
              <p>With years of expertise in private aviation, we ensure every flight is exceptional.</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Safety First</h3>
              <p>Your safety is our top priority, backed by rigorous standards and certified crew.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Add more sections as needed */}

      {/* This empty div adds extra space before the footer */}
      <div className="h-16"></div>
    </>
  );
}