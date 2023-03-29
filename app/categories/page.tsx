'use client';
import { categoryIcons } from '@/utils/dictionaries';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { RiSearchLine } from 'react-icons/ri';
import { Category, APIResponse } from '../types/types';
import chroma from 'chroma-js';
import CircleButton from './components/CircleButton';

type Props = {};

const Categories: React.FC<Props> = () => {
  const initialColors = [
    '#F3FD02', // Yellow
    '#0ABEF5', // Blue
    '#E27525', // Orange
    '#F50ABE', // Pink
    '#F2D600', //a slightly darker, more golden yellow
    '#0098DB', //(a slightly darker, more muted blue),
    '#FF5722', //(a brighter, more intense orange)
    '#E91E63', //(a brighter, more intense pink)
  ];
  const region = 'IE';
  const [categories, setCategories] = useState<Category[]>([]);
  const [originalCategories, setOriginalCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const today = new Date().toISOString().substring(0, 10);
  const [colors, setColors] = useState<string[]>([]);

  // write the name of colour next to hex code in a comment

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentData = await fetch(
          `https://floating-hollows-40011.herokuapp.com/category/${today}`
        );
        const currentResponse = await currentData.json();

        const currentRes = currentResponse.filter(
          (item) => item.category_id !== '19' && item.category_id !== '27'
        );

        setCategories(
          currentRes.map((item) => ({
            id: item.category_id,
            snippet: { title: categoryIcons[parseInt(item.category_id)][1] },
          }))
        );
        setOriginalCategories(
          currentRes.map((item: APIResponse) => ({
            id: item.category_id,
            snippet: { title: categoryIcons[parseInt(item.category_id)][1] },
          }))
        );
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    const col = chroma
      .scale(initialColors)
      .mode('lch')
      .colors(categories.length > 15 ? categories.length : 15);
    setColors(col);
    // console.log(col);
    console.log(categories);

    fetchData();
  }, [today]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    <div className="text-center mt-10">
      <h1 className="text-xl font-medium">Categories on YouTube</h1>
      <div className="relative mt-6 mx-auto w-64">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <RiSearchLine />
        </span>
        <input
          type="text"
          placeholder="Search"
          onChange={handleSearch}
          className="pl-10 pr-4 py-2 w-full rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-purple-600 text-white"
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
      <div className="nav-buttons-wrapper"></div>
      <div className="buttons-container max-h-[calc(100vh-10rem)] overflow-y-auto overflow-x-hidden mt-6">
        <div className="grid gap-6 place-items-center grid-cols-fluid">
          {categories.map((category: Category, index) => {
            return (
              <Link key={category.id} href={`/categories/${category.id}`}>
                <button
                  className={`text-black font-medium rounded-full p-5 mt-10 w-40 h-40 transition duration-300 ease-in-out transform hover:shadow-lg hover:bg-[#ccc] active:scale-95`}
                  style={{ backgroundColor: colors[index] }}
                >
                  {category.snippet.title}
                </button>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Categories;
