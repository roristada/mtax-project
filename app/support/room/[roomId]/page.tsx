"use client"
import MessageField from '@/app/components/chat/MessageField';
import Messages from '@/app/components/chat/Messages';
import axios from 'axios';
import { useState ,useEffect } from 'react';

interface PageProps {
  params: {
    roomId: string;
  };
}

const Page = ({ params }:any) => {
  const [existingMessages, setExistingMessages] = useState([]);

  useEffect(() => {
    
    const fetchData = async () => {
      const response = await fetch(`http://localhost:3000/api/chat/findroom/${params.roomId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error('Failed to fetch:', response.statusText);
        return;
      }

      const data = await response.json();
      setExistingMessages(data.rows.map((message: any) => ({
        text: message.text,
        id: message.id,
      })));
    };

    fetchData();
  }, [params.roomId]);

  return (
    <div>
      <p>messages:</p>
      <Messages roomId={params.roomId} initialMessages={existingMessages} />
      <MessageField roomId={params.roomId} /> 
    </div>
  );
};

export default Page;
