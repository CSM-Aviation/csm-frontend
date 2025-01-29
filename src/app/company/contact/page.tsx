import React from 'react';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import ContactInfo from './ContactInfo';
import Seo, { generateMetadata as seoGenerateMetadata } from '../../components/seo/Seo';
import StructuredData from '../../components/seo/StructuredData';
import { apiService, SeoData } from '../../services/apiService';
import { Metadata } from 'next';
import { generateStructuredData } from '@/app/utils/structuredData';

const ContactForm = dynamic(() => import('./ContactForm'), { ssr: false });

async function getData(): Promise<SeoData> {
  try {
    const response = await apiService.fetchSeoData('contact');
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

const ContactPage: NextPage = async () => {
  const seoData = await getData();
  const structuredData = generateStructuredData(seoData);

  return (
    <div className="w-full">
      <StructuredData data={structuredData} />
      <ContactForm />
      <ContactInfo />
    </div>
  );
};

export default ContactPage;