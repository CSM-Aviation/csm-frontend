import React, { useState, useEffect } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js';
import { apiService, AnalyticsDashboardData } from '../../services/apiService';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement);

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

    const userLocationData = {
        labels: Object.keys(analyticsData.userLocations),
        datasets: [{
            data: Object.values(analyticsData.userLocations),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
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

    return (
        <div className="admin-dashboard p-6">
            <h1 className="text-3xl font-bold mb-6">Analytics Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-semibold mb-2">Total Visitors</h2>
                    <p className="text-3xl">{analyticsData.totalVisitors}</p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-semibold mb-2">New Users</h2>
                    <p className="text-3xl">{analyticsData.newUsers}</p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-semibold mb-2">Total Page Views</h2>
                    <p className="text-3xl">{analyticsData.totalPageViews}</p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-semibold mb-4">Page Views (Last 7 Days)</h2>
                    <Bar data={pageViewsData} options={{ responsive: true }} />
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-semibold mb-4">Top User Locations</h2>
                    <Pie data={userLocationData} options={{ responsive: true }} />
                </div>
            </div>
            <div className="grid grid-cols-1 gap-6 mb-6">
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-semibold mb-4">Visitor Trend (Last 7 Days)</h2>
                    <Line data={visitorTrendData} options={{ responsive: true }} />
                </div>
            </div>
            <div className="bg-white p-4 rounded shadow">
                <h2 className="text-xl font-semibold mb-4">Top Pages Visited</h2>
                <ul>
                    {Object.entries(analyticsData.pagesVisited).map(([path, count]) => (
                        <li key={path} className="mb-2">
                            <span className="font-semibold">{path}:</span> {count} views
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AdminAnalyticsDashboard;