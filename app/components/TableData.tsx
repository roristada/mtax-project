import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import jwt_decode from "jwt-decode";
import TextField from "@mui/material/TextField";
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

interface User {
  id: number;
  email: string;
  role: string;
}

interface Employee {
  employee_id: number;
  gender: string;
  thai_title: string;
  thai_name: string;
  thai_surname: string;
  card_id: string;
}

interface income{
  salary:string;
  ot:string
  commission:string
  net_income:string
}

export default function TableData() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const token = Cookies.get("token");
  const [income, setIncome] = useState<income[]>([]);
  const route = useRouter();

  const handleSearch = (event: any) => {
    setSearchText(event.target.value);
  };

  const filteredEmployees = employees.filter((employee) => {
    return employee.thai_name.toLowerCase().includes(searchText.toLowerCase());
  });

  

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/dashboard/getDataEmp", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data: { allEmployee: Employee[] } = await res.json();
      console.log(data);
      const employeesWithId = data.allEmployee.map((emp: Employee, index) => ({
        ...emp,
        index: index + 1,
      }));
      console.log(data.allEmployee);
      setEmployees(employeesWithId);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  

  const columns = [
    {
      field: "index", // Use the 'index' property for the No. column
      headerName: "No.",
      width: 90,
    },
    { field: "employee_id", headerName: "ID", width: 150 },
    { field: "gender", headerName: "Gender", width: 150 },
    { field: "thai_title", headerName: "Title", width: 110 },
    { field: "thai_name", headerName: "Name", width: 150 },
    { field: "thai_surname", headerName: "Surname", width: 150 },
    { field: "card_id", headerName: "Card ID", width: 150 },
  ];


  return (
    <div style={{ width: "90%" }}>
    <TextField
      id="search-box"
      placeholder="Search"
      variant="outlined"
      value={searchText}
      onChange={handleSearch}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      style={{ marginBottom: 12 }}
    />
    <div style={{ height: 500, width: "100%" }}>
    <DataGrid
            rows={filteredEmployees}
            columns={columns}
            getRowId={(row) => row.employee_id}
            loading={loading}
            
          />
    </div>
    
  </div>
  );
}
