// import { categoryIcons } from '@/utils/dictionaries';
// import { useState, useEffect } from 'react';

// const VideosFromCategory: React.FC<number> = ({ categoryId }) => {
//   return (
//     <div className="bg-white rounded-md shadow-md p-2 w-28 h-28">
//       <div className="text-gray-500 font-semibold mb-1 text-sm">
//         Popular videos in {categoryIcons[categoryId][1]}
//       </div>
//       <div className="aspect-w-16 aspect-h-9 rounded-md overflow-hidden relative">
//         <iframe
//           className="absolute inset-0 w-full h-full"
//           src="https://www.youtube.com/embed/YxLm0jmazq8"
//           title="This Chai Is Seriously ADDICTIVE"
//           frameborder="0"
//           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//           allowfullscreen
//         ></iframe>
//       </div>
//     </div>
//   );
// };

// export default VideosFromCategory;
'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';

const VideosFromCategory: React.FC<number> = ({ categoryId }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/videoCategories?part=id%2Csnippet&regionCode=IE&key=${process.env.NEXT_PUBLIC_API_KEY}`
      );

      const categories = response.data.items;

      const videoPromises = categories.map(async (category) => {
        const videoResponse = await axios.get(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=IE&videoCategoryId=${categoryId}&maxResults=2&key=${process.env.NEXT_PUBLIC_API_KEY}`
        );

        return videoResponse.data.items;
      });

      const videosByCategory = await Promise.all(videoPromises);

      setVideos(videosByCategory.flat());
    };

    fetchVideos();
  }, []);

  return (
    <div className="container mx-auto my-4">
      <h2 className="text-3xl font-bold mb-4">Trending Videos</h2>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
        {videos.map((video) => (
          <div key={video.id} className="rounded-lg overflow-hidden">
            <a
              href={`https://www.youtube.com/watch?v=${video.id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={video.snippet.thumbnails.high.url}
                alt={video.snippet.title}
                className="w-full h-48 object-cover"
              />
            </a>
            <div className="p-4 bg-white">
              <h3 className="text-lg font-bold mb-2">
                <a
                  href={`https://www.youtube.com/watch?v=${video.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {video.snippet.title}
                </a>
              </h3>
              <p className="text-gray-500">{video.snippet.channelTitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideosFromCategory;
