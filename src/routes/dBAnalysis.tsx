import { useRecoilState } from "recoil";
import { rowsDataState } from "../stores/seniorDate";
import { useEffect, useState } from "react";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function DBAnalysis() {
  const [rows] = useRecoilState(rowsDataState);
  const [startAllDatesState, setstartAllDatesState] = useState<string[]>([]);
  const [anlysisData, setAnlysisData] = useState<{ camingOfYears: any }>({
    camingOfYears: {},
  });

  useEffect(() => {
    if (rows.length > 0) {
      const yearsSet = new Set<string>(); // استخدام Set لتجنب التكرار
      rows.slice(1).forEach((row: any) => {
        Object.entries(row).forEach(([key, value]) => {
          if (
            `${key}`.toString().trim().toLowerCase() === "4" &&
            `${value}`.toString().trim().split("/").length === 3
          ) {
            const year = `${value}`.toString().trim().split("/")[2];
            yearsSet.add(year); // إضافة السنة إلى Set
          }
        });
      });
      setstartAllDatesState(Array.from(yearsSet).sort()); // تحديث الحالة مرة واحدة فقط
    }
  }, [rows]);

  useEffect(() => {
    const handleDataCountYears = startAllDatesState.reduce((acc, year) => {
      if (!acc[year]) {
        acc[year] = rows.filter((row: any) => {
          const dateValue = `${row["4"]}`.toString().trim();
          return dateValue.split("/")[2] === year;
        }).length;
      }
      return acc;
    }, {} as Record<string, number>);

    setAnlysisData((prive) => ({
      ...prive,
      camingOfYears: handleDataCountYears,
    }));
  }, [startAllDatesState, rows]);

  // تحويل الكائن إلى مصفوفات لاستخدامها في الرسم البياني
  const labels = Object.keys(anlysisData.camingOfYears); // السنوات
  const dataValues = Object.values(anlysisData.camingOfYears); // عدد الأشخاص

  const chartData = {
    labels,
    datasets: [
      {
        label: "عدد المجندين",
        data: dataValues,
        borderColor: "rgba(75, 192, 192, 1)", // لون الخط
        backgroundColor: "rgba(75, 192, 192, 0.2)", // لون التعبئة
        borderWidth: 2,
        pointRadius: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };
  return (
    <div className={`mw-[90%]`}>
      <Line data={chartData} options={options} />
    </div>
  );
}

export default DBAnalysis;
