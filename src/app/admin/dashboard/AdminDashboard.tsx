import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ConfigurationsTab from './ConfigurationsTab';
import AnalyticsTab from '../analytics/AnalyticsTab';
import SeoTab from '../seo/SeoTab';
import TestimonialsTab from '../testimonials/TestimonialsTab';
import VendorTab from '../vendor/VendorTab';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('testimonials');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/admin/login');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center pt-8 pb-4">
            <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Logout
            </button>
          </div>
          <div className="border-t border-gray-200 flex space-x-4 overflow-x-auto">
            <button
              onClick={() => setActiveTab('testimonials')}
              className={`${activeTab === 'testimonials'
                ? 'border-indigo-500 text-gray-900'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap px-3 py-3 border-b-2 text-sm font-medium`}
            >
              Testimonials
            </button>
            <button
              onClick={() => setActiveTab('vendor')}
              className={`${activeTab === 'vendor'
                ? 'border-indigo-500 text-gray-900'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap px-3 py-3 border-b-2 text-sm font-medium`}
            >
              Vendor
            </button>
            <button
              onClick={() => setActiveTab('configurations')}
              className={`${activeTab === 'configurations'
                ? 'border-indigo-500 text-gray-900'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap px-3 py-3 border-b-2 text-sm font-medium`}
            >
              Configurations
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`${activeTab === 'analytics'
                ? 'border-indigo-500 text-gray-900'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap px-3 py-3 border-b-2 text-sm font-medium`}
            >
              Analytics
            </button>
            
            <button
              onClick={() => setActiveTab('seo')}
              className={`${activeTab === 'seo'
                ? 'border-indigo-500 text-gray-900'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap px-3 py-3 border-b-2 text-sm font-medium`}
            >
              SEO
            </button>
          </div>
        </div>
      </nav>

      <div className="py-10">
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            {activeTab === 'configurations' && <ConfigurationsTab />}
            {activeTab === 'analytics' && <AnalyticsTab />}
            {activeTab === 'testimonials' && <TestimonialsTab />}
            {activeTab === 'seo' && <SeoTab />}
            {activeTab === 'vendor' && <VendorTab />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;