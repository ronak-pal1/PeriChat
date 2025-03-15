"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import BorderButton, { BUTTON_CONTENT } from "./buttons/BorderButton";
import { useEffect, useRef, useState } from "react";

const SingleChatBox = () => {
  return (
    <div className="flex px-2 py-2 space-x-3">
      {/* User profile */}
      <div>
        <div className="p-3 rounded-full bg-neutral-300">
          <Icon
            icon={"bi:person-fill"}
            width={"15"}
            height={"15"}
            className="text-white"
          />
        </div>
      </div>

      {/* Other contents -> name, message, timing, phone number, labels */}
      <div className="w-full flex flex-col">
        {/* Name and labels or tags */}
        <div className="w-full flex items-center justify-between">
          <p className="text-black font-bold text-sm">Ronak Paul</p>

          <div className="flex items-center space-x-2">
            <div className="bg-green-50 rounded-md px-2 py-1">
              <p className="text-ws-green-200 text-[10px]">Demo</p>
            </div>
          </div>
        </div>

        {/* message, notification count */}
        <div className="w-full flex items-center flex-1 justify-between">
          <div className="w-full flex-[0.8]">
            <p className="text-neutral-400 text-xs line-clamp-1">
              Shubham: Hey what are you doing now. what is the
            </p>
          </div>

          <div className="w-full flex-[0.2] flex items-center space-x-2 justify-end">
            <div className="py-[2px] px-[5px] rounded-full bg-ws-green-200">
              <p className="text-white text-[9px]">4</p>
            </div>

            <div className="p-1 rounded-full bg-neutral-200">
              <Icon
                icon={"bi:person-fill"}
                width={"8"}
                height={"8"}
                className="text-white"
              />
            </div>
          </div>
        </div>

        {/* Number's and timing */}
        <div className="w-full flex items-center justify-between mt-1">
          <div className="px-2 py-1 text-neutral-500 bg-neutral-100 rounded-md flex items-center space-x-1">
            <Icon icon={"ion:call-outline"} width={"8"} height={"8"} />
            <p className="text-[9px] font-medium">
              +91 9759629526 <span className="ml-2">+3</span>
            </p>
          </div>

          <p className="text-[9px] text-neutral-400 font-semibold">Yesterday</p>
        </div>
      </div>
    </div>
  );
};

// Component to list all the chats
const AllChats = () => {
  const [currentTab, setCurrentTab] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const containerElement = containerRef.current;
    if (!containerElement) return;

    containerElement.scrollTo({
      behavior: "smooth",
      left: containerElement.offsetWidth * currentTab,
    });
  }, [currentTab]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex scrollbar-hide overflow-x-hidden"
    >
      <div className="w-full h-full flex flex-col shrink-0 min-h-0">
        {/* header component */}
        <header className="w-full h-full flex-[0.07] bg-neutral-100 border-b border-ws-green-50 flex items-center justify-between px-2">
          {/* Left section */}
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-1 text-ws-green-400 cursor-pointer">
              <Icon
                icon={"mingcute:folder-download-fill"}
                width={"15"}
                height={"15"}
              />
              <p className="text-xs font-semibold">Custom filter</p>
            </button>

            <BorderButton text="Save" type={BUTTON_CONTENT.TEXT} />
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-2">
            <BorderButton
              icon="proicons:search"
              text="Search"
              type={BUTTON_CONTENT.ICON_TEXT}
            />

            <BorderButton icon="bx:filter" text="Filtered" />
          </div>
        </header>

        <div className="w-full h-full flex-[0.93] flex flex-col  min-h-0 relative">
          {/* Overlay start new chat button */}

          <div
            onClick={() => {
              console.log("clicked");
              setCurrentTab(1);
            }}
            className="z-50 absolute bottom-5 right-4 bg-ws-green-400 rounded-full p-2 cursor-pointer"
          >
            <Icon
              icon={"system-uicons:chat-add"}
              width={"20"}
              height={"20"}
              className="text-white"
            />
          </div>

          {/* All chats would be here */}

          <div className="w-full flex-1 overflow-y-auto custom-scrollbar min-h-0 pb-20">
            <SingleChatBox />
            <SingleChatBox />
            <SingleChatBox />
            <SingleChatBox />
            <SingleChatBox />
            <SingleChatBox />
            <SingleChatBox />
            <SingleChatBox />
            <SingleChatBox />
            <SingleChatBox />
            <SingleChatBox />
          </div>
        </div>
      </div>

      {/* Start new message section */}
      <div className="w-full h-full shrink-0  min-h-0"></div>
    </div>
  );
};

export default AllChats;
