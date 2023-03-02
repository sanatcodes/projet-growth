'use client'
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFilm,
  faCar,
  faMusic,
  faDog,
  faFootballBall,
  faPlane,
  faGamepad,
  faVideo,
  faUsers,
  faLaugh,
  faTheaterMasks,
  faNewspaper,
  faTshirt,
  faBook,
  faFlask,
  faFilm as faMovies,
  faTv,
  faStar,
  faGrin,
  faGlobeAmericas,
  faEye,
  faBrain,
  faTicketAlt,
} from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { APIResponse, CategoryDetailDonut } from '../../types/types';
import DonutChart from '@/components/DonutChart';



type CategoryIcons = Record<number, [IconDefinition, string]>;


const fetchData = async () => {
  try {
    const response = await fetch("http://127.0.0.1:8000/category/2023-02-27");
    const data:APIResponse[] = await response.json();
    console.log("fetch data", data);
    return data
  } catch (error) {
    console.log("error", error);
  }
};


export default  function CategoryDetail({params}) {
  const [res, setData] = useState<APIResponse[] | null>(null);
  const [transformedData, setTransformedData] = useState<CategoryDetailDonut[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData().then((data) => {
      if (data !== undefined) {
        console.log("use effect data", data);
        setData(data);
        const transData = data.map((item: APIResponse) => ({
          category_id: item.category_id,
          name: categoryIcons[item.category_id][1],
          views: item.views,
          likes: item.likes,
          videos: item.videos,
        }));
        setTransformedData(transData);
        setLoading(false);
      }
    });
  }, []);

  const { id } = params;

  //category icons and names dictionary
  const categoryIcons:CategoryIcons = {
    1: [faFilm, 'Film & Animation'],
    2: [faCar, 'Autos & Vehicles'],
    10: [faMusic, 'Music'],
    15: [faDog, 'Pets & Animals'],
    17: [faFootballBall, 'Sports'],
    19: [faPlane, 'Travel & Events'],
    20: [faGamepad, 'Gaming'],
    21: [faVideo, 'Videoblogging'],
    22: [faUsers, 'People & Blogs'],
    23: [faLaugh, 'Comedy'],
    24: [faTheaterMasks, 'Entertainment'],
    25: [faNewspaper, 'News & Politics'],
    26: [faTshirt, 'Howto & Style'],
    27: [faBook, 'Education'],
    28: [faFlask, 'Science & Technology'],
    30: [faMovies, 'Movies'],
    31: [faStar, 'Anime/Animation'],
    32: [faTv, 'Action/Adventure'],
    33: [faStar, 'Classics'],
    34: [faGrin, 'Comedy'],
    35: [faGlobeAmericas, 'Documentary'],
    36: [faEye, 'Drama'],
    37: [faBrain, 'Family'],
    38: [faTicketAlt, 'Foreign'],
    39: [faLaugh, 'Horror'],
    40: [faStar, 'Sci-Fi/Fantasy'],
    41: [faEye, 'Thriller'],
    42: [faTv, 'Shorts'],
    43: [faGlobeAmericas, 'Shows'],
    44: [faTicketAlt, 'Trailers'],
  }

  const[iconName, categoryName] = categoryIcons[id]

  // Transform data for visualzation 
  
  
  // current views 
  function extractFormattedData(data: any, categoryId: number): any | null {

    const categoryData = data.filter((category: any) => category.category_id == categoryId);
    if (!categoryData) {
      return null;
    }

    console.log("what data looks like",categoryData);
    
  
    const formatCount = (val: string) => {
      let count = parseInt(val);
      let unit = "";
    
      if (count >= 1000000000000) { // check if count is in trillions
        count = Math.round(count / 100000000000) / 10; // round to nearest trillion
        unit = "T"; // set unit to "t" for trillions
      } else if (count >= 1000000000) {
        count = Math.round(count / 100000000) / 10;
        unit = "B";
      } else if (count >= 1000000) {
        count = Math.round(count / 100000) / 10;
        unit = "M";
      } else if (count >= 1000) {
        count = Math.round(count / 100) / 10;
        unit = "K";
      }
    
      return `${count}${unit}`;
    };
    
  
    return {
      views: formatCount(categoryData[0].views),
      likes: formatCount(categoryData[0].videos),
      commentCount: formatCount(categoryData[0].likes),
    };
  }

  

  const catCurrentData = res ==  null ? {views: "na", comments:"na", likes: "na"}: extractFormattedData(res, id);

  
  return (
      <div className=" flex flex-col gap-20 justify-center items-center">
        <div className=" flex flex-row gap-10">
        <div className="flex justify-center items-center">
          <div className="flex flex-col items-center space-y-2">
            <div className="w-15 h-15 flex justify-center items-center ">
              <FontAwesomeIcon icon={iconName} size="lg" />
            </div>
            <h1 className="text-center text-xl">{categoryName}</h1>
          </div>
        </div>
        
        <div className="flex flex-wrap">
          <div className="w-1/3 p-4">
            <h1 className="text-2xl font-bold">Views</h1>
          </div>
          <div className="w-1/3 p-4">
            <h1 className="text-2xl font-bold">Videos</h1>
          </div>
          <div className="w-1/3 p-4">
            <h1 className="text-2xl font-bold">Likes</h1>
          </div>
          <div className="w-1/3 p-4">
            <h1 className="text-2xl font-bold">{catCurrentData.views}</h1>
          </div>
          <div className="w-1/3 p-4">
            <h1 className="text-2xl font-bold">{catCurrentData.likes}</h1>
          </div>
          <div className="w-1/3 p-4">
            <h1 className="text-2xl font-bold">{catCurrentData.commentCount}</h1>
          </div>
        </div>
        </div>

        {!loading && (
          <div className=''>
          <DonutChart categoryData={transformedData} comparisonType={"views"}/>
        </div>
        )}

        


      
      </div>
      
  )
  
}
