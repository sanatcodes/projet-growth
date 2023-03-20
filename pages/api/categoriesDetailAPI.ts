import { PredictionAPIResponse, PredictionInput, Video, VideoQueryParams, VideoResponse } from './../../app/types/types';
import { APIResponse } from "@/app/types/types";
import axios from 'axios';

const BASE_URL = 'https://floating-hollows-40011.herokuapp.com';

export const fetchCategoryData = async (date: string): Promise<APIResponse[]> => {
  const response = await fetch(`${BASE_URL}/category/${date}`);
  const data: APIResponse[] = await response.json();
  return data;
};

export const fetchWeekData = async (startDate: string): Promise<APIResponse[]> => {
  const response = await fetch(`${BASE_URL}/category/week_data/${startDate}`);
  const data: APIResponse[] = await response.json();
  return data
};

export const fetchPredictionFromAPI = async (
  item: PredictionInput[]
): Promise<PredictionAPIResponse[]> => {
  const url = `${BASE_URL}/category/predict`;
  try {
    const response = await axios.post<PredictionAPIResponse[]>(url, item);
    const predictionData = response.data;
    return predictionData;
  } catch (error) {
    console.error(error);
    return item.map((input) => ({
      category_id: input.category_id,
      date: 'not found',
      views_prediction: 0,
      likes_prediction: 0,
      videos_prediction: 0,
    }));
  }
};


export const fetchWeekPrediction = async (
  category_id: string,
  startDate: string,
  weeks: number
): Promise<PredictionAPIResponse[]> => {
  const date = new Date(startDate);
  const today = new Date();
  const predictions: PredictionInput[] = [];
  for (let i = 0; i < weeks * 7; i++) {
    if (date > today) {
      const dateString = date.toISOString().substring(0, 10);
      const prediction = {
        category_id,
        year: dateString.substring(0, 4),
        month: dateString.substring(5, 7),
        day: dateString.substring(8, 10),
        day_of_week: date.getDay().toString(),
      };
      predictions.push(prediction);
    }
    date.setDate(date.getDate() + 1);
  }
  const res = fetchPredictionFromAPI(predictions)
  return res;
};

export async function getPopularVideosByCategory(
  categoryId: string,
  pageToken?: string
): Promise<VideoResponse> {
  const baseUrl = "https://youtube.googleapis.com/youtube/v3/videos";
  const queryParams: VideoQueryParams = {
    part: "snippet",
    chart: "mostPopular",
    regionCode: "IE",
    videoCategoryId: categoryId,
    key: process.env.NEXT_PUBLIC_API_KEY as string,
    maxWidth: '100',
    pageToken,
  };
  const url = `${baseUrl}?part=${queryParams.part}&chart=${queryParams.chart}&maxWidth=${queryParams.maxWidth}&regionCode=${queryParams.regionCode}&videoCategoryId=${queryParams.videoCategoryId}&key=${queryParams.key}${queryParams.pageToken ? `&pageToken=${queryParams.pageToken}` : ''}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`YouTube API request failed with status ${response.status}`);
  }

  const json = await response.json();

  const videos: Video[] = json.items.map((item: any) => ({
    id: item.id,
    title: item.snippet.title,
    channelTitle: item.snippet.channelTitle,
    thumbnailUrl: item.snippet.thumbnails.default.url,
    tags: item.snippet.tags || [],
  }));

  let nextPageToken: string | undefined;
  if (json.nextPageToken) {
    nextPageToken = json.nextPageToken;
  }

  return {
    videos
  };
}

