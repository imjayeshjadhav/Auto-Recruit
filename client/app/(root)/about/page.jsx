'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Cpu, FileText, GitCompare, MessageSquare, Send, ShieldCheck, Users } from 'lucide-react';

const AboutSection = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'workflow', label: 'Our Workflow' },
    { id: 'technology', label: 'Technology' },
  ];

  const workflowSteps = [
    {
      icon: <FileText className="w-6 h-6 text-indigo-500" />,
      title: "Upload JD/CV",
      description: "Users upload job descriptions and candidate resumes through our intuitive interface"
    },
    {
      icon: <Cpu className="w-6 h-6 text-pink-500" />,
      title: "Analysis Agents",
      description: "Our NLP-powered agents extract key information from documents"
    },
    {
      icon: <GitCompare className="w-6 h-6 text-purple-500" />,
      title: "Matching Engine",
      description: "Advanced algorithms compare JD requirements with CV qualifications"
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-blue-500" />,
      title: "Dummy Interview",
      description: "AI conducts preliminary interviews and evaluates responses"
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-green-500" />,
      title: "Feedback Generator",
      description: "Comprehensive reports on candidate strengths and weaknesses"
    },
    {
      icon: <Users className="w-6 h-6 text-yellow-500" />,
      title: "Shortlisting",
      description: "Automated ranking based on match scores and interview performance"
    },
    {
      icon: <Send className="w-6 h-6 text-red-500" />,
      title: "Interview Scheduling",
      description: "Automated invites and calendar coordination for next steps"
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-400 via-pink-500 to-red-500 bg-clip-text text-transparent"
          >
            Revolutionizing Recruitment
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-gray-400 max-w-3xl mx-auto"
          >
            Auto-Recruit combines AI-powered analysis with human insights to transform your hiring process, reducing time-to-hire by 70% while improving candidate quality.
          </motion.p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-gray-900 rounded-full p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-indigo-600 to-pink-500 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="mt-8">
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              <div>
                <h3 className="text-2xl font-bold mb-6">Intelligent Hiring Automation</h3>
                <p className="text-gray-400 mb-6">
                  Auto-Recruit is an end-to-end recruitment platform that leverages artificial intelligence to streamline every step of the hiring process. Our system eliminates manual screening while providing deeper insights into candidate potential.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="bg-indigo-500/20 p-2 rounded-lg mr-4">
                      <Code className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold">AI-Powered Analysis</h4>
                      <p className="text-gray-400 text-sm">Natural language processing to extract and understand key information from documents</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-pink-500/20 p-2 rounded-lg mr-4">
                      <GitCompare className="w-5 h-5 text-pink-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Smart Matching</h4>
                      <p className="text-gray-400 text-sm">Advanced algorithms that go beyond keyword matching to understand context</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-purple-500/20 p-2 rounded-lg mr-4">
                      <Users className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Candidate Experience</h4>
                      <p className="text-gray-400 text-sm">Interactive interview process with immediate feedback for candidates</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-indigo-900/40 via-pink-900/40 to-gray-900 rounded-2xl p-1">
                <div className="bg-gray-900 rounded-xl p-8 h-full">
                  <div className="relative h-80">
                    <div className="absolute top-0 left-0 w-32 h-32 bg-indigo-500/20 rounded-full filter blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-pink-500/20 rounded-full filter blur-3xl"></div>
                    <div className="relative h-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-600 to-pink-500 rounded-full mb-6 mx-auto">
                          <Code className="w-10 h-10 text-white" />
                        </div>
                        <h4 className="text-xl font-bold mb-2">70% Faster Hiring</h4>
                        <p className="text-gray-400">Average reduction in time-to-hire for our clients</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'workflow' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative">
                {/* Workflow line */}
                <div className="hidden md:block absolute left-16 top-0 h-full w-1 bg-gradient-to-b from-indigo-500 via-pink-500 to-red-500"></div>
                
                <div className="space-y-12">
                  {workflowSteps.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex flex-col md:flex-row group"
                    >
                      <div className="flex items-start md:w-32 justify-center md:justify-start">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-900 border-2 border-indigo-500/50 group-hover:bg-indigo-500/20 group-hover:border-indigo-500 transition-all">
                          {step.icon}
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0 md:ml-8 flex-1">
                        <div className="bg-gray-900 rounded-xl p-6 hover:bg-gray-800 transition-all">
                          <div className="flex items-center mb-2">
                            <span className="text-xs font-semibold px-2 py-1 bg-indigo-500/20 text-indigo-400 rounded-full mr-3">
                              Step {index + 1}
                            </span>
                            <h3 className="text-lg font-bold">{step.title}</h3>
                          </div>
                          <p className="text-gray-400">{step.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'technology' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid md:grid-cols-3 gap-8"
            >
              <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-indigo-500/50 transition-all">
                <div className="w-12 h-12 bg-indigo-500/20 rounded-lg flex items-center justify-center mb-4">
                  <Cpu className="w-6 h-6 text-indigo-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Natural Language Processing</h3>
                <p className="text-gray-400">
                  Our advanced NLP models extract and understand complex information from resumes and job descriptions, going beyond simple keyword matching.
                </p>
              </div>
              <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-pink-500/50 transition-all">
                <div className="w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center mb-4">
                  <GitCompare className="w-6 h-6 text-pink-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Matching Algorithms</h3>
                <p className="text-gray-400">
                  Proprietary scoring system that weights technical skills, experience, cultural fit, and potential to deliver optimal candidate matches.
                </p>
              </div>
              <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-purple-500/50 transition-all">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                  <MessageSquare className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Interview Analysis</h3>
                <p className="text-gray-400">
                  Real-time evaluation of candidate responses during video interviews, providing insights on communication skills and technical knowledge.
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;