"use client";
import Sidebar from "@/app/components/Sidebar";
import { useState, useEffect } from "react";

interface Appointment {
  id_blog: number;
  
}

const manage_blog = () => {
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [data, setData] = useState([]);
  const [selectedPost, setSelectedPost] =
    useState<Appointment | null>(null);

   

  const handleManageClick = (post: any) => {
    setSelectedPost(post);
    setShowPopup(true);
  };
  const handleDlete = async () => {
    if (selectedPost) {
      try {
        const response = await fetch("/api/post-blog/", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id:selectedPost.id_blog }),
        });
        // Handle successful deletion here, for example, by updating the UI or refetching data.
        if (response.ok) {
          // Appointment deleted successfully, refetch data to trigger rerender
          fetchData();
          setShowPopup(false);
        } else {
          console.error("Failed to delete appointment:", response.statusText);
        }
      } catch (error) {
        console.error("Error deleting appointment:", error);
      }
    }
  };

  console.log(selectedPost?.id_blog)
  const fetchData = async () => {
    try {
      const response = await fetch("/api/post-blog");
      const result = await response.json();
      setData(result);
      setLoading(false);
      console.log(data);

    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  //--------------------------------------------------------------------------------------------//
  

  return (
    <div className=" w-full h-full min-h-[800px] bg-slate-700  flex">
     <Sidebar/>
      <div className="flex-1 max-w-7xl h-full bg-white mx-auto rounded-xl p-3 mt-8">
        <h2 className=" text-xl font-medium text-center">Manage Blog</h2>
        <div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-4">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      ID
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Header
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Detail
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Staff
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Date to Post
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Manage
                    </th>
                    
                  </tr>
                </thead>
                <tbody>
                  {data.map((post: any) => (
                    <tr
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      key={post.id_blog}
                    >
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {post.id_blog}
                      </td>
                      <td className="px-6 py-4">{post.header}</td>
                      <td className="px-6 py-4" dangerouslySetInnerHTML={{__html:post.detail.substring(0,30)}}/>
                      <td className="px-6 py-4">{post.staff}</td>
                      <td className="px-6 py-4">{post.datepost}</td>
                      
                      <td className="px-6 py-4">
                        <button
                          type="button"
                          onClick={() => handleManageClick(post)}
                          className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                        >
                          Manage
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                {showPopup  && (
                  <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-2xl shadow-md mx-auto">
                      <h2 className="text-xl font-medium mb-4 text-slate-900">
                        Manage Appointment
                      </h2>
                      
                      
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md mr-4"
                        onClick={() => handleDlete()}
                      >
                        Delete
                      </button>
                      
                      <button
                        className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-md"
                        onClick={() => setShowPopup(false)}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default manage_blog;
