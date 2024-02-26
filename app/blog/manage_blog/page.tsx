"use client";
import { useState, useEffect } from "react";

const manage_blog = () => {
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState([]);
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
    <div className=" w-full h-full min-h-[800px] bg-slate-700 py-10">
      <div className=" max-w-7xl h-full bg-white mx-auto rounded-xl p-3">
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
                          
                          className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                        >
                          Manage
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default manage_blog;
