import { Icon } from "@iconify/react";

export enum BUTTON_CONTENT {
  TEXT = "TEXT",
  ICON_TEXT = "ICON_TEXT",
  ICON = "ICON",
}

const BorderButton = ({
  icon,
  text,
  type = BUTTON_CONTENT.ICON_TEXT,
}: {
  icon?: string;
  text?: string;
  type?: BUTTON_CONTENT;
}) => {
  return (
    <button className="flex items-center space-x-1 border border-slate-200 px-2 py-1 rounded-md cursor-pointer bg-white">
      {icon && type != BUTTON_CONTENT.TEXT && (
        <Icon icon={icon} width={"15"} height={"15"} className="text-black" />
      )}

      {text &&
        (type == BUTTON_CONTENT.ICON_TEXT || type == BUTTON_CONTENT.TEXT) && (
          <p className="text-xs font-medium">{text}</p>
        )}
    </button>
  );
};

export default BorderButton;
