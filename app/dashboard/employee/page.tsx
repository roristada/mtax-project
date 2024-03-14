"use client";
import React, { Suspense, useEffect, useState } from "react";
import Sidebar from "@/app/components/Sidebar";
import Topbar from "@/app/components/Topbar";
import Navbar from "@/app/components/Navbar";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import jwt_decode from "jwt-decode";
import "react-big-calendar/lib/css/react-big-calendar.css";
import TableEmp from "@/app/components/Table/TableEmp";
import Tableincome from "@/app/components/Table/TableIncome";
import Doughnuthalf from "@/app/components/Charts/Dougnuthalf";
import TableTax from "@/app/components/Table/TableTax";
import TableExpenses from "@/app/components/Table/TableExpenses";

interface User {
  id: number;
  email: string;
  role: string;
  exp: string;
}
interface data {
  current: string;
  goal: string;
}

const employee = () => {
  const token = Cookies.get("token");
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const route = useRouter();
  const [isClient, setIsClient] = useState(false);
 
  const fetchData = async () => {
    try {
      const res = await fetch("/api/dashboard/getDataEmp", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      console.log(data);
     
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    setIsClient(true);
    if (token) {
      try {
        const decoded: User = jwt_decode(token);
        const isExpired = Date.parse(decoded.exp) < Date.now();

        console.log(decoded);
        if (isExpired) {
          Cookies.remove("token");
          route.push("/login");
        } else {
          if (decoded.role == "user") {
            fetchData();
          } else if (decoded.role == "admin") {
            route.push("/dashboard/admin_db");
          } else {
            route.push("/");
          }
        }
      } catch (error) {
        // If token is invalid or expired
        console.error("Invalid token:", error);
        route.push("/login"); // Redirect to login page
      }
    } else {
      route.push("/login"); // Redirect to login page if token not found
    }
  }, [route, token]);

  const handleSelectEmployee = (employeeId: any) => {
    setSelectedEmployeeId(employeeId);
  };
  console.log("selected", selectedEmployeeId);
  return (
    <>
      <main>
        {isClient && (
          <div className="flex ">
            <Sidebar />
            <div className="flex-1 p-4">
              <Topbar />
              <div className="grid container mx-auto w-full">
                <Suspense
                  fallback={<React.Fragment>Loading...</React.Fragment>}
                >
                  <div className="max-w-5xl">
                    <TableEmp onSelectEmployee={handleSelectEmployee} />
                  </div>
                  
                </Suspense>
                {selectedEmployeeId && (
                  <div className="grid grid-cols-2 mt-12 ">
                    <div>
                      <h1 className="mb-2 font-semibold text-lg">รายได้</h1>
                      <Tableincome employeeId={selectedEmployeeId} />
                    </div>
                    <div className="">
                    <h1 className="mb-2 font-semibold text-lg">ภาษี</h1>
                      <TableTax employeeId={selectedEmployeeId} />
                    </div>
                    <div className="mt-12 col-span-2 mx-auto">
                    <h1 className="mb-2 font-semibold text-lg">รายหัก</h1>
                      <TableExpenses employeeId={selectedEmployeeId} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default employee;
