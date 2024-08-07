"use client";
import { BtnRouting } from "@/components/UI/Buttons/RoutingButton/RoutingBt";
import style from "./Left-side-bar.module.scss";
import { useContext, useState } from "react";
import { CloseBarBtn } from "@/components/UI/Buttons/CloseSideBarBT/CloseBarBT";
import { IoMdArrowDropright } from "react-icons/io";
import { MdOutlineHideSource } from "react-icons/md";
import { GlobalContext } from "@/Context";
import { Target } from "../../UI/Target/target";
export const MediaLibraryBar = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isRemove, setRemove] = useState(" ");
  const dataCont = useContext(GlobalContext);

  const holder = {
    Home: "go to home page",
    Search: "new music search page",
    Settings: "profile customization",
  };

  const handleAction = () => {
    setRemove(style.MediaLibrary__remove);
    const timer2 = setTimeout(() => {
      setRemove(" ");
      dataCont.setHiddenLeftBar((prevState) => !prevState);
    }, 500);
    return timer2;
  };
  return (
    <>
      {dataCont.isHiddenLeftBar && (
        <section className={`${style.MediaLibrary} ${isRemove}`}>
          <aside>
            <span>
              <p>Hide window</p> <IoMdArrowDropright />
            </span>

            <CloseBarBtn onToggle={handleAction}>
              <MdOutlineHideSource />
            </CloseBarBtn>
          </aside>
          <nav className={style.MediaLibrary__Navigation}>
            <BtnRouting
              helpHolder={holder.Home}
              text="Home"
              path={"/home"}
            />
            <BtnRouting
              helpHolder={holder.Search}
              text="Search"
              path={"/home"}
            />
            <BtnRouting
              helpHolder={holder.Settings}
              text="Settings"
              path={"/settings"}
            />
          </nav>
          {children}
        </section>
      )}
    </>
  );
};
