"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import BorderButton, { BUTTON_CONTENT } from "./buttons/BorderButton";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useAuthContext } from "@/context/authContext";

type CHAT_INFO = {
  person_id: string;
  name: string;
  phone: string;
  latest_message: string;
  latest_message_timestamp: string;
};

const SingleChatBox = ({
  chatInfo,
  setCurrentChatPersonId,
}: {
  chatInfo: CHAT_INFO;
  setCurrentChatPersonId: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div
      onClick={() => {
        setCurrentChatPersonId(chatInfo.person_id);
      }}
      className="w-full flex px-2 py-2 space-x-3 cursor-pointer hover:bg-gray-50"
    >
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
          <p className="text-black font-bold text-sm">{chatInfo.name}</p>

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
              {chatInfo.latest_message}
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
              {chatInfo.phone}
              {/* <span className="ml-2">+3</span> */}
            </p>
          </div>

          <p className="text-[9px] text-neutral-400 font-semibold">Yesterday</p>
        </div>
      </div>
    </div>
  );
};

// Component to list all the chats
const AllChats = ({
  setCurrentChatPersonId,
}: {
  setCurrentChatPersonId: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [currentTab, setCurrentTab] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { user } = useAuthContext();
  const [persons, setPersons] = useState<CHAT_INFO[]>([]);

  const [newSearchPersons, setNewSearchPersons] = useState<CHAT_INFO[]>([]);

  const [tab2SearchQuery, setTab2SearchQuery] = useState<string>("");

  const [isSearchbarOpen, setIsSearchbarOpen] = useState<boolean>(false);

  const getPersons = async () => {
    // Query to get the persons you've sent messages to, with the latest message and their details
    const { data, error } = await supabase
      .from("messages")
      .select(
        `
          sender_id,
          receiver_id,
          content,
          created_at,
          profiles:sender_id (name, phone)
        `
      )
      .or(`sender_id.eq.${user?.id},receiver_id.eq.${user?.id}`)
      .order("created_at", { ascending: false }) // Order messages by created_at descending (latest first)
      .limit(1); // Only get the latest message

    if (error) {
      return;
    }

    // Mapping to include the latest message for each user
    const personsData: CHAT_INFO[] = data?.map((message: any) => ({
      person_id:
        message.sender_id == user?.id ? message.receiver_id : message.sender_id,
      name: message.profiles.name,
      phone: message.profiles.phone,
      latest_message: message.content,
      latest_message_timestamp: message.created_at,
    }));

    setPersons(personsData);
  };

  useEffect(() => {
    if (!user) return;

    getPersons();
  }, [user?.id]);

  // Debounced search function
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (tab2SearchQuery.trim()) {
        fetchNewSearchPersons(tab2SearchQuery);
      } else {
        setNewSearchPersons([]);
      }
    }, 500); // Debounce delay

    return () => {
      clearTimeout(timeoutId); // Clear timeout if input changes
    };
  }, [tab2SearchQuery]);

  const fetchNewSearchPersons = async (phoneNumber: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("phone", phoneNumber) // Exact match on phone_number
      .neq("id", user?.id);

    console.log(data);

    if (error) {
      setNewSearchPersons([]);
    } else {
      // Mapping to include the latest message for each user
      const personsData: CHAT_INFO[] = data?.map((person: any) => ({
        person_id: person.id,
        name: person.name,
        phone: person.phone,
        latest_message: "",
        latest_message_timestamp: "",
      }));

      setNewSearchPersons(personsData);
    }
  };

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
          {isSearchbarOpen ? (
            <>
              <div className="w-full h-full flex items-center">
                <Icon icon={"proicons:search"} width={"20"} height={"20"} />

                <input
                  type="text"
                  placeholder="Search"
                  className="w-full px-4 text-sm outline-none"
                />

                <Icon
                  onClick={() => {
                    setIsSearchbarOpen(false);
                  }}
                  className="cursor-pointer"
                  icon={"material-symbols-light:close"}
                  width={"20"}
                  height={"20"}
                />
              </div>
            </>
          ) : (
            <>
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
                  onClickFunc={() => {
                    setIsSearchbarOpen(true);
                  }}
                  icon="proicons:search"
                  text="Search"
                  type={BUTTON_CONTENT.ICON_TEXT}
                />

                <BorderButton icon="bx:filter" text="Filtered" />
              </div>
            </>
          )}
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
            {persons.length == 0 && (
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-sm text-gray-400">No chats available</p>
              </div>
            )}

            {persons.map((data, index) => (
              <SingleChatBox
                setCurrentChatPersonId={setCurrentChatPersonId}
                chatInfo={data}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Start new message section */}
      <div className="w-full h-full flex flex-col shrink-0  min-h-0">
        <header className="w-full h-full flex-[0.07] bg-neutral-100 border-b border-ws-green-50 items-center justify-between px-2">
          <div className="w-full h-full flex items-center">
            <Icon icon={"proicons:search"} width={"20"} height={"20"} />

            <input
              type="text"
              value={tab2SearchQuery}
              onChange={(e) => {
                setTab2SearchQuery(e.target.value);
              }}
              placeholder="Search"
              className="w-full px-4 text-sm outline-none"
            />

            <Icon
              onClick={() => {
                setTab2SearchQuery("");
                setCurrentTab(0);
              }}
              className="cursor-pointer"
              icon={"material-symbols-light:close"}
              width={"20"}
              height={"20"}
            />
          </div>
        </header>

        <div className="w-full h-full flex-[0.93] flex flex-col  min-h-0 relative">
          <div className="w-full flex-1 overflow-y-auto custom-scrollbar min-h-0 pb-20">
            {newSearchPersons.map((data, index) => (
              <SingleChatBox
                setCurrentChatPersonId={setCurrentChatPersonId}
                chatInfo={data}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllChats;
