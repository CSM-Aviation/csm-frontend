import React from 'react';
import { Bar } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend,
  ChartOptions,
  ChartData
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface TrafficSourcesProps {
  trafficSources: Record<string, number>;
}

const TrafficSourcesChart: React.FC<TrafficSourcesProps> = ({ trafficSources }) => {
  // Sort data by value in descending order
  const sortedData = Object.entries(trafficSources)
    .sort(([, a], [, b]) => (b as number) - (a as number))
    .reduce((obj, [key, value]) => ({
      ...obj,
      [key]: value
    }), {} as Record<string, number>);

  const data: ChartData<'bar'> = {
    labels: Object.keys(sortedData),
    datasets: [{
      data: Object.values(sortedData),
      backgroundColor: 'rgba(59, 130, 246, 0.8)', // Blue with opacity
      borderColor: 'rgb(59, 130, 246)',
      borderWidth: 1
    }]
  };

  const options: ChartOptions<'bar'> = {
    indexAxis: 'y' as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: (context: { parsed: { x: number } }) => `${context.parsed.x} visits`
        }
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          display: false
        },
        ticks: {
          precision: 0
        }
      },
      y: {
        ticks: {
          autoSkip: false,
          font: {
            size: 12
          }
        },
        grid: {
          display: false
        }
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold mb-4">Traffic Sources</h2>
      <div className="h-[300px]">
        <Bar data={data} options={options} />
      </div>
      {/* <div className="mt-4 text-sm text-gray-500">
        <ul className="space-y-1">
          <li>• Shows distribution of visitor traffic sources</li>
          <li>• Values represent total visits from each source</li>
        </ul>
      </div> */}
    </div>
  );
};

export default TrafficSourcesChart;