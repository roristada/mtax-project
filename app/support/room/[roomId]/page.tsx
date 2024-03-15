"use client";
import MessageField from "@/app/components/chat/MessageField";
import Messages from "@/app/components/chat/Messages";
import Sidebar from "@/app/components/Sidebar";
import Topbar from "@/app/components/Topbar";

import { useState, useEffect, useRef } from "react";

interface PageProps {
  params: {
    roomId: string;
  };
}

const Page = ({ params }: any) => {
  const [existingMessages, setExistingMessages] = useState([]);
  const [isClient, setIsClient] = useState(false);

  

  useEffect(() => {
    setIsClient(true);
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:3000/api/chat/findroom/${params.roomId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        console.error("Failed to fetch:", response.statusText);
        return;
      }

      const data = await response.json();
      console.log(data);

      setExistingMessages(
        data.rows.map((message: any) => {
          return {
            text: message.content, // message.content must be a string
            id: message.id,
            user: message.user_msg,
          };
        })
      );
    };

    fetchData();
  }, [params.roomId]);
  console.log(existingMessages);



  return (
    <div>
      <main>
        {isClient && (
          <div className="flex ">
            <Sidebar />
            <div className="flex-1 p-4">
              <Topbar />
              <div className="max-w-6xl bg-slate-400 rounded-lg p-6 mx-auto">
                <h1 className="bg-slate-500 w-full md:w-[10%] p-2 rounded-lg text-center mb-4">
                  Room ID:{params.roomId}
                </h1>
                <div>
                  <Messages
                    roomId={params.roomId}
                    initialMessages={existingMessages}
                  />
                </div>
                <MessageField roomId={params.roomId} />
              </div>
            </div>
            <div></div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Page;
