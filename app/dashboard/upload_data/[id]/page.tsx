"use client";
import React, { useState } from "react";
import { useRouter } from 'next/router'

const UploadData = ({params}:{params:any}) => {
  const [formPost, setFormPost] = useState({
    company: "",
    month: "",
    year: "",
    staffname: "",
    data_type: "",
    file: "",
  });
  const [file, setFile] = useState(null);
  const [file_type, setFileType] = useState(false);

  const handleFileChange = (event:any) => {
    const selectedFile = event.target.files[0];
    // Check if file is selected
    if (!selectedFile) return;
  
    // Check file type (optional)
    if (
      !selectedFile.type.match(
        "text/csv|application/vnd.ms-excel|application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      )
    ) {
      console.error(
        "Invalid file type. Please select a CSV or Excel file."
      );
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
    const formData = new FormData();
    formData.append("company", formPost.company);
    formData.append("month", formPost.month);
    formData.append("year", formPost.year);
    formData.append("staffname", formPost.staffname);
    formData.append("data_type", formPost.data_type);
    if (file) {
      formData.append("file", file);
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
    }
  };
  const isFormIncomplete =
    !formPost.company ||
    !formPost.month ||
    !formPost.year ||
    !formPost.staffname ||
    !formPost.data_type ||
    !file;

  return (
    <div className="container mx-auto w-[80%]">
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto mt-10 border p-10 rounded-md shadow-md"
      >
        {/* Your form inputs */}
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Company name
          </label>
          <input
            type="text"
            id="base-input"
            value={formPost.company}
            onChange={(e) => {
              setFormPost({ ...formPost, company: e.target.value });
            }}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="mb-5">
          <div className="grid md:grid-cols-2 gap-10">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Month
            </label>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Year
            </label>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            <input
              type="text"
              id="base-input"
              value={formPost.month}
              onChange={(e) => {
                setFormPost({ ...formPost, month: e.target.value });
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
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
            id="countries"
            value={formPost.data_type}
            onChange={(e) => {
              setFormPost({ ...formPost, data_type: e.target.value });
            }}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option>Data Employee</option>
            <option>Summary</option>
            <option>Profit</option>
            <option>Loss</option>
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
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isFormIncomplete} // Disable the button if the form is incomplete
            className={`mt-5 text-white ${
              isFormIncomplete ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300'
            } font-medium rounded-lg text-sm w-full sm:w-auto px-20 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadData;
