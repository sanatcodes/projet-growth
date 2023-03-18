import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import chroma from 'chroma-js';
import { CategoryDetailDonut } from '@/app/types/types';
ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  categoryData: CategoryDetailDonut[];
  comparisonType: 'views' | 'likes' | 'videos';
  category?: string;
}

const DonutChart = ({ categoryData, comparisonType, category }: Props) => {
  let data = {
    labels: categoryData.map((category) => category.name),
    datasets: [
      {
        data: categoryData.map((category) => category[comparisonType]),
        backgroundColor: chroma
          .scale(['#7BCFE9', '#9EDC5C', '#FFBE5C', '#ED747C', '#7C82A3'])
          .colors(categoryData.length),
      },
    ],
  };

  if (category) {
    const selectedCategory = categoryData.find(
      (c) => c.category_id === category
    );
    if (selectedCategory) {
      data = {
        labels: ['Selected Category', 'Others'],
        datasets: [
          {
            data: [
              selectedCategory[comparisonType],
              categoryData.reduce((acc, c) => c[comparisonType] + acc, 0) -
                selectedCategory[comparisonType],
            ],
            backgroundColor: ['#7BCFE9', '#DDDDDD'],
          },
        ],
      };
    }
  }

  return <Doughnut data={data} />;
};

export default DonutChart;
