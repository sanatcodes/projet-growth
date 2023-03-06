import { APIResponse } from "@/app/types/types";


const BASE_URL = 'http://127.0.0.1:8000';

export const fetchCategoryData = async (date: string): Promise<APIResponse[]> => {
  const response = await fetch(`${BASE_URL}/category/${date}`);
  const data: APIResponse[] = await response.json();
  console.log('fetch data', data);
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
