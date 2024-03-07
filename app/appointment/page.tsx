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
import { FormControl } from "@mui/material";
import FormHelperText from "@mui/material/FormHelperText";
import ReCAPTCHA from "react-google-recaptcha";


// interface ProcessEnv {
//   NEXT_PUBLIC_RECAPTCHA_SITEKEY: string;
// }
//const sitekey: string = process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY || '';

const Appointment = () => {
  //console.log(process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY)
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [appoint, setAppoint] = useState({
    email: "",
    name: "",
    time_app: "",
    date_app: "",
    note_app: "",
    staff: "",
    status: "Not Complete",
    time_end: "",
    recapt_token:""
  });

//-------------------------------------------------------------------------------------------------------------------------------//
  const [isDateValid, setIsDateValid] = useState(true);
  const handleDate = (date: any) => {
    if (date) {
      //const selectedDate = date.toDate();
      const selectedDate = new Date(date);
      const formattedDate = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate()
      );

      
      const options = {
        year: "numeric" as const,
        month: "2-digit" as const,
        day: "2-digit" as const,
      };
      const formattedDateString = formattedDate.toLocaleDateString(
        undefined,
        options
      );
      console.log(formattedDateString);
      const selectedTime = date
        .toDate()
        .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

      const selectedDateTime = new Date(date);
      selectedDateTime.setHours(selectedDateTime.getHours() + 2);

      const endTime = selectedDateTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      setAppoint({
        ...appoint,
        date_app: formattedDateString,
        time_app: selectedTime,
        time_end: endTime,
      });
      setIsDateValid(true);
    } else {
      setIsDateValid(false);
    }
  };

  const handleRecaptchaChange = (token:any) => {
    setAppoint({...appoint ,recapt_token: token })
  };
//-------------------------------------------------------------------------------------------------------------------------------//

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!appoint.date_app ) {
      setIsDateValid(false);
      // Handle the case where date or captcha_token is missing
      return;
    }

    // if (!recaptchaValue) {
    //   alert("Please complete the reCAPTCHA verification.");
    //   return;
    // }
    console.log("This Appointment:", appoint);   
    
    try {
      const response = await fetch("/api/appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appoint),
      });
      if (response.ok) {
        console.log("Appoint successfully");
        
      } else {
        console.error("Appoint failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error :", error);
    }
  };

  return (
    <div className=" w-full h-full bg-slate-700 py-10">
      <div className=" max-w-6xl h-full bg-white mx-auto rounded-xl p-3">
          <form onSubmit={handleSubmit}>
            <div className="max-w-2xl mx-auto my-2">
              <label className="block mb-1 text-lg">Email:</label>
              <input
                type="text"
                placeholder=""
                value={appoint.email}
                onChange={(e) => {
                  setAppoint({ ...appoint, email: e.target.value });
                }}
                className=" max-w-2xl mx-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="max-w-2xl mx-auto my-2">
              <label className="block mb-1 text-lg">Name:</label>
              <input
                type="text"
                placeholder=""
                value={appoint.name}
                onChange={(e) => {
                  setAppoint({ ...appoint, name: e.target.value });
                }}
                className=" max-w-2xl mx-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>

            <div className="max-w-2xl mx-auto my-5">
              <label className="block mb-1 text-lg">Date and Time:</label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimePicker"]}>
                  <DateTimePicker
                    label="Basic date time picker"
                    disablePast
                    onChange={handleDate}
                  />
                </DemoContainer>
              </LocalizationProvider>
              {!isDateValid && (
                <FormHelperText error={true}>
                  Please select a date and time.
                </FormHelperText>
              )}
            </div>
            <div className="max-w-2xl mx-auto my-2">
              <label className="block mb-1 text-lg">Note:</label>
              <input
                type="text"
                placeholder=""
                value={appoint.note_app}
                onChange={(e) => {
                  setAppoint({ ...appoint, note_app: e.target.value });
                }}
                className=" max-w-2xl mx-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="max-w-2xl mx-auto my-2">
              <label className="block mb-4 text-lg">Staff Consult:</label>
              <FormControl fullWidth>
                <InputLabel id="label-staff">Staff Consult:</InputLabel>
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
              ></ReCAPTCHA>
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

