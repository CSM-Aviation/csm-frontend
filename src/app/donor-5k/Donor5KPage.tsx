"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Donor5KPage = () => {
  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Team members data - Replace with actual data
  const teamMembers = [
    {
      name: "Team Julie",
      image: "/images/IMG_7921.png", // Replace with actual image path
      description: "Supporting this cause means everything to our team. Every donation helps save lives.",
      donationLink: "https://raceroster.com/events/2025/101600/2nd-annual-donor-network-west-foundation-runwalk/pledge/team?id=15&locale=en" // Replace with actual donation link
    },
    {
      name: "Team Zeke", 
      image: "/images/zeke.jpg", // Replace with actual image path
      description: "Every step we take brings hope to families waiting for life-saving donations.",
      donationLink: "https://raceroster.com/events/2025/101600/2nd-annual-donor-network-west-foundation-runwalk/pledge/team?id=14&locale=en" // Replace with actual donation link
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/thumbnail_Image(2).png" // Replace with your actual hero image path
            alt="Donor Network West 5K Run/Walk"
            height={1080}
            width={1920}
            className="object-cover object-center"
            priority
          />
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white px-6 max-w-5xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              Donor Network West
              <span className="block text-3xl md:text-5xl lg:text-6xl text-blue-400 mt-2">
                5K Run/Walk
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl lg:text-2xl mb-8 font-light max-w-3xl mx-auto"
            >
              Join CSM Aviation in supporting this life-saving cause and making a difference in our community
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <Link
                href="https://www.donornetworkwest.org/get-involved/events/5k-run-walk/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-[#002449] text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                onClick={() => {
                  window.dataLayer = window.dataLayer || [];
                  window.dataLayer.push({
                    event: 'donor_5k_register_click',
                    category: 'engagement',
                    label: 'hero_section',
                  });
                }}
              >
                Register for Event
              </Link>
              
              <Link
                href="#donate"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300"
              >
                Make a Donation
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        {/* <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
          </div>
        </motion.div> */}
      </section>

      {/* Team Photos and Donation Section */}
      <section id="donate" className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
            >
              Support Our Team
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Help us reach our fundraising goal by supporting our team members. Every donation makes a difference in saving lives.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
          >
            {teamMembers.map((member, index) => (
              <motion.div 
                key={index}
                variants={fadeInUp} 
                className="bg-gray-50 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                 {/* Twitter style with rounded corners and overlay for low res images */}
                <div className="aspect-square relative overflow-hidden rounded-[66px]">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    quality={20}
                  />
                  {/* Subtle overlay to improve low-res image appearance */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                </div>
                <div className="p-6">
                   {/* Increase font size */}
                  <h3 className="text-5xl font-semibold mb-3 text-gray-900 text-center">{member.name}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{member.description}</p>
                  <Link
                    href={member.donationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-blue-600 hover:bg-[#002449] text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 text-center block transform hover:scale-105"
                    onClick={() => {
                      window.dataLayer = window.dataLayer || [];
                      window.dataLayer.push({
                        event: 'donor_5k_donation_click',
                        category: 'conversion',
                        label: member.name.toLowerCase().replace(/\s+/g, '_'),
                      });
                    }}
                  >
                    Donate Now
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About the Event Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
            >
              About the Event
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
            >
              The Donor Network West 5K Run/Walk is an annual event dedicated to honoring organ, eye, and tissue donors 
              and their families while raising awareness about the importance of donation. CSM Aviation is proud to support 
              this life-saving mission and help bring our community together for such an important cause.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div variants={fadeInUp} className="text-center bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Life-Saving Mission</h3>
              <p className="text-gray-600">Supporting organ, eye, and tissue donation to save and enhance lives across our communities.</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="text-center bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Community Unity</h3>
              <p className="text-gray-600">Bringing together families, survivors, and supporters in a celebration of life and hope.</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="text-center bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Awareness Building</h3>
              <p className="text-gray-600">Educating the public about the critical need for organ donation and registration.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Event Details Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Event Details</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Date & Time</h3>
                    <p className="text-gray-600">September 20, 2025 at 8:00 AM</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Location</h3>
                    {/* Add link to https://maps.app.goo.gl/bTLp3xRpPcXxLCa87?g_st=ipc */}
                    <p className="text-gray-600">
                        <a href="https://maps.app.goo.gl/bTLp3xRpPcXxLCa87?g_st=ipc" target="_blank" rel="noopener noreferrer">
                            Woodward Park, CA, Fresno
                        </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Registration</h3>
                    <p className="text-gray-600">Open to all ages and fitness levels. Walk or run - every step makes a difference!</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Increrase height of image */}

            <motion.div variants={fadeInUp} className="relative">
              <div className=" bg-gray-200 rounded-lg overflow-hidden">
                {/* Replace with actual event photo or map */}
                <Image
                  src="/images/thumbnail_Image(2).png" // Replace with actual event image
                  alt="5K Event Photo"
                  width={1000}
                  height={1000}
                  className="object-cover"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-[#002449] text-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
            >
              Join Us in Making a Difference
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-lg md:text-xl mb-8 opacity-90 max-w-3xl mx-auto"
            >
              Whether you participate in the 5K, make a donation, or simply spread awareness, 
              every action helps save lives through organ donation. Together, we can make an impact.
            </motion.p>
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <Link
                href="https://www.donornetworkwest.org/get-involved/events/5k-run-walk/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105"
                onClick={() => {
                  window.dataLayer = window.dataLayer || [];
                  window.dataLayer.push({
                    event: 'donor_5k_register_click',
                    category: 'engagement',
                    label: 'cta_section',
                  });
                }}
              >
                Register for the 5K
              </Link>
              <Link
                href="https://www.donornetworkwest.org/about-donation/become-a-donor/"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300"
              >
                Learn About Donation
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Donor5KPage;