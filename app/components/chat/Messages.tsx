"use client";
import { pusherClient } from "@/app/lib/pusher";
import { FC, useEffect, useState,useRef } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import jwt_decode from "jwt-decode";

interface MessagesProps {
  initialMessages: {
    text: string;
    id: string;
    user: string;
  }[];
  roomId: string;
}

interface Message {
  text: string;
  id: string;
  user: string;
}

interface User {
  id: string;
  email: string;
  role: string;
  exp: string;
  company: string;
}

const Messages: FC<MessagesProps> = ({ initialMessages, roomId }) => {
  const [incomingMessages, setIncomingMessages] = useState<Message[]>([]);
  const allMessages = [...initialMessages, ...incomingMessages];
  const token = Cookies.get("token");
  const [isClient, setIsClient] = useState(false);
  const route = useRouter();
  const [company, setCompany] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      // This timeout is a hacky solution
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100); // Delay scrolling a bit to let the DOM update
  };

  useEffect(() => {
    pusherClient.subscribe(roomId);

    pusherClient.bind("incoming-message", (message: Message) => {
      setIncomingMessages((prev) => [...prev, message]);
    });

    return () => {
      pusherClient.unsubscribe(roomId);
    };
  }, []);

  useEffect(() => {
    setIsClient(true);
    if (token) {
      try {
        const decoded: User = jwt_decode(token);
        const isExpired = Date.parse(decoded.exp) < Date.now();
        console.log(decoded.role);
        console.log(decoded);
        setCompany(decoded.company);
        if (isExpired) {
          Cookies.remove("token");
        } else {
          if (decoded.role == "user") {
          } else if (decoded.role == "admin") {
          } else {
          }
        }
      } catch (error) {
        // If token is invalid or expired
        console.error("Invalid token:", error);
      }
    }
  }, [route, token]);

  useEffect(() => {
    if (isClient) { 
      scrollToBottom();
    }
  }, [allMessages]); 

  return (
    <div className="p-10 my-2 rounded-xl overflow-y-auto h-96">
      {allMessages.map((message, index) => (
        <div key={message.id || index} className="bg-slate-100 p-3 rounded-lg mb-2 break-all">
          <h3 className="font-bold mr-2">{message.user}:</h3>
          <p>{message.text}</p>
        </div>
      ))}
      
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Messages;
