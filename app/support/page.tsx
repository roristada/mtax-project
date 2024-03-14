"use client";
import React, { Suspense, useEffect, useState } from "react";
import Sidebar from "@/app/components/Sidebar";
import Topbar from "@/app/components/Topbar";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import jwt_decode from "jwt-decode";
import "react-big-calendar/lib/css/react-big-calendar.css";
import AdminChat from "../components/messages/AdminUi";
import UserChat from "../components/messages/UserUi";
import axios from "axios";
let socket: any;

interface User {
  id: string;
  email: string;
  role: string;
  exp: string;
  company: string;
}

const employee = () => {
  let roomIdInput = "";

  const token = Cookies.get("token");
  const route = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [user, setUser] = useState("");
  const [user_id, setUserid] = useState("");
  const [room , setRoom] = useState([])

  const createRoom = async () => {
    if (!user_id) {
      console.error("User ID is required to create a room");
      return;
    }

    try {
      // Ensure this matches the exported API route from the backend.
      const response = await axios.post("/api/chat/room_create", { user_id });
      const { roomId } = response.data;
      console.log(roomId);
      route.push(`/support/room/${roomId}`);
    } catch (error) {
      console.error("There was an error creating the room:", error);
    }
  };

  const joinRoom = async (roomId: string) => {
    route.push(`/support/room/${roomId}`);
  };

  const fetchroom = async () => {
    try {
      const res = await fetch("/api/chat/allroom", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        console.error("Failed to fetch:", res.statusText);
        return;
      }

      const room = await res.json();
      setRoom(room.result);

      console.log("room", room);
    } catch (err) {
      console.log(err);
      alert("Error to fetchroom");
    }
  };

  useEffect(() => {
    setIsClient(true);
    if (token) {
      try {
        const decoded: User = jwt_decode(token);
        const isExpired = Date.parse(decoded.exp) < Date.now();
        console.log(decoded.role);
        console.log(decoded);
        if (isExpired) {
          Cookies.remove("token");
        } else {
          if (decoded.role == "user") {
            setUser(decoded.role);
            setUserid(decoded.id);
          } else if (decoded.role == "admin") {
            setUser(decoded.role);
            fetchroom();
          } else {
            route.push("/");
          }
        }
      } catch (error) {
        // If token is invalid or expired
        console.error("Invalid token:", error);
        // Redirect to login page
      }
    }
  }, [route, token]);

  return (
    <>
      <main>
        {isClient && (
          <div className="flex ">
            <Sidebar />
            <div className="flex-1 p-4">
              <Topbar />
              <div className="grid md:grid-cols-3 gap-20 w-full"></div>

              {user === "admin" ? (
                <div className="bg-slate-200 flex justify-center p-6 rounded-lg">
                  <div className="grid grid-cols-8 sm:grid-cols-5 gap-4">
                    {room.map((room:any) => (
                      <div key={room.id} className="mb-4 bg-teal-100 p-5 rounded-lg">
                        <h2>Room ID :{room.id}</h2>
                        <h2>User: {room.user_id}</h2>
                        <button
                          onClick={() => joinRoom(room.id)}
                          className="p-3 bg-blue-200 rounded-lg mt-2"
                        >
                          Joinroom
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : user === "user" ? (
                <div className="bg-slate-200 flex justify-center p-6 rounded-lg">
                  <div>
                    <button
                      onClick={createRoom}
                      className="p-3 bg-blue-200 rounded-lg"
                    >
                      Create room
                    </button>
                    <div className="flex justify-center mt-4">
                      <button
                        onClick={() => joinRoom(user_id)}
                        className="p-3 bg-green-300 rounded-lg"
                      >
                        Join room
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default employee;
