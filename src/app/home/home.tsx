"use client"

import React from 'react';
import Hero from "../components/Hero";
import MaintManage from "../components/MaintManage";
import ServicesCards from "../components/ServiceCard";
import { useConfig } from '../contexts/ConfigContext';
import DonorNetworkSection from '../components/DonorNetworkSection';

export default function HomeBody() {
    const { config, error } = useConfig();

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!config) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Hero
                desktopImage="/images/hero/home-desktop.jpg"
                mobileImage="/images/hero/home-mobile.jpg"
                videoSource={config?.home_video}
                title="Welcome to CSM Aviation"
                subtitle="Director Broker Services | Wholesale Private Charter Direct to Public"
                isHome={true}
                showJetInsight={true}
            />
            <ServicesCards />
            <MaintManage />
            <DonorNetworkSection/>

            {/* <div className="h-16"></div> */}
        </>
    );
}