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
  const date = new Date(startDate);
  const promises = [];
  for (let i = 0; i < 7; i++) {
    const dateString = date.toISOString().substring(0, 10);
    const promise = fetchCategoryData(dateString);
    promises.push(promise);
    date.setDate(date.getDate() - 1);
  }
  const dataArrays = await Promise.all(promises);
  const mergedData = dataArrays.flat();
  return mergedData;
};
export const fetchCategoryPrediction = async (
  item: PredictionInput
): Promise<PredictionAPIResponse> => {
  const url = `${BASE_URL}/category/predict`;
  try {
    const response = await axios.post<PredictionAPIResponse>(url, item);
    const predictionData = response.data;
    const { category_id, year, month, day } = item;
    const trending_date = `${year}-${month}-${day}`;
    return {
      category_id,
      trending_date,
      views_prediction: predictionData.views_prediction,
      likes_prediction: predictionData.likes_prediction,
      videos_prediction: predictionData.videos_prediction,
    };
  } catch (error) {
    console.error(error);
    return {
      category_id: item.category_id,
      trending_date: 'not found',
      views_prediction: 0,
      likes_prediction: 0,
      videos_prediction: 0,
    };
  }
};


export const fetchWeekPrediction = async (
  category_id: string,
  startDate: string,
  weeks: number
): Promise<PredictionAPIResponse[]> => {
  const date = new Date(startDate);
  const today = new Date();
  const predictions: PredictionAPIResponse[] = [];
  for (let i = 0; i < weeks * 7; i++) {
    if (date > today) {
      const dateString = date.toISOString().substring(0, 10);
      const prediction = await fetchCategoryPrediction({
        category_id,
        year: dateString.substring(0, 4),
        month: dateString.substring(5, 7),
        day: dateString.substring(8, 10),
        day_of_week: date.getDay().toString(),
      });
      predictions.push(prediction);
    }
    date.setDate(date.getDate() + 1);
  }
  return predictions;
};

export async function getPopularVideosByCategory(
  categoryId: number,
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
    id: item.id.videoId,
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
    videos,
    nextPageToken,
  };
}

