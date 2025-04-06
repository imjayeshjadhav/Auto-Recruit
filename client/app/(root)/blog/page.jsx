'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Search, Tag, User, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Constants should be defined at the top of the file
const CATEGORIES = [
  { id: 'all', name: 'All Articles' },
  { id: 'news', name: 'Industry News' },
  { id: 'ai', name: 'AI Recruitment' },
  { id: 'tips', name: 'Hiring Tips' },
];

const STATIC_POSTS = [
  {
    id: 1,
    title: 'How AI is Transforming the Recruitment Process',
    excerpt: 'Explore how machine learning algorithms are reducing hiring bias and improving candidate matching...',
    category: 'ai',
    date: new Date().toISOString(),
    readTime: '5 min',
    author: 'Sarah Johnson',
    tags: ['AI', 'Machine Learning', 'Automation'],
    imageUrl: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
  },
  {
    id: 2,
    title: 'The Future of Remote Hiring',
    excerpt: 'How companies are adapting their hiring processes for a remote-first world...',
    category: 'tips',
    date: '2024-03-10',
    readTime: '4 min',
    author: 'Michael Chen',
    tags: ['Remote Work', 'Hiring', 'Productivity'],
    imageUrl: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
  },
  {
    id: 3,
    title: 'Best Practices for Technical Interviews',
    excerpt: 'Learn the most effective strategies for conducting technical interviews...',
    category: 'tips',
    date: '2024-03-08',
    readTime: '6 min',
    author: 'David Kumar',
    tags: ['Technical', 'Interviews', 'Best Practices'],
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
  },
];

const CATEGORY_IMAGES = {
  ai: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  news: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  tips: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  default: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
};

// Utility functions
const getPlaceholderImage = (category) => {
  return CATEGORY_IMAGES[category] || CATEGORY_IMAGES.default;
};

const formatDate = (dateString) => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Invalid date';
    
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    
    return `${month}/${day}/${year}`;
  } catch {
    return 'Invalid date';
  }
};

// PostCard component should be defined separately
const PostCard = ({ post }) => {
  // For external posts, we'll make the entire card clickable
  if (post.isExternal) {
    return (
      <a 
        href={post.url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="h-full flex flex-col focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-xl"
      >
        <CardContent post={post} isExternal={true} />
      </a>
    );
  }

  // For internal posts, use Next.js Link
  return (
    <Link 
      href={`/blog/${post.id}`}
      className="h-full flex flex-col focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-xl"
    >
      <CardContent post={post} isExternal={false} />
    </Link>
  );
};

// CardContent contains the actual card UI
const CardContent = ({ post, isExternal }) => (
  <div className="h-full flex flex-col bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-indigo-500/50 transition-all group">
    <div className="h-48 relative overflow-hidden">
      <img
        src={post.imageUrl}
        alt={post.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        onError={(e) => {
          e.target.src = getPlaceholderImage(post.category);
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
      {isExternal && (
        <div className="absolute top-2 right-2 bg-indigo-600 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
          <ExternalLink className="w-3 h-3" />
          External
        </div>
      )}
    </div>
    <div className="p-6 flex-1 flex flex-col">
      <span className="inline-block px-3 py-1 text-xs font-semibold bg-indigo-500/20 text-indigo-400 rounded-full mb-3 self-start">
        {post.category === 'news' ? 'Industry News' : post.category}
      </span>
      <h3 className="text-xl font-bold mb-3 text-white group-hover:text-indigo-400 transition-colors">
        {post.title}
      </h3>
      <p className="text-gray-400 mb-4 flex-1">
        {post.excerpt.length > 120 ? `${post.excerpt.substring(0, 120)}...` : post.excerpt}
      </p>
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center space-x-2">
          <User className="h-4 w-4" />
          <span>{post.author}</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(post.date)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{post.readTime}</span>
          </div>
        </div>
      </div>
      {post.tags && (
        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.map(tag => (
            <span key={tag} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-800 text-gray-300">
              <Tag className="h-3 w-3 mr-1" />
              {tag}
            </span>
          ))}
        </div>
      )}
      <div className="mt-4 text-indigo-400 text-sm font-medium flex items-center gap-1 group-hover:text-indigo-300">
        {isExternal ? (
          <>
            Read on source <ExternalLink className="w-4 h-4" />
          </>
        ) : (
          'Read more →'
        )}
      </div>
    </div>
  </div>
);

// Main BlogSection component
const BlogSection = () => {
  const [posts, setPosts] = useState(STATIC_POSTS);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExternalNews = async () => {
      setLoading(true);
      try {
        // Check for cached data
        const cachedData = localStorage.getItem('blogPosts');
        const cachedTime = localStorage.getItem('blogPostsTime');
        
        if (cachedData && cachedTime && (Date.now() - parseInt(cachedTime)) < 1800000) {
          setPosts([...STATIC_POSTS, ...JSON.parse(cachedData)]);
          setLoading(false);
          return;
        }

        const res = await fetch(
          `https://gnews.io/api/v4/search?q=recruitment OR "HR tech"&lang=en&max=3&token=77b834ad39c028b1e6856581a6383b05`
        );
        
        if (!res.ok) throw new Error('Failed to fetch');
        
        const data = await res.json();
        const articles = (data.articles || []).map((article, index) => ({
          id: `news-${index}`,
          title: article.title,
          excerpt: article.description || 'Read more about this industry news...',
          category: 'news',
          date: article.publishedAt,
          readTime: '3 min',
          author: article.source?.name || 'Industry News',
          tags: ['News', 'Industry'],
          imageUrl: article.image || getPlaceholderImage('news'),
          url: article.url,
          isExternal: true,
        }));

        // Cache results
        localStorage.setItem('blogPosts', JSON.stringify(articles));
        localStorage.setItem('blogPostsTime', Date.now().toString());

        setPosts([...STATIC_POSTS, ...articles]);
      } catch (e) {
        console.error('Error fetching news:', e);
        setPosts(STATIC_POSTS);
      } finally {
        setLoading(false);
      }
    };

    fetchExternalNews();
  }, []);

  const filteredPosts = posts.filter(post => {
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = !searchLower || 
      post.title.toLowerCase().includes(searchLower) ||
      post.excerpt.toLowerCase().includes(searchLower) ||
      post.tags?.some(tag => tag.toLowerCase().includes(searchLower));
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-indigo-400 via-pink-500 to-red-500 bg-clip-text text-transparent"
        >
          Insights & Innovations
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center text-lg text-gray-400 mb-12"
        >
          Explore our latest thoughts, research, and trends
        </motion.p>

        <div className="flex flex-col md:flex-row justify-between gap-4 mb-10">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat.id ? 'bg-gradient-to-r from-indigo-600 to-pink-500 text-white' : 'bg-gray-900 text-gray-400 hover:bg-gray-800'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-900 h-96 rounded-xl border border-gray-800"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map(post => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <PostCard post={post} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogSection;