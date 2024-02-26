"use client";

import { useState, useEffect } from "react";
interface Appointment {
  id_appointment: number;
  status_app: string;
  // other properties of the appointment object
}
const manage = () => {
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [data, setData] = useState([]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch("/api/appointment");
  //       const result = await response.json();
  //       setData(result);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);
  const fetchData = async () => {
    try {
      const response = await fetch("/api/appointment");
      const result = await response.json();
      setData(result);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  //--------------------------------------------------------------------------------------------//
  const handleManageClick = (appointment: any) => {
    setSelectedAppointment(appointment);
    setShowPopup(true);
  };

  const handleDlete = async () => {
    if (selectedAppointment) {
      try {
        const response = await fetch("/api/appointment/", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: selectedAppointment.id_appointment }),
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
  const handleStatus = async (status_app: string) => {
    if (selectedAppointment) {
      try {
        const response = await fetch("/api/appointment/", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: selectedAppointment.id_appointment,
            status_app,
          }),
        });
        // Handle successful deletion here, for example, by updating the UI or refetching data.
        if (response.ok) {
          // Appointment deleted successfully, refetch data to trigger rerender
          fetchData();
          setShowPopup(false);
        } else {
          console.error("Failed to Update appointment:", response.statusText);
        }
      } catch (error) {
        console.error("Error Update appointment:", error);
      }
    }
  };

  return (
    <div className=" w-full h-full min-h-[800px] bg-slate-700 py-10">
      <div className=" max-w-7xl h-full bg-white mx-auto rounded-xl p-3">
        <h2 className=" text-xl font-medium text-center">Manage Appointment</h2>
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
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Time
                    </th>
                    <th scope="col" className="px-6 py-3">
                      End
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Staff
                    </th>

                    <th scope="col" className="px-6 py-3">
                      Note
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Manage
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item: any) => (
                    <tr
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      key={item.id_appointment}
                    >
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {item.id_appointment}
                      </td>
                      <td className="px-6 py-4">{item.name}</td>
                      <td className="px-6 py-4">{item.date_app}</td>
                      <td className="px-6 py-4">{item.time_app}</td>
                      <td className="px-6 py-4">{item.time_end}</td>
                      <td className="px-6 py-4">{item.staff}</td>
                      <td className="px-6 py-4">{item.note_app}</td>
                      <td className="px-6 py-4">{item.status_app}</td>
                      <td className="px-6 py-4">
                        <button
                          type="button"
                          onClick={() => handleManageClick(item)}
                          className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                        >
                          Manage
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                {showPopup && selectedAppointment && (
                  <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-2xl shadow-md mx-auto">
                      <h2 className="text-xl font-medium mb-4 text-slate-900">
                        Manage Appointment
                      </h2>
                      {/* Status and Delete buttons */}
                      <button
                        className={`${
                          selectedAppointment &&
                          selectedAppointment.status_app === "Complete"
                            ? "bg-gray-400"
                            : "bg-green-500 hover:bg-green-600"
                        } text-white px-4 py-2 rounded-md mr-4`}
                        onClick={() => handleStatus("Complete")}
                        disabled={
                          selectedAppointment &&
                          selectedAppointment.status_app === "Complete"
                        }
                      >
                        Complete
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md mr-4"
                        onClick={() => handleDlete()}
                      >
                        Delete
                      </button>
                      {/* Close button */}
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

export default manage;
