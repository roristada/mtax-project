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

interface Expenses {
    id:string
    month :string,
    year:string,
    deduction_leave:string,
    deduction_late:string,
    deduction_early_leave:string,
    deduction_absence:string,
    deduction_1:string,
    deduction_2:string,
    deduction_3:string,
    deduction_4:string,
    deduction_5:string,
    deduction_6:string,
    deduction_7:string,
    deduction_8:string,
    deduction_9:string,
    deduction_10:string
}




export default function TableData(params: any) {
  const [expensesData, setExpensesData] = useState<Expenses[]>([]);
  const [loading, setLoading] = useState(true);
  const token = Cookies.get("token");
  const route = useRouter();


  useEffect(() => {
    if (params.employeeId) {
      const fetchExpensesData = async () => {
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
              const formattedexpensesData = data.expenses.map((item:any, index:any) => ({
                id: index+1,
                deduction_leave: item.deduction_leave,
                deduction_late: item.deduction_late,
                deduction_early_leave: item.deduction_early_leave,
                deduction_absence: item.deduction_absence,
                deduction_1:item.deduction_1,
                deduction_2:item.deduction_2,
                deduction_3:item.deduction_3,
                deduction_4:item.deduction_4,
                deduction_5:item.deduction_5,
                deduction_6:item.deduction_6,
                deduction_7:item.deduction_7,
                deduction_8:item.deduction_8,
                deduction_9:item.deduction_9,
                deduction_10:item.deduction_10,
                month: item.month,
                year: item.year,
              }));
              setExpensesData(formattedexpensesData);
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
  
      fetchExpensesData();
    }
  }, [params.employeeId]);

  
  const expensesColumns = [
    { field: "id", headerName: "No.", width: 90 },
    { field: "month", headerName: "Month", width: 90 },
    { field: "year", headerName: "Year", width: 90 },
    { field: "deduction_leave", headerName: "ภาษีพนักงานจ่าย", width: 100 },
    { field: "deduction_late", headerName: "ภาษีบริษัทจ่ายให้", width: 100 },
    { field: "deduction_early_leave", headerName: "ประกันสังคม", width: 100 },
    { field: "deduction_absence", headerName: "ประกันสังคมบริษัท", width: 100 },
    { field: "deduction_1", headerName: "รายหัก1", width: 100 },
    { field: "deduction_2", headerName: "รายหัก2", width: 100 },
    { field: "deduction_3", headerName: "รายหัก3", width: 100 },
    { field: "deduction_4", headerName: "รายหัก4", width: 100 },
    { field: "deduction_5", headerName: "รายหัก5", width: 100 },
    { field: "deduction_6", headerName: "รายหัก6", width: 100 },
    { field: "deduction_7", headerName: "รายหัก7", width: 100 },
    { field: "deduction_8", headerName: "รายหัก8", width: 100 },
    { field: "deduction_9", headerName: "รายหัก9", width: 100 },
    { field: "deduction_10", headerName: "รายหัก10", width: 100 },
    
    
  ];

  return (
    <div style={{ width: "90%" }}>
      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={expensesData}
          columns={expensesColumns}
          getRowId={(row) => row.id}
          loading={loading}
        />
      </div>
    </div>
  );
}
