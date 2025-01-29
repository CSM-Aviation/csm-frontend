import React from 'react';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Seo, { generateMetadata as seoGenerateMetadata } from '../../components/seo/Seo';
import StructuredData from '../../components/seo/StructuredData';
import { apiService, SeoData } from '../../services/apiService';

const FleetContent = dynamic(() => import('./FleetContent'), { ssr: false });

async function getData(): Promise<SeoData> {
  try {
    const response = await apiService.fetchSeoData('fleet');
    if (response.error || !response.data) {
      throw new Error(response.error || 'Failed to fetch SEO data');
    }
    return response.data;
  } catch (error) {
    console.error('Error fetching SEO data:', error);
    return {
      title: 'CSM Aviation Fleet',
      description: 'Explore our luxury aircraft fleet for private charter',
      keywords: ['private jet', 'charter', 'fleet', 'aircraft'],
      ogImage: '/images/fleet.jpg',
      canonicalUrl: 'https://www.csmaviation.com/charter/fleet',
      robots: 'index, follow',
      author: 'CSM Aviation',
      language: 'en',
      siteName: 'CSM Aviation',
      type: 'website',
      twitterHandle: '@CSMAviation',
    };
  }
}


const FleetPage: React.FC = async () => {
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
      <FleetContent />
    </>
  );
};

export default FleetPage;