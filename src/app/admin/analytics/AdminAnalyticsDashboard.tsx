import React, { useState, useEffect } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement } from 'chart.js';
import { apiService, AnalyticsDashboardData } from '../../services/apiService';
import VisitorLocationComponent from './VisitorLocationComponent';
import VisitorStateComponent from './VisitorStateComponent';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement);

const AdminAnalyticsDashboard: React.FC = () => {
    const [analyticsData, setAnalyticsData] = useState<AnalyticsDashboardData | null>(null);

    useEffect(() => {
        const fetchAnalyticsData = async () => {
            const response = await apiService.getAnalyticsDashboard();
            if (response.data) {
                setAnalyticsData(response.data);
            } else {
                console.error('Failed to fetch analytics data:', response.error);
            }
        };

        fetchAnalyticsData();
    }, []);

    if (!analyticsData) return <div>Loading...</div>;

    const pageViewsData = {
        labels: analyticsData.dates,
        datasets: [{
            label: 'Page Views',
            data: analyticsData.pageViews,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
        }]
    };

    const visitorTrendData = {
        labels: analyticsData.visitorTrend.map(item => item.date),
        datasets: [{
            label: 'Visitors',
            data: analyticsData.visitorTrend.map(item => item.visitors),
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    };

    const extractLocationData = (location: string) => {
        const parts = location.split(',').map(part => part.trim());
        const country = parts[parts.length - 1] || 'Unknown';
        const state = parts[parts.length - 2] || 'Unknown';
        return { country, state };
    };

    const visitorLocationData = Object.entries(analyticsData.userLocations).map(([location, visitors]) => {
        const { country } = extractLocationData(location);
        return { location: country, visitors };
    });

    const visitorStateData = Object.entries(analyticsData.userLocations).map(([location, visitors]) => {
        const { state } = extractLocationData(location);
        return { location: state, visitors };
    });

    // const worldMapData = Object.entries(analyticsData.userLocations).reduce((acc, [location, visitors]) => {
    //     const country = location.split(',').pop()?.trim() || 'Unknown';
    //     acc[country] = (acc[country] || 0) + visitors;
    //     return acc;
    // }, {} as Record<string, number>);

    return (
        <div className="admin-dashboard p-6 bg-gray-900 text-white">
            <h1 className="text-3xl font-bold mb-6">Analytics Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-gray-800 p-4 rounded shadow">
                    <h2 className="text-xl font-semibold mb-2">Total Visitors</h2>
                    <p className="text-3xl">{analyticsData.totalVisitors}</p>
                </div>
                <div className="bg-gray-800 p-4 rounded shadow">
                    <h2 className="text-xl font-semibold mb-2">New Users</h2>
                    <p className="text-3xl">{analyticsData.newUsers}</p>
                </div>
                <div className="bg-gray-800 p-4 rounded shadow">
                    <h2 className="text-xl font-semibold mb-2">Total Page Views</h2>
                    <p className="text-3xl">{analyticsData.totalPageViews}</p>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-6 mb-6">
                <div className="bg-gray-800 p-4 rounded shadow">
                    <h2 className="text-xl font-semibold mb-4">Visitor Trend (Last 7 Days)</h2>
                    <Line data={visitorTrendData} options={{ responsive: true, scales: { y: { beginAtZero: true } } }} />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <VisitorLocationComponent visitorData={visitorLocationData} />
                <VisitorStateComponent visitorData={visitorStateData} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-800 p-4 rounded shadow">
                    <h2 className="text-xl font-semibold mb-4">Page Views (Last 7 Days)</h2>
                    <Bar data={pageViewsData} options={{ responsive: true, scales: { y: { beginAtZero: true } } }} />
                </div>
                <div className="bg-gray-800 p-4 rounded shadow">
                    <h2 className="text-xl font-semibold mb-4">Top Pages Visited</h2>
                    <ul className="space-y-2">
                        {Object.entries(analyticsData.pagesVisited).map(([path, count], index) => (
                            <li key={path} className="flex justify-between items-center">
                                <span className="text-gray-300">{path}</span>
                                <span className="bg-gray-700 px-2 py-1 rounded">{count}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AdminAnalyticsDashboard;