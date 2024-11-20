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
  data: {
    date: string;
    visitors: number;
    pageviews: number;
  }[];
}

export const VisitorTrendChart: React.FC<VisitorTrendProps> = ({ data }) => {
  // Calculate engagement ratio (pages per visitor)
  const engagementRatio = data.map(day => ({
    date: day.date,
    ratio: (day.pageviews / day.visitors).toFixed(2)
  }));

  const chartData = {
    labels: data.map(item => {
      // Format date to be more readable
      const date = new Date(item.date);
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
    }),
    datasets: [
      {
        label: 'Unique Visitors',
        data: data.map(item => item.visitors),
        borderColor: 'rgb(59, 130, 246)', // Blue
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
        yAxisID: 'y'
      },
      {
        label: 'Page Views',
        data: data.map(item => item.pageviews),
        borderColor: 'rgb(16, 185, 129)', // Green
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4,
        yAxisID: 'y'
      },
      {
        label: 'Pages per Visitor',
        data: engagementRatio.map(item => parseFloat(item.ratio)),
        borderColor: 'rgb(249, 115, 22)', // Orange
        borderDash: [5, 5],
        tension: 0.4,
        yAxisID: 'y1'
      }
    ]
  };

  const options = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
              if (label.includes('per')) {
                label += parseFloat(context.parsed.y).toFixed(2);
              } else {
                label += context.parsed.y.toLocaleString();
              }
            }
            return label;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        title: {
          display: true,
          text: 'Count'
        },
        grid: {
          color: 'rgba(0,0,0,0.05)'
        }
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        title: {
          display: true,
          text: 'Pages per Visitor'
        },
        grid: {
          drawOnChartArea: false
        }
      }
    }
  };

  // Additional summary stats
  const totalVisitors = data.reduce((sum, day) => sum + day.visitors, 0);
  const totalPageViews = data.reduce((sum, day) => sum + day.pageviews, 0);
  const averagePagesPerVisitor = (totalPageViews / totalVisitors).toFixed(2);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Visitor Trend Analysis</h2>
        <div className="grid grid-cols-3 gap-4 mb-4">
          {/* <div className="text-center">
            <p className="text-sm text-gray-500">Total Visitors</p>
            <p className="text-xl font-semibold">{totalVisitors.toLocaleString()}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">Total Page Views</p>
            <p className="text-xl font-semibold">{totalPageViews.toLocaleString()}</p>
          </div> */}
          <div className="text-center">
            <p className="text-sm text-gray-500">Avg Pages/Visitor</p>
            <p className="text-xl font-semibold">{averagePagesPerVisitor}</p>
          </div>
        </div>
      </div>
      <Line data={chartData} options={options} />
      {/* <div className="mt-4 text-sm text-gray-500">
        <ul className="space-y-2">
          <li>• <strong>Unique Visitors</strong>: Individual users who accessed our site</li>
          <li>• <strong>Page Views</strong>: Total number of pages loaded by all visitors</li>
          <li>• <strong>Pages per Visitor</strong>: Average number of pages viewed per visitor (engagement metric)</li>
        </ul>
      </div> */}
    </div>
  );
};

export default VisitorTrendChart;