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
import { CategoryDetailBubble } from '@/app/types/types';

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
  data: CategoryDetailBubble[];
  categoryName: string;
  comparisonType: keyof CategoryDetailBubble;
}

const LineChart: React.FC<Props> = ({
  data: categoryData,
  categoryName,
  comparisonType,
}) => {
  const [filteredData, setFilteredData] = useState<CategoryDetailBubble[]>([]);

  useEffect(() => {
    const filtered = categoryData.filter(
      (item) => item.category_id === categoryName
    );
    setFilteredData(filtered);
  }, [categoryName, categoryData]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };
  // use date values from the data
  const labels = categoryData.map((item) => item.trending_date);

  const data = {
    labels,
    datasets: [
      {
        label: `Chart based on ${comparisonType}`, // TODO: change to use filtered Data
        data: categoryData.map((item) => item[comparisonType]),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
