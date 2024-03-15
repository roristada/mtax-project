"use client";
import React, { Suspense, useEffect, useState } from "react";
import Sidebar from "@/app/components/Sidebar";
import Topbar from "@/app/components/Topbar";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import jwt_decode from "jwt-decode";

import "react-big-calendar/lib/css/react-big-calendar.css";

import BarChart from "@/app/components/Charts/Net_income/BarChart";
import DoughnutChart from "@/app/components/Charts/Net_income/Dougnut";
import DoughnutChartExp from "@/app/components/Charts/Expenses/Dougnut";
import DoughnutChartTax from "@/app/components/Charts/Tax/Dougnut";

import TableEmp from "@/app/components/Table/TableEmp";

interface User {
  id: number;
  email: string;
  role: string;
  exp: string;
}

const employee = () => {
  const token = Cookies.get("token");
  const [selectedDataType, setSelectedDataType] = useState("Company");
  const route = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [year, setYear] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [apiResponse, setApiResponse] = useState(null);
  const [dataIncome, setDataincome] = useState(null);
  const [Incomeforyear, setIncomeforyear] = useState(null);
  const [Expensesforyear, setExpensesforyear] = useState(null);
  const [Taxforyear, setTaxforyear] = useState(null);


  const [sumIncomeEmp , setsumIncomeEmp] = useState("")
  // const fetchDataEmp = async () => {
  //   try {
  //     const res = await fetch("/api/dashboard/getDataEmp", {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",

  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     const data = await res.json();
  //     console.log(data);

  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  // useEffect(() => {
  //   setIsClient(true);
  //   if (token) {
  //     try {
  //       const decoded: User = jwt_decode(token);
  //         if (decoded.role == "user") {
  //           fetchDataEmp();
  //         } else if (decoded.role == "admin") {
  //           route.push("/dashboard/admin_db");
  //         } else {
  //           route.push("/");
  //         }
  //       }
  //      catch (error) {
  //       // If token is invalid or expired
  //       console.error("Invalid token:", error);
  //       route.push("/login"); // Redirect to login page
  //     }
  //   } else {
  //     route.push("/login"); // Redirect to login page if token not found
  //   }
  // }, [route, token])

  const fetchYears = async () => {
    try {
      const res = await fetch("/api/dashboard/getDataCompany/findYear", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Ensure you're passing the token correctly
        },
      });
      const { years } = await res.json();
      setYear(years);
      // Assuming the API returns an object with a `years` array
    } catch (error) {
      console.error("Error fetching years:", error);
    }
  };

  const fetchData = async () => {
    try {
      const query = new URLSearchParams();
      if (selectedYear) {
        query.append("year", selectedYear);
      }
      const res = await fetch(
        `/api/dashboard/getDataCompany?${query.toString()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setApiResponse(data.totalNetIncome);
      setDataincome(data.incomeBymonth);
      setIncomeforyear(data.IncomeForYear);
      setExpensesforyear(data.ExpensesForyear);
      setTaxforyear(data.TaxForyear)
      console.log(data.ExpensesForyear);
      console.log("Data from API:", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Call fetchData in an effect when selectedYear changes
  useEffect(() => {
    if (selectedYear) {
      fetchData();
    }
  }, [selectedYear]);

  useEffect(() => {
    setIsClient(true);

    if (token) {
      try {
        const decoded: User = jwt_decode(token);
        const isExpired = Date.parse(decoded.exp) < Date.now();
        console.log("test", isExpired);
        console.log(decoded);
        if (isExpired) {
          Cookies.remove("token");
          route.push("/login");
        } else {
          if (decoded.role == "user") {
            fetchYears();
            console.log("year =", year);
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

  const handleSelectEmployee = async (employeeId: any, selectedYear: any) => {
    // Ensure that selectedYear holds the currently selected year

    console.log(employeeId, selectedYear);

    const url = new URL(
      "/api/dashboard/getDataCompany/getEmp",
      window.location.origin
    );
    url.searchParams.append("employeeId", employeeId);
    url.searchParams.append("selectedYear", selectedYear);
    try {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }

      const data = await res.json();
      console.log(data);
      setsumIncomeEmp(data.sumIncomeEmp)

      // ... handle the response ...
    } catch (error) {
      console.error("Error sending data:", error);
      // ... handle the error ...
    }
  };

  return (
    <>
      <main>
        {isClient && (
          <div className="flex">
            <Sidebar />
            <div className="flex-1 p-4">
              <Topbar />
              <div className="mb-5 grid grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Select Data
                  </label>
                  <select
                    value={selectedDataType}
                    onChange={(e) => setSelectedDataType(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  >
                    <option selected value="Company">
                      Company
                    </option>
                    {/* <option value="Employee">Employee</option> */}
                  </select>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Select Year
                  </label>
                  <select
                    value={selectedYear} // This controls the selected option based on the component's state
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  >
                    <option value="">Choose Year</option>

                    {year.map((yearValue) => {
                      return (
                        <option key={yearValue} value={yearValue}>
                          {yearValue}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              {selectedDataType === "Company" && (
                <div className="grid gap-24 mb-5 max-w-7xl mx-auto">
                  {selectedYear && apiResponse && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      <div>
                        <h2>ยอดรวมการจ่ายเงินในแต่ละเดือนของบริษัท</h2>
                        <BarChart apiData={apiResponse} />
                      </div>
                      <div>
                        <h2>สัดส่วนรายได้ของพนักงาน</h2>
                        <DoughnutChart IncomeForYear={Incomeforyear} />
                      </div>
                      <div>
                        <h2>สัดส่วนการหักรายได้ของพนักงาน</h2>
                        {Expensesforyear && (
                          <DoughnutChartExp Expensesforyear={Expensesforyear} />
                        )}
                      </div>

                      <div>
                        <h2>สัดส่วนการจ่ายภาษีของพนักงานและบริษัท</h2>
                        {Expensesforyear && (
                          <DoughnutChartTax Taxforyear={Taxforyear} />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
              {/* {selectedDataType === "Employee" && selectedYear && (
                <div className="grid container mx-auto w-full">
                  <Suspense
                    fallback={<React.Fragment>Loading...</React.Fragment>}
                  >
                    <div className="max-w-5xl">
                      <TableEmp
                        onSelectEmployee={(employeeId) =>
                          handleSelectEmployee(employeeId, selectedYear)
                        }
                      />
                    </div>
                  </Suspense>

                  <div>
                        <h2>สัดส่วนรายได้ของพนักงาน</h2>
                        <DoughnutChart IncomeForYear={sumIncomeEmp} />
                      </div>
                </div>
              )} */}
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default employee;
