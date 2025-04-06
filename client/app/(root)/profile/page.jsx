'use client';
import { useState } from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const UserDashboard = () => {
  const router=useRouter()
  const handleResumeGeneration =()=>{
    router.push('http://localhost:3005/')
  }
  const handleInterviewGeneration =()=>{
    router.push('http://localhost:3002/')
  }
  const [activeTab, setActiveTab] = useState('overview');
  const [darkMode, setDarkMode] = useState(false);
  const [profile] = useState({
    name: 'Jayesh Jadhav',
    title: 'Senior Software Engineer',
    location: 'MITAOE Alandi',
    email: '14jayeshjadhav@gmail.com',
    phone: '+91 9833395113',
    linkedin: 'linkedin.com/in/',
    github: 'github.com/imjayeshjadhav',
    status: 'selected',
    resumeUrl: '/resumes/jayesh_resume.pdf',
    skills: ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'DSA'],
    interviewStats: {
      communication: 85,
      technical: 92,
      problemSolving: 88,
      culturalFit: 90,
      leadership: 75,
    },
    applications: [
      { company: 'TechCorp', position: 'Frontend Developer', status: 'selected', date: '2023-05-15' },
      { company: 'DataSystems', position: 'Full Stack Engineer', status: 'pending', date: '2023-06-02' },
      { company: 'CloudNine', position: 'DevOps Specialist', status: 'rejected', date: '2023-04-28' },
    ],
    upcomingInterviews: [
      { company: 'InnovateX', position: 'Technical Lead', date: '2023-07-10', time: '10:00 AM' },
      { company: 'DigitalFuture', position: 'Senior React Developer', date: '2023-07-15', time: '2:30 PM' },
    ]
  });

  const getStatusBadgeClass = (status) => {
    const classes = {
      selected: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-100',
      pending: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100',
      rejected: 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-100'
    };
    return `px-2.5 py-0.5 rounded-full text-xs font-medium ${classes[status]}`;
  };

  const skillsChartData = {
    labels: ['Communication', 'Technical', 'Problem Solving', 'Cultural Fit', 'Leadership'],
    datasets: [
      {
        label: 'Interview Scores (%)',
        data: Object.values(profile.interviewStats),
        backgroundColor: [
          'rgba(16, 185, 129, 0.7)',
          'rgba(59, 130, 246, 0.7)',
          'rgba(245, 158, 11, 0.7)',
          'rgba(139, 92, 246, 0.7)',
          'rgba(244, 63, 94, 0.7)',
        ],
        borderColor: [
          'rgba(16, 185, 129, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(139, 92, 246, 1)',
          'rgba(244, 63, 94, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const statusData = {
    labels: ['Selected', 'Pending', 'Rejected'],
    datasets: [
      {
        data: [3, 2, 1],
        backgroundColor: [
          'rgba(16, 185, 129, 0.7)',
          'rgba(245, 158, 11, 0.7)',
          'rgba(244, 63, 94, 0.7)',
        ],
        borderColor: [
          'rgba(16, 185, 129, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(244, 63, 94, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Chart options with dark mode support
  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: darkMode ? '#E5E7EB' : '#111827',
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.raw}%`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          color: darkMode ? '#9CA3AF' : '#6B7280',
          callback: function(value) {
            return value + '%';
          }
        },
        grid: {
          color: darkMode ? '#374151' : '#E5E7EB',
        }
      },
      x: {
        ticks: {
          color: darkMode ? '#9CA3AF' : '#6B7280',
        },
        grid: {
          color: darkMode ? '#374151' : '#E5E7EB',
        }
      }
    },
  };

  const doughnutChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: darkMode ? '#E5E7EB' : '#111827',
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.label}: ${context.raw} applications`;
          }
        }
      }
    },
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dark mode toggle */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-700'}`}
          >
            {darkMode ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>
        </div>

        {/* Profile Header */}
        <div className={`rounded-xl shadow-sm p-6 mb-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="relative">
              <img
                src="/podimg2.jpg"
                alt="Profile"
                className="w-20 h-20 rounded-full border-4 border-white shadow-md"
              />
              <span className="absolute bottom-0 right-0 bg-green-500 rounded-full w-5 h-5 border-2 border-white"></span>
            </div>
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{profile.name}</h1>
                  <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                    {profile.title} • {profile.location}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={getStatusBadgeClass(profile.status)}>
                    {profile.status.charAt(0).toUpperCase() + profile.status.slice(1)}
                  </span>
                  <p
                    onClick={handleResumeGeneration}
                    className={`inline-flex cursor-pointer items-center px-3 py-1 rounded-md text-sm font-medium ${darkMode ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-50 text-blue-700 hover:bg-blue-100'}`}
                  >
                    Check Your Resume
                  </p>
                  <p
                    onClick={handleInterviewGeneration}
                    className={`inline-flex cursor-pointer items-center px-3 py-1 rounded-md text-sm font-medium ${darkMode ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-50 text-blue-700 hover:bg-blue-100'}`}
                  >
                    Take an interview
                  </p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {profile.skills.slice(0, 5).map((skill) => (
                  <span
                    key={skill}
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${darkMode ? 'bg-blue-900 text-blue-100' : 'bg-blue-50 text-blue-700'}`}
                  >
                    {skill}
                  </span>
                ))}
                {profile.skills.length > 5 && (
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                    +{profile.skills.length - 5} more
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className={`mb-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'overview' ? 
                `${darkMode ? 'border-blue-500 text-blue-500' : 'border-blue-500 text-blue-600'}` : 
                `${darkMode ? 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-500' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('applications')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'applications' ? 
                `${darkMode ? 'border-blue-500 text-blue-500' : 'border-blue-500 text-blue-600'}` : 
                `${darkMode ? 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-500' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}`}
            >
              Applications
            </button>
            <button
              onClick={() => setActiveTab('interviews')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'interviews' ? 
                `${darkMode ? 'border-blue-500 text-blue-500' : 'border-blue-500 text-blue-600'}` : 
                `${darkMode ? 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-500' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}`}
            >
              Interviews
            </button>
            <button
              onClick={() => setActiveTab('documents')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'documents' ? 
                `${darkMode ? 'border-blue-500 text-blue-500' : 'border-blue-500 text-blue-600'}` : 
                `${darkMode ? 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-500' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}`}
            >
              Documents
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Personal Info Card */}
            <div className={`rounded-xl shadow-sm p-6 lg:col-span-1 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <h2 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Contact Information</h2>
              <div className="space-y-4">
                <div>
                  <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Email</p>
                  <p className={darkMode ? 'text-gray-100' : 'text-gray-900'}>{profile.email}</p>
                </div>
                <div>
                  <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Phone</p>
                  <p className={darkMode ? 'text-gray-100' : 'text-gray-900'}>{profile.phone}</p>
                </div>
                <div>
                  <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>LinkedIn</p>
                  <a href={`https://${profile.linkedin}`} className="text-blue-600 hover:underline dark:text-blue-400" target="_blank" rel="noopener noreferrer">
                    {profile.linkedin}
                  </a>
                </div>
                <div>
                  <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>GitHub</p>
                  <a href={`https://${profile.github}`} className="text-blue-600 hover:underline dark:text-blue-400" target="_blank" rel="noopener noreferrer">
                    {profile.github}
                  </a>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="lg:col-span-2 space-y-6">
              {/* Interview Performance */}
              <div className={`rounded-xl shadow-sm p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <h2 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Interview Performance</h2>
                <div className="h-64">
                  <Bar
                    data={skillsChartData}
                    options={barChartOptions}
                  />
                </div>
              </div>

              {/* Application Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`rounded-xl shadow-sm p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <h2 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Application Status</h2>
                  <div className="h-48">
                    <Doughnut
                      data={statusData}
                      options={doughnutChartOptions}
                    />
                  </div>
                </div>

                {/* Quick Stats */}
                <div className={`rounded-xl shadow-sm p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <h2 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>At a Glance</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className={`rounded-lg p-4 ${darkMode ? 'bg-emerald-900' : 'bg-emerald-50'}`}>
                      <p className={`text-sm font-medium ${darkMode ? 'text-emerald-200' : 'text-emerald-800'}`}>Selected</p>
                      <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-emerald-900'}`}>3</p>
                    </div>
                    <div className={`rounded-lg p-4 ${darkMode ? 'bg-amber-900' : 'bg-amber-50'}`}>
                      <p className={`text-sm font-medium ${darkMode ? 'text-amber-200' : 'text-amber-800'}`}>Pending</p>
                      <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-amber-900'}`}>2</p>
                    </div>
                    <div className={`rounded-lg p-4 ${darkMode ? 'bg-blue-900' : 'bg-blue-50'}`}>
                      <p className={`text-sm font-medium ${darkMode ? 'text-blue-200' : 'text-blue-800'}`}>Upcoming</p>
                      <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-blue-900'}`}>2</p>
                    </div>
                    <div className={`rounded-lg p-4 ${darkMode ? 'bg-rose-900' : 'bg-rose-50'}`}>
                      <p className={`text-sm font-medium ${darkMode ? 'text-rose-200' : 'text-rose-800'}`}>Rejected</p>
                      <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-rose-900'}`}>1</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'applications' && (
          <div className={`rounded-xl shadow-sm overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className={`px-6 py-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Your Applications</h2>
            </div>
            <div className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
              {profile.applications.map((app, index) => (
                <div key={index} className={`px-6 py-4 flex items-center justify-between ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                  <div>
                    <h3 className={`text-base font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{app.position}</h3>
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>{app.company}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={getStatusBadgeClass(app.status)}>
                      {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                    </span>
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{app.date}</span>
                    <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'interviews' && (
          <div className="space-y-6">
            <div className={`rounded-xl shadow-sm overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className={`px-6 py-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Upcoming Interviews</h2>
              </div>
              <div className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                {profile.upcomingInterviews.map((interview, index) => (
                  <div key={index} className={`px-6 py-4 flex items-center justify-between ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                    <div>
                      <h3 className={`text-base font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{interview.position}</h3>
                      <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>{interview.company}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{interview.date}</p>
                        <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>{interview.time}</p>
                      </div>
                      <button className={`inline-flex items-center px-3 py-1.5 border text-sm font-medium rounded-md ${darkMode ? 'border-gray-600 text-gray-100 bg-gray-700 hover:bg-gray-600' : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'}`}>
                        Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`rounded-xl shadow-sm p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <h2 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Interview Preparation Resources</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <a href="#" className={`group block p-4 border rounded-lg transition ${darkMode ? 'border-gray-700 hover:border-blue-500 hover:bg-gray-700' : 'border-gray-200 hover:border-blue-500 hover:bg-blue-50'}`}>
                  <h3 className={`font-medium group-hover:text-blue-700 ${darkMode ? 'text-white group-hover:text-blue-400' : 'text-gray-900'}`}>Technical Interview Guide</h3>
                  <p className={`text-sm group-hover:text-blue-600 ${darkMode ? 'text-gray-300 group-hover:text-blue-300' : 'text-gray-500'}`}>Prepare for coding challenges</p>
                </a>
                <a href="#" className={`group block p-4 border rounded-lg transition ${darkMode ? 'border-gray-700 hover:border-blue-500 hover:bg-gray-700' : 'border-gray-200 hover:border-blue-500 hover:bg-blue-50'}`}>
                  <h3 className={`font-medium group-hover:text-blue-700 ${darkMode ? 'text-white group-hover:text-blue-400' : 'text-gray-900'}`}>Behavioral Questions</h3>
                  <p className={`text-sm group-hover:text-blue-600 ${darkMode ? 'text-gray-300 group-hover:text-blue-300' : 'text-gray-500'}`}>Common questions and how to answer</p>
                </a>
                <a href="#" className={`group block p-4 border rounded-lg transition ${darkMode ? 'border-gray-700 hover:border-blue-500 hover:bg-gray-700' : 'border-gray-200 hover:border-blue-500 hover:bg-blue-50'}`}>
                  <h3 className={`font-medium group-hover:text-blue-700 ${darkMode ? 'text-white group-hover:text-blue-400' : 'text-gray-900'}`}>Company Research</h3>
                  <p className={`text-sm group-hover:text-blue-600 ${darkMode ? 'text-gray-300 group-hover:text-blue-300' : 'text-gray-500'}`}>Learn about your interviewers</p>
                </a>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'documents' && (
          <div className={`rounded-xl shadow-sm p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Your Documents</h2>
              <Link
                href="/uploadResume"
                className="text-[#0055ff] hover:text-blue-700 font-medium"
              >
                Upload new
              </Link>
            </div>
            
            <div className={`border rounded-lg overflow-hidden ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className={`px-4 py-3 flex items-center ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <div className="w-8/12 text-sm font-medium text-gray-500 dark:text-gray-400">Document</div>
                <div className="w-2/12 text-sm font-medium text-gray-500 dark:text-gray-400">Type</div>
                <div className="w-2/12 text-sm font-medium text-gray-500 dark:text-gray-400">Date</div>
                <div className="w-2/12"></div>
              </div>
              <div className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                <div className={`px-4 py-3 flex items-center ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                  <div className="w-8/12 flex items-center">
                    <svg className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <div className="ml-4">
                      <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Jayesh_jadhav.pdf</p>
                      <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>2.4 MB</p>
                    </div>
                  </div>
                  <div className="w-2/12">
                    <span className={`px-2 py-1 text-xs rounded-full ${darkMode ? 'bg-blue-900 text-blue-100' : 'bg-blue-100 text-blue-800'}`}>Resume</span>
                  </div>
                  <div className={`w-2/12 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>May 12, 2023</div>
                  <div className="w-2/12 flex justify-end space-x-2">
                    <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;