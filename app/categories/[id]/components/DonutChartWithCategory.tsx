'use client';
import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { CategoryDetailDonut } from '@/app/types/types';
ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  categoryData: CategoryDetailDonut[] | null;
  comparisonType: 'views' | 'likes' | 'videos';
  category: string;
}

const DonutChartWithCategory = ({
  categoryData,
  comparisonType,
  category,
}: Props) => {
  if (!categoryData) {
    return <div>Loading chart...</div>;
  }

  const selectedCategory = categoryData.find((c) => c.name === category);

  if (!selectedCategory) {
    return <div>No data found for the selected category.</div>;
  }

  const data = {
    labels: [`${category}`, 'Other'],
    datasets: [
      {
        data: [
          selectedCategory[comparisonType],
          categoryData
            .filter((c) => c.category_id !== category)
            .reduce((acc, c) => c[comparisonType] + acc, 0),
        ],
        backgroundColor: ['#7BCFE9', '#ED747C'],
      },
    ],
  };

  return <Doughnut data={data} />;
};

export default DonutChartWithCategory;
