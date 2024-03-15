"use client";
import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import MenuItem from "@mui/material/MenuItem";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { FormControl, TextField } from "@mui/material";
import FormHelperText from "@mui/material/FormHelperText";
import ReCAPTCHA from "react-google-recaptcha";
import { DatePicker } from "@mui/x-date-pickers";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import dayjs from "dayjs";
import jwt_decode from "jwt-decode";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment-timezone";
import Sidebar from "@/app/components/Sidebar";

interface User {
  id: number;
  email: string;
  role: string;
  exp: string;
}

interface CalendarEvent {
  id: number;
  title: string;
  start: string;
  end: string;
  allDay?: boolean;
  resource?: any; // Use this if you want to attach additional data to an event
}

// interface ProcessEnv {
//   NEXT_PUBLIC_RECAPTCHA_SITEKEY: string;
// }
//const sitekey: string = process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY || '';
const localizer = momentLocalizer(moment);

const Appointment = () => {
  const token = Cookies.get("token");
  const [disabledTimes, setDisabledTimes] = useState([]);
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [user, setUser] = useState<User | null>(null);
  
  const [MyEventsList, setMyEventsList] = useState<CalendarEvent[]>([]);

  const [appoint, setAppoint] = useState({
    email: "",
    name: "",
    time_app: "",
    date_app: "",
    note_app: "Admin",
    staff: "",
    status: "Complete",
    time_end: "",
    recapt_token: "",
  });
  const route = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [time, setTime] = useState(new Date());

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

    const endTime = new Date(event.end).toLocaleString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, // or false if you prefer 24 hour format
    });

    return (
      <div style={eventStyle}>
        <div>{event.title}</div>
        <div>
          {startTime} - {endTime}
        </div>
      </div>
    );
  };

  const fetchAppointmentcalendar = async () => {
    try {
      const response = await fetch("/api/appointment", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const appointments = await response.json();
      console.log(appointments);

      // Convert appointment dates and times to JavaScript Date objects
      const events = appointments.map((appointment: any) => ({
        id: appointment.id_appointment,
        title: appointment.name,
        start: appointment.time_app, // Convert to Date object
        end: appointment.time_end, // Convert to Date object
      }));
      setMyEventsList(events);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const fetchAppointments = async () => {
    try {
      const response = await fetch("/api/appointment");
      const appointments = await response.json();

      const times = appointments.map((app: any) => ({
        start: dayjs(app.time_app).format("HH:mm"),
        end: dayjs(app.time_end).format("HH:mm"),
      }));
      console.log("times = ", times);
      setDisabledTimes(times);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const handleStartDateChange = (startDate: any) => {
    if (startDate) {
      setAppoint({
        ...appoint,
        date_app: startDate.toISOString(), // Assuming you want to store the ISO string
        time_app: startDate.toISOString(),
      });
    }
  };

  const handleEndDateChange = (endDate: any) => {
    if (endDate) {
      setAppoint({
        ...appoint,
        time_end: endDate.toISOString(),
      });
    }
  };

  //-------------------------------------------------------------------------------------------------------------------------------//
  const [isDateValid, setIsDateValid] = useState(true);
  // const handleDate = (date: any) => {

  //   if (date) {
  //     //const selectedDate = date.toDate();
  //     const selectedDate = new Date(date);
  //     const formattedDate = new Date(
  //       selectedDate.getFullYear(),
  //       selectedDate.getMonth(),
  //       selectedDate.getDate()
  //     );

  //     const options = {
  //       year: "numeric" as const,
  //       month: "2-digit" as const,
  //       day: "2-digit" as const,
  //     };
  //     const formattedDateString = formattedDate.toLocaleDateString(
  //       undefined,
  //       options
  //     );
  //     console.log(formattedDateString);
  //     const selectedTime = date
  //       .toDate()
  //       .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  //     const selectedDateTime = new Date(date);
  //     selectedDateTime.setHours(selectedDateTime.getHours() + 2);

  //     const endTime = selectedDateTime.toLocaleTimeString([], {
  //       hour: "2-digit",
  //       minute: "2-digit",
  //     });

  //     setAppoint({
  //       ...appoint,
  //       date_app: formattedDateString,
  //       time_app: selectedTime,
  //       time_end: endTime,
  //     });
  //     setIsDateValid(true);
  //   } else {
  //     setIsDateValid(false);
  //   }
  // };

  // const handleRecaptchaChange = (token:any) => {
  //   setAppoint({...appoint ,recapt_token: token })
  // };
  //-------------------------------------------------------------------------------------------------------------------------------//

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!appoint.date_app) {
      setIsDateValid(false);
      return;
    }

    if (!appoint.recapt_token) {
      alert("Please complete the reCAPTCHA verification.");
      return;
    }

    try {
      const response = await fetch("/api/appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appoint),
      });
      if (response.ok) {
        alert("Appointment Success");
        route.push("/dashboard/admin_db");
      } else {
        console.error("Appointment failed:", response.statusText);
        alert("Appointment Dubplicata . Please try again.");
      }
    } catch (error) {
      console.error("Error :", error);
    }
  };

  const handleRecaptchaChange = async (token: any) => {
    setRecaptchaToken(token);
    setAppoint((prevState) => ({
      ...prevState,
      recapt_token: token, // updating the state with the new token
    }));
  };

  useEffect(() => {
    setIsClient(true);
    if (token) {
      try {
        const decoded: User = jwt_decode(token);
        console.log(decoded);
        setUser(decoded); // Now storing the entire decoded user object
        if (decoded.role === "admin") {
          // Assuming you now store the user's email in the `user` state
          setAppoint((prev) => ({
            ...prev,
            email: decoded.email, // Set the admin's email
            name: "Admin", // Set the name to "Admin"
          }));
          fetchAppointments();
          fetchAppointmentcalendar();
        } else {
          route.push("/");
        }
      } catch (error) {
        console.error("Invalid token:", error);
        route.push("/login");
      }
    } else {
      route.push("/login");
    }
  }, [token, route]); // Added `token` to the dependency array

  return (
    <div className="flex w-full h-screen bg-slate-700">
      <Sidebar/>
      <div className="flex-1 max-w-7xl max-h-full bg-white mx-auto rounded-xl p-3 my-4 ">
        <form onSubmit={handleSubmit}>
          <h1 className="text-lg">{appoint.name}</h1>
          <div className="max-w-2xl mx-auto my-5">
            <label className="block mb-1 text-lg">Date and Time:</label>
            <div className="flex justify-center mb-3">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Start"
                  value={appoint.date_app ? dayjs(appoint.date_app) : null}
                  onChange={(newValue) => {
                    handleStartDateChange(newValue);
                  }}
                  disablePast
                />

                <DatePicker
                  label="To"
                  value={appoint.time_end ? dayjs(appoint.time_end) : null}
                  onChange={(newValue) => {
                    handleEndDateChange(newValue);
                  }}
                  disablePast
                />
              </LocalizationProvider>
            </div>
            {!isDateValid && (
              <FormHelperText error={true}>
                Please select a date and time.
              </FormHelperText>
            )}
          </div>

          <div className="max-w-2xl mx-auto my-2">
            <label className="block mb-4 text-lg">Staff:</label>
            <FormControl fullWidth>
              <InputLabel id="label-staff">Staff </InputLabel>
              <Select
                labelId="label-staff"
                id="demo-simple-select"
                value={appoint.staff}
                label="Age"
                onChange={(e) => {
                  setAppoint({ ...appoint, staff: e.target.value });
                }}
                required
              >
                <MenuItem value={"MR.1"}>MR.1</MenuItem>
                <MenuItem value={"MR.2"}>MR.2</MenuItem>
                <MenuItem value={"MR.3"}>MR.3</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="max-w-2xl mx-auto my-2 flex justify-center">
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY!}
              onChange={(token) => handleRecaptchaChange(token)}
            />
          </div>
          <div className="max-w-2xl mx-auto my-2 flex justify-center">
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg mt-3 text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
        
      </div>
    </div>
  );
};

export default Appointment;
