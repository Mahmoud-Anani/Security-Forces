import { useRecoilState } from "recoil";
import { addedSoldiersState } from "../../stores/seniorDate";
import { useEffect } from "react";
import { Paper } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

const paginationModel = { page: 0, pageSize: 12 };

const columns: GridColDef[] = [
  { field: "id", headerName: "م", width: 70 },
  { field: "name", headerName: "الاسم", width: 200 },
  { field: "company", headerName: "السرية", width: 150 },
  { field: "serviceLocation", headerName: "جهة قضاء الخدمة", width: 180 },
  { field: "recruitmentDate", headerName: "تاريخ التجنيد", width: 150 },
  { field: "qualificationType", headerName: "نوع المؤهل", width: 130 },
  { field: "reserveType", headerName: "نوع الرديف", width: 130 },
  { field: "policeNumber", headerName: "رقم الشرطة", width: 120 },
  { field: "governorate", headerName: "المحافظة", width: 130 },
  { field: "residence", headerName: "محل الإقامة", width: 150 },
  { field: "nationalId", headerName: "الرقم القومي", width: 180 },
  { field: "tripleNumber", headerName: "الرقم الثلاثي", width: 150 },
  { field: "operation", headerName: "التشغيل", width: 120 },
  { field: "reserve", headerName: "الرديف", width: 120 },
  {
    field: "securityForces",
    headerName: "سرايا قسم قوات امن العاشر",
    width: 200,
  },
  { field: "rank", headerName: "الرتبة", width: 100 },
  { field: "weaponRestriction", headerName: "منع من حمل السلاح", width: 180 },
  { field: "assignedWork", headerName: "العمل المسند اليه", width: 180 },
  { field: "college", headerName: "الكلية", width: 150 },
  { field: "profession", headerName: "الصنعه", width: 150 },
  { field: "notes", headerName: "الملاحظات", width: 200 },
  { field: "decisionDate", headerName: "تاريخ القرار", width: 150 },
  { field: "religion", headerName: "الديانة", width: 100 },
  { field: "vacationPlans", headerName: "خطط الاجازات", width: 150 },
  { field: "len", headerName: "LEN", width: 100 },
  { field: "recommendations", headerName: "التوصيات", width: 200 },
  { field: "details", headerName: "التفاصيل", width: 200 },
];

function AddedSoldierUI() {
  const [addedSoldiers] = useRecoilState(addedSoldiersState);
  console.log(addedSoldiers);

  const handleExport = async () => {
    try {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Soldiers");

      // Define Arabic column headers
      const columnHeaders = [
        { header: "م", key: "id", width: 10 },
        { header: "الاسم", key: "name", width: 20 },
        { header: "السرية", key: "company", width: 15 },
        { header: "جهة قضاء الخدمة", key: "serviceLocation", width: 20 },
        { header: "تاريخ التجنيد", key: "recruitmentDate", width: 15 },
        { header: "نوع المؤهل", key: "qualificationType", width: 15 },
        { header: "نوع الرديف", key: "reserveType", width: 15 },
        { header: "رقم الشرطة", key: "policeNumber", width: 15 },
        { header: "المحافظة", key: "governorate", width: 15 },
        { header: "محل الإقامة", key: "residence", width: 20 },
        { header: "الرقم القومي", key: "nationalId", width: 20 },
        { header: "الرقم الثلاثي", key: "tripleNumber", width: 15 },
        { header: "التشغيل", key: "operation", width: 15 },
        { header: "الرديف", key: "reserve", width: 15 },
        {
          header: "سرايا قسم قوات امن العاشر",
          key: "securityForces",
          width: 25,
        },
        { header: "الرتبة", key: "rank", width: 10 },
        { header: "منع من حمل السلاح", key: "weaponRestriction", width: 20 },
        { header: "العمل المسند اليه", key: "assignedWork", width: 20 },
        { header: "الكلية", key: "college", width: 15 },
        { header: "الصنعه", key: "profession", width: 15 },
        { header: "الملاحظات", key: "notes", width: 20 },
        { header: "تاريخ القرار", key: "decisionDate", width: 15 },
        { header: "الديانة", key: "religion", width: 10 },
        { header: "خطط الاجازات", key: "vacationPlans", width: 15 },
        { header: "LEN", key: "len", width: 10 },
        { header: "التوصيات", key: "recommendations", width: 20 },
        { header: "التفاصيل", key: "details", width: 20 },
      ];

      // Set worksheet columns
      worksheet.columns = columnHeaders;

      // Add rows to the worksheet
      addedSoldiers.forEach((soldier) => {
        worksheet.addRow(soldier);
      });

      // Style the header row
      worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true };
        cell.alignment = { horizontal: "center" };
      });

      // Generate Excel file and trigger download
      const buffer = await workbook.xlsx.writeBuffer();
      saveAs(new Blob([buffer]), "added_soldiers.xlsx");
    } catch (error) {
      console.error("Error exporting data:", error);
    }
  };

  useEffect(() => {}, []);

  return (
    <>
      <Paper sx={{ width: "100%", overflowX: "auto" }}>
        <DataGrid
          style={{ width: "400pc", direction: "rtl" }}
          className="text-right ms-5 !text-[18px]"
          rows={addedSoldiers.map((soldier) => ({
            ...soldier,
          }))}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ border: 0 }}
        />
      </Paper>
      <button
        type="button"
        onClick={handleExport}
        className="w-full text-3xl !bg-[#c27272df] hover:!bg-[#c27272b6] duration-200 !border-0 rounded-[5px] cursor-pointer py-2"
      >
        تصدير
      </button>
    </>
  );
}

export default AddedSoldierUI;

/*
الترتيب مهم

[
  {
    "id": "",
    "name": "محمود عبد الله عناني غالي السيد",
    "company": "",
    "serviceLocation": "",
    "recruitmentDate": "2025-03-29",
    "qualificationType": "عليا",
    "reserveType": "بدون",
    "policeNumber": "1906",
    "governorate": "الجيزة",
    "residence": "م.ميت غمر",
    "nationalId": "30205281200254",
    "tripleNumber": "197/197/2002",
    "operation": "",
    "reserve": "",
    "securityForces": "",
    "rank": "",
    "weaponRestriction": "",
    "assignedWork": "",
    "college": "",
    "profession": "",
    "notes": "ضم من مبارك بتاريخ 20/2055/8م",
    "decisionDate": "",
    "religion": "مسلم",
    "vacationPlans": "",
    "len": "",
    "recommendations": "",
    "details": ""
  }
]


[
  {
    "id": "",
    "name": "محمود عبد الله عناني غالي السيد",
    "company": "س10",
    "serviceLocation": "قوات الامن",
    "recruitmentDate": "2025-03-29",
    "qualificationType": "عليا",
    "reserveType": "بدون",
    "policeNumber": "1906",
    "governorate": "القاهرة",
    "residence": "م.ميت غمر",
    "nationalId": "30205281200254",
    "tripleNumber": "197/197/2002",
    "operation": "",
    "reserve": "",
    "securityForces": "",
    "rank": "",
    "weaponRestriction": "",
    "assignedWork": "",
    "college": "",
    "profession": "",
    "notes": "ضم من مبارك بتاريخ 20/2055/8م",
    "decisionDate": "",
    "religion": "",
    "vacationPlans": "",
    "len": "",
    "recommendations": "",
    "details": ""
  },
  {
    "id": "",
    "name": "test",
    "company": "س10",
    "serviceLocation": "قوات الامن",
    "recruitmentDate": "2025-03-13",
    "qualificationType": "عليا",
    "reserveType": "بدون",
    "policeNumber": "1906",
    "governorate": "القاهرة",
    "residence": "م.ميت غمر",
    "nationalId": "30205281200254",
    "tripleNumber": "197/197/2002",
    "operation": "",
    "reserve": "",
    "securityForces": "",
    "rank": "",
    "weaponRestriction": "",
    "assignedWork": "",
    "college": "",
    "profession": "",
    "notes": "ضم من مبارك بتاريخ 20/2055/8م",
    "decisionDate": "",
    "religion": "مسيحي",
    "vacationPlans": "",
    "len": "",
    "recommendations": "",
    "details": ""
  }
]
  */
