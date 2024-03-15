"use client";
import React, { useEffect, useState, useRef } from "react";
import Editor from "@/app/components/Editor";
import { useRouter } from "next/navigation";

const post_blog = () => {
  const [file, setFile] = useState(null);
  const [file_type, setFileType] = useState(false);
  const route = useRouter();
  const [formPost, setformPost] = useState({
    header: "",
    detail: "",
    staff: "",
    image: "",
    //datepost: "",
  });

  const handleFileChange = (event: any) => {
    const selectedFile = event.target.files[0];
    // Check if file is selected
    if (!selectedFile) return;

    // Check file type (optional)
    if (
      !selectedFile.type.match(
        "image/jpeg|image/png|image/gif|image/bmp|image/svg+xml"
      )
    ) {
      console.error("Invalid file type. Please select an image file.");
      setFileType(false); // Update file type state
      setFile(null);
      return;
    }

    // Update state with the selected file
    setFileType(true);
    setFile(selectedFile);
  };

  const handleEditorContentChange = (html: string) => {
    setformPost({ ...formPost, detail: html });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    const formData = new FormData();
    formData.append('header', formPost.header);
    formData.append('detail', formPost.detail);
    formData.append('staff', formPost.staff);
    if (file) {
      formData.append("file", file);
    }
    for (const [key, value] of Array.from(formData.entries())) {
      console.log(`${key}: ${value instanceof File ? value.name : value}`);
    }
    // Check if fileInputRef.current is not null and if a file is selected
    
  
    try {
      const response = await fetch('/api/post-blog', {
        method: 'POST',
        body: formData, // Sending the form data
      });
  
      if (response.ok) {
        console.log('Post successfully');
        alert("Post Upload Succesful")
        route.push("/dashboard/admin_db")
        // Optionally, clear the form or provide feedback to the user here
      } else {
        console.error('Post failed:', response.statusText);
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div className=" w-full h-full bg-slate-700 py-10">
      <div className=" max-w-6xl h-full bg-slate-400 mx-auto rounded-xl p-3">
        <h2 className="text-white text-center text-3xl font-medium">
          Post-Article
        </h2>
        <div className="p-3">
          <form onSubmit={handleSubmit}>
            <div className="max-w-2xl mx-auto my-2">
              <label className="block mb-1 text-lg">Header Article:</label>
              <input
                type="text"
                placeholder=""
                value={formPost.header}
                onChange={(e) => {
                  setformPost({ ...formPost, header: e.target.value });
                }}
                className=" max-w-2xl mx-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="max-w-2xl mx-auto my-2">
              <label className="block mb-1 text-lg">Detail:</label>
              <Editor
                onEditorContentChange={handleEditorContentChange}
                placeholder=""
              ></Editor>
            </div>
            <div className="max-w-2xl mx-auto my-2">
              <label className="block mb-1 text-lg">Staff Post:</label>
              <input
                type="text"
                placeholder=""
                value={formPost.staff}
                onChange={(e) => {
                  setformPost({ ...formPost, staff: e.target.value });
                }}
                className=" max-w-2xl mx-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="max-w-2xl mx-auto my-2">
              <label className="block mb-1 text-lg">Images:</label>
              <input
                type="file"
                onChange={handleFileChange}
                
                className="max-w-2xl mx-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            
            <div className="max-w-2xl mx-auto my-2 flex justify-center">
              <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg mt-3 text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="submit"
              >
                Confirm Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default post_blog;
