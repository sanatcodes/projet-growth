import { Video } from '@/app/types/types';
import React from 'react';
import Image from 'next/image';
import { categoryIcons } from '@/utils/dictionaries';

interface Props {
  categoryId: number;
  videos: Video[];
}

const VideosFromCategory: React.FC<Props> = ({ categoryId, videos }) => {
  return (
    <div className="flex flex-col gap-4 items-center w-">
      <h2 className="text-xl font-sans mb-4 ">
        <span className="font-normal">{`Popular videos in `}</span>
        <span className="font-bold block  text-center">
          {categoryIcons[categoryId][1]}
        </span>
      </h2>
      {videos.slice(0, 2).map((video) => (
        <>
          <button
            className="flex gap-4 items-center p-2 rounded-lg cursor-pointer hover:bg-gray-900 transition-colors duration-300"
            key={video.id}
            onClick={() =>
              window.open(
                `https://www.youtube.com/watch?v=${video.id}`,
                '_blank'
              )
            }
          >
            <div className="relative h-24 w-44 rounded-lg overflow-hidden">
              <Image
                src={video.thumbnailUrl}
                alt={video.title}
                fill={true}
                sizes="(max-width: 640px) 100vw, 640px"
                priority
              />
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="font-semibold">{video.title}</h2>
              <p className="text-sm text-gray-500">{video.channelTitle}</p>
            </div>
          </button>
        </>
      ))}
    </div>
  );
};

export default VideosFromCategory;
