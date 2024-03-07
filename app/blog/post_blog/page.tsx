"use client";
import React, { useEffect, useState } from "react";
import Editor from "@/app/components/Editor";

const post_blog = () => {
  const [formPost, setformPost] = useState({
    header: "",
    detail: "",
    staff: "",
    image: "",
    //datepost: "",
  });

  const handleEditorContentChange = (html: string) => {
    setformPost({ ...formPost, detail: html });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    //const currentDate = new Date();
    //const formattedDate = currentDate.toISOString(); // Adjust the format as needed

    // Update the formPost state with the current date
    //setformPost({ ...formPost, datepost: formattedDate });

    try {
      const response = await fetch("/api/post-blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formPost),
      });
      if (response.ok) {
        console.log("Post successfully");
      } else {
        console.error("Post failed:", response.statusText);
      }
    } catch (err) {
      console.error("Error :", err);
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
                placeholder=""
                value={formPost.image}
                onChange={(e) => {
                  setformPost({ ...formPost, image: e.target.value });
                }}
                className=" max-w-2xl mx-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
