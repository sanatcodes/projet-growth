import React from 'react';
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
import { useRouter } from 'next/router'


type CategoryIcons = Record<number, [IconDefinition, string]>;

export default async function CategoryDetail({params}) {
  const today = new Date();
  const yt_data_path = `http://127.0.0.1:8000/category/${today.toISOString().slice(0, 10)}`
  const data = await fetch(yt_data_path)
  const res = await data.json();

  const { id } = params;
  // can you also add the category name to the object below like this 1: [faFilm, "Film & Animation"]
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
  


  // current views 
  function extractFormattedData(data: any, categoryId: number): any | null {

    const categoryData = data.filter((category: any) => category.category_id == categoryId);
    if (!categoryData) {
      return null;
    }

    console.log(categoryData);
    
  
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

  const catCurrentData = extractFormattedData(res, id);

  const[iconName, categoryName] = categoryIcons[id]
  
  return (
      <div className=" flex gap-20 justify-center items-center">
        <div className=" flex-initial w-25 flex-col ">
          <div className=" w-20 flex">
            <FontAwesomeIcon icon={iconName}/>
          </div>
          <h1>{categoryName}</h1>
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
  )
  
}
