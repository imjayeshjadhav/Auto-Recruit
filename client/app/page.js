// app/page.jsx
'use client';

import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import FeaturesGrid from '@/components/FeaturesGrid';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

export default function Home() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const stats = [
    { value: '85%', label: 'Faster Hiring' },
    { value: '3.5x', label: 'More Qualified Candidates' },
    { value: '92%', label: 'Reduced Bias' },
    { value: '40%', label: 'Cost Savings' }
  ];

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="relative z-10 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
            >
              <span className="bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
                AI-Powered
              </span> <br />
              Recruitment Solutions
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto mb-10"
            >
              Transform your hiring process with our intelligent recruitment platform that leverages artificial intelligence to find, assess, and hire top talent faster.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <button className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-pink-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all">
                Get Started
              </button>
              <button className="px-8 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all">
                See How It Works
              </button>
            </motion.div>
          </div>
        </div>
        
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-pink-100 rounded-full filter blur-3xl transform scale-150"></div>
        </div>
      </section>

      {/* Stats Section */}
      {/* <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-gray-50 rounded-xl"
              >
                <p className="text-4xl font-bold text-indigo-600 mb-2">{stat.value}</p>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* How It Works */}
      <section className="py-20 bg-gray-50 -mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How Our AI Recruitment Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform automates the entire hiring process while maintaining human touchpoints
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Smart Sourcing",
                description: "AI scans multiple platforms to find candidates matching your requirements",
                icon: "🔍"
              },
              {
                title: "Automated Screening",
                description: "Natural language processing evaluates resumes and cover letters",
                icon: "🤖"
              },
              {
                title: "Bias-Free Selection",
                description: "Algorithms focus purely on skills and qualifications",
                icon: "⚖️"
              },
              {
                title: "Video Interviews",
                description: "AI analyzes verbal and non-verbal communication",
                icon: "🎥"
              },
              {
                title: "Skill Assessments",
                description: "Automated tests evaluate technical abilities",
                icon: "📝"
              },
              {
                title: "Final Selection",
                description: "Comprehensive scoring system ranks top candidates",
                icon: "🏆"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.floor(index/2) * 0.2 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-pink-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-white mb-6"
          >
            Ready to Transform Your Hiring?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-indigo-100 max-w-3xl mx-auto mb-8"
          >
            Join hundreds of companies already revolutionizing their recruitment with AI
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            <button className="px-8 py-3 bg-white text-indigo-600 font-medium rounded-lg shadow-lg hover:bg-gray-100 transition-all">
              Request Demo
            </button>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <FeaturesGrid />

      {/* Footer */}
      <Footer />
    </div>
  );
}