import React, { useState, useEffect } from 'react';
import { apiService, AnalyticsDashboardData } from '../../services/apiService';
import { Loader2, ArrowUpRight, ArrowDownRight, Clock } from 'lucide-react';
import VisitorTrendChart from './VisitorTrendChart';
import HourlyActivityChart from './HourlyActivityChart';
import TrafficSourcesChart from './TrafficSourcesChart';
import VisitorLocationComponent from './VisitorLocationComponent';
import VisitorStateComponent from './VisitorStateComponent';

// Define default data structure
const defaultAnalyticsData: AnalyticsDashboardData = {
    overview: {
        totalVisitors: 0,
        totalPageViews: 0,
        newUsers: 0,
        returningUsers: 0
    },
    trends: {
        visitorTrend: []
    },
    engagement: {
        hourlyActivity: [],
        trafficSources: {},
        performanceMetrics: {
            bounceRate: 0,
            avgSessionDuration: 0,
            avgPagesPerSession: 0
        }
    },
    geography: {
        userLocations: {}
    },
    content: {
        pagesVisited: []
    },
    totalVisitors: 0,
    totalPageViews: 0,
    newUsers: 0,
    dates: [],
    pageViews: [],
    userLocations: {},
    pagesVisited: {},
    visitorTrend: []
};

const AdminAnalyticsDashboard: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsDashboardData>(defaultAnalyticsData);
  const [timeframe, setTimeframe] = useState('7d');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await apiService.getAnalyticsDashboard(timeframe);
        if (response.data) {
          setAnalyticsData({
            ...defaultAnalyticsData,
            ...response.data,
            overview: {
              ...defaultAnalyticsData.overview,
              ...(response.data.overview || {})
            },
            trends: {
              ...defaultAnalyticsData.trends,
              ...(response.data.trends || {})
            },
            engagement: {
              ...defaultAnalyticsData.engagement,
              ...(response.data.engagement || {})
            },
            geography: {
              ...defaultAnalyticsData.geography,
              ...(response.data.geography || {})
            },
            content: {
              ...defaultAnalyticsData.content,
              ...(response.data.content || {})
            }
          });
          setLastUpdated(new Date());
        } else {
          setError('No data received from the server');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 300000); // 5 minutes
    return () => clearInterval(interval);
  }, [timeframe]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-600">
        Error: {error}
      </div>
    );
  }

  const renderMetricCard = (
    title: string, 
    value: number, 
    change: number, 
    format: 'number' | 'percentage' = 'number',
    trend: 'up' | 'down' | 'none' = 'none'
  ) => (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <h3 className="text-lg font-medium text-gray-500">{title}</h3>
      <div className="mt-2 flex items-baseline">
        <p className="text-3xl font-semibold">
          {format === 'number' ? value.toLocaleString() : `${value.toFixed(1)}%`}
        </p>
        {change !== 0 && (
          <span className={`ml-2 flex items-center text-sm ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
            {trend === 'up' ? (
              <ArrowUpRight className="w-4 h-4 mr-1" />
            ) : (
              <ArrowDownRight className="w-4 h-4 mr-1" />
            )}
            {Math.abs(change)}%
          </span>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with Controls */}
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
              className="bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="24h">Last 24 hours</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
          </div>
        </div>

        {/* Performance Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {renderMetricCard(
            'Total Visitors', 
            analyticsData.overview.totalVisitors, 
            8.2, 
            'number',
            'up'
          )}
          {renderMetricCard(
            'Page Views', 
            analyticsData.overview.totalPageViews, 
            12.5, 
            'number',
            'up'
          )}
          {renderMetricCard(
            'New Users', 
            analyticsData.overview.newUsers, 
            -2.1, 
            'number',
            'down'
          )}
          {renderMetricCard(
            'Returning Users', 
            analyticsData.overview.returningUsers, 
            5.3, 
            'number',
            'up'
          )}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <VisitorTrendChart 
            data={analyticsData.trends.visitorTrend || []} 
          />
          <HourlyActivityChart 
            data={analyticsData.engagement.hourlyActivity || []} 
            timezone={Intl.DateTimeFormat().resolvedOptions().timeZone}
          />
        </div>

        {/* Traffic Sources and Locations */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <TrafficSourcesChart 
            trafficSources={analyticsData.engagement.trafficSources || {}} 
          />
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <VisitorLocationComponent 
              visitorData={analyticsData.geography.userLocations} 
            />
            <VisitorStateComponent 
              visitorData={analyticsData.geography.userLocations} 
            />
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
                  {/* <th className="px-6 py-3 text-right text-sm font-semibold text-gray-500">Avg. Time</th> */}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {(analyticsData.content.pagesVisited || []).map((page, index) => (
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
                    {/* <td className="px-6 py-4 text-sm text-gray-500 text-right">
                      {Math.floor(page.avgTimeOnPage / 60)}m {page.avgTimeOnPage % 60}s
                    </td> */}
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