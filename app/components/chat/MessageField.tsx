"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
// Note: It's next/router, not next/navigation
import jwt_decode from "jwt-decode";

interface User {
  id: string;
  email: string;
  role: string;
  exp: string;
  company: string;
}

interface MessageFieldProps {
  roomId: string;
}

const MessageField = ({ roomId }: MessageFieldProps) => {
  const [message, setMessage] = useState({
    text: "",
    roomId: roomId,
    username: "", // Initially set username as an empty string
  });
  const token = Cookies.get("token");
  useEffect(() => {
    if (token) {
      try {
        const decoded: User = jwt_decode(token);
        // If the exp field is a Unix timestamp in seconds, multiply by 1000 to convert to milliseconds
        // Determine the username based on the user's role
        let username = "";
        if (decoded.role === "user") {
          username = decoded.company; // or some other field that represents the user's name
        } else if (decoded.role === "admin") {
          username = "Admin"; // or decoded.email or any other identifying string
        }

        // Set the username in the state, this will update the message object
        setMessage((prevState) => ({
          ...prevState,
          username: username,
        }));
      } catch (error) {
        console.error("Invalid token:", error);
        // Redirect to login or handle invalid token
      }
    }
  }, [token]); // You should list setMessage in the dependencies if you are not using useCallback
  // Update the username in the message state

  const sendMessage = async (message: {
    text: string;
    roomId: string;
    username: string;
  }) => {
    console.log("Sending message:", message); // To check what is being sent
    try {
      const response = await fetch("/api/chat/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setMessage((prevState) => ({ ...prevState, text: "" }));
    } catch (error) {
      console.error("There was an error sending the message:", error);
    }
  };

  return (
    <div className="flex overflow-hidden">
      <form
        className="flex w-full"
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(message);
        }}
      >
        <input
          type="text"
          value={message.text} // Controlled input must have a 'value' prop tied to state
          onChange={(e) => setMessage({ ...message, text: e.target.value })}
          placeholder="Type your message..."
          className="flex-grow py-2 px-4 outline-none w-[90%] border rounded-s-lg"
          aria-label="Type your message"
        />
        <button
          type="submit"
          className="bg-slate-300 border-l px-4 hover:bg-slate-400 w-[10%]"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default MessageField;
