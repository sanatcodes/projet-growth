'use client';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  APIResponse,
  CategoryDetailDonut,
  PredictionAPIResponse,
} from '../../types/types';
import DonutChartWithCategory from '@/components/DonutChartWithCategory';
import LineChart from '@/components/LineChart';
import { extractFormattedData } from '@/utils/helpful_funcs';
import { categoryIcons } from '@/utils/dictionaries';
import {
  fetchCategoryData,
  fetchCategoryPrediction,
  fetchWeekData,
  fetchWeekPrediction,
} from '@/pages/api/categoriesDetailAPI';
import VideosFromCategory from './VideosFromCategory';

// fetchPredictionData = async () => {};

export default function CategoryDetail({ params }) {
  const today = new Date().toISOString().substring(0, 10);
  const [res, setData] = useState<APIResponse[] | null>(null);
  const [weekData, setWeekData] = useState<APIResponse[] | undefined>(
    undefined
  );
  const [transformedData, setTransformedData] = useState<
    CategoryDetailDonut[] | null
  >(null);
  const [loading, setLoading] = useState(true);
  const [comparisonType, setComparisonType] = useState<
    'views' | 'likes' | 'videos'
  >('views');
  const [lineChartType, setLineChartType] = useState(0);
  const [weekPrediction, setWeekPrediction] = useState<
    PredictionAPIResponse[] | null
  >(null);
  const [lineChartData, setLineChartData] = useState<
    PredictionAPIResponse[] | APIResponse[] | [] | null
  >([]);

  const { id } = params;

  const handleViewsClick = () => {
    setComparisonType('views');
  };

  const handleVideosClick = () => {
    setComparisonType('videos');
  };

  const handleLikesClick = () => {
    setComparisonType('likes');
  };

  useEffect(() => {
    Promise.all([
      fetchCategoryData(today),
      fetchWeekPrediction('1', today, 2),
      fetchWeekData(today),
    ])
      .then(([data, twoWeekPrediction, weekData]) => {
        if (data !== undefined) {
          setData(data);
          const transData = data.map((item: APIResponse) => ({
            category_id: item.category_id,
            name: categoryIcons[item.category_id][1],
            views: item.views,
            likes: item.likes,
            videos: item.videos,
          }));
          setTransformedData(transData);
        }
        setWeekPrediction(twoWeekPrediction);
        console.log('this is the prediction', twoWeekPrediction);

        setWeekData(weekData);
        setLoading(false);
      })
      .catch((error) => {
        console.log('error', error);
        setLoading(false);
      });
  }, []);

  // 1: this week 2: next week 3: two weeks
  useEffect(() => {
    if (lineChartType == 0) {
      setLineChartData(
        weekData?.filter((d: APIResponse) => d.category_id == id) || []
      );
    } else if (lineChartType == 1) {
      setLineChartData(weekPrediction?.slice(0, 7) || []);
    } else {
      setLineChartData(weekPrediction);
    }
  }, [lineChartType, id, weekData, weekPrediction]);

  const [iconName, categoryName] = categoryIcons[id];

  const catCurrentData =
    res == null
      ? { views: 'na', comments: 'na', likes: 'na' }
      : extractFormattedData(res, id);

  return (
    <div className=" flex flex-col gap-20 justify-center items-center">
      <div className=" flex flex-row gap-10">
        <div className="flex flex-col justify-center items-center gap-2">
          <FontAwesomeIcon className=" text-3xl mr-2" icon={iconName} />
          <h1 className="text-center text-3xl">{categoryName}</h1>
        </div>

        <div className="flex flex-wrap">
          <div
            className={`w-1/3 p-4 cursor-pointer ${
              comparisonType === 'views' ? 'border-b-4 border-purple-500' : ''
            }`}
            onClick={handleViewsClick}
          >
            <h1 className="text-2xl font-bold text-center">Views</h1>
          </div>
          <div
            className={`w-1/3 p-4 cursor-pointer ${
              comparisonType === 'videos' ? 'border-b-4 border-purple-500' : ''
            }`}
            onClick={handleVideosClick}
          >
            <h1 className="text-2xl font-bold text-center">Videos</h1>
          </div>
          <div
            className={`w-1/3 p-4 cursor-pointer ${
              comparisonType === 'likes' ? 'border-b-4 border-purple-500' : ''
            }`}
            onClick={handleLikesClick}
          >
            <h1 className="text-2xl font-bold text-center">Likes</h1>
          </div>
          <div className="w-1/3 p-4">
            <h1 className="text-2xl text-center font-bold">
              {catCurrentData.views}
            </h1>
          </div>
          <div className="w-1/3 p-4">
            <h1 className="text-2xl text-center font-bold">
              {catCurrentData.likes}
            </h1>
          </div>
          <div className="w-1/3 p-4">
            <h1 className="text-2xl text-center font-bold">
              {catCurrentData.commentCount}
            </h1>
          </div>
        </div>
        {!loading && (
          <div className=" w-1/6">
            <DonutChartWithCategory
              categoryData={transformedData}
              comparisonType={comparisonType}
              category={categoryName}
            />
          </div>
        )}
      </div>

      {!loading && (
        <div className=" w-screen flex flex-col items-center gap-10">
          <div className="flex gap-4 justify-center">
            <button
              className={`px-4 py-2 ${
                lineChartType === 0 ? 'bg-purple-700 text-white' : 'bg-gray-600'
              } rounded-lg`}
              onClick={() => setLineChartType(0)}
            >
              This Week
            </button>
            <button
              className={`px-4 py-2 ${
                lineChartType === 1 ? 'bg-purple-700 text-white' : 'bg-gray-600'
              } rounded-lg`}
              onClick={() => setLineChartType(1)}
            >
              NextWeek
            </button>
            <button
              className={`px-4 py-2 ${
                lineChartType === 2 ? 'bg-purple-700 text-white' : 'bg-gray-600'
              } rounded-lg`}
              onClick={() => setLineChartType(2)}
            >
              2 Weeks
            </button>
          </div>

          <div className=" w-1/2 items-center justify-center flex flex-row">
            {/* <VideosFromCategory categoryId={id} /> */}
            <LineChart
              data={lineChartData}
              categoryId={id}
              comparisonType={
                lineChartType == 0
                  ? comparisonType
                  : `${comparisonType}_prediction`
              }
            />
          </div>
        </div>
      )}
    </div>
  );
}
