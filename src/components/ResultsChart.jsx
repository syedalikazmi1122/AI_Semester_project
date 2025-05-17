import React, { useEffect, useRef } from 'react';
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

const ResultsChart = ({ prediction }) => {
  const chartRef = useRef(null);
  
  useEffect(() => {
    // Add animation when chart is loaded
    if (chartRef.current) {
      chartRef.current.classList.add('opacity-100');
      chartRef.current.classList.remove('opacity-0');
    }
  }, []);

  // Handle case where there's no prediction or comparableProperties
  if (!prediction || !prediction.comparableProperties) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-400">No comparison data available</p>
      </div>
    );
  }

  // Default to empty array if comparableProperties is not available
  const comparableProperties = Array.isArray(prediction.comparableProperties)
    ? prediction.comparableProperties
    : [];

  // Add a fallback for when there are no comparable properties
  const properties = [
    'Your Property',
    ...comparableProperties.map((p, i) => p.location || `Property ${i+1}`)
  ];

  const values = [
    prediction.predicted_price,
    ...comparableProperties.map((p) => p.value || 0)
  ];

  const data = {
    labels: properties,
    datasets: [
      {
        label: 'Property Value',
        data: values,
        backgroundColor: [
          'rgba(52, 211, 153, 0.9)', // Emerald for your property
          ...Array(comparableProperties.length).fill('rgba(59, 130, 246, 0.6)') // Blue for comparable properties
        ],
        borderColor: [
          'rgb(16, 185, 129)', // Emerald border for your property
          ...Array(comparableProperties.length).fill('rgb(37, 99, 235)') // Blue border for comparable properties
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
          label: function (context) {
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
          callback: function (value) {
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
    <div 
      ref={chartRef} 
      className="w-full h-full opacity-0 transition-opacity duration-1000"
    >
      <Bar data={data} options={options} />
    </div>
  );
};

export default ResultsChart;