'use client';

import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { useRef, useEffect, useState } from 'react';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const RecruitmentStatusChart = () => {
  const chartRef = useRef(null);

  const data = {
    labels: ['Applied', 'Shortlisted', 'Interviewed', 'Hired', 'Rejected'],
    datasets: [
      {
        label: 'Candidates',
        data: [120, 60, 30, 10, 20],
        backgroundColor: ['#007bff', '#ffc107', '#17a2b8', '#28a745', '#dc3545'],
        borderRadius: 8,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: { enabled: true },
    },
    animation: { duration: 500 },
    scales: {
      y: { beginAtZero: true },
    },
  };

  // Typing animation
  const fullText = 'Your Recruitment Insights';
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDisplayedText(fullText.slice(0, index + 1));
      setIndex((prev) => {
        if (prev < fullText.length - 1) {
          return prev + 1;
        } else {
          setTimeout(() => {
            setDisplayedText('');
            setIndex(0);
          }, 1500);
          return prev;
        }
      });
    }, 100);
    return () => clearInterval(timer);
  }, [index]);

  return (
    <div className="bg-gray-100 min-h-screen px-4 pt-24 pb-20 transition-colors duration-300">
      <div className="flex flex-col md:flex-row items-center justify-center gap-10">
        
        {/* Chart Section */}
        <div className="w-full max-w-lg bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-center mb-4 text-black">
            Recruitment Status
          </h2>
          <Bar ref={chartRef} data={data} options={options} />
        </div>

        {/* Typing Text Section */}
        <div className="flex-1 max-w-xl text-left">
          <h2 className="text-5xl font-extrabold bg-gradient-to-r from-indigo-500 via-pink-500 to-red-500 bg-clip-text text-transparent mb-4">
            {displayedText}
            <span className="animate-pulse text-black">|</span>
          </h2>
          <p className="text-gray-700 text-base">
            Gain real-time insights into your hiring pipeline. Analyze application volume, track interview conversions, and evaluate overall recruitment efficiency to make smarter talent decisions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecruitmentStatusChart;
