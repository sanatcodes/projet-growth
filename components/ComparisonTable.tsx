import { APIResponse } from '@/app/types/types';
import React, { ReactElement } from 'react';

type ComparisonTableProps = {
  comparisonType: 'views' | 'likes' | 'videos';
  catCurrentData: APIResponse | null;
  handleViewsClick: () => void;
  handleVideosClick: () => void;
  handleLikesClick: () => void;
};

const ComparisonTable = ({
  comparisonType,
  catCurrentData,
  handleViewsClick,
  handleVideosClick,
  handleLikesClick,
}: ComparisonTableProps): ReactElement => {
  return (
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
          {catCurrentData?.views}
        </h1>
      </div>
      <div className="w-1/3 p-4">
        <h1 className="text-2xl text-center font-bold">
          {catCurrentData?.likes}
        </h1>
      </div>
      <div className="w-1/3 p-4">
        <h1 className="text-2xl text-center font-bold">
          {catCurrentData?.videos}
        </h1>
      </div>
    </div>
  );
};

export default ComparisonTable;
