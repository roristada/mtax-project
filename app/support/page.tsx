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
  company:string
}


const employee = () => {
  let roomIdInput = ''
  
  const token = Cookies.get("token");
  const route = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [user, setUser] = useState("");
  const [user_id , setUserid] = useState("")

  const createRoom = async () => {
    if (!user_id) {
      console.error('User ID is required to create a room');
      return;
    }
    
    try {
      // Ensure this matches the exported API route from the backend.
      const response = await axios.post('/api/Chat/room_create', { user_id });
      const { roomId } = response.data;
      console.log(roomId)
      route.push(`/support/room/${roomId}`);
    } catch (error) {
      console.error('There was an error creating the room:', error);
    }
  };

  const joinRoom = async (roomId: string) => {
    route.push(`/support/room/${roomId}`)
  }

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
          route.push("/login");
        } else {

          if (decoded.role == "user") {
            setUser(decoded.role);
            setUserid(decoded.id)
            

          } else if (decoded.role == "admin") {
            setUser(decoded.role);
            route.push("/support");
          } else {
            route.push("/");
          }
        }
      } catch (error) {
        // If token is invalid or expired
        console.error("Invalid token:", error);
        route.push("/login"); // Redirect to login page
      }
    } else {
      route.push("/login"); // Redirect to login page if token not found
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
              <div className="grid md:grid-cols-3 gap-20 w-fulส"></div>

              {user === "admin" ? (
                <AdminChat />
              ) : user === "user" ? (
                <div>
                  <div>
                    <button onClick={createRoom}>Create room</button>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        onChange={({ target }) => (roomIdInput = target.value)}
                        className="border border-zinc-300"
                      />

                      <button onClick={() => joinRoom(roomIdInput)}>
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
