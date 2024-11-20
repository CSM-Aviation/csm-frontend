import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface VisitorTrendProps {
  data: Array<{
    date: string;
    visitors: number;
    pageviews: number;
  }>;
}

export const VisitorTrendChart: React.FC<VisitorTrendProps> = ({ data = [] }) => {
  // Ensure data is an array
  const safeData = Array.isArray(data) ? data : [];

  // Calculate engagement ratio (pages per visitor)
  const engagementRatio = safeData.map(day => ({
    date: day.date,
    ratio: day.visitors > 0 ? (day.pageviews / day.visitors).toFixed(2) : '0.00'
  }));

  // Safely calculate totals
  const totalVisitors = safeData.reduce((sum, day) => sum + (day.visitors || 0), 0);
  const totalPageViews = safeData.reduce((sum, day) => sum + (day.pageviews || 0), 0);
  const averagePagesPerVisitor = totalVisitors > 0 
    ? (totalPageViews / totalVisitors).toFixed(2) 
    : '0.00';

  const chartData = {
    labels: safeData.map(item => {
      try {
        const date = new Date(item.date);
        return date.toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric' 
        });
      } catch (e) {
        return 'Invalid Date';
      }
    }),
    datasets: [
      {
        label: 'Unique Visitors',
        data: safeData.map(item => item.visitors || 0),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
        yAxisID: 'y'
      },
      {
        label: 'Page Views',
        data: safeData.map(item => item.pageviews || 0),
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4,
        yAxisID: 'y'
      },
      {
        label: 'Pages per Visitor',
        data: engagementRatio.map(item => parseFloat(item.ratio) || 0),
        borderColor: 'rgb(249, 115, 22)',
        borderDash: [5, 5],
        tension: 0.4,
        yAxisID: 'y1'
      }
    ]
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Visitor Trend Analysis</h2>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <p className="text-sm text-gray-500">Avg Pages/Visitor</p>
            <p className="text-xl font-semibold">{averagePagesPerVisitor}</p>
          </div>
        </div>
      </div>
      <Line 
        data={chartData} 
        options={{
          responsive: true,
          interaction: {
            mode: 'index',
            intersect: false,
          },
          plugins: {
            legend: {
              position: 'bottom',
            }
          },
          scales: {
            y: {
              type: 'linear',
              display: true,
              position: 'left',
              beginAtZero: true
            },
            y1: {
              type: 'linear',
              display: true,
              position: 'right',
              beginAtZero: true,
              grid: {
                drawOnChartArea: false
              }
            }
          }
        }} 
      />
    </div>
  );
};

export default VisitorTrendChart;