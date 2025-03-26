import React, { useEffect, useState } from "react";
import * as ExcelJS from "exceljs";
import ViewDataExcel from "./ViewDataExcel";
import { toast } from "react-toastify";
import dragDropGif from "./../../../public/dragDrop.gif";
import {
  enterPasswordAppState,
  workbookDataState,
} from "../../stores/seniorDate";
import { useRecoilState } from "recoil";
import Cookies from "js-cookie";

function CheckFileExtension(event: React.DragEvent<HTMLDivElement>) {
  //   log extention file
  const extention = event.dataTransfer.files?.[0].name.split(".").pop() || "";
  if (!["xlsx", "xls"].includes(extention)) {
    toast.error("الملف غير مدعوم");
    return false;
  }
  return true;
}

const ExcelReader: React.FC = () => {
  // @ts-ignore
  const [data, setData] = useRecoilState<any[][] | [null]>(workbookDataState);
  const [, setEnterPasswordApp] = useRecoilState<boolean>(
    enterPasswordAppState
  );

  useEffect(() => {
    const data = localStorage.getItem("workbookData") || [];
    if (data.length > 0) {
      // @ts-ignore
      setData(JSON.parse(data));
      // Cookies.set("auth", "true", { expires: 0.25 });
      const auth = Cookies.get("auth") || "";
      if (auth === "true") {
        setEnterPasswordApp(false);
        return;
      }
      setEnterPasswordApp(true);
    } else {
      setData(JSON.parse(JSON.stringify(data)));
      setEnterPasswordApp(false);
    }
  }, []);
  const handleFileUpload = async (file: File) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = async (e) => {
      if (!e.target?.result) return;

      const buffer = e.target.result as ArrayBuffer;
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(buffer);
      const worksheet = workbook.worksheets[0];
      const sheetData: any[][] = [];

      worksheet.eachRow((row) => {
        // @ts-ignore
        const rowData = row.values.slice(1);
        sheetData.push(rowData);
      });
      localStorage.setItem("workbookData", JSON.stringify(sheetData));
      setData(sheetData);
    };
  };

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const extention = event.target.files?.[0].name.split(".").pop() || "";
    if (!["xlsx", "xls"].includes(extention)) {
      toast.error("الملف غير مدعوم");
      return false;
    }
    const file = event.target.files?.[0];
    if (file) handleFileUpload(file);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (!CheckFileExtension(event)) {
      return;
    }
    const file = event.dataTransfer.files?.[0];

    if (file) handleFileUpload(file);
  };

  const [dragple, setDragple] = useState(false);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragple(true);
  };
  return (
    <>
      {data.length === 0 && (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={() => setDragple(false)}
          className={`duration-200 border-${
            dragple ? "solid" : "dashed"
          } h-[80vh] w-[90%] mx-auto mt-5 rounded-2xl border-${
            dragple ? "red-400" : "gray-400"
          } ${dragple ? "border-8" : "border-2 "} p-5 relative overflow-hidden sm:max-h-auto max-h-[80vh] `}
        >
          <div className="flex justify-between items-center -z-10 absolute top-[50%] left-[50%]  -translate-[50%]">
            <img src={dragDropGif} className={`rounded-4xl object-cover`} />
          </div>

          <input
            className={`${data.length > 0 ? "" : "opacity-0 w-full h-full"}`}
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileInputChange}
          />
        </div>
      )}
      <input
        className={`${data.length > 0 ? "" : "opacity-0 w-full h-full"}`}
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileInputChange}
      />
      {data.length > 0 && <ViewDataExcel data={data} />}
    </>
  );
};

export default ExcelReader;
