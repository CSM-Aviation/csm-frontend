"use client"

import React from 'react';
import Hero from "../components/Hero";
import MaintManage from "../components/MaintManage";
import ServicesCards from "../components/ServiceCard";
import { useConfig } from '../contexts/ConfigContext';

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
                backgroundImage="/images/hero-background.jpg"
                videoSource={`${config.home_video}`}
                title="Welcome to CSM Aviation"
                subtitle="Experience luxury air travel like never before"
                isHome={true}
            />
            <ServicesCards />
            <MaintManage />

            <div className="h-16"></div>
        </>
    );
}