// components/recruitmentChart.jsx
'use client';

import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function RecruitmentStatusChart() {
  const chartRef = useRef(null);
  const [aiResponse, setAiResponse] = useState('Analyzing recruitment patterns...');
  const [isTyping, setIsTyping] = useState(true);

  const data = {
    labels: ['Applied', 'Shortlisted', 'Interviewed', 'Hired', 'Rejected'],
    datasets: [{
      label: 'Candidates',
      data: [120, 60, 30, 10, 20],
      backgroundColor: [
        'rgba(79, 70, 229, 0.8)',
        'rgba(245, 158, 11, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(5, 150, 105, 0.8)',
        'rgba(239, 68, 68, 0.8)'
      ],
      borderColor: [
        'rgba(79, 70, 229, 1)',
        'rgba(245, 158, 11, 1)',
        'rgba(16, 185, 129, 1)',
        'rgba(5, 150, 105, 1)',
        'rgba(239, 68, 68, 1)'
      ],
      borderRadius: 8,
      borderWidth: 2
    }]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        padding: 12,
        cornerRadius: 12
      }
    },
    animation: { duration: 1000 }
  };

  useEffect(() => {
    const aiMessages = [
      "Detected optimal hiring path...",
      "Recommend increasing LinkedIn sourcing...",
      "Conversion rate improving by 12% MoM...",
      "AI suggests reducing interview stages..."
    ];
    
    let index = 0;
    const interval = setInterval(() => {
      setAiResponse(aiMessages[index]);
      index = (index + 1) % aiMessages.length;
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-[70vh] px-4 pt-12 pb-20">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8"
        >
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
            AI Recruitment Analytics
          </h2>
          <Bar ref={chartRef} data={data} options={options} />
        </motion.div>

        <div className="flex-1 space-y-8">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 shadow-lg">
            <h3 className="text-2xl font-bold text-white mb-4">AI Insights</h3>
            <div className="bg-gray-900 bg-opacity-50 rounded-lg p-4 min-h-24 flex items-center">
              <p className="text-white text-lg">
                {aiResponse}
                <span className={`ml-1 ${isTyping ? 'opacity-100' : 'opacity-0'}`}>|</span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Conversion Rate</p>
                  <p className="text-xl font-bold">8.3%</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Avg Time-to-Hire</p>
                  <p className="text-xl font-bold">14 days</p>
                </div>
              </div>
            </div>
          </div>

          <button className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
            Generate AI Report
          </button>
        </div>
      </div>
    </div>
  );
}