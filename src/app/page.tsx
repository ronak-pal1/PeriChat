import AllChats from "@/components/AllChats";
import ChatWindow from "@/components/ChatWindow";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

// The main chat route where the whole chat UI will display
export default function Chat() {
  return (
    <div className="flex h-screen flex-1">
      {/* Left sidebar */}
      <div className="h-full w-full flex-[0.04]">
        <Sidebar />
      </div>

      {/* Right section */}
      <div className="h-full w-full flex-[0.96]  flex flex-col">
        {/* header section */}
        <div className="flex-[0.06] w-full h-full">
          <Header />
        </div>

        {/* main chat portion including all the chats and the chatting section*/}
        <main className="w-full h-full flex-[0.94] flex">
          {/* All chats */}
          <div className="w-full h-full flex-[0.25] border-r border-ws-green-50">
            <AllChats />
          </div>

          {/* Chatting section */}
          <div className="w-full h-full flex-[0.75]">
            <ChatWindow />
          </div>
        </main>
      </div>
    </div>
  );
}
