'use client';
import { useEffect, useState } from 'react';
import { RiSearchLine } from 'react-icons/ri';
import { Category, APIResponse } from '../types/types';
import CircleButton from './CircleButton';

type Props = {};

const Categories: React.FC<Props> = () => {
  const region = 'IE';
  const [categories, setCategories] = useState<Category[]>([]);
  const [originalCategories, setOriginalCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentData, setcurrentData] = useState<APIResponse[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [categoriesData, currentData] = await Promise.all([
        fetch(
          `https://youtube.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=${region}&key=${process.env.NEXT_PUBLIC_API_KEY}`
        ),
        fetch('http://127.0.0.1:8000/category/2023-02-27'),
      ]);

      const [categoriesRes, currentRes] = await Promise.all([
        categoriesData.json(),
        currentData.json(),
      ]);

      // Get the category IDs from currentData
      const categoryIds = currentRes.map(
        (item: APIResponse) => item.category_id
      );

      // Filter categories based on their IDs
      const filteredCategories = categoriesRes.items.filter(
        (category: Category) => {
          return categoryIds.includes(category.id);
        }
      );

      setCategories(filteredCategories);
      setOriginalCategories(filteredCategories);
      setcurrentData(currentRes);
      setLoading(false);
    };

    fetchData();
  }, []);

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
    <div className="text-center">
      <h1 className="text-xl font-medium">Categories on YouTube</h1>
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
        {categories.map((category: Category) => (
          <CircleButton
            key={category.id}
            category={category.snippet.title}
            id={category.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Categories;
