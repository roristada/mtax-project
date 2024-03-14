"use client";
import React, { Suspense, useEffect, useState } from "react";
import Sidebar from "@/app/components/Sidebar";
import Topbar from "@/app/components/Topbar";
import Navbar from "@/app/components/Navbar";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import jwt_decode from "jwt-decode";
import "react-big-calendar/lib/css/react-big-calendar.css";
import BarChart from "@/app/components/Charts/Net_income/BarChart";
import DoughnutChart from "@/app/components/Charts/Net_income/Dougnut";
import DoughnutChartExp from "@/app/components/Charts/Expenses/Dougnut";
import DoughnutChartTax from "@/app/components/Charts/Tax/Dougnut";

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
  const [year, setYear] = useState([]);
  const [selectedYear1, setSelectedYear1] = useState("");
  const [selectedYear2, setSelectedYear2] = useState("");
  const [apiResponse1, setApiResponse1] = useState(null);
  const [dataIncome1, setDataincome1] = useState(null);
  const [Incomeforyear1, setIncomeforyear1] = useState(null);
  const [Expensesforyear1, setExpensesforyear1] = useState(null);
  const [Taxforyear1, setTaxforyear1] = useState(null);

  const [apiResponse2, setApiResponse2] = useState(null);
  const [dataIncome2, setDataincome2] = useState(null);
  const [Incomeforyear2, setIncomeforyear2] = useState(null);
  const [Expensesforyear2, setExpensesforyear2] = useState(null);
  const [Taxforyear2, setTaxforyear2] = useState(null);

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

  const fetchData1 = async () => {
    try {
      const query = new URLSearchParams();
      if (selectedYear1) {
        query.append("year", selectedYear1);
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
      setApiResponse1(data.totalNetIncome);
      setDataincome1(data.incomeBymonth);
      setIncomeforyear1(data.IncomeForYear);
      setExpensesforyear1(data.ExpensesForyear);
      setTaxforyear1(data.TaxForyear);
      console.log(data.ExpensesForyear);
      console.log("Data from API:", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchData2 = async () => {
    try {
      const query = new URLSearchParams();
      if (selectedYear2) {
        query.append("year", selectedYear2);
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
      setApiResponse2(data.totalNetIncome);
      setDataincome2(data.incomeBymonth);
      setIncomeforyear2(data.IncomeForYear);
      setExpensesforyear2(data.ExpensesForyear);
      setTaxforyear2(data.TaxForyear);
      console.log(data.ExpensesForyear);
      console.log("Data from API:", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (selectedYear1) {
      fetchData1();
    }
    if (selectedYear2) {
      fetchData2();
    }
  }, [selectedYear1, selectedYear2]);

  useEffect(() => {
    setIsClient(true);
    if (token) {
      try {
        const decoded: User = jwt_decode(token);
        const isExpired = Date.parse(decoded.exp) < Date.now();
        fetchYears();

        console.log(decoded);
        if (isExpired) {
          Cookies.remove("token");
          route.push("/login");
        } else {
          if (decoded.role == "user") {
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

  return (
    <>
      <main>
        {isClient && (
          <div className="flex ">
            <Sidebar />
            <div className="flex-1 p-4">
              <Topbar />
              <div className="grid grid-cols-2 md:grid-cols-2 gap-20 w-fulส">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Select Year1
                  </label>
                  <select
                    value={selectedYear1} // This controls the selected option based on the component's state
                    onChange={(e) => setSelectedYear1(e.target.value)}
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

                  {selectedYear1 && (
                    <div className="grid gap-24 mb-5 max-w-7xl mx-auto p-10 bg-slate-200 rounded-lg mt-5 ">
                      {selectedYear1 && apiResponse1 && (
                        <div className="grid grid-cols-1 md:grid-cols-1 gap-12">
                          <div className="p-20">
                            <h2>ยอดรวมการจ่ายเงินในแต่ละเดือนของบริษัท</h2>
                            <BarChart apiData={apiResponse1}  />
                          </div>
                          <div className="p-20">
                            <h2>สัดส่วนรายได้ของพนักงาน</h2>
                            <DoughnutChart IncomeForYear={Incomeforyear1} />
                          </div>
                          <div className="p-20">
                            <h2>สัดส่วนการหักรายได้ของพนักงาน</h2>
                            {Expensesforyear1 && (
                              <DoughnutChartExp
                                Expensesforyear={Expensesforyear1}
                              />
                            )}
                          </div>

                          <div className="p-20">
                            <h2>สัดส่วนการจ่ายภาษีของพนักงานและบริษัท</h2>
                            {Taxforyear1 && (
                              <DoughnutChartTax Taxforyear={Taxforyear1} />
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Select Year2
                  </label>
                  <select
                    value={selectedYear2} // This controls the selected option based on the component's state
                    onChange={(e) => setSelectedYear2(e.target.value)}
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

                  {selectedYear2 && (
                    <div className="grid gap-24 mb-5 max-w-7xl mx-auto p-10 bg-slate-200 rounded-lg mt-5">
                      {selectedYear2 && apiResponse2 && (
                        <div className="grid grid-cols-1 md:grid-cols-1 gap-12">
                          <div className="p-20">
                            <h2>ยอดรวมการจ่ายเงินในแต่ละเดือนของบริษัท</h2>
                            <BarChart apiData={apiResponse2} />
                          </div>
                          <div className="p-20" >
                            <h2>สัดส่วนรายได้ของพนักงาน</h2>
                            <DoughnutChart IncomeForYear={Incomeforyear2} />
                          </div>
                          <div className="p-20">
                            <h2>สัดส่วนการหักรายได้ของพนักงาน</h2>
                            {Expensesforyear2 && (
                              <DoughnutChartExp
                                Expensesforyear={Expensesforyear2}
                              />
                            )}
                          </div>

                          <div className="p-20">
                            <h2>สัดส่วนการจ่ายภาษีของพนักงานและบริษัท</h2>
                            {Taxforyear1 && (
                              <DoughnutChartTax Taxforyear={Taxforyear2} />
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default employee;
