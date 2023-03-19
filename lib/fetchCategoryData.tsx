import { APIResponse } from '@/app/types/types';
import { categoryIcons } from '@/utils/dictionaries';
import React from 'react';

export default async function fetchCategoryData() {
  const today = new Date().toISOString().substring(0, 10);
  const BASE_URL = 'https://floating-hollows-40011.herokuapp.com';
  const res = await fetch(`${BASE_URL}/category/${today}`);

  if (!res.ok) {
    throw new Error('Error fetching data');
  }

  const data: APIResponse[] = await res.json();

  const formattedData = data.map((item: APIResponse) => ({
    id: item.category_id,
    snippet: { title: categoryIcons[parseInt(item.category_id)][1] },
  }));

  return formattedData;
}
