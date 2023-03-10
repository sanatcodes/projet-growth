import React from 'react';
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
import { APIResponse, PredictionAPIResponse } from '@/app/types/types';

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
  data: PredictionAPIResponse[] | APIResponse[] | null;
  categoryId: string;
  comparisonType: string;
}

const LineChart: React.FC<Props> = ({ data, categoryId, comparisonType }) => {
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

  let labels: string[] = [];
  let chartData: number[] = [];

  if (data && data.length > 0) {
    if ('views_prediction' in data[0]) {
      // Data is PredictionAPIResponse[]
      console.log(comparisonType);

      labels = (data as PredictionAPIResponse[])
        .map((item) => item.trending_date)
        .reverse();
      chartData = (data as PredictionAPIResponse[])
        .map((item) => item[comparisonType])
        .reverse();
    } else {
      // Data is APIResponse[]
      labels = (data as APIResponse[])
        .map((item) => item.trending_date)
        .reverse();
      chartData = (data as APIResponse[])
        .map((item) => item[comparisonType])
        .reverse();
    }
  }

  const chartDataObject = {
    labels,
    datasets: [
      {
        label: `${comparisonType} `,
        data: chartData,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return <Line data={chartDataObject} options={options} />;
};

export default LineChart;
