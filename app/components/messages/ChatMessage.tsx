import React from "react";

const ChatMessage = () => {
  return (
    <div className="flex bg-slate-200 border rounded-lg p-10">
      <div className="bg-slate-50 w-full rounded-lg">
        <div className="flex justify-center p-4 border">
          <h1>Name Chat: User</h1>
        </div>

        <div className="flex justify-start p-4 ">
          <div className="p-5">
            <h1>User Name</h1>
            <div className="grid p-4 bg-slate-200 border rounded-lg w-auto">
              <h1>message</h1>
            </div>
          </div>
          
        </div>
        <div className="flex justify-end p-4 ">
          <div className="p-5">
            <h1>Admin Name</h1>
            <div className="grid p-4 bg-slate-200 border rounded-lg w-auto">
              <h1>message</h1>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
