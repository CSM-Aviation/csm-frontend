"use client";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Award,
  CheckCircle,
  Clock,
  Cog,
  MessageSquare,
  Settings,
  Shield,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
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

  const certifications = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: "FAA Part 145",
      description: "Certified Repair Station",
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Quality Assurance",
      description: "ISO 9001:2015 Certified",
    },
    {
      icon: <CheckCircle className="h-8 w-8" />,
      title: "Safety First",
      description: "Zero Incident Record",
    },
  ];

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
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/60 to-slate-900/80"></div>
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
            className="text-lg sm:text-xl md:text-2xl mb-8 text-white font-semibold"
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
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
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
      <section id="about" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white to-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-slate-900 leading-tight mb-6">
                Excellence in Aviation
                <br />
                Maintenance
              </h2>
              <p className="text-lg sm:text-xl text-slate-600 font-light leading-relaxed max-w-3xl mx-auto">
                CSM Aviation & Maintenance Center specializes in aircraft
                management and Part 135 operations. Our maintenance operations
                are provided by our partner organization Medina Air Center.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
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
                  className="text-center space-y-4"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mx-auto shadow-lg">
                    <item.icon className="h-6 w-6 sm:h-8 sm:w-8 text-slate-700" />
                  </div>
                  <div>
                    <div className="text-base sm:text-lg font-medium text-slate-900">
                      {item.title}
                    </div>
                    <div className="text-sm text-slate-500 font-light">
                      {item.subtitle}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-slate-900 mb-6">
              Services
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 font-light max-w-2xl mx-auto">
              Comprehensive maintenance solutions delivered with precision
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white h-full">
                  <CardContent className="p-6 sm:p-8 text-center h-full flex flex-col">
                    <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:from-slate-900 group-hover:to-slate-800 transition-all duration-300">
                      <service.icon className="h-7 w-7 text-slate-700 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-light text-slate-900 mb-4">
                      {service.title}
                    </h3>
                    <p className="text-slate-600 font-light leading-relaxed mb-6 flex-grow">
                      {service.description}
                    </p>
                    <ul className="space-y-2 text-sm text-slate-600 font-light">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center justify-center">
                          <CheckCircle className="h-4 w-4 text-slate-400 mr-2 flex-shrink-0" />
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
      <section className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-red-900 via-red-800 to-red-900">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-900/20 to-red-900/40"></div>
        <div className="relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-10">
            <Image
              src={MaintenanceImage}
              alt="Maintenance Image"
              className="w-full rounded-lg shadow-2xl"
            />
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center space-y-8 sm:space-y-12">
              <div className="space-y-6 sm:space-y-8">
                <Badge className="bg-white/90 text-slate-700 border-white/20 px-4 sm:px-6 py-2 text-sm font-light hover:bg-white">
                  FAA Certified Part 145 Repair Station
                </Badge>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light text-white leading-tight tracking-tight">
                  Aircraft
                  <br />
                  <span className="font-semibold bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
                    Maintenance
                  </span>
                </h1>
                <p className="text-lg sm:text-xl text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
                  Madera Jet Center provides precision engineered services for
                  discerning aviation professionals
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
                <Link href="https://www.maderajetcenter.com" target="_blank">
                  <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-white to-slate-100 text-slate-900 hover:from-slate-100 hover:to-slate-200 font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    Schedule Service
                  </button>
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-8 sm:gap-12 pt-8 sm:pt-10 max-w-2xl mx-auto">
                {[
                  { number: "25+", label: "Years" },
                  { number: "500+", label: "Aircraft" },
                  { number: "24/7", label: "Support" }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl sm:text-4xl font-extralight text-white mb-2">
                      {stat.number}
                    </div>
                    <div className="text-slate-300 text-xs sm:text-sm font-light uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailing Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8 sm:space-y-12">
            <div className="space-y-6 sm:space-y-8">
              <Badge className="bg-white/90 text-slate-700 border-white/20 px-4 sm:px-6 py-2 text-sm font-light hover:bg-white">
                FAA Certified Part 145 Repair Station
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extralight text-white leading-tight tracking-tight">
                Aircraft
                <br />
                <span className="font-light bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                  Detailing
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-400 font-light max-w-2xl mx-auto leading-relaxed">
                Bravo Zulu provides precision engineered services for discerning
                aviation professionals
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <Link href="https://www.mybravozulu.com/" target="_blank">
                <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-white to-slate-100 text-slate-900 hover:from-slate-100 hover:to-slate-200 font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  Schedule Service
                </button>
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-8 sm:gap-12 pt-8 sm:pt-10 max-w-2xl mx-auto">
              {[
                { number: "25+", label: "Years" },
                { number: "500+", label: "Aircraft" },
                { number: "24/7", label: "Support" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl sm:text-4xl font-extralight text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-slate-400 text-xs sm:text-sm font-light uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <MessageSquare className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-slate-900 mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 mb-8 font-light leading-relaxed">
              Discover our exceptional approach to aircraft management, where we
              provide superior safety standards, outstanding service, and much
              more value for you, aviation pros.
            </p>
            <div className="flex justify-center">
              <button
                onClick={handleClick}
                className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <span className="flex items-center gap-3">
                  MAINTENANCE INQUIRY 
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Maintenance;