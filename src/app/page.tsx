import React from 'react';
import HomeBody from './home/home';
import Seo, { generateMetadata as seoGenerateMetadata } from './components/seo/Seo';
import StructuredData from './components/seo/StructuredData';
import { apiService, SeoData } from './services/apiService';
import { Metadata } from 'next';
import { generateStructuredData } from './utils/structuredData';

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
  const structuredData = generateStructuredData(seoData);

  return (
    <>
      <StructuredData data={structuredData} />
      <HomeBody />
    </>
  );
}