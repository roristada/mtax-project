import ChatList from "./ChatList";
import ChatMessage from "./ChatMessage";

const UserChat = () => {
  return (
    <div className="w-[80%] mx-auto">
      <h1>Chat : User</h1>
      <div className="grid grid-cols-1">
          <ChatMessage/>
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

export default UserChat;
