"use client";
import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridToolbar, GridValueGetterParams } from "@mui/x-data-grid";
import Sidebar from "@/app/components/Sidebar";
import Topbar from "@/app/components/Topbar";
import ApartmentIcon from "@mui/icons-material/Apartment";
import IconButton from "@mui/material/IconButton";
import ImportExportIcon from '@mui/icons-material/ImportExport';
import Button from "@mui/material/Button";
import Link from 'next/link'





const admin_db = () => {

  const [isClient, setIsClient] = useState(false);
  const [selectedRow, setSelectedRow] = React.useState<number | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, rowId: number) => {
    if (event.target.files) {
      console.log(`File selected for row ${rowId}:`, event.target.files[0]);
      // Process the file as needed
    }
  };
  
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 90,
    },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
    {
      field: 'import',
      headerName: 'Import File',
      sortable: false,
      width: 160,
      renderCell: (params) => (
        <Link href={`/dashboard/upload_data/${params.row.id}`} passHref>
          <IconButton>
            <ImportExportIcon ></ImportExportIcon>
          </IconButton>
          
        </Link>
      ),
    },
  ];
  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];
  

  const handleRowClick = (id: number) => {
    if (selectedRow === id) {
      setSelectedRow(null);
    } else {
      setSelectedRow(id);
    }
  };
  

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <main>
      {isClient && (
        <div className="flex">
          <Sidebar />
          <div className="flex-1 p-4">
            <Topbar />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-5 max-w-5xl mx-auto">
              <div className="flex items-center bg-slate-600 rounded-lg p-4 text-white hover:bg-slate-700 transition-colors duration-300">
                <div className="flex-1">
                  <ApartmentIcon fontSize="large" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold">20</h2>
                  <p>Companies</p>
                </div>
              </div>

              <div className="flex items-center bg-slate-600 rounded-lg p-4 text-white hover:bg-slate-700 transition-colors duration-300">
                <div className="flex-1">
                  <ApartmentIcon fontSize="large" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold">20</h2>
                  <p>Companies</p>
                </div>
              </div>
              <div className="flex items-center bg-slate-600 rounded-lg p-4 text-white hover:bg-slate-700 transition-colors duration-300">
                <div className="flex-1">
                  <ApartmentIcon fontSize="large" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold">20</h2>
                  <p>Companies</p>
                </div>
              </div>
              <div className="flex items-center bg-slate-600 rounded-lg p-4 text-white hover:bg-slate-700 transition-colors duration-300">
                <div className="flex-1">
                  <ApartmentIcon fontSize="large" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold">20</h2>
                  <p>Companies</p>
                </div>
              </div>
            </div>
            <div
              style={{
                height: 400,
                width: "100%",
                maxWidth: 1000,
                margin: "auto",
              }}
            >
              <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[5, 10]}
                components={{Toolbar:GridToolbar}}
                
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default admin_db;
