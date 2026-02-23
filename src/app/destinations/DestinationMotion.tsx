"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Clock, Globe, Star } from "lucide-react";
import JetInsightComponent from "../components/JetInsight/JetInsightComponent2";
import PopularDestinations from "../components/PopularDestinations";

const features = [
  {
    icon: Clock,
    title: "24/7 Availability",
    description:
      "Ready to serve you anytime, anywhere with our round-the-clock charter services",
  },
  {
    icon: Globe,
    title: "Global Coverage",
    description:
      "Access to destinations worldwide with our extensive network of luxury aircraft",
  },
  {
    icon: Star,
    title: "Premium Service",
    description:
      "Tailored luxury experiences with dedicated concierge support",
  },
];

const DestinationMotion = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/company/contact");
  };

  return (
    <div className="overflow-x-hidden w-full">
      {/* Hero Section */}
      <div className="relative h-[85vh] md:h-screen w-full">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/goldengate.jpg"
            fill
            style={{ objectFit: "cover" }}
            alt="Luxury private jet charter"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-csm-navy via-csm-navy/50 to-csm-navy/10" />
        </div>

        <div className="relative z-10 flex flex-col justify-center items-center text-center px-4 h-full">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 max-w-4xl"
          >
            WORLDWIDE LUXURY JET CHARTER
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl lg:text-2xl text-white/80 max-w-2xl text-center mb-8"
          >
            Experience unparalleled luxury with CSM Aviation&apos;s 24/7 on-demand private jet charter services
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center items-center w-full"
          >
            <JetInsightComponent />
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-20 md:py-28 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-csm-navy">
              Why Fly With CSM
            </h2>
            <p className="text-base md:text-lg text-neutral-500 font-normal text-center mt-3 mb-14 md:mb-16">
              Unmatched service, worldwide
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="text-center p-6 md:p-8 rounded-2xl shadow-md bg-white hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-14 h-14 bg-csm-navy rounded-full flex items-center justify-center mx-auto mb-5">
                  <feature.icon className="w-6 h-6 text-csm-gold" />
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-csm-navy mb-3">
                  {feature.title}
                </h3>
                <p className="text-neutral-500">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations Section */}
      <PopularDestinations />

      {/* Call to Action Section */}
      <section className="py-20 md:py-28 lg:py-32 bg-csm-navy">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Your Journey Begins with CSM Aviation
            </h2>
            <p className="text-base md:text-lg text-white/50 font-normal mb-10">
              From business trips to leisure travel, we provide exceptional private aviation services tailored to your needs
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              onClick={handleClick}
              className="px-8 py-4 bg-gradient-to-r from-csm-blue to-csm-deep text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Request Quote
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default DestinationMotion;
