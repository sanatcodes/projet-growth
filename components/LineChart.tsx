import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
// import chroma from "chroma-js";
import { APIResponse } from '@/app/types/types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  data: APIResponse[] | null;
  categoryId: string;
  comparisonType: string;
}

const LineChart: React.FC<Props> = ({
  data: categoryData,
  categoryId,
  comparisonType,
}) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Data for category: ' + categoryId,
      },
    },
  };
  // use date values from the data
  const labels = categoryData.map((item) => item.trending_date).reverse();

  const data = {
    labels,
    datasets: [
      {
        label: `${comparisonType} `, // TODO: change to use filtered Data
        data: categoryData.map((item) => item[comparisonType]).reverse(),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
