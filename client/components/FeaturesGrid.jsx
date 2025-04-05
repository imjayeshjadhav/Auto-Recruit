'use client';

import React from 'react';
import Link from 'next/link';
import { Briefcase, FileText, Mic, MessageSquare } from 'lucide-react';

const tools = [
  {
    title: '1. JD Analyzer Agent',
    description: ['NLP to extract key info', 'Skills, experience, etc.'],
    icon: <Briefcase className="text-indigo-500" size={28} />,
    link: '/jd-analyzer',
  },
  {
    title: '2. CV Parser Agent',
    description: ['Extracts education, skills', 'Stores structured profile'],
    icon: <FileText className="text-green-500" size={28} />,
    link: '/cv-parser',
  },
  {
    title: '4. Dummy Interview Module',
    description: [
      'Chat/video-based Q&A',
      'Analyzes answers',
      'NLP for feedback scoring',
    ],
    icon: <Mic className="text-orange-500" size={28} />,
    link: '/dummy-interview',
  },
  {
    title: '5. Feedback Generator',
    description: [
      'Creates structured report',
      'Communication, Tech, PS',
    ],
    icon: <MessageSquare className="text-red-500" size={28} />,
    link: '/feedback-generator',
  },
];

const ToolGridSection = () => {
  return (
    <section className="px-4 bg-gray-100">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">
          Recruitment AI Tools
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tools.map((tool, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition duration-300 flex flex-col justify-between"
            >
              <div className="flex items-center gap-3 mb-4">
                {tool.icon}
                <h3 className="text-xl font-semibold text-gray-800">
                  {tool.title}
                </h3>
              </div>
              <ul className="mb-4 pl-6 list-disc text-gray-600 text-sm">
                {tool.description.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
              <div>
                <Link
                  href={tool.link}
                  className="inline-block mt-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-full hover:bg-indigo-700 transition"
                >
                  Explore
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolGridSection;