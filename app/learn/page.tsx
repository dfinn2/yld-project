'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar'; // Adjust the import path as necessary
import articlesData from '../../data/articles.json'; // Adjust the import path as necessary

const Learn = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    setArticles(articlesData);
  }, []);

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen p-6 bg-lightBackground">
      <Navbar />
      <h1 className="text-4xl font-bold text-center mb-8">Learn</h1>
      <div className="max-w-2xl mx-auto">
        <input
          type="text"
          placeholder="Search for topics..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-6 focus:outline-none focus:ring-2 focus:ring-[#1ce4ff]"
        />
        <div className="space-y-4">
          {filteredArticles.map(article => (
            <div key={article.id} className="p-4 border border-gray-300 rounded shadow">
              <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
              <p>{article.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Learn;
