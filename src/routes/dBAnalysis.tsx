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
import CrLevelAnalysis from "../components/analysis/crLevelAnalysis";
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

function DBAnalysis({ showLine = true }: { showLine?: boolean }) {
  const [rows] = useRecoilState(rowsDataState);

  const [startAllDatesState, setstartAllDatesState] = useState<string[]>([]);
  const [anlysisData, setAnlysisData] = useState<{
    camingOfYears: any;
    crLevel: {
      high: number;
      medium: number;
      upperAverage: number;
      usually: number;
    };
    unShadbCrLevel: {
      high: number;
      medium: number;
      upperAverage: number;
      usually: number;
    };
  }>({
    camingOfYears: {},
    crLevel: {
      high: 0,
      medium: 0,
      upperAverage: 0,
      usually: 0,
    },
    unShadbCrLevel: {
      high: 0,
      medium: 0,
      upperAverage: 0,
      usually: 0,
    },
  });

  useEffect(() => {
    if (rows.length > 0) {
      const yearsSet = new Set<string>(); // استخدام Set لتجنب التكرار
      const crLevel = { high: 0, medium: 0, upperAverage: 0, usually: 0 };
      const unShadbCrLevel = {
        high: 0,
        medium: 0,
        upperAverage: 0,
        usually: 0,
      };
      rows.slice(1).forEach((row: any) => {
        Object.entries(row).forEach(([key, value]) => {
          if (`${key}`.toString().trim().toLowerCase() === "5") {
            switch (value) {
              case "عليا":
                crLevel.high += 1;
                break;
              case "متوسط":
                crLevel.medium += 1;
                break;
              case "فوق متوسط":
                crLevel.upperAverage += 1;
                break;
              case "عادة":
                crLevel.usually += 1;
                break;

              default:
                break;
            }
            setAnlysisData((prive) => ({
              ...prive,
              crLevel,
            }));
          }
          // بدون الشطب
          if (
            `${key}`.toString().trim().toLowerCase() === "5" &&
            !row[2].includes("شطب")
          ) {
            switch (value) {
              case "عليا":
                unShadbCrLevel.high += 1;
                break;
              case "متوسط":
                unShadbCrLevel.medium += 1;
                break;
              case "فوق متوسط":
                unShadbCrLevel.upperAverage += 1;
                break;
              case "عادة":
                unShadbCrLevel.usually += 1;
                break;

              default:
                break;
            }
            setAnlysisData((prive) => ({
              ...prive,
              unShadbCrLevel,
            }));
          }

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
  // console.log(rows.length);
  if (rows.length <= 0) {
    return <></>;
  }
  const labels = Object.keys(anlysisData.camingOfYears);
  const dataValues = Object.values(anlysisData.camingOfYears);

  const chartData = {
    labels,
    datasets: [
      {
        label: "عدد المجندين",
        data: dataValues,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
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
  console.log(anlysisData);

  return (
    <div className={`container mx-auto`}>
      <div className={`flex justify-between flex-wrap gap-5`}>
        <CrLevelAnalysis
          title="مجند مع الشطب"
          high={anlysisData.crLevel.high}
          medium={anlysisData.crLevel.medium}
          upperAverage={anlysisData.crLevel.upperAverage}
          usually={anlysisData.crLevel.usually}
        />
        <CrLevelAnalysis
          title="مجند بدون الشطب"
          high={anlysisData.unShadbCrLevel.high}
          medium={anlysisData.unShadbCrLevel.medium}
          upperAverage={anlysisData.unShadbCrLevel.upperAverage}
          usually={anlysisData.unShadbCrLevel.usually}
        />
      </div>
      {showLine && <Line data={chartData} options={options} className={` `} />}
    </div>
  );
}

export default DBAnalysis;
