import React from "react";

const ChatList = () => {
  return (
    <div className="h-screen bg-slate-100 px-5 gap-5 rounded-lg">
      <h1 className="text-lg p-2">My Chat</h1>
     
      <div className="grid grid-rows-2 border bg-slate-200 rounded-lg p-4 max-w-lg mb-4">
        <h2>Name</h2>
        <div className="flex justify-between">
          <p>message</p>
          <p>Time</p>
        </div>
      </div>
      <div className="grid grid-rows-2 border bg-slate-200 rounded-lg p-4 max-w-lg mb-4">
        <h2>Name</h2>
        <div className="flex justify-between">
          <p>message</p>
          <p>Time</p>
        </div>
      </div>
    </div>
  );
};

export default ChatList;
