import { useRecoilState } from "recoil";
import { addedSoldiersState } from "../../stores/seniorDate";
import { useEffect } from "react";
import { Paper } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

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

  //   const [rows, setRows] = useState([]);

  useEffect(() => {
    // Map addedSoldiers to rows for the DataGrid
    // const rows = addedSoldiers.map((soldier, index) => ({
    //   id: index + 1, // Assign a unique ID
    //   ...soldier, // Spread the soldier data
    // }));
    // setRows(rows);
  }, []);

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
          // onRowSelectionModelChange={(e) => setDataSelected(e as [])}
          // need log columns visible
          // apiRef={apiRef}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ border: 0 }}
        />
      </Paper>
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
