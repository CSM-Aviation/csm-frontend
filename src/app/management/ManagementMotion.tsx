// src/components/ManagementMotion.tsx
"use client";
import dynamic from 'next/dynamic';
import { motion } from "framer-motion";
import Image from 'next/image';
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

const JetInsightComponent = dynamic(() => import('../components/JetInsight/JetInsightComponent2'), {
  ssr: false,
});

const managementBenefits = [
  {
    title: "Charter Revenue Potential",
    description:
      "Every hour that your jet spends on the ground it could be generating revenue. If your aircraft is less than fully utilized, we may be able to offer you more charter opportunities, because our demand is greater!",
    image: "/images/revenue.jpg",
    alt: "Private jet in hangar",
  },
  {
    title: "Exclusive Cost Efficiencies",
    description:
      "Fuel discounts, alone, can save the owner of a midsize aircraft $20,000 to $25,000 per year. We also monitor the maintenance needs of your aircraft so maintenance and repairs are done on time and in the most cost effective manner.",
    image: "/images/cost.jpg",
    alt: "Private jet charter",
    reverse: true,
  },
];

const darkBenefits = [
  {
    title: "Personal Approach",
    description:
      "Our clients work with a single point of contact, with a dedicated customer service specialist available 24/7. Our team also includes technical experts from fleet maintenance, operations and accounting -- all working in unison with your interests in mind.",
    image: "/images/client.jpg",
    alt: "Aircraft management",
  },
  {
    title: "Your Asset Maintained at Peak Level",
    description:
      "Under our management program, your aircraft will be maintained to its utmost, peak performance level. All aircraft must pass annual, safety audits by our professional and accredited mechanics so you will be confident that your aircraft is always flying at its peak performance level.",
    image: "/images/img.jpg",
    alt: "Aircraft maintenance",
    reverse: true,
  },
];

const ManagementMotion = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push('/company/contact');
  };

  return (
    <div className="overflow-x-hidden w-full">
      {/* Hero Section */}
      <div className="relative h-[85vh] md:h-screen w-full">
        {/* Responsive Image Handling */}
        <div className="absolute inset-0">
          {/* Desktop Image */}
          <div className="hidden md:block w-full h-full">
            <Image
              src="/images/private_desktop.jpg"
              fill
              style={{ objectFit: "cover" }}
              alt="Aircraft management services"
              priority
            />
          </div>

          {/* Mobile Image */}
          <div className="block md:hidden w-full h-full">
            <Image
              src="/images/private_mobile.jpg"
              fill
              style={{ objectFit: "cover" }}
              alt="Aircraft management services"
              priority
            />
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-csm-navy via-csm-navy/50 to-csm-navy/10" />

        <div className="relative z-10 flex flex-col justify-center items-center text-center px-4 h-full">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 max-w-4xl"
          >
            AIRCRAFT MANAGEMENT SERVICES
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl lg:text-2xl text-white/80 max-w-2xl text-center"
          >
            Creating and curating an unmatched aircraft ownership experience every day.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            onClick={handleClick}
            className="mt-8 px-8 py-4 bg-gradient-to-r from-csm-blue to-csm-deep text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            MANAGEMENT INQUIRY
          </motion.button>
        </div>
      </div>

      {/* Benefits - Light Background */}
      <section className="py-20 md:py-28 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-csm-navy">
              Why Choose CSM Management
            </h2>
            <p className="text-base md:text-lg text-neutral-500 font-normal text-center mt-3 mb-14 md:mb-16">
              Complete aircraft ownership solutions
            </p>
          </motion.div>

          <div className="space-y-16 md:space-y-20">
            {managementBenefits.map((benefit, index) => (
              <div
                key={index}
                className={`flex flex-col ${benefit.reverse ? "md:flex-row-reverse" : "md:flex-row"} gap-8 lg:gap-12 items-center`}
              >
                <motion.div
                  initial={{ opacity: 0, x: benefit.reverse ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="md:w-1/2"
                >
                  <h3 className="text-2xl sm:text-3xl font-bold text-csm-navy mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-neutral-500 leading-relaxed">
                    {benefit.description}
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: benefit.reverse ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  viewport={{ once: true }}
                  className="md:w-1/2 flex justify-center items-center"
                >
                  <div className="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                    <Image
                      src={benefit.image}
                      fill
                      style={{ objectFit: "cover" }}
                      alt={benefit.alt}
                    />
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits - Dark Background */}
      <section className="py-20 md:py-28 lg:py-32 bg-csm-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16 md:space-y-20">
            {darkBenefits.map((benefit, index) => (
              <div
                key={index}
                className={`flex flex-col ${benefit.reverse ? "md:flex-row-reverse" : "md:flex-row"} gap-8 lg:gap-12 items-center`}
              >
                <motion.div
                  initial={{ opacity: 0, x: benefit.reverse ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="md:w-1/2"
                >
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    {benefit.description}
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: benefit.reverse ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  viewport={{ once: true }}
                  className="md:w-1/2 flex justify-center items-center"
                >
                  <div className="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                    <Image
                      src={benefit.image}
                      fill
                      style={{ objectFit: "cover" }}
                      alt={benefit.alt}
                    />
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 md:py-28 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-csm-navy">
              Ready to Get Started?
            </h2>
            <p className="text-base md:text-lg text-neutral-500 font-normal text-center mt-3 mb-10">
              Discover our exceptional approach to aircraft management
            </p>
            <button
              onClick={handleClick}
              className="group px-8 py-4 bg-gradient-to-r from-csm-blue to-csm-deep hover:from-csm-deep hover:to-csm-navy text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span className="flex items-center gap-3">
                MANAGEMENT INQUIRY
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ManagementMotion;
