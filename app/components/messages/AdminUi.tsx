import ChatList from "./ChatList";
import ChatMessage from "./ChatMessage";

const AdminChat = () => {
  return (
    <div>
      <h1>Chat : Admin</h1>
      <div className="grid grid-cols-4">
        <ChatList />
        <div className="grid col-span-3">
          <ChatMessage/>
        </div>
        
      </div>
      
      <div className='flex overflow-hidden'>
        <form action="" className="flex w-full">
          <input type="text"
            placeholder='Type your message...'
            className='flex-grow py-2 px-4 outline-none w-[90%] border rounded-lg' 
            aria-label="Type your message"
          />
          <button type="submit" className="bg-slate-300 border-l px-4 hover:bg-slate-400 w-[10%]">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminChat;
