import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import chroma from "chroma-js";
import { CategoryDetailDonut } from "@/app/types/types";
ChartJS.register(ArcElement, Tooltip, Legend);



interface Props {
  categoryData: CategoryDetailDonut[];
  comparisonType: "views" | "likes" | "videos";
  category?: string;
}

const DonutChart = ({ categoryData, comparisonType, category }: Props) => {
 let data = {
    labels: categoryData.map((category) => category.name),
    datasets: [
      {
        data: categoryData.map((category) => category[comparisonType]),
        backgroundColor: chroma
          .scale(["#7BCFE9", "#9EDC5C", "#FFBE5C", "#ED747C", "#7C82A3"])
          .colors(categoryData.length),
      },
    ],
  };

  if (category) {
  const selectedCategory = categoryData.find((c) => c.category_id === category);
  if (selectedCategory) {
    data = {
      labels: ["Selected Category", "Others"],
      datasets: [
        {
          data: [selectedCategory[comparisonType], categoryData.reduce((acc, c) => c[comparisonType] + acc, 0) - selectedCategory[comparisonType]],
          backgroundColor: ["#7BCFE9", "#DDDDDD"],
        },
      ],
    };
  }
}

  const options = {
    tooltips: {
      callbacks: {
        label: (tooltipItem, chartData) => {
          const label = chartData.labels[tooltipItem.index];
          const value = chartData.datasets[0].data[tooltipItem.index];
          const total = chartData.datasets[0].data.reduce((acc, val) => acc + val, 0);
          const percentage = ((value / total) * 100).toFixed(2);
          return `${label}: ${value} (${percentage}%)`;
        },
      },
    },
    title: {
      display: true,
      text: `Comparison by ${comparisonType}`,
    },
  };

  return <Doughnut data={data} options={options} />;
};

export default DonutChart;