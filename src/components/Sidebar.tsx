import Image from "next/image";
import { Icon } from "@iconify/react";

const DivisionComp = ({
  children,
  hasBorder = true,
}: Readonly<{
  children: React.ReactNode;
  hasBorder?: boolean;
}>) => {
  return (
    <div
      className={`w-full flex flex-col items-center space-y-6 ${
        hasBorder && "border-b border-ws-green-50"
      } py-3`}
    >
      {children}
    </div>
  );
};

const Sidebar = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-between py-3 px-2 border-r border-ws-green-50">
      {/* top section */}
      <div className="w-full flex flex-col items-center">
        <Image
          src={"/logo.png"}
          alt="Periskope logo"
          width={"32"}
          height={"32"}
        />

        <div className="w-full flex flex-col items-center mt-3">
          <DivisionComp>
            <div className="w-fit px-2 py-1 rounded-md h-fit bg-slate-100 cursor-pointer">
              <Icon
                icon="ic:round-home"
                width="20"
                height="20"
                className="text-ws-green-300"
              />
            </div>
          </DivisionComp>

          <DivisionComp>
            <div className="w-fit px-2 py-1 rounded-md h-fit bg-slate-100 cursor-pointer">
              <Icon
                icon="line-md:chat-round-dots-filled"
                width="20"
                height="20"
                className="text-ws-green-400"
              />
            </div>

            <Icon
              icon="ion:ticket"
              width="20"
              height="20"
              className="text-ws-green-300"
            />

            <Icon
              icon="octicon:graph-16"
              width="20"
              height="20"
              className="text-ws-green-300"
            />
          </DivisionComp>

          <DivisionComp>
            <Icon
              icon="f7:menu"
              width="20"
              height="20"
              className="text-ws-green-300"
            />

            <Icon
              icon="heroicons:megaphone-20-solid"
              width="20"
              height="20"
              className="text-ws-green-300"
            />

            <Icon
              icon="lucide:network"
              width="20"
              height="20"
              className="text-ws-green-300"
            />
          </DivisionComp>

          <DivisionComp>
            <Icon
              icon="ri:contacts-book-fill"
              width="20"
              height="20"
              className="text-ws-green-300"
            />

            <Icon
              icon="ri:folder-image-fill"
              width="20"
              height="20"
              className="text-ws-green-300"
            />
          </DivisionComp>

          <DivisionComp hasBorder={false}>
            <Icon
              icon="material-symbols:checklist-rounded"
              width="20"
              height="20"
              className="text-ws-green-300"
            />

            <Icon
              icon="si:settings-alt-fill"
              width="20"
              height="20"
              className="text-ws-green-300"
            />
          </DivisionComp>
        </div>
      </div>

      {/* Bottom section */}
      <div className="flex flex-col items-center space-y-3">
        <Icon
          icon="tabler:stars-filled"
          width="20"
          height="20"
          className="text-ws-green-300"
        />

        <Icon
          icon="tabler:layout-sidebar-left-expand-filled"
          width="20"
          height="20"
          className="text-ws-green-300"
        />
      </div>
    </div>
  );
};

export default Sidebar;
