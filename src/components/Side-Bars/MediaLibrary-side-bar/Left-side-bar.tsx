"use client";

import style from "./Left-side-bar.module.scss";
import { useContext, useEffect, useState } from "react";
import { IoMdArrowDropright } from "react-icons/io";
import { MdOutlineHideSource } from "react-icons/md";
import { GlobalContext } from "@/Context";
import { CloseBarBtn } from "@/components/UI/Buttons/CloseSideBarBT/CloseBarBT";
import { BtnRouting } from "@/components/UI/Buttons/RoutingButton/RoutingBt";

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
  useEffect(() => {
    const handleAction = () => {
      setRemove(style.MediaLibrary__remove);
      const timer2 = setTimeout(() => {
        setRemove(" ");
        dataCont?.setHiddenLeftBar(dataCont?.isRemoveLeft);
      }, 500);
      return timer2;
    };
    handleAction();
  }, [dataCont?.isRemoveLeft]);
  return (
    <>
      {dataCont.isHiddenLeftBar && (
        <section className={`${style.MediaLibrary} ${isRemove}`}>
          <aside className={`${style.MediaLibrary__HideWindow} `}>
            <span>
              <p>Hide window</p> <IoMdArrowDropright />
            </span>

            <CloseBarBtn onToggle={handleAction}>
              <MdOutlineHideSource />
            </CloseBarBtn>
          </aside>
          <nav className={style.MediaLibrary__Navigation}>
            <BtnRouting
              changeBackground={true}
              helpHolder={holder.Home}
              text="Home"
              path={"/home"}
            />
            <BtnRouting
              helpHolder={holder.Search}
              text="Search"
              path={"/search"}
              changeBackground={true}
            />
            <BtnRouting
              changeBackground={true}
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
