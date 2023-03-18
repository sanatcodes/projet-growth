import { tagCloudOptions, Video } from '@/app/types/types';
import React, { useMemo } from 'react';
import WordCloud, { OptionsProp } from 'react-wordcloud';

interface Props {
  videos?: Video[];
}

const TagCloud: React.FC<Props> = ({ videos = [] }) => {
  // Extract tags from videos
  const tags = useMemo(() => {
    const allTags: string[] = [];
    videos.forEach((video) => {
      allTags.push(...video.tags);
    });
    return allTags;
  }, [videos]);

  // Aggregate common tags
  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    tags.forEach((tag) => {
      if (tag in counts) {
        counts[tag]++;
      } else {
        counts[tag] = 1;
      }
    });
    return counts;
  }, [tags]);

  // Convert tag counts to word cloud format
  const wordCloudData = useMemo(() => {
    return Object.entries(tagCounts).map(([text, value]) => ({
      text,
      value,
    }));
  }, [tagCounts]);

  // Define styles for word cloud
  const options: OptionsProp = {
    colors: ['#7BCFE9', '#9EDC5C', '#FFBE5C', '#ED747C', '#7C82A3'],
    enableTooltip: true,
    deterministic: false,
    fontFamily: 'sans-serif',
    fontSizes: [12, 60],
    fontStyle: 'normal',
    fontWeight: 'normal',
    padding: 1,
    rotations: 3,
    rotationAngles: [-90, 90],
    scale: 'sqrt',
    spiral: 'archimedean',
    transitionDuration: 1000,
  };

  return (
    <div className="w-full">
      <WordCloud words={wordCloudData} options={options} />
    </div>
  );
};

export default TagCloud;
