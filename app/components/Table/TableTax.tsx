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

interface Tax{
    id:string,
    month:string,
    year:string,
    employee_tax:string,
    company_tax:string,
    employee_social_security:string,
    company_social_security:string,
    provident_fund:string,
}



export default function TableData(params: any) {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [taxData, setTaxData] = useState<Tax[]>([]);
  const [loading, setLoading] = useState(true);
  const token = Cookies.get("token");
  const route = useRouter();


  useEffect(() => {
    if (params.employeeId) {
      const fetchTaxData = async () => {
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
              const formattedTaxData = data.tax.map((item:any, index:any) => ({
                id: index+1,
                employee_tax: item.employee_tax,
                company_tax: item.company_tax,
                employee_social_security: item.employee_social_security,
                company_social_security: item.company_social_security,
                provident_fund:item.provident_fund,
                month: item.month,
                year: item.year,
              }));
              setTaxData(formattedTaxData);
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
  
      fetchTaxData();
    }
  }, [params.employeeId]);

  
  const taxColumns = [
    { field: "id", headerName: "No.", width: 90 },
    { field: "month", headerName: "Month", width: 90 },
    { field: "year", headerName: "Year", width: 90 },
    { field: "employee_tax", headerName: "ภาษีพนักงานจ่าย", width: 100 },
    { field: "company_tax", headerName: "ภาษีบริษัทจ่ายให้", width: 100 },
    { field: "employee_social_security", headerName: "ประกันสังคม", width: 100 },
    { field: "company_social_security", headerName: "ประกันสังคมบริษัท", width: 100 },
    { field: "provident_fund", headerName: "กองทุนสำรอง", width: 100 },
    
    
  ];

  return (
    <div style={{ width: "90%" }}>
      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={taxData}
          columns={taxColumns}
          getRowId={(row) => row.id}
          loading={loading}
        />
      </div>
    </div>
  );
}
