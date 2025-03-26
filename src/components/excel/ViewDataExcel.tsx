import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

import { useEffect, useState } from "react";

const paginationModel = { page: 0, pageSize: 5 };
function ViewDataExcel({ data }: any) {
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const [rows, setRows] = useState<any[]>([]);
  console.log(data);

  useEffect(() => {
    if (data.length > 0) {
      const keys = Object.keys(data[0] || {});

      const columnsData: GridColDef[] = keys.map((key, index) => ({
        field: key,
        headerName: data[0]?.[index] || key,
        width: 200,
        renderCell: (params) => {
          return (
            <span
              className="text-xl "
              style={{
                textAlign: "center",
                color: !`${params.value}`.includes("لا يوجد") ? "black" : "red",
                fontWeight: "bold",
              }}
            >
              {params.value}
            </span>
          );
        },
      }));

      setColumns(columnsData);

      const formattedRows = data.slice(1).map((row: any, index: number) => {
        const formattedRow = Object.fromEntries(
          Object.entries(row).map(([key, value], colIndex) => {
            if (!value) {
              return [
                key,
                `لا يوجد ${columnsData[colIndex]?.headerName || "بيانات"}`,
              ];
            }

            if (typeof value === "string" && value.includes("000Z")) {
              return [key, new Date(value).toLocaleDateString("ar-EG")];
            }

            return [key, value];
          })
        );

        return {
          id: index,
          ...formattedRow,
        };
      });

      setRows(formattedRows);
    }
  }, [data]);
  return (
    <>
      <Paper sx={{ height: 400, width: "100%", direction: "rtl" }}>
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
