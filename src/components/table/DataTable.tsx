"use client";
import { Stack, TextField } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import * as React from "react";
import { GridFilterModel } from "@mui/x-data-grid";
export interface IDataTableProps {
  rows: any;
  columns: GridColDef[];
}

export default function DataTable(props: IDataTableProps) {
  const { rows, columns } = props;

  return (
    <DataGrid
      sx={{
        ".MuiDataGrid-columnHeaderTitle": {
          fontWeight: 600,
        },
        width: "100%",
      }}
      rows={rows}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 5 },
        },
      }}
      pageSizeOptions={[5, 10]}
      checkboxSelection={false}
      autoHeight
    />
  );
}
