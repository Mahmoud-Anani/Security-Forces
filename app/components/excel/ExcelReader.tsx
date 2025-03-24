import React, { useState } from "react";
import * as ExcelJS from "exceljs";
import ViewDataExcel from "./ViewDataExcel";
import { toast } from "react-toastify";

function CheckFileExtension(event: React.DragEvent<HTMLDivElement>) {
  //   log extention file
  const extention = event.dataTransfer.files?.[0].name.split(".").pop()||"";
  if (!["xlsx", "xls"].includes(extention)) {
    toast.error("الملف غير مدعوم");
    return false;
  }
  return true;
}

const ExcelReader: React.FC = () => {
  const [data, setData] = useState<any[][]>([]);

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

      console.log("Parsed Data:", sheetData);
      setData(sheetData);
    };
  };

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const extention = event.target.files?.[0].name.split(".").pop()||"";
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

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="h-[100vh] w-[100%]"
    >
      <input
        className={`${data.length > 0 ? "" : "opacity-0 w-full h-full"}`}
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileInputChange}
      />
      {data.length > 0 && <ViewDataExcel data={data} />}
    </div>
  );
};

export default ExcelReader;
