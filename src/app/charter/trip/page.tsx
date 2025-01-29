import React from 'react';
import dynamic from 'next/dynamic';
import Seo, { generateMetadata as seoGenerateMetadata } from '../../components/seo/Seo';
import StructuredData from '../../components/seo/StructuredData';
import { apiService, SeoData } from '../../services/apiService';
import { Metadata } from 'next';

const TripRequestForm = dynamic(() => import('./TripRequestForm'), { ssr: false });

async function getData(): Promise<SeoData> {
  try {
    const response = await apiService.fetchSeoData('trip');
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
      canonicalUrl: 'https://csmaviation.com',
      robots: 'index, follow',
      author: 'CSM Aviation',
      language: 'en',
      siteName: 'CSM Aviation',
      type: 'website',
      twitterHandle: '@CSMAviation',
    };
  }
}


const TripPage: React.FC = async () => {
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
    <div className="container mx-auto px-4 py-8">
      <Seo {...seoData} />
      <StructuredData data={structuredData} />
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-900">Trip Request</h1>
      <TripRequestForm />
    </div>
  );
};

export default TripPage;