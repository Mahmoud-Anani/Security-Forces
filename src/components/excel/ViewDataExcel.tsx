import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

import { useEffect, useState } from "react";

const paginationModel = { page: 0, pageSize: 5 };
function ViewDataExcel({ data }: any) {
  const [columns, setColums] = useState<GridColDef[]>([]);
  const [rows, setRows] = useState<any[]>([]);
  console.log(data);

  useEffect(() => {
    if (data.length > 0) {
      const keys = Object.keys(data[0]);
      const columnsData: GridColDef[] = keys.map((key, index) => ({
        field: key,
        headerName: data[0][index],
        width: 200,
      }));

      setColums(columnsData);

      const rows = data.slice(1).map((row: any, index: number) => ({
        id: index,
        ...row,
      }));

      setRows(rows);
    }
  }, [data]);
  return (
    <>
      <Paper sx={{ height: 400, width: "100%", direction:"rtl" }}>
        <DataGrid
          className={`text-right`}
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ border: 0 }}
        />
      </Paper>
    </>
  );
}

export default ViewDataExcel;
