import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import axios from 'axios';
export type Category = {
    id: string;
    snippet: {
      title: string;
    };
  }

export type Props =  {
    categories: Category[];
  }

export type APIResponse = {
  _id: string;
  trending_date: string;
  category_id: string;
  views: number;
  likes: number;
  comment_count: number;
  videos: number;
}

export type PredictionAPIResponse = {
  category_id: string,
  trending_date: string,
  views_prediction: number,
  likes_prediction: number,
  videos_prediction: number,
}

export type PredictionInput = {
  category_id: string,
  year: string,
  month: string,
  day: string,
  day_of_week: string,
}

export type CategoryDetailDonut = {
  category_id: string;
  name: string;
  views: number;
  likes: number;
  videos: number;
}

export type CategoryDetailBubble = {
  category_id: string;
  views: number;
  likes: number;
  videos: number;
  trending_date: string;
}

export type VideoQueryParams = {
  part: string;
  chart: string;
  regionCode: string;
  videoCategoryId: string;
  maxWidth: string;
  key: string;
  pageToken?: string;
}

export type Video  = {
  id: string;
  title: string;
  channelTitle: string;
  thumbnailUrl: string;
  tags: string[];
}

export type VideoResponse = {
  videos: Video[];
  nextPageToken?: string;
}

export type CategoryIcons = Record<number, [IconDefinition, string]>;