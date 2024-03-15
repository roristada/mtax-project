import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import jwt_decode from "jwt-decode";


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

interface Income {
  id:string
  salary: string;
  ot: string;
  commission: string;
  net_income: string;
}



export default function TableData(params: any) {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [incomeData, setIncomeData] = useState<Income[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const token = Cookies.get("token");
  const route = useRouter();

  const filteredEmployees = employees.filter((employee) => {
    return employee.thai_name.toLowerCase().includes(searchText.toLowerCase());
  });

  useEffect(() => {
    if (params.employeeId) {
      const fetchIncomeData = async () => {
        setLoading(true);
        try {
          const response = await fetch(
            `/api/dashboard/getDataEmp/getDataTable/${params.employeeId}`,{
              method: "GET",
              headers: {
                "Content-Type": "application/json",
      
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const data = await response.json();
          
          // Since the log shows `data` is an array, no need to access `data.income` directly
          console.log("data =", data); 
          
          if (response.ok) {
            if (response.ok) {
              const formattedIncomeData = data.income.map((item:any, index:any) => ({
                id: index+1,
                salary: item.salary,
                ot: item.ot,
                commission: item.commission,
                net_income: item.net_income,
                month: item.month,
                year: item.year,
              }));
              setIncomeData(formattedIncomeData);
            }
          } else {
            console.error("Error fetching data:", data.message || "Failed to fetch data");
          }
        } catch (error) {
          console.error("Failed to fetch income data:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchIncomeData();
    }
  }, [params.employeeId]);
  
  const incomeColumns = [
    { field: "id", headerName: "No.", width: 90 },
    { field: "month", headerName: "Month", width: 90 },
    { field: "year", headerName: "Year", width: 90 },
    { field: "salary", headerName: "Salary", width: 100 },
    { field: "ot", headerName: "OT", width: 100 },
    { field: "commission", headerName: "Commission", width: 100 },
    { field: "net_income", headerName: "Net Income", width: 100 },
    
  ];

  return (
    <div style={{ width: "90%" }}>
      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={incomeData}
          columns={incomeColumns}
          getRowId={(row) => row.id}
          loading={loading}
        />
      </div>
    </div>
  );
}
