import AllChats from "@/components/AllChats";
import ChatWindow from "@/components/ChatWindow";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

// The main chat route where the whole chat UI will display
export default function Chat() {
  return (
    <div className="flex h-screen flex-1 w-full">
      {/* Left sidebar */}
      <section className="h-full w-full flex-[0.04]">
        <Sidebar />
      </section>

      {/* Right section */}
      <div className="h-full w-full flex-[0.96]  flex flex-col ">
        {/* header section */}
        <section className="flex-[0.06] w-full h-full">
          <Header />
        </section>

        {/* main chat portion including all the chats and the chatting section*/}
        <main className="w-full h-full flex-[0.94] flex min-h-0">
          {/* All chats */}
          <section className="w-full h-full flex-[0.27] border-r border-ws-green-50 min-h-0">
            <AllChats />
          </section>

          {/* Chatting section */}
          <section className="w-full h-full flex-[0.73] min-h-0">
            <ChatWindow />
          </section>
        </main>
      </div>
    </div>
  );
}
