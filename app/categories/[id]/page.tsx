'use client';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  APIResponse,
  CategoryDetailDonut,
  PredictionAPIResponse,
  Video,
} from '../../types/types';
import DonutChartWithCategory from '@/app/categories/[id]/components/DonutChartWithCategory';
import LineChart from '@/app/categories/[id]/components/LineChart';
import { extractFormattedData } from '@/utils/helpful_funcs';
import { categoryIcons } from '@/utils/dictionaries';
import {
  fetchCategoryData,
  fetchWeekData,
  fetchWeekPrediction,
  getPopularVideosByCategory,
} from '@/pages/api/categoriesDetailAPI';
import VideosFromCategory from './components/VideosFromCategory';
import TagCloud from './components/TagCloud';
import LineChartButtons from './components/LineChartButtons';
import ComparisonTable from './components/ComparisonTable';

// async function getCategoryData() {
//   const today = new Date().toISOString().slice(0, 10);
//   const currentData = await fetch(
//     `https://floating-hollows-40011.herokuapp.com/category/${today}`
//   );
//   const currentRes = await currentData.json();
//   return currentRes;
// }

type Params = {
  params: {
    id: string;
  };
};

export default function CategoryDetail({ params: { id } }: Params) {
  const today = new Date().toISOString().substring(0, 10);
  const [res, setData] = useState<APIResponse[] | null>(null);
  const [weekData, setWeekData] = useState<APIResponse[] | null>(null);
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
  const [videoData, setVideoData] = useState<Video[]>([]);

  const catID = parseInt(id);

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
      fetchWeekPrediction(id, today, 2),
      fetchWeekData(today),
      getPopularVideosByCategory(id),
    ])
      .then(([data, twoWeekPrediction, weekData, videoData]) => {
        if (data !== null) {
          setData(data);
          console.log(data);
          
          //transform data for donut chart
          const transData = data.map((item: APIResponse) => ({
            category_id: item.category_id,
            name: categoryIcons[parseInt(item.category_id)][1],
            views: item.views,
            likes: item.likes,
            videos: item.videos,
          }));
          setTransformedData(transData);
        }
        setWeekPrediction(twoWeekPrediction);
        setWeekData(weekData);
        setVideoData(videoData.videos);
        setLoading(false);
        console.log('week data ', weekData);
      })
      .catch((error) => {
        console.log('error', error);
        setLoading(false);
      });
  }, [id, today]);

  // 1: this week 2: next week 3: two weeks
  useEffect(() => {
    if (lineChartType === 0) {
      setLineChartData(
        weekData?.filter((d: APIResponse) => d.category_id === id) || []
      );
    } else if (lineChartType === 1) {
      setLineChartData(weekPrediction?.slice(0, 7) || []);
    } else {
      setLineChartData(weekPrediction || []);
    }
  }, [lineChartType, id, weekData, weekPrediction]);

  const [iconName, categoryName] = categoryIcons[catID];

  const catCurrentData =
    res == null
      ? { views: 'na', comments: 'na', likes: 'na' }
      : extractFormattedData(res, catID);

  return (
    <div className=" flex flex-col gap-20 justify-center items-center">
      <div className=" flex flex-row gap-10">
        <div className="flex flex-col justify-center items-center gap-2">
          <FontAwesomeIcon className=" text-3xl mr-2" icon={iconName} />
          <h1 className="text-center text-3xl">{categoryName}</h1>
        </div>

        <ComparisonTable
          comparisonType={comparisonType}
          catCurrentData={catCurrentData}
          handleViewsClick={handleViewsClick}
          handleVideosClick={handleVideosClick}
          handleLikesClick={handleLikesClick}
        />

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
          <LineChartButtons
            lineChartType={lineChartType}
            setLineChartType={setLineChartType}
          />

          <div className=" w-1/2 items-center gap-6 justify-center flex flex-row">
            <VideosFromCategory categoryId={catID} videos={videoData} />
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
          {/* word cloud with popular tags */}
          <div className=" w-full">
            <h1 className="text-center mb-5 text-3xl">{`Popular tags in ${categoryName}`}</h1>
            <TagCloud videos={videoData} />
          </div>
        </div>
      )}
    </div>
  );
}

export async function generateStaticParams() {
  const today = new Date().toISOString().slice(0, 10);
  const categories = await fetch(
    `https://floating-hollows-40011.herokuapp.com/category/${today}`
  ).then((res) => res.json());
  return categories.map((category: APIResponse) => ({
    id: category.category_id.toString(),
  }));
}
