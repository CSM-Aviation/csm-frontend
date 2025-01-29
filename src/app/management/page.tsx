// src/app/management/page.tsx

import { NextPage } from 'next';
import Seo, { generateMetadata as seoGenerateMetadata } from '../components/seo/Seo';
import StructuredData from '../components/seo/StructuredData';
import { apiService, SeoData } from '../services/apiService';
import { Metadata } from 'next';
import ManagementMotion from './ManagementMotion'; // Import the client-side motion component
import { generateStructuredData } from '../utils/structuredData';

async function getData(): Promise<SeoData> {
  try {
    const response = await apiService.fetchSeoData('management');
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

async function generateMetadata(): Promise<Metadata> {
  const seoData = await getData();
  return seoGenerateMetadata(seoData);
}

// Export the metadata generator for Next.js
export { generateMetadata };

const ManagementPage: NextPage = async () => {
  const seoData = await getData();
  const structuredData = generateStructuredData(seoData);

  return (
    <div className="w-full">
      <StructuredData data={structuredData} />
      {/* Client-side motion component */}
      <ManagementMotion />
    </div>
  );
};

export default ManagementPage;
