"use client";
import React, { Suspense, useEffect, useState } from "react";
import {
  DataGrid,
  GridColDef,
  GridToolbar,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import Sidebar from "@/app/components/Sidebar";
import Topbar from "@/app/components/Topbar";
import ApartmentIcon from "@mui/icons-material/Apartment";

import Navbar from "@/app/components/Navbar";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import jwt_decode from "jwt-decode";
import "react-big-calendar/lib/css/react-big-calendar.css";
import TableData from "@/app/components/TableData";

interface User {
  id: number;
  email: string;
  role: string;
  exp: string;
}

const employee = () => {
  const token = Cookies.get("token");

  const route = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [countEmp, setCountEmp] = useState(0);
  const [countMCon, setCoutMcon] = useState(0);
  const [countWCon, setCoutWcon] = useState(0);
  const [countDcon, setCoutDcon] = useState(0);
  const [countGen, setCountGen] = useState({ genderM: 0, genderF: 0 });

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
      setCountEmp(data.employeeCount);
      setCoutMcon(data.contractCounts.monthly);
      setCoutWcon(data.contractCounts.weekly);
      setCoutDcon(data.contractCounts.day);
      const genderMCount = data.genderCounts.genderM[0].employeeGender;
      const genderFCount = data.genderCounts.genderF[0].employeeGender;
      
      setCountGen({ genderM: genderMCount, genderF: genderFCount });

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
        console.log("test" ,isExpired)
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
  }, [route ,token]);

  return (
    <>
      <main>
        {isClient && (
          <div className="flex ">
            <Sidebar />
            <div className="flex-1 p-4">
              <Topbar />
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-5 max-w-5xl mx-auto">
                <div className="flex items-center bg-slate-600 rounded-lg p-4 text-white hover:bg-slate-700 transition-colors duration-300">
                  <div className="flex-1 ">
                    <ApartmentIcon fontSize="large" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold">{countEmp}</h2>
                    <p>Employee</p>
                  </div>
                </div>

                <div className="flex items-center bg-slate-600 rounded-lg p-4 pr-8 text-white hover:bg-slate-700 transition-colors duration-300">
                  <div className="flex-1 pr-5">
                    <ApartmentIcon fontSize="large" />
                  </div>
                  <div className="grid grid-cols-3 gap-x-12">
                    <div>
                      <h2 className="text-xl text-center font-semibold">
                        Month
                      </h2>
                      <h2 className="text-xl text-center font-semibold">
                        {countMCon}
                      </h2>
                    </div>
                    <div>
                      <h2 className="text-xl text-center font-semibold">
                        Week
                      </h2>
                      <h2 className="text-xl text-center font-semibold">
                        {countWCon}
                      </h2>
                    </div>
                    <div>
                      <h2 className="text-xl text-center font-semibold">Day</h2>
                      <h2 className="text-xl text-center font-semibold">
                        {countDcon}
                      </h2>
                    </div>
                    <p className="col-span-3 text-center">สัญญาจ้าง</p>
                  </div>
                </div>
                <div className="flex items-center bg-slate-600 rounded-lg p-4 text-white hover:bg-slate-700 transition-colors duration-300">
                  <div className="flex-1 ">
                    <ApartmentIcon
                      fontSize="large"
                      className="justify-center"
                    />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-center">
                      Male:{" "}
                      <span className="font-normal">{countGen.genderM}</span>
                    </h2>
                    <h2 className="text-xl font-semibold text-center">
                      Female:{" "}
                      <span className="font-normal">{countGen.genderF}</span>
                    </h2>

                    <p className="text-l text-center">Gender</p>
                  </div>
                </div>
              </div>
              <div className="container mx-auto">
                <Suspense
                  fallback={<React.Fragment>Loading...</React.Fragment>}
                >
                  <TableData  />
                </Suspense>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default employee;
