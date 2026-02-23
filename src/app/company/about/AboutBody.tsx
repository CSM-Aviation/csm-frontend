'use client'
import React from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const JetInsightComponent = dynamic(() => import('../../components/JetInsight/JetInsightComponent2'), {
  ssr: false,
});

const coreValues = [
  "People First",
  "Safety is in the Details",
  "Teamwork is the only way to win",
  "Care every step of the way",
  "Find Solutions, do not relay problems",
  "Be proactive, and take initiative",
  "Plan and Prepare, never panic",
  "Make a Difference",
  "Grow Every Day",
];

const AboutUsComponent = () => {
  return (
    <div className="w-full">
      {/* Dedicated People Section */}
      <section className="py-20 md:py-28 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-10">
            <JetInsightComponent />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-csm-navy">
              Dedicated People Dedicated to Private Aviation
            </h2>
            <p className="text-base md:text-lg text-neutral-500 font-normal text-center mt-3 mb-14 md:mb-16">
              Our Story
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto bg-neutral-50 p-8 md:p-10 rounded-2xl shadow-md"
          >
            <p className="text-base md:text-lg text-neutral-600 leading-relaxed">
              CSM started in private aviation in 2008 with our roots in Aircraft Maintenance and MRO services
              to aircraft owners in the Central Valley of California. With the success of the Maintenance
              operations, Managing Aircraft for local valley farmers and executives followed suit. Ownership
              and leadership offering twenty years of Commercial flying experience and thirty years of FAA
              regulatory experience ultimately led to CSM Aviation operating as a Part 135 Air Charter
              provider in 2013. Our focus stays true; provide exceptional and reliable Private Charter and
              Flight Department services on the backbone of Safety and Maintenance protocols.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CSM Core Values Section */}
      <section className="py-20 md:py-28 lg:py-32 bg-csm-navy overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-14 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              CSM Core Values
            </h2>
            <p className="text-base md:text-lg text-white/50 font-normal mt-3">
              The client is why we exist.
            </p>
          </motion.div>

          <div className="flex flex-col-reverse md:flex-row items-center gap-10 md:gap-16">
            {/* Left side - Core Values */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="md:w-1/2"
            >
              <ul className="space-y-4">
                {coreValues.map((value, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 text-base sm:text-lg text-white/90"
                  >
                    <CheckCircle className="w-5 h-5 text-csm-gold flex-shrink-0" />
                    <span>{value}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Right side - Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="w-full md:w-1/2"
            >
              <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/aboutlatest.png"
                  alt="CSM Aviation Team"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsComponent;
