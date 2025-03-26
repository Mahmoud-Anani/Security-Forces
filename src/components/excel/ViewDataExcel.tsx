import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

import { useEffect, useState } from "react";

const paginationModel = { page: 0, pageSize: 12 };
function ViewDataExcel({ data }: any) {
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const [rows, setRows] = useState<any[]>([]);
  // console.log(data);

  useEffect(() => {
    if (data.length > 0) {
      const keys = Object.keys(data[0] || {});

      const columnsData: GridColDef[] = keys.map((key, index) => ({
        field: key,
        headerName: data[0]?.[index] || key,
        width: 200,
        renderCell: (params) => {
          let value = params?.value ?? ""; // Ensure params and value are defined

          // Convert Date objects to localized strings
          if (value instanceof Date) {
            value = value.toLocaleDateString("ar-EG");
          }

          const displayValue = value || `لا يوجد بيانات ${value}`; // Fallback text if value is empty
          const isMissingData = `${displayValue}`.includes("لا يوجد");

          return (
            <span
              className="text-xl"
              style={{
                textAlign: "center",
                color: isMissingData ? "red" : "black",
                fontWeight: "bold",
              }}
            >
              {displayValue}
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
      <Paper
        sx={{ height: 800, width: "100%", direction: "rtl", overflowX: "auto" }}
      >
        <DataGrid
          className="text-right ms-5"
          style={{ width:"290.6pc" }}
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          columnVisibilityModel={undefined} // Ensure all columns are visible
          sx={{
            border: 0,
            "& .MuiDataGrid-virtualScroller": {
              overflowX: "auto",
            },
          }}
        />
      </Paper>
    </>
  );
}

export default ViewDataExcel;
