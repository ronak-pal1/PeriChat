import { Icon } from "@iconify/react/dist/iconify.js";
import BorderButton, { BUTTON_CONTENT } from "./buttons/BorderButton";

const Header = () => {
  return (
    <header className="w-full h-full border-b border-ws-green-50 flex items-center justify-between px-4 ">
      {/* Left section */}
      <div className="flex items-center space-x-1">
        <Icon
          icon={"line-md:chat-round-dots-filled"}
          width={"18"}
          height={"18"}
          className="text-ws-green-300"
        />
        <h1 className="text-sm font-semibold text-ws-green-300">Chats</h1>
      </div>

      {/* Right section */}
      <div className="flex items-center space-x-3">
        <BorderButton icon="uis:refresh" text="Refresh" />
        <BorderButton icon="material-symbols:help-outline" text="Help" />
        <BorderButton
          icon="icon-park-outline:download-computer"
          type={BUTTON_CONTENT.ICON}
        />
        <BorderButton
          icon="material-symbols:notifications-off-rounded"
          type={BUTTON_CONTENT.ICON}
        />
      </div>
    </header>
  );
};

export default Header;
