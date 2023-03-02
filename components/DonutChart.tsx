import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);


const data = {
  labels: ["Category A", "Category B", "Category C"],
  datasets: [
    {
      label: "Donut chart",
      data: [30, 50, 20],
      backgroundColor: ["#ff6384", "#36a2eb", "#cc65fe"]
    }
  ]
};

const DonutChart = () => (
  <Doughnut
    data={data}
    options={{
      plugins: {
        legend: {
          position: "bottom"
        }
      }
    }}
  />
);

export default DonutChart;