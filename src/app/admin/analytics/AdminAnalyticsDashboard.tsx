"use client";

import React, { useState, useEffect } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement
} from 'chart.js';
import { apiService, AnalyticsDashboardData } from '../../services/apiService';
import VisitorLocationComponent from './VisitorLocationComponent';
import VisitorStateComponent from './VisitorStateComponent';
import { Loader2, ArrowUpRight, ArrowDownRight, Clock } from 'lucide-react';
import VisitorTrendChart from './VisitorTrendChart';
import HourlyActivityChart from './HourlyActivityChart';
import TrafficSourcesChart from './TrafficSourcesChart';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement
);

const AdminAnalyticsDashboard: React.FC = () => {
    const [analyticsData, setAnalyticsData] = useState<AnalyticsDashboardData | null>(null);
    const [timeframe, setTimeframe] = useState('7d');
    const [loading, setLoading] = useState(true);
    const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const response = await apiService.getAnalyticsDashboard(timeframe);
            if (response.data) {
                setAnalyticsData(response.data);
                setLastUpdated(new Date());
            }
            setLoading(false);
        };

        fetchData();
        // Refresh data every 5 minutes
        const interval = setInterval(fetchData, 300000);
        return () => clearInterval(interval);
    }, [timeframe]);

    if (loading || !analyticsData) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="w-8 h-8 animate-spin" />
            </div>
        );
    }

    const renderMetricCard = (title: string, value: number, change: number, format: 'number' | 'percentage' = 'number') => (
        <div className="bg-white rounded-lg p-6 shadow-lg">
            <h3 className="text-lg font-medium text-gray-500">{title}</h3>
            <div className="mt-2 flex items-baseline">
                <p className="text-3xl font-semibold">
                    {format === 'number' ? value.toLocaleString() : `${value.toFixed(1)}%`}
                </p>
                {change !== 0 && (
                    <span className={`ml-2 flex items-center text-sm ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {change > 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                        {Math.abs(change)}%
                    </span>
                )}
            </div>
        </div>
    );

    const renderHourlyActivityChart = () => {
        const data = {
            labels: analyticsData.engagement.hourlyActivity.map(item =>
                `${item._id}:00`
            ),
            datasets: [{
                label: 'Activity',
                data: analyticsData.engagement.hourlyActivity.map(item => item.count),
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.5)',
                fill: true,
            }]
        };

        return (
            <Line
                data={data}
                options={{
                    responsive: true,
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            callbacks: {
                                label: (context) => `${context.parsed.y} visits`
                            }
                        }
                    },
                    scales: {
                        y: { beginAtZero: true },
                        x: {
                            ticks: {
                                callback: (value) => `${value}h`
                            }
                        }
                    }
                }}
            />
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
                        <div className="flex items-center mt-2 text-sm text-gray-500">
                            <Clock className="w-4 h-4 mr-1" />
                            Last updated: {lastUpdated.toLocaleTimeString()}
                        </div>
                    </div>
                    <div className="mt-4 md:mt-0 flex items-center gap-4">
                        <select
                            value={timeframe}
                            onChange={(e) => setTimeframe(e.target.value)}
                            className="bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2"
                        >
                            <option value="24h">Last 24 hours</option>
                            <option value="7d">Last 7 days</option>
                            <option value="30d">Last 30 days</option>
                            <option value="90d">Last 90 days</option>
                        </select>
                    </div>
                </div>

                {/* Overview Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {renderMetricCard('Total Visitors', analyticsData.overview.totalVisitors, 8.2)}
                    {renderMetricCard('Page Views', analyticsData.overview.totalPageViews, 12.5)}
                    {renderMetricCard('New Users', analyticsData.overview.newUsers, 5.3)}
                    {renderMetricCard('Returning Users', analyticsData.overview.returningUsers, -2.1)}
                </div>

                {/* Main Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Visitor Trend Chart */}
                    <VisitorTrendChart data={analyticsData.trends.visitorTrend} />
                    {/* <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-lg font-semibold mb-4">Visitor Trend</h2>
                        <Line
                            data={{
                                labels: analyticsData.trends.visitorTrend.map(item => item.date),
                                datasets: [
                                    {
                                        label: 'Visitors',
                                        data: analyticsData.trends.visitorTrend.map(item => item.visitors),
                                        borderColor: '#3b82f6',
                                        tension: 0.4,
                                    },
                                    {
                                        label: 'Page Views',
                                        data: analyticsData.trends.visitorTrend.map(item => item.pageviews),
                                        borderColor: '#10b981',
                                        tension: 0.4,
                                    }
                                ]
                            }}
                            options={{
                                responsive: true,
                                interaction: {
                                    mode: 'index',
                                    intersect: false,
                                },
                                plugins: {
                                    legend: { position: 'bottom' }
                                },
                                scales: {
                                    y: { beginAtZero: true }
                                }
                            }}
                        />
                    </div> */}

                    {/* Hourly Activity Chart */}
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-lg font-semibold mb-4">Hourly Activity Analysis</h2>
                        {/* {renderHourlyActivityChart()} */}
                        <HourlyActivityChart 
                        data={analyticsData.engagement.hourlyActivity}
                        timezone={Intl.DateTimeFormat().resolvedOptions().timeZone}
                        />
                    </div>
                </div>

                {/* Traffic Sources and Locations */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {/* Traffic Sources */}
                    <TrafficSourcesChart trafficSources={analyticsData.engagement.trafficSources} />

                    {/* <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-lg font-semibold mb-4">Traffic Sources</h2>
                        <Bar
                            data={{
                                labels: Object.keys(analyticsData.engagement.trafficSources),
                                datasets: [{
                                    data: Object.values(analyticsData.engagement.trafficSources),
                                    backgroundColor: '#3b82f6'
                                }]
                            }}
                            options={{
                                indexAxis: 'y',
                                responsive: true,
                                plugins: {
                                    legend: { display: false }
                                }
                            }}
                        />
                    </div> */}

                    {/* Locations */}
                    <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <VisitorLocationComponent visitorData={analyticsData.geography.userLocations} />
                        <VisitorStateComponent visitorData={analyticsData.geography.userLocations} />
                    </div>
                </div>

                {/* Most Visited Pages */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-lg font-semibold mb-4">Most Visited Pages</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-500">Page</th>
                                    <th className="px-6 py-3 text-right text-sm font-semibold text-gray-500">Views</th>
                                    <th className="px-6 py-3 text-right text-sm font-semibold text-gray-500">Unique Visitors</th>
                                    <th className="px-6 py-3 text-right text-sm font-semibold text-gray-500">Bounce Rate</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {analyticsData.content.pagesVisited.map((page, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                                            {page.path}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500 text-right">
                                            {page.views.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500 text-right">
                                            {page.uniqueVisitors.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500 text-right">
                                            {page.bounceRate.toFixed(1)}%
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminAnalyticsDashboard;