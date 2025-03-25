import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

import { useEffect, useState } from "react";

const paginationModel = { page: 0, pageSize: 5 };
function ViewDataExcel({ data }: any) {
  const [columns, setColums] = useState<GridColDef[]>([]);
  const [rows, setRows] = useState<any[]>([]);
  useEffect(() => {
    if (data.length > 0) {
      const keys = Object.keys(data[0]);
      const columnsData: GridColDef[] = keys.map((key) => ({
        field: key,
        headerName: key,
        width: 200,
      }));
      setColums(columnsData);

      const rows = data.map((row: any, index: number) => ({
        id: index,
        ...row,
      }));
      setRows(rows);
    }
  }, [data]);
  return (
    <>
      <Paper sx={{ height: 400, width: "100%" }}>
        <DataGrid
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

/*

 <table border={1} className={`table-auto w-full z-20`}>
        <tbody>
          {data.map((row: any[], rowIndex: React.Key | null | undefined) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>
                  {cell !== undefined ? cell.toString() : ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
[
  [
    "م",
    "الاسم",
    "الرقم"
  ],
  [
    1,
    "محمود عناني غالي السيد",
    1028876202
  ],
  [
    2,
    "محمود عناني غالي السيد",
    1028876202
  ],
  [
    3,
    "محمود عناني غالي السيد",
    1028876202
  ],
  [
    4,
    "محمود عناني غالي السيد",
    1028876202
  ],
  [
    5,
    "محمود عناني غالي السيد",
    1028876202
  ],
  [
    6,
    "محمود عناني غالي السيد",
    1028876202
  ],
  [
    7,
    "محمود عناني غالي السيد",
    1028876202
  ],
  [
    8,
    "محمود عناني غالي السيد",
    1028876202
  ],
  [
    9,
    "محمود عناني غالي السيد",
    1028876202
  ],
  [
    10,
    "محمود عناني غالي السيد",
    1028876202
  ]
]
      
*/
