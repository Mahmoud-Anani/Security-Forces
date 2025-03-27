import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { memo, useEffect, useState } from "react";
import { rowsDataState } from "../../stores/seniorDate";
import { useRecoilState } from "recoil";

const paginationModel = { page: 0, pageSize: 12 };

function ViewDataExcel({ data }: any) {
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const [rows, setRows] = useRecoilState(rowsDataState);
  const [filteredRows, setFilteredRows] = useState<any[]>([]);
  const [filters, setFilters] = useState<{ [key: string]: string }>({});
  const [isInitialized, setIsInitialized] = useState(false); 

  useEffect(() => {
    if (data.length > 0) {
      const keys = Object.keys(data[0] || {});

      const columnsData: GridColDef[] = keys.map((key, index) => ({
        field: key,
        headerName: data[0]?.[index] || key,
        minWidth: 200,
        flex: 1,
        filterable: true,
        renderCell: (params) => {
          const value = params?.value ?? "";
          const displayValue = String(value) || `لا يوجد بيانات`;
          const isMissingData = displayValue.includes("لا يوجد");

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
      setIsInitialized(true); 
    }
  }, [data]);

  useEffect(() => {
    if (isInitialized) {
      setFilteredRows(rows);
    }
  }, [rows, isInitialized]); 

  useEffect(() => {
    if (isInitialized) {
      applyFilters();
    }
  }, [filters]);

  const applyFilters = () => {
    if (!rows.length) return;

    const updatedRows = rows.filter((row) =>
      Object.entries(filters).every(([column, value]) =>
        `${row[column]}`?.toString().toLowerCase().includes(value.toLowerCase())
      )
    );
    setFilteredRows(updatedRows);
  };

  const handleFilterChange = (column: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [column]: value,
    }));
  };

  return (
    <Paper sx={{ width: "100%", overflowX: "auto" }}>
      <div style={{ display: "flex", gap: "10px", padding: "10px" }}>
        {columns.map((col) => (
          <input
            key={col.field}
            type="text"
            placeholder={`فلتر حسب ${col.headerName}`}
            onChange={(e) => handleFilterChange(col.field, e.target.value)}
            className={`focus-visible:outline-2 focus-visible:outline-[#70ee96] focus-visible:border-2 focus-visible:!border-[#01922d]`}
            style={{
              padding: "5px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
        ))}
      </div>
      <DataGrid
        style={{ width: "400pc", direction: "rtl" }}
        className="text-right ms-5"
        rows={filteredRows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}

export default memo(ViewDataExcel);
