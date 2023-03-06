'use client';
import { Calistoga } from '@next/font/google';
import { Category, Props } from '../types/types';
import React, { useState, useEffect } from 'react';
import CircleButton from './CircleButton';
import Link from 'next/link';
import { RiSearchLine } from 'react-icons/ri';

export default function Categories() {
  const region = 'IE';
  const [categories, setCategories] = useState([]);
  const [originalCategories, setOriginalCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        `https://youtube.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=${region}&key=${process.env.NEXT_PUBLIC_API_KEY}`
      );
      const res = await data.json();
      setCategories(res.items);
      setOriginalCategories(res.items);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    const filteredCategories = originalCategories.filter((category) =>
      category.snippet.title.toLowerCase().includes(query)
    );
    setCategories(filteredCategories);
  };

  const handleClearSearch = () => {
    setCategories(originalCategories);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="text-center">
      <h1 className="text-xl font-medium">Categories</h1>
      <div className="relative mt-6 mx-auto w-64">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <RiSearchLine />
        </span>
        <input
          type="text"
          placeholder="Search"
          onChange={handleSearch}
          className="pl-10 pr-4 py-2 w-full rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-purple-600 text-black"
        />
        {categories.length !== originalCategories.length && (
          <button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-gray-400 hover:text-gray-600 focus:outline-none"
            onClick={handleClearSearch}
          >
            Clear
          </button>
        )}
      </div>
      <div className="grid gap-6 place-items-center mt-6 grid-cols-fluid">
        {categories.map((video) => (
          <CircleButton
            key={video.id}
            category={video.snippet.title}
            id={video.id}
          />
        ))}
      </div>
    </div>
  );
}
