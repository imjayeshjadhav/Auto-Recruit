// components/FeaturesGrid.jsx
'use client';

import { motion } from 'framer-motion';
import { Briefcase, FileText, Mic, MessageSquare, Zap, BarChart2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function FeaturesGrid() {
  const router = useRouter();

  const tools = [
    {
      title: 'JD Analyzer AI',
      description: 'Extracts key requirements using NLP',
      icon: <Briefcase className="text-indigo-600" size={24} />,
      color: 'bg-indigo-50',
      link: '/jd-analyzer'
    },
    {
      title: 'CV Parser AI',
      description: 'Automatically structures candidate profiles',
      icon: <FileText className="text-green-600" size={24} />,
      color: 'bg-green-50',
      link: '/cv-parser'
    },
    {
      title: 'Interview AI',
      description: 'Conducts automated video interviews',
      icon: <Mic className="text-purple-600" size={24} />,
      color: 'bg-purple-50',
      link: 'http://localhost:3002' 
    },
    {
      title: 'Feedback AI',
      description: 'Generates detailed evaluation reports',
      icon: <MessageSquare className="text-pink-600" size={24} />,
      color: 'bg-pink-50',
      link: '/feedback-generator'
    },
    {
      title: 'Matching AI',
      description: 'Scores candidate-job fit automatically',
      icon: <Zap className="text-yellow-600" size={24} />,
      color: 'bg-yellow-50',
      link: '/matching'
    },
    {
      title: 'Analytics AI',
      description: 'Predicts hiring success metrics',
      icon: <BarChart2 className="text-blue-600" size={24} />,
      color: 'bg-blue-50',
      link: '/analytics'
    }
  ];

  const handleExploreClick = (link) => {
    if (link.startsWith('http')) {
      window.location.href = link;
    } else {
      router.push(link);
    }
  };

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">AI-Powered Recruitment Tools</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our AI suite automates and enhances every step of your hiring process
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className={`${tool.color} p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-all`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${tool.color.replace('50', '100')}`}>
                  {tool.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{tool.title}</h3>
                  <p className="text-gray-600">{tool.description}</p>
                  <button 
                    onClick={() => handleExploreClick(tool.link)}
                    className="mt-4 text-indigo-600 hover:text-indigo-800 font-medium text-sm flex items-center gap-1"
                  >
                    Explore AI
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}