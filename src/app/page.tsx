import React from 'react';
import HomeBody from './home/home';
import Seo, { generateMetadata as seoGenerateMetadata } from './components/seo/Seo';
import StructuredData from './components/seo/StructuredData';
import { apiService, SeoData } from './services/apiService';
import { Metadata } from 'next';

async function getData(): Promise<SeoData> {
  try {
    const response = await apiService.fetchSeoData('home');
    if (response.error || !response.data) {
      throw new Error(response.error || 'Failed to fetch SEO data');
    }
    // console.log("SEO data received: "+ response.data.keywords)
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

async function generateMetadata(): Promise<Metadata> {
  const seoData = await getData();
  return seoGenerateMetadata(seoData);
}

// Export the metadata generator for Next.js
export { generateMetadata };

export default async function Home() {
  const seoData = await getData();
  // console.log(seoData);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": seoData.siteName,
    "url": seoData.canonicalUrl,
    "logo": "https://www.csmaviation.com/images/CSM-Logo-WHITE-01-web300.jpg",
    "description": seoData.description,
    // Add these recommended fields for better SEO
    "sameAs": [
      // Add your social media URLs here
      "https://twitter.com/CSMAviation",
      // "https://facebook.com/CSMAviation",
      // "https://linkedin.com/company/csm-aviation"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "", // Add your contact number
      "contactType": "customer service"
    }
  };

  return (
    <>
      <StructuredData data={structuredData} />
      <HomeBody />
    </>
  );
}