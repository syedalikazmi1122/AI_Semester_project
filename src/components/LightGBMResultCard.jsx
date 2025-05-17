import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);



const LightGBMResultsChart = ({ prediction }) => {
  if (!prediction || !prediction.comparableProperties) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-400">No comparison data available</p>
      </div>
    );
  }

  const properties = [
    'Your Property',
    ...prediction.comparableProperties.map(p => p.location)
  ];

  const values = [
    prediction.predicted_price,
    ...prediction.comparableProperties.map(p => p.value)
  ];

  const data = {
    labels: properties,
    datasets: [
      {
        label: 'Property Value',
        data: values,
        backgroundColor: [
          'rgba(52, 211, 153, 0.9)',
          ...Array(prediction.comparableProperties.length).fill('rgba(59, 130, 246, 0.6)')
        ],
        borderColor: [
          'rgb(16, 185, 129)',
          ...Array(prediction.comparableProperties.length).fill('rgb(37, 99, 235)')
        ],
        borderWidth: 1,
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.8)',
        titleColor: '#fff',
        bodyColor: '#d1d5db',
        borderColor: 'rgba(75, 85, 99, 0.3)',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        titleFont: {
          size: 14,
          weight: 'bold',
        },
        bodyFont: {
          size: 12,
        },
        callbacks: {
          label: function(context) {
            return new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              maximumFractionDigits: 0,
            }).format(context.raw);
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(75, 85, 99, 0.15)',
        },
        ticks: {
          color: '#9ca3af',
          callback: function(value) {
            return '$' + value.toLocaleString();
          },
          font: {
            size: 11,
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#9ca3af',
          font: {
            size: 11,
          },
        },
      },
    },
    animation: {
      duration: 1500,
      easing: 'easeOutQuart',
    },
  };

  return (
    <div className="w-full h-full">
      <Bar data={data} options={options} />
    </div>
  );
};

export default LightGBMResultsChart;