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
import MaintenanceImage from "../../../public/images/image_jetcenter_maintenance_014 (2).jpeg";
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
          <div className="absolute inset-0 bg-slate-900/30"></div>
        </div>

        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            AIRCRAFT MAINTENANCE
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white font-bold">
            Fresno - Madera - Visalia
          </p>
          <button
            onClick={handleClick}
            className={`shiny-button px-6 py-4 max-sm:p-3 max-sm:rounded-md text-white`}
          >
            <span className="flex gap-2 justify-between items-center">
              MAINTENANCE INQUIRY <ArrowRight className="h-5 w-5" />
            </span>
          </button>
        </div>

        {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div> */}
      </section>

      <section id="about" className="py-24 bg-white">
        <div className="container mx-auto px-8">
          <div className="max-w-4xl mx-auto text-center space-y-16">
            <div className="space-y-8">
              {/* <Badge className="bg-slate-50 text-slate-700 border-slate-200 px-6 py-2 text-sm font-light">
                Since 1999
              </Badge> */}
              <h2 className="text-4xl font-light text-slate-900 leading-tight">
                Excellence in Aviation
                <br />
                Maintenance
              </h2>
              <p className="text-xl text-slate-500 font-light leading-relaxed max-w-3xl mx-auto">
                CSM Aviation & Maintenance Center specializes in aircraft
                management and Part 135 operations. Our maintenance operations
                are provided by our partner organization Medina Air Center.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto">
                  <Shield className="h-8 w-8 text-slate-700" />
                </div>
                <div>
                  <div className="text-lg font-light text-slate-900">
                    FAA Part 145
                  </div>
                  <div className="text-sm text-slate-500 font-light">
                    Certified Station
                  </div>
                </div>
              </div>
              <div className="text-center space-y-4">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="h-8 w-8 text-slate-700" />
                </div>
                <div>
                  <div className="text-lg font-light text-slate-900">
                    ISO 9001
                  </div>
                  <div className="text-sm text-slate-500 font-light">
                    Quality Assured
                  </div>
                </div>
              </div>
              <div className="text-center space-y-4">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto">
                  <Shield className="h-8 w-8 text-slate-700" />
                </div>
                <div>
                  <div className="text-lg font-light text-slate-900">
                    Safety First
                  </div>
                  <div className="text-sm text-slate-500 font-light">
                    Zero Incidents
                  </div>
                </div>
              </div>
              <div className="text-center space-y-4">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto">
                  <Clock className="h-8 w-8 text-slate-700" />
                </div>
                <div>
                  <div className="text-lg font-light text-slate-900">
                    24/7 Support
                  </div>
                  <div className="text-sm text-slate-500 font-light">
                    Always Available
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-24 bg-slate-50">
        <div className="container mx-auto px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-light text-slate-900 mb-6">
              Services
            </h2>
            <p className="text-xl text-slate-500 font-light max-w-2xl mx-auto">
              Comprehensive maintenance solutions delivered with precision
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Service Cards */}
            <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-white">
              <CardContent className="p-12 text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-8 mx-auto group-hover:bg-slate-900 transition-colors">
                  <Wrench className="h-7 w-7 text-slate-700 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-2xl font-light text-slate-900 mb-6">
                  Scheduled Maintenance
                </h3>
                <p className="text-slate-500 font-light leading-relaxed mb-8">
                  Comprehensive maintenance programs ensuring optimal
                  performance and regulatory compliance.
                </p>
                <ul className="space-y-3 text-sm text-slate-600 font-light">
                  <li className="flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-slate-400 mr-3" />
                    A, B, C, D Check Inspections
                  </li>
                  <li className="flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-slate-400 mr-3" />
                    Engine Overhauls
                  </li>
                  <li className="flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-slate-400 mr-3" />
                    Component Replacement
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-white">
              <CardContent className="p-12 text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-8 mx-auto group-hover:bg-slate-900 transition-colors">
                  <Clock className="h-7 w-7 text-slate-700 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-2xl font-light text-slate-900 mb-6">
                  AOG Support
                </h3>
                <p className="text-slate-500 font-light leading-relaxed mb-8">
                  Rapid response services to minimize downtime and restore
                  operations efficiently.
                </p>
                <ul className="space-y-3 text-sm text-slate-600 font-light">
                  <li className="flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-slate-400 mr-3" />
                    Emergency Repairs
                  </li>
                  <li className="flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-slate-400 mr-3" />
                    Mobile Service Units
                  </li>
                  <li className="flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-slate-400 mr-3" />
                    Parts Sourcing
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-white">
              <CardContent className="p-12 text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-8 mx-auto group-hover:bg-slate-900 transition-colors">
                  <Shield className="h-7 w-7 text-slate-700 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-2xl font-light text-slate-900 mb-6">
                  Premium Detailing
                </h3>
                <p className="text-slate-500 font-light leading-relaxed mb-8">
                  Meticulous aircraft detailing services to maintain pristine
                  appearance and protection.
                </p>
                <ul className="space-y-3 text-sm text-slate-600 font-light">
                  <li className="flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-slate-400 mr-3" />
                    Interior Deep Cleaning
                  </li>
                  <li className="flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-slate-400 mr-3" />
                    Exterior Wash & Protection
                  </li>
                  <li className="flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-slate-400 mr-3" />
                    Paint Preservation
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <section className="pb-24 bg-[#8c0e18]">
        <Image
          src={MaintenanceImage}
          alt="Maintenance Image"
          className="w-full "
        />
        <div className="container mx-auto px-8 mt-10">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <div className="space-y-8">
              <Badge className="bg-slate-50 text-slate-700 border-slate-200 px-6 py-2 text-sm font-light hover:bg-neutral-200">
                FAA Certified Part 145 Repair Station
              </Badge>
              <h1 className="text-6xl lg:text-7xl font-light text-white leading-tight tracking-tight">
                Aircraft
                <br />
                <span className="font-semibold">Maintenance</span>
              </h1>
              <p className="text-xl text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
                Madera Jet Center provides precision engineered services for
                discerning aviation professionals
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                className="bg-white text-[#002040] hover:bg-slate-200  px-12 py-6 text-base font-light rounded-3xl"
              >
                <Link href="https://www.maderajetcenter.com" target="blank">
                  Schedule Service
                </Link>
              </Button>
            </div>

            {/* Elegant Stats */}
            <div className="grid grid-cols-3 gap-12 pt-10 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-extralight text-white mb-2">
                  25+
                </div>
                <div className="text-slate-300 text-sm font-light uppercase tracking-wider">
                  Years
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-extralight text-white mb-2">
                  500+
                </div>
                <div className="text-slate-300 text-sm font-light uppercase tracking-wider">
                  Aircraft
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-extralight text-white mb-2">
                  24/7
                </div>
                <div className="text-slate-300 text-sm font-light uppercase tracking-wider">
                  Support
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-10 pb-24 bg-[#002040]">
        <div className="container mx-auto px-8">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <div className="space-y-8">
              <Badge className="bg-slate-50 text-slate-700 border-slate-200 px-6 py-2 text-sm font-light hover:bg-neutral-200">
                FAA Certified Part 145 Repair Station
              </Badge>
              <h1 className="text-6xl lg:text-7xl font-extralight text-white leading-tight tracking-tight">
                Aircraft
                <br />
                <span className="font-light">Detailing</span>
              </h1>
              <p className="text-xl text-slate-400 font-light max-w-2xl mx-auto leading-relaxed">
                Bravo Zulu provides precision engineered services for discerning
                aviation professionals
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                className="bg-white text-[#002040] hover:bg-slate-200  px-12 py-4 text-base font-light"
              >
                <Link href="https://www.mybravozulu.com/" target="blank">
                  Schedule Service
                </Link>
              </Button>
            </div>

            {/* Elegant Stats */}
            <div className="grid grid-cols-3 gap-12 pt-10 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-extralight text-white mb-2">
                  25+
                </div>
                <div className="text-slate-400 text-sm font-light uppercase tracking-wider">
                  Years
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-extralight text-white mb-2">
                  500+
                </div>
                <div className="text-slate-400 text-sm font-light uppercase tracking-wider">
                  Aircraft
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-extralight text-white mb-2">
                  24/7
                </div>
                <div className="text-slate-400 text-sm font-light uppercase tracking-wider">
                  Support
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Request a Quote Section */}
      <section className="py-20 ">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <MessageSquare className="h-16 w-16 text-blue-700 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl f text-black mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-neutral-700 mb-8 font-extralight">
              Discover our exceptional approach to aircraft management, where we
              provide superior safety standards, outstanding service, and much
              more value for you, aviation pros.
            </p>
            <div className="w-full flex justify-center items-center">
              {/* <JetInsightComponent/> */}
              <button
                onClick={handleClick}
                className={`shiny-button px-6 py-4 max-sm:p-3 max-sm:rounded-md text-white`}
              >
                <span className="flex gap-2 justify-between items-center">
                  MAINTENANCE INQUIRY <ArrowRight className="h-5 w-5" />
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
