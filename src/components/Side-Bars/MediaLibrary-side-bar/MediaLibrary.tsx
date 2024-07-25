"use client";
import { BtnRouting } from "@/components/UI/Buttons/RoutingButton/RoutingBt";
import style from "./Left-side-bar.module.scss";
import { useState } from "react";
import { CloseBarBtn } from "@/components/UI/Buttons/CloseSideBarBT/CloseBarBT";
import { IoArrowRedoSharp } from "react-icons/io5";
export const MediaLibrary = ({ children }: { children: React.ReactNode }) => {
  const [isRemove, setRemove] = useState(" ");
  const [isComponentVisible, setIsComponentVisible] = useState(true);

  const holder = {
    Home: "go to home page",
    Search: "new music search page",
    Settings: "profile customization",
  };

  const handleClick = () => {
   
  };

  const handleAction = () => {
    setRemove(style.MediaLibrary__remove);
    const timer2 = setTimeout(() => {
      setRemove(" ");
      setIsComponentVisible(prevState => !prevState);
    }, 500);
    return timer2;
  };
  return (
    <>
      {isComponentVisible && (
        <section className={`${style.MediaLibrary} ${isRemove}`}>
          <aside>
            <span>
              <p>Hide window</p> <IoArrowRedoSharp />
            </span>

            <CloseBarBtn onToggle={handleAction}  />
          </aside>
          <nav className={style.MediaLibrary__Navigation}>
            <BtnRouting
              helpHolder={holder.Home}
              text="Home"
              path={"../../../profile"}
            />
            <BtnRouting
              helpHolder={holder.Search}
              text="Search"
              path={"../../../profile"}
            />
            <BtnRouting
              helpHolder={holder.Settings}
              text="Settings"
              path={"../../../settings"}
            />
          </nav>
          {children}
        </section>
      )}
    </>
  );
};
