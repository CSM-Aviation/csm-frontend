import React, { useState, useEffect } from 'react';
import { apiService, SeoData } from '../../services/apiService';

const SeoTab: React.FC = () => {
    const [pages, setPages] = useState<string[]>([]);
    const [selectedPage, setSelectedPage] = useState<string>('');
    const [seoConfig, setSeoConfig] = useState<SeoData | null>(null);
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchPages();
    }, []);

    const fetchPages = async () => {
        setIsLoading(true);
        const response = await apiService.getAllSeoConfigurations();
        setIsLoading(false);
        if (response.data) {
            const pageList = response.data.map(config => config.page);
            setPages(pageList);
        } else if (response.error) {
            setMessage(`Failed to fetch pages: ${response.error}`);
        }
    };

    const handlePageSelect = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const page = e.target.value;
        setSelectedPage(page);
        if (page) {
            setIsLoading(true);
            const response = await apiService.fetchSeoData(page);
            setIsLoading(false);
            if (response.data) {
                setSeoConfig(response.data);
            } else if (response.error) {
                setMessage(`Failed to fetch SEO configuration: ${response.error}`);
            }
        } else {
            setSeoConfig(null);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (seoConfig) {
            setSeoConfig({
                ...seoConfig,
                [e.target.name]: e.target.value
            });
        }
    };

    const handleKeywordsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (seoConfig) {
            setSeoConfig({
                ...seoConfig,
                keywords: e.target.value.split(',').map(k => k.trim())
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (seoConfig) {
            setIsLoading(true);
            const { _id, ...configWithoutId } = seoConfig;
            const response = await apiService.updateSeoConfiguration(_id, configWithoutId);
            setIsLoading(false);
            if (response.error) {
                setMessage(`Failed to update SEO configuration: ${response.error}`);
            } else {
                setMessage('SEO configuration updated successfully');
            }
        }
    };

    return (
        <div className="bg-white text-black shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">SEO Configurations</h3>
                <div className="mt-5">
                    <label htmlFor="page-select" className="block text-sm font-medium text-gray-700">
                        Select a page
                    </label>
                    <select
                        id="page-select"
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        value={selectedPage}
                        onChange={handlePageSelect}
                    >
                        <option value="">Select a page</option>
                        {pages.map((page) => (
                            <option key={page} value={page}>
                                {page}
                            </option>
                        ))}
                    </select>
                </div>
                {isLoading && <p className="mt-2 text-sm text-gray-500">Loading...</p>}
                {seoConfig && (
                    <form onSubmit={handleSubmit} className="mt-5">
                        <div className="space-y-6">
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    value={seoConfig.title}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    rows={3}
                                    value={seoConfig.description}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <label htmlFor="keywords" className="block text-sm font-medium text-gray-700">
                                    Keywords (comma-separated)
                                </label>
                                <input
                                    type="text"
                                    name="keywords"
                                    id="keywords"
                                    value={seoConfig.keywords.join(', ')}
                                    onChange={handleKeywordsChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <label htmlFor="ogImage" className="block text-sm font-medium text-gray-700">
                                    OG Image URL
                                </label>
                                <input
                                    type="text"
                                    name="ogImage"
                                    id="ogImage"
                                    value={seoConfig.ogImage}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <label htmlFor="canonicalUrl" className="block text-sm font-medium text-gray-700">
                                    Canonical URL
                                </label>
                                <input
                                    type="text"
                                    name="canonicalUrl"
                                    id="canonicalUrl"
                                    value={seoConfig.canonicalUrl}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>
                        <div className="mt-5">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                {isLoading ? 'Updating...' : 'Update Configuration'}
                            </button>
                        </div>
                    </form>
                )}
                {message && (
                    <div className={`mt-4 text-sm ${message.includes('Failed') ? 'text-red-600' : 'text-green-600'}`}>
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SeoTab;