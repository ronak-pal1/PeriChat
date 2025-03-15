"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";

type CHAT_INFO_TYPE = {
  type: "SENT" | "RECEIVED";
  name: string;
  message: string;
  timeStamp: string;
  number: string;
};

const MessageBox = () => {
  return (
    <div className="w-fit h-fit bg-ws-green-100 px-5 py-3 mx-3 rounded-md">
      <p className="text-sm">This is a test text</p>
    </div>
  );
};

// This is the main chatting window where the user's will send the messages
const ChatWindow = () => {
  // This will store the whole chat history
  const [chatHistory, setChatHistory] = useState<CHAT_INFO_TYPE[]>([]);

  return (
    <div className="w-full h-full flex flex-1">
      {/* Left main chat portion */}
      <section className="w-full h-full flex flex-col flex-[0.95] border-r border-ws-green-50 min-h-0">
        {/* header portion */}
        <header className="w-full h-full flex-[0.07] flex items-center justify-between px-4">
          {/* Left section */}
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-full bg-neutral-300">
              <Icon
                icon={"bi:person-fill"}
                width={"14"}
                height={"14"}
                className="text-white"
              />
            </div>

            <div className="flex flex-col">
              <p className="text-black text-sm font-bold">Ronak Paul</p>

              <div className="text-neutral-400 text-xs font-medium flex items-center space-x-1">
                <p>Shubham Awasthi,</p>
                <p>Kuldeep Yadav</p>
              </div>
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-3">
            <Icon
              icon={"mdi:stars"}
              width={"20"}
              height={"20"}
              className="text-black"
            />

            <Icon
              icon={"proicons:search"}
              width={"20"}
              height={"20"}
              className="text-black"
            />
          </div>
        </header>

        {/* Messages section */}
        <div className="relative w-full h-full flex-[0.84] border-y border-ws-green-50 flex flex-col min-h-0">
          <img
            src={"/chat-bg.png"}
            alt="background image"
            className="absolute top-0 left-0 w-full h-full object-cover opacity-50"
          />

          {/* This section will contain the messages */}
          <div className="w-full z-50 flex-1 flex flex-col overflow-y-scroll space-y-5  items-end min-h-0 py-3 custom-scrollbar">
            <MessageBox />
            <MessageBox />
            <MessageBox />
            <MessageBox />
            <MessageBox />
            <MessageBox />
            <MessageBox />
            <MessageBox />
            <MessageBox />
            <MessageBox />
            <MessageBox />
            <MessageBox />
            <MessageBox />
            <MessageBox />
            <MessageBox />

            <MessageBox />
            <MessageBox />
          </div>
        </div>

        {/* message input section */}
        <footer className="w-full h-full flex-[0.09] px-5 py-3">
          <div className="w-full h-full flex flex-col space-y-4">
            <div className="w-full flex items-center justify-between space-x-3">
              <input
                type="text"
                className="w-full outline-none text-sm placeholder:text-neutral-400"
                placeholder="Message..."
              />

              <Icon
                icon={"ic:round-send"}
                width={"20"}
                height={"20"}
                className="text-ws-green-400"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-5 text-black">
                <Icon
                  icon={"icomoon-free:attachment"}
                  width={"16"}
                  height={"16"}
                />
                <Icon icon={"proicons:emoji"} width={"16"} height={"16"} />
                <Icon icon={"mdi-light:clock"} width={"16"} height={"16"} />
                <Icon
                  icon={"ant-design:reload-time-outline"}
                  width={"16"}
                  height={"16"}
                />
                <Icon icon={"mage:stars-c"} width={"16"} height={"16"} />
                <Icon
                  icon={"mage:note-with-text-fill"}
                  width={"16"}
                  height={"16"}
                />
                <Icon icon={"stash:mic-solid"} width={"16"} height={"16"} />
              </div>

              <div>
                <button className="flex items-center justify-between border border-neutral-200 rounded-md px-2 py-1 w-32">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-neutral-300"> </div>

                    <p className="text-xs font-medium">Periskope</p>
                  </div>

                  <Icon
                    icon={"mi:select"}
                    width={"14"}
                    height={"14"}
                    className="text-neutral-400"
                  />
                </button>
              </div>
            </div>
          </div>
        </footer>
      </section>

      {/* Right sidebar */}
      <section className="w-full h-full flex-[0.05] flex flex-col">
        <div className="w-full h-full flex-[0.07]"></div>

        <div className="w-full h-full flex-[0.93] flex flex-col items-center space-y-8 text-neutral-400">
          <Icon
            icon={"tabler:layout-sidebar-right-expand-filled"}
            width={"18"}
            height={"18"}
          />
          <Icon
            icon={"lineicons:refresh-circle-1-clockwise"}
            width={"18"}
            height={"18"}
          />
          <Icon icon={"system-uicons:write"} width={"18"} height={"18"} />
          <Icon icon={"gg:menu-left"} width={"18"} height={"18"} />
          <Icon icon={"arcticons:dots"} width={"18"} height={"18"} />

          <Icon icon={"mdi:hubspot"} width={"18"} height={"18"} />
          <Icon
            icon={"fluent:people-team-24-filled"}
            width={"18"}
            height={"18"}
          />
          <Icon icon={"humbleicons:at-symbol"} width={"18"} height={"18"} />
          <Icon icon={"ri:folder-image-fill"} width={"18"} height={"18"} />
          <Icon icon={"ri:list-settings-line"} width={"18"} height={"18"} />
        </div>
      </section>
    </div>
  );
};

export default ChatWindow;
