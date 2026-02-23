"use client";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  CheckCircle,
  Clock,
  MessageSquare,
  Shield,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import MaintenanceImage from "../../../public/images/image_jetcenter_maintenance_014.jpeg";

const Maintenance = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/company/contact");
  };

  const JetInsightComponent = dynamic(
    () => import("../components/JetInsight/JetInsightComponent2"),
    {
      ssr: false,
    }
  );

  return (
    <div className="overflow-hidden w-full">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url(/images/maintimage.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-csm-navy/40 via-csm-navy/60 to-csm-navy/80"></div>
        </div>

        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight"
          >
            AIRCRAFT MAINTENANCE
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl mb-8 text-white/80 font-semibold"
          >
            Fresno - Madera - Visalia
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <button
              onClick={handleClick}
              className="group relative px-8 py-4 bg-gradient-to-r from-csm-blue to-csm-deep hover:from-csm-deep hover:to-csm-navy text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span className="flex items-center gap-3">
                MAINTENANCE INQUIRY
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 md:py-28 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-14 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-csm-navy leading-tight mb-4">
              Excellence in Aviation Maintenance
            </h2>
            <p className="text-base md:text-lg text-neutral-500 font-normal max-w-3xl mx-auto">
              CSM Aviation & Maintenance Center specializes in aircraft
              management and Part 135 operations. Our maintenance operations
              are provided by our partner organization Medina Air Center.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {[
              { icon: Shield, title: "FAA Part 145", subtitle: "Certified Station" },
              { icon: CheckCircle, title: "ISO 9001", subtitle: "Quality Assured" },
              { icon: Shield, title: "Safety First", subtitle: "Zero Incidents" },
              { icon: Clock, title: "24/7 Support", subtitle: "Always Available" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center space-y-4"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <item.icon className="h-6 w-6 sm:h-8 sm:w-8 text-csm-blue" />
                </div>
                <div>
                  <div className="text-base sm:text-lg font-semibold text-csm-navy">
                    {item.title}
                  </div>
                  <div className="text-sm text-neutral-500">
                    {item.subtitle}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 md:py-28 lg:py-32 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-14 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-csm-navy">
              Services
            </h2>
            <p className="text-base md:text-lg text-neutral-500 font-normal mt-3 max-w-2xl mx-auto">
              Comprehensive maintenance solutions delivered with precision
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                icon: Wrench,
                title: "Scheduled Maintenance",
                description: "Comprehensive maintenance programs ensuring optimal performance and regulatory compliance.",
                features: ["A, B, C, D Check Inspections", "Engine Overhauls", "Component Replacement"]
              },
              {
                icon: Clock,
                title: "AOG Support",
                description: "Rapid response services to minimize downtime and restore operations efficiently.",
                features: ["Emergency Repairs", "Mobile Service Units", "Parts Sourcing"]
              },
              {
                icon: Shield,
                title: "Premium Detailing",
                description: "Meticulous aircraft detailing services to maintain pristine appearance and protection.",
                features: ["Interior Deep Cleaning", "Exterior Wash & Protection", "Paint Preservation"]
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
              >
                <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white rounded-2xl h-full">
                  <CardContent className="p-6 sm:p-8 text-center h-full flex flex-col">
                    <div className="w-16 h-16 bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:from-csm-navy group-hover:to-csm-deep transition-all duration-300">
                      <service.icon className="h-7 w-7 text-csm-blue group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-semibold text-csm-navy mb-4">
                      {service.title}
                    </h3>
                    <p className="text-neutral-500 leading-relaxed mb-6 flex-grow">
                      {service.description}
                    </p>
                    <ul className="space-y-2 text-sm text-neutral-500">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center justify-center">
                          <CheckCircle className="h-4 w-4 text-csm-gold mr-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Maintenance Section */}
      <section className="relative py-20 md:py-28 lg:py-32 bg-gradient-to-br from-csm-navy via-csm-deep to-csm-navy">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-csm-navy/20 to-csm-navy/40"></div>
        <div className="relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
            <Image
              src={MaintenanceImage}
              alt="Maintenance Image"
              className="w-full rounded-2xl shadow-2xl"
            />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center space-y-8 sm:space-y-12">
              <div className="space-y-6 sm:space-y-8">
                <Badge className="bg-white/90 text-csm-navy border-white/20 px-4 sm:px-6 py-2 text-sm hover:bg-white">
                  FAA Certified Part 145 Repair Station
                </Badge>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight tracking-tight">
                  Aircraft
                  <br />
                  <span className="font-semibold bg-gradient-to-r from-white to-csm-gold bg-clip-text text-transparent">
                    Maintenance
                  </span>
                </h2>
                <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
                  Madera Jet Center provides precision engineered services for
                  discerning aviation professionals
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
                <Link href="https://www.maderajetcenter.com" target="_blank">
                  <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-white to-neutral-100 text-csm-navy hover:from-neutral-100 hover:to-neutral-200 font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    Schedule Service
                  </button>
                </Link>
              </div>

              {/* <div className="grid grid-cols-3 gap-8 sm:gap-12 pt-8 sm:pt-10 max-w-2xl mx-auto">
                {[
                  { number: "25+", label: "Years" },
                  { number: "500+", label: "Aircraft" },
                  { number: "24/7", label: "Support" }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl sm:text-4xl font-bold text-white mb-2">
                      {stat.number}
                    </div>
                    <div className="text-csm-gold text-xs sm:text-sm uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* Detailing Section */}
      <section className="py-20 md:py-28 lg:py-32 bg-gradient-to-br from-csm-deep via-csm-navy to-csm-deep">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8 sm:space-y-12">
            <div className="space-y-6 sm:space-y-8">
              <Badge className="bg-white/90 text-csm-navy border-white/20 px-4 sm:px-6 py-2 text-sm hover:bg-white">
                Professional Aircraft Detailing
              </Badge>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight tracking-tight">
                Aircraft
                <br />
                <span className="bg-gradient-to-r from-white to-csm-gold bg-clip-text text-transparent">
                  Detailing
                </span>
              </h2>
              <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
                Bravo Zulu provides precision engineered services for discerning
                aviation professionals
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <Link href="https://www.mybravozulu.com/" target="_blank">
                <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-white to-neutral-100 text-csm-navy hover:from-neutral-100 hover:to-neutral-200 font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  Schedule Service
                </button>
              </Link>
            </div>

            {/* <div className="grid grid-cols-3 gap-8 sm:gap-12 pt-8 sm:pt-10 max-w-2xl mx-auto">
              {[
                { number: "25+", label: "Years" },
                { number: "500+", label: "Aircraft" },
                { number: "24/7", label: "Support" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-csm-gold text-xs sm:text-sm uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div> */}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 md:py-28 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-csm-blue to-csm-deep rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageSquare className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-csm-navy mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-base md:text-lg text-neutral-500 mb-10">
                Discover our exceptional approach to aircraft maintenance, where we
                provide superior safety standards, outstanding service, and much
                more value for you, aviation pros.
              </p>
              <div className="flex justify-center">
                <button
                  onClick={handleClick}
                  className="group px-8 py-4 bg-gradient-to-r from-csm-blue to-csm-deep hover:from-csm-deep hover:to-csm-navy text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <span className="flex items-center gap-3">
                    MAINTENANCE INQUIRY
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Maintenance;
