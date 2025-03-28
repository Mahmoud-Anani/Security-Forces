import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);
function CrLevelAnalysis({
  title,
  high,
  medium,
  upperAverage,
  usually,
}: {
  title: string;
  high: number;
  medium: number;
  upperAverage: number;
  usually: number;
}) {
  const data = {
    labels: ["عليا", "متوسط", "فوق متوسط", "عادي"],
    datasets: [
      {
        label: "# "+ title,
        data: [high, medium, upperAverage, usually],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Doughnut data={data} className={`max-w-[400px] max-h-[400px] my-5`} />;
}

export default CrLevelAnalysis;
