import { Video } from '@/app/types/types';
import React from 'react';
import Image from 'next/image';

interface Props {
  categoryId: number;
  videos: Video[];
}

const VideosFromCategory: React.FC<Props> = ({ categoryId, videos }) => {
  return (
    <div className="flex flex-col gap-4">
      {videos.slice(0, 2).map((video) => (
        <div
          className="flex gap-4 items-center p-2 rounded-lg cursor-pointer hover:bg-gray-200 hover:text-black transition-colors duration-300"
          key={video.id}
        >
          <div className="relative h-24 w-44 rounded-lg overflow-hidden">
            <Image
              src={video.thumbnailUrl}
              alt={video.title}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="font-bold">{video.title}</h2>
            <p className="text-sm text-gray-500">{video.channelTitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideosFromCategory;
