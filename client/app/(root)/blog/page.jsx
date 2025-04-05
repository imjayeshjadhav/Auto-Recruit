'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Search, Tag, User, ExternalLink, ImageOff } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const BlogSection = () => {
  // ... [keep all your existing state and functions] ...

  // Modify the news article mapping to handle images
  const allPosts = [
    ...blogPosts,
    ...newsArticles.map((article, index) => ({
      id: `news-${index}`,
      title: article.title,
      excerpt: article.description || 'Read more about this industry news...',
      category: 'news',
      date: article.publishedAt,
      readTime: '3 min',
      author: article.author || article.source?.name || 'Industry News',
      url: article.url,
      imageUrl: article.image || article.urlToImage || null,
      isExternal: true,
      tags: ['News', 'Industry'],
      source: article.source
    }))
  ];

  // ... [keep all your existing code until the return statement] ...

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-950 text-white">
      {/* ... [keep header and filter sections] ... */}

      {/* Blog Posts Grid */}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <motion.article
              key={post.id || post.url}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ y: -5 }}
              className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-indigo-500/50 transition-all relative"
            >
              {post.isExternal ? (
                <a 
                  href={post.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block h-full"
                >
                  <div className="h-full flex flex-col">
                    {/* News source badge */}
                    {post.source?.name && (
                      <div className="absolute top-4 right-4 bg-indigo-600 text-white text-xs px-2 py-1 rounded z-10">
                        {post.source.name}
                      </div>
                    )}
                    
                    {/* Image section */}
                    <div className="relative h-48 w-full">
                      {post.imageUrl ? (
                        <Image
                          src={post.imageUrl}
                          alt={post.title}
                          fill
                          className="object-cover"
                          quality={80}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.nextElementSibling.style.display = 'flex';
                          }}
                        />
                      ) : (
                        <div className="h-full bg-gradient-to-br from-indigo-900/30 to-gray-900 flex items-center justify-center">
                          <ImageOff className="w-12 h-12 text-gray-600" />
                        </div>
                      )}
                      {/* Fallback if image fails to load */}
                      <div 
                        className="hidden h-full w-full bg-gradient-to-br from-indigo-900/30 to-gray-900 absolute inset-0 items-center justify-center"
                        style={{ display: post.imageUrl ? 'none' : 'flex' }}
                      >
                        <ImageOff className="w-12 h-12 text-gray-600" />
                      </div>
                    </div>

                    {/* Content section */}
                    <div className="p-6 flex-1 flex flex-col">
                      <span className="inline-block px-3 py-1 text-xs font-semibold bg-indigo-500/20 text-indigo-400 rounded-full mb-3 self-start">
                        {post.category === 'news' ? 'Industry News' : post.category}
                      </span>
                      <h3 className="text-xl font-bold mb-3 hover:text-indigo-400 transition-colors flex items-start">
                        {post.title}
                        {post.isExternal && <ExternalLink className="w-4 h-4 ml-2 mt-1 text-gray-500" />}
                      </h3>
                      <p className="text-gray-400 mb-4 flex-1">
                        {post.excerpt.length > 120 ? `${post.excerpt.substring(0, 120)}...` : post.excerpt}
                      </p>
                      {/* ... [keep the rest of your post content] ... */}
                    </div>
                  </div>
                </a>
              ) : (
                <Link href={`/blog/${post.id}`} className="block h-full">
                  {/* Similar structure for internal posts */}
                </Link>
              )}
            </motion.article>
          ))}
        </div>
      )}

      {/* ... [keep the rest of your component] ... */}
    </section>
  );
};

export default BlogSection;