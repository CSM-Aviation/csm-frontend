import React from 'react';
import { NextPage } from 'next';
import Hero from '@/app/components/Hero';
import AboutBody from './AboutBody';
import Seo, { generateMetadata as seoGenerateMetadata } from '../../components/seo/Seo';
import StructuredData from '../../components/seo/StructuredData';
import { apiService, SeoData } from '../../services/apiService';
import { Metadata } from 'next';


async function getData(): Promise<SeoData> {
  try {
    const response = await apiService.fetchSeoData('about');
    if (response.error || !response.data) {
      throw new Error(response.error || 'Failed to fetch SEO data');
    }
    return response.data;
  } catch (error) {
    console.error('Error fetching SEO data:', error);
    return {
      title: 'CSM Aviation',
      description: 'Luxury air travel services',
      keywords: ['private jet', 'charter'],
      ogImage: '/images/default.jpg',
      canonicalUrl: 'https://www.csmaviation.com',
      robots: 'index, follow',
      author: 'CSM Aviation',
      language: 'en',
      siteName: 'CSM Aviation',
      type: 'website',
      twitterHandle: '@CSMAviation',
    };
  }
}


const AboutPage: NextPage = async () => {
  const seoData = await getData();
  seoGenerateMetadata(seoData);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": seoData.siteName,
    "url": seoData.canonicalUrl,
    "logo": "https://www.csmaviation.com/images/CSM-Logo-WHITE-01-web300.jpg",
    "description": seoData.description
  };
  return (

    <>
      <Seo {...seoData} />
      <StructuredData data={structuredData} />
      <Hero
        desktopImage="/images/Luxury_desktop.jpg"
        mobileImage="/images/luxury_mobile.jpg"
        title="About Us"
        subtitle="Experience luxury air travel like never before"
        isHome={false}
      />

      <AboutBody />
      {/* <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Dedicated People Dedicated to Private Aviation</h1>
        <p>CSM started in private aviation in 2008 with our roots in Aircraft Maintenance and MRO services to aircraft owners in the Central Valley of California.  With the success of the Maintenance operations, Managing Aircraft for local valley farmers and executives followed suit.  Ownership and leadership offering twenty years of Commerical flying experience and thirty years of FAA regulatory experience ultimately led to CSM Aviation operating as a Part 135 Air Charter provider in 2013.  Our focus stays true; provide exceptional and reliable Private Charter and Flight Department services on the backbone of Safety and Maintenance protocols.  </p>
      </div> */}
      <div className="h-20"></div>
    </>
  );
};

export default AboutPage;