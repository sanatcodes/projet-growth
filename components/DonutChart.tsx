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
  const [chartData, setChartData] = useState();
  console.log("what is categoryData", categoryData);
  
  const colors = chroma
    .scale(["#7BCFE9", "#9EDC5C", "#FFBE5C", "#ED747C", "#7C82A3"])
    .colors(categoryData.length);

  useEffect(() => {
    if (categoryData) {
      const labels = categoryData.map((category) => category.name);
      const data = categoryData.map((category) => category[comparisonType]);

      setChartData({
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: colors,
            hoverOffset: 4,
          },
        ],
      });
    }
  }, [categoryData, comparisonType]);

  return (
    <div>
      {chartData && (
        <Doughnut
          data={chartData}
          options={{
            plugins: {
              title: {
                display: true,
                text: `Comparison by ${comparisonType}`,
              },
            },
            maintainAspectRatio: false,
            width: 800,
            height: 800,
          }}
        />
      )}
    </div>
  );
};

export default DonutChart;