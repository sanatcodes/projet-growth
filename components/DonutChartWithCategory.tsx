import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { CategoryDetailDonut } from "@/app/types/types";
ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  categoryData: CategoryDetailDonut[];
  comparisonType: "views" | "likes" | "videos";
  category: string;
}

const DonutChartWithCategory = ({ categoryData, comparisonType, category }: Props) => {
  const selectedCategory = categoryData.find((c) => c.name === category);

  if (!selectedCategory) {
    return <div>No data found for the selected category.</div>;
  }

  const data = {
    labels: [`${category}`, "Other"],
    datasets: [
      {
        data: [
          selectedCategory[comparisonType],
          categoryData
            .filter((c) => c.category_id !== category)
            .reduce((acc, c) => c[comparisonType] + acc, 0),
        ],
        backgroundColor: ["#7BCFE9", "#ED747C"],
      },
    ],
  };

  const options = {
    tooltips: {
      callbacks: {
        label: (tooltipItem, chartData) => {
          const label = chartData.labels[tooltipItem.index];
          const value = chartData.datasets[0].data[tooltipItem.index];
          const total = chartData.datasets[0].data.reduce((acc, val) => acc + val, 0);
          const percentage = ((value / total) * 100).toFixed(2);
          return `${label}: ${percentage}%`;
        },
      },
    },
    title: {
      display: true,
      text: `Comparison of ${selectedCategory.name} with Other Categories by ${comparisonType}`,
    },
  };
  return <Doughnut data={data} options={options} />;
};

export default DonutChartWithCategory;
