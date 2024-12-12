"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import JetInsightComponent from "../components/JetInsight/JetInsightComponent2";

const DestinationMotion = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/company/contact");
  };

  return (
    <div className="overflow-x-hidden w-full">
      {/* Hero Section */}
      <div className="relative h-screen w-full">
        {/* Background Image */}
        <div className="absolute inset-0 z-[-1]">
          <Image
            src="/images/goldengate.jpg"
            layout="fill"
            objectFit="cover"
            alt="Luxury private jet charter"
            priority
            className="transition-opacity duration-300"
          />
        </div>

        {/* Overlay Content */}
        <div className="absolute inset-0 bg-black bg-opacity-20 flex flex-col justify-center items-center text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4 max-w-4xl text-center [text-shadow:5px_5px_8px_rgba(0,0,0,0.5)]"
          >
            WORLDWIDE LUXURY JET CHARTER
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-white max-w-2xl text-center mb-8 [text-shadow:5px_5px_8px_rgba(0,0,0,0.5)]"
          >
            Experience unparalleled luxury with CSM Aviation's 24/7 on-demand private jet charter services
          </motion.p>
          <div className="flex justify-center items-center w-full">
            <JetInsightComponent />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center p-6"
          >
            <h3 className="text-2xl text-[#004080] font-bold mb-4">24/7 Availability</h3>
            <p className="text-gray-400">
              Ready to serve you anytime, anywhere with our round-the-clock charter services
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center p-6"
          >
            <h3 className="text-2xl  text-[#004080] font-bold mb-4">Global Coverage</h3>
            <p className="text-gray-400">
              Access to destinations worldwide with our extensive network of luxury aircraft
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center p-6"
          >
            <h3 className="text-2xl text-[#004080] font-bold mb-4">Premium Service</h3>
            <p className="text-gray-400">
              Tailored luxury experiences with dedicated concierge support
            </p>
          </motion.div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-gray-900 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Your Journey Begins with CSM Aviation
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg mb-8"
          >
            From business trips to leisure travel, we provide exceptional private aviation services tailored to your needs
          </motion.p>
          <motion.button
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            onClick={handleClick}
            className="bg-electric-blue text-black px-8 py-3 rounded-xl font-semibold hover:bg-white transition"
          >
            Request Quote
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default DestinationMotion;
