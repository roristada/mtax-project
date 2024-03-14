"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { BarLoader } from "react-spinners";

const UploadData = ({ params }: { params: any }) => {
  const [isLoading, setIsLoading] = useState(false);

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  const [formPost, setFormPost] = useState({
    id: "",
    // company: "",
    staffname: "",
    data_type: "",
    file: "",
    month: "",
    year: "",
  });
  const [file, setFile] = useState(null);
  const [file_type, setFileType] = useState(false);
  const [data, setData] = useState([]);

  const handleFileChange = (event: any) => {
    const selectedFile = event.target.files[0];
    // Check if file is selected
    if (!selectedFile) return;

    // Check file type (optional)
    if (
      !selectedFile.type.match(
        "text/csv|application/vnd.ms-excel|application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      )
    ) {
      console.error("Invalid file type. Please select a CSV or Excel file.");
      setFileType(false); // Update file type state
      setFile(null);
      return;
    }

    // Update state with the selected file
    setFileType(true);
    setFile(selectedFile);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("id", formPost.id);
    //formData.append("company", formPost.company);
    formData.append("month", formPost.month);
    formData.append("year", formPost.year);
    formData.append("staffname", formPost.staffname);
    formData.append("date_upload", new Date().toISOString());
    formData.append("data_type", formPost.data_type);
    if (file) {
      formData.append("file", file);
    }

    // Use array destructuring to iterate through formData entries
    for (const [key, value] of Array.from(formData.entries())) {
      console.log(`${key}: ${value instanceof File ? value.name : value}`);
    }

    try {
      const response = await fetch("/api/upload_data", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        const data = await response.json(); // Parse response body as JSON
        console.log(data); // Handle parsed response data
      } else {
        throw new Error("Error uploading data");
      }
    } catch (err) {
      console.error("Error :", err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchData = async () => {
    try {
      const res = await fetch("/api/getData");
      const result = await res.json();
      setData(result);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto w-[80%]">
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto mt-10 border p-10 rounded-md shadow-md"
      >
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Company name
          </label>
          <select
            id="id"
            value={formPost.id}
            onChange={(e) => {
              setFormPost({ ...formPost, id: e.target.value });
            }}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {" "}
            <option selected>Choose Company</option>
            {data.map((item: any) => (
              <option key={item.id} value={item.id}>
                {item.company_name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-5">
          <div className="mb-2">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Month
            </label>
            <input
              type="text"
              id="base-input"
              value={formPost.month}
              onChange={(e) => {
                setFormPost({ ...formPost, month: e.target.value });
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Year
            </label>
            <input
              type="text"
              id="base-input"
              value={formPost.year}
              onChange={(e) => {
                setFormPost({ ...formPost, year: e.target.value });
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Staff Name
          </label>
          <input
            type="text"
            id="base-input"
            value={formPost.staffname}
            onChange={(e) => {
              setFormPost({ ...formPost, staffname: e.target.value });
            }}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Select your Data type
          </label>
          <select
            id="data_type"
            value={formPost.data_type}
            onChange={(e) => {
              setFormPost({ ...formPost, data_type: e.target.value });
            }}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {" "}
            <option selected>Choose Data</option>
            <option value={"Employee"}>Employee</option>
            <option value={"Income"}>Income</option>
            <option value={"Expenses"}>Expenses</option>
            <option value={"Tax"}>Tax</option>
          </select>
        </div>
        <div className="">
          <input
            onChange={handleFileChange}
            type="file"
            className="w-full text-black text-lg bg-gray-100 file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-gray-800 file:hover:bg-gray-700 file:text-white rounded"
          />

          {!file_type && (
            <label className="text-red-500 font-semibold">
              File must be .csv or .excel
            </label>
          )}
        </div>

        {/* Your submit button */}
        <div className="flex justify-center items-center">
          <button
            type="submit"
            className={`mt-5 text-white font-medium rounded-lg text-sm w-full sm:w-auto px-20 py-2.5 text-center ${
              isLoading
                ? "bg-gray-500"
                : "dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Uploading..." : "Submit"}
          </button>
        </div>
        {isLoading && (
          <div className="flex justify-center mt-5">
            <BarLoader
              color="#00FF00"
              loading={isLoading}
              cssOverride={override}
            />
          </div>
        )}
      </form>
    </div>
  );
};

export default UploadData;
