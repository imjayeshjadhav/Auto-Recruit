'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, User, Mail, Loader2 } from 'lucide-react';

const ResumeUploadPage = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Validate file type (PDF, DOC, DOCX)
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!validTypes.includes(selectedFile.type)) {
        setErrors({ ...errors, file: 'Please upload a PDF or Word document' });
        return;
      }

      // Validate file size (5MB max)
      if (selectedFile.size > 5 * 1024 * 1024) {
        setErrors({ ...errors, file: 'File size should be less than 5MB' });
        return;
      }

      setFile(selectedFile);
      setErrors({ ...errors, file: '' });

      // Create preview for PDF
      if (selectedFile.type === 'application/pdf') {
        setPreview(URL.createObjectURL(selectedFile));
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!userData.name.trim()) newErrors.name = 'Name is required';
    if (!userData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!file) newErrors.file = 'Resume is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API upload
      console.log('Uploading:', { file, userData });
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitSuccess(true);
      setFile(null);
      setPreview(null);
      setUserData({ name: '', email: '' });
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-950 text-white">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-400 via-pink-500 to-red-500 bg-clip-text text-transparent"
          >
            Upload Your Resume
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-gray-400"
          >
            Help us get to know you better by submitting your resume
          </motion.p>
        </div>

        {/* Upload Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gray-900 rounded-xl p-8 border border-gray-800"
        >
          {submitSuccess ? (
            <div className="text-center py-8">
              <div className="mx-auto flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-full mb-4">
                <FileText className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-xl font-medium mb-2">Resume Submitted Successfully!</h3>
              <p className="text-gray-400 mb-6">We'll review your qualifications and get back to you soon.</p>
              <button
                onClick={() => setSubmitSuccess(false)}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                Upload Another Resume
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-500" />
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={userData.name}
                      onChange={handleInputChange}
                      className={`pl-10 block w-full rounded-lg bg-gray-800 border ${errors.name ? 'border-red-500' : 'border-gray-700'} focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                      placeholder="John Doe"
                    />
                  </div>
                  {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-500" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={userData.email}
                      onChange={handleInputChange}
                      className={`pl-10 block w-full rounded-lg bg-gray-800 border ${errors.email ? 'border-red-500' : 'border-gray-700'} focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                      placeholder="your@email.com"
                    />
                  </div>
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                </div>
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Resume <span className="text-red-500">*</span>
                </label>
                <div className={`border-2 border-dashed rounded-lg p-6 text-center ${errors.file ? 'border-red-500' : 'border-gray-700'} hover:border-indigo-500 transition-colors`}>
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <Upload className="w-10 h-10 text-indigo-500" />
                    <div className="text-sm">
                      {file ? (
                        <p className="font-medium text-indigo-400">{file.name}</p>
                      ) : (
                        <>
                          <p className="font-medium">Drag and drop your resume here</p>
                          <p className="text-gray-400">or click to browse files</p>
                          <p className="text-xs text-gray-500 mt-2">PDF or Word document (max 5MB)</p>
                        </>
                      )}
                    </div>
                    <input
                      type="file"
                      id="resume-upload"
                      className="hidden"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                    />
                    <label
                      htmlFor="resume-upload"
                      className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg cursor-pointer transition-colors"
                    >
                      {file ? 'Change File' : 'Select File'}
                    </label>
                  </div>
                </div>
                {errors.file && <p className="mt-1 text-sm text-red-500">{errors.file}</p>}
                {preview && file?.type === 'application/pdf' && (
                  <div className="mt-4">
                    <p className="text-sm font-medium mb-2">Preview:</p>
                    <iframe
                      src={preview}
                      className="w-full h-64 border border-gray-700 rounded-lg"
                      title="Resume preview"
                    />
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${isSubmitting ? 'bg-indigo-700' : 'bg-gradient-to-r from-indigo-600 to-pink-500 hover:to-red-500'}`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="w-5 h-5" />
                      Submit Resume
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 bg-gradient-to-br from-indigo-900/40 to-gray-900 rounded-xl p-1"
        >
          <div className="bg-gray-900 rounded-xl p-6">
            <h3 className="text-lg font-bold mb-3">What happens next?</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center">
                    <span className="text-xs">1</span>
                  </div>
                </div>
                <span>Our AI will analyze your resume for key qualifications</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center">
                    <span className="text-xs">2</span>
                  </div>
                </div>
                <span>We'll match you with suitable job opportunities</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center">
                    <span className="text-xs">3</span>
                  </div>
                </div>
                <span>You'll receive feedback within 3 business days</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ResumeUploadPage;