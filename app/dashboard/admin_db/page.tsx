"use client";
import React, { useEffect, useState } from "react";
import {
  DataGrid,
  GridColDef,
  GridToolbar,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import Sidebar from "@/app/components/Sidebar";
import Topbar from "@/app/components/Topbar";
import ApartmentIcon from "@mui/icons-material/Apartment";
import IconButton from "@mui/material/IconButton";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import jwt_decode from "jwt-decode";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment-timezone";
import { Suspense } from "react";
import Loading from "./loading";

interface User {
  id: number;
  email: string;
  role: string;
}
interface Company {
  id: number;
  company_name: string;
  email: string;
  telephone: string;
  address: string;
}
interface CalendarEvent {
  id: number;
  title: string;
  start: string;
  end: string;
  allDay?: boolean;
  resource?: any; // Use this if you want to attach additional data to an event
}

const admin_db = () => {
  const [MyEventsList, setMyEventsList] = useState<CalendarEvent[]>([]);
  const localizer = momentLocalizer(moment);
  const [isClient, setIsClient] = useState(false);

  const [user, setUser] = useState<User | null>(null);
  const [count_company, setCount_company] = useState(0);
  const [company, setCompany] = useState<Company[]>([]);

  const token = Cookies.get("token");
  const route = useRouter();

  const EventComponent = ({ event }: { event: CalendarEvent }) => {
    // Format the start time (assuming the event.start is a Date object)
    const eventStyle = {
      padding: "2px 2px",
      borderRadius: "4px",
      whiteSpace: "nowrap", // Prevent the text from wrapping
      overflow: "hidden",
      textOverflow: "ellipsis",
    };
    const startTime = new Date(event.start).toLocaleString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, // or false if you prefer 24 hour format
    });
    return (
      <div style={eventStyle}>
        <div>{event.title}</div>
        <div>{startTime}</div>
      </div>
    );
  };

  const fetchAppointments = async () => {
    try {
      const response = await fetch("/api/appointment", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Assuming you're using token-based authentication
        },
      });
      const appointments = await response.json();
      console.log("APi =", appointments);
      // Convert appointment dates and times to JavaScript Date objects
      const events = appointments.map((appointment: any) => ({
        id: appointment.id, // or any unique identifier
        title: appointment.name, // or any title you prefer
        start: moment(appointment.date_app).toString(),
        end: moment(appointment.time_end).toString(),
        // Add more properties as needed
      }));
      setMyEventsList(events); // Assuming you have a state to hold your events

      console.log("Events after conversion:", events); // Assuming you have a state to hold your events
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const fetchData = async () => {
    try {
      const res = await fetch("/api/dashboard/getData_admin", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      console.log(data);

      setCount_company(data.userCount);
      setCompany(data.company);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    setIsClient(true);
    if (token) {
      try {
        const decoded: User = jwt_decode(token);
        console.log(decoded);
        if (decoded.role == "admin") {
          fetchData();
          fetchAppointments();
        } else {
          route.push("/");
        }
      } catch (error) {
        // If token is invalid or expired
        console.error("Invalid token:", error);
        route.push("/login"); // Redirect to login page
      }
    } else {
      route.push("/login"); // Redirect to login page if token not found
    }
  }, [route]);

  //console.log(company)

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    rowId: number
  ) => {
    if (event.target.files) {
      console.log(`File selected for row ${rowId}:`, event.target.files[0]);
      // Process the file as needed
    }
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "company_name", headerName: "Company", width: 130 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "telephone", headerName: "Telephone", width: 130 },
    { field: "address", headerName: "Address", width: 200 },
    // Add other columns as necessary...
  ];

  // Map the company state to rows for the DataGrid.
  const rows = company.map((comp) => ({
    id: comp.id,
    company_name: comp.company_name,
    email: comp.email,
    telephone: comp.telephone,
    address: comp.address,
    // Add other fields from the Company interface...
  }));

  return (
    <>
      <main>
        {isClient && (
          <div className="flex">
            <Sidebar />
            <div className="flex-1 p-4">
              <Topbar />
              <Suspense fallback={<Loading/>}>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-5 max-w-5xl mx-auto">
                  <div className="flex items-center bg-slate-600 rounded-lg p-4 text-white hover:bg-slate-700 transition-colors duration-300">
                    <div className="flex-1">
                      <ApartmentIcon fontSize="large" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold">{count_company}</h2>
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
                    getRowId={(row) => row.id}
                    initialState={{
                      pagination: {
                        paginationModel: {
                          pageSize: 5,
                        },
                      },
                    }}
                    pageSizeOptions={[5]}
                    components={{ Toolbar: GridToolbar }}
                  />
                </div>
                <div>
                  <div
                    style={{
                      height: 500, // Adjust the height as needed
                      width: "100%",
                      maxWidth: 1000,
                      margin: "auto",
                    }}
                  >
                    <Calendar
                      localizer={localizer}
                      events={MyEventsList}
                      startAccessor="start"
                      endAccessor="end"
                      style={{ height: 600 }}
                      components={{
                        event: EventComponent, // Pass the custom event component here
                      }}
                    />
                  </div>
                </div>
              </Suspense>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default admin_db;
