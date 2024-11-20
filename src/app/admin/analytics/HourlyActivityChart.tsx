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
  Filler,
  ChartOptions,
  ChartData
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

interface HourlyActivityProps {
  data: Array<{
    _id: number;
    count: number;
  }>;
  timezone?: string;
}

export const HourlyActivityChart: React.FC<HourlyActivityProps> = ({ 
  data, 
  timezone = Intl.DateTimeFormat().resolvedOptions().timeZone 
}) => {
  // Format hours with AM/PM
  const formatHour = (hour: number) => {
    const timeString = `${hour}:00`;
    return new Date(`2000/01/01 ${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      hour12: true
    });
  };

  // Find peak hours (top 3)
  const peakHours = [...data]
    .sort((a, b) => b.count - a.count)
    .slice(0, 3)
    .map(item => ({
      hour: formatHour(item._id),
      count: item.count
    }));

  // Calculate average activity
  const averageActivity = data.reduce((sum, item) => sum + item.count, 0) / data.length;

  const chartData: ChartData<'line'> = {
    labels: data.map(item => formatHour(item._id)),
    datasets: [
      {
        label: 'Visits',
        data: data.map(item => item.count),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6
      },
      {
        label: 'Average',
        data: data.map(() => averageActivity),
        borderColor: 'rgba(255, 99, 132, 0.5)',
        borderDash: [5, 5],
        pointRadius: 0
      }
    ]
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          title(tooltipItems) {
            return `Time: ${tooltipItems[0].label}`;
          },
          label(context) {
            if (context.dataset.label === 'Average') {
              return `Average: ${context.parsed.y.toFixed(0)} visits`;
            }
            return `Visits: ${context.parsed.y}`;
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Hour of Day',
          color: '#666',
          font: {
            size: 12,
            weight: 'bold'
          }
        },
        grid: {
          display: false
        },
        ticks: {
          maxRotation: 45,
          minRotation: 45
        }
      },
      y: {
        title: {
          display: true,
          text: 'Number of Visits',
          color: '#666',
          font: {
            size: 12,
            weight: 'bold'
          }
        },
        beginAtZero: true,
        grid: {
          color: 'rgba(0,0,0,0.05)'
        }
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        {/* <h2 className="text-lg font-semibold mb-2">Hourly Activity Analysis</h2>
        <p className="text-sm text-gray-500">Timezone: {timezone}</p> */}
        
        {/* Peak Hours Summary */}
        <div className="mt-4 bg-blue-50 p-4 rounded-lg">
          <h3 className="text-sm font-semibold text-blue-700 mb-2">Peak Activity Hours</h3>
          <div className="grid grid-cols-3 gap-4">
            {peakHours.map((peak, index) => (
              <div key={index} className="text-center">
                <p className="text-xs text-blue-600">Peak {index + 1}</p>
                <p className="font-semibold text-blue-800">{peak.hour}</p>
                <p className="text-sm text-blue-600">{peak.count} visits</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Line data={chartData} options={options} />

      {/* <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
        <div className="space-y-2">
          <h3 className="font-semibold">Understanding the X-Axis (Time)</h3>
          <ul className="list-disc pl-4 space-y-1">
            <li>Shows 24-hour time distribution</li>
            <li>Hours are displayed in 12-hour format (AM/PM)</li>
            <li>Based on your local timezone</li>
          </ul>
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold">Understanding the Y-Axis (Visits)</h3>
          <ul className="list-disc pl-4 space-y-1">
            <li>Shows number of page visits per hour</li>
            <li>Blue line represents actual visits</li>
            <li>Red dotted line shows average activity</li>
          </ul>
        </div>
      </div> */}
    </div>
  );
};

export default HourlyActivityChart;