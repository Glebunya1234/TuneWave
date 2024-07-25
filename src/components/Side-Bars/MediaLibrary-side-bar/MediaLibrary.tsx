"use client";
import { BtnRouting } from "@/components/UI/Buttons/RoutingButton/RoutingBt";
import style from "./Left-side-bar.module.scss";
import { useState } from "react";
export const MediaLibrary = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isRemove, setRemove] = useState(" ");
  const [isComponentVisible, setIsComponentVisible] = useState(true);
  const holder = {
    Home: "go to home page",
    Search: "new music search page",
    Settings: "profile customization",
  };

  const handleClick = () => {
    setRemove(style.MediaLibrary__remove);
    const timer2 = setTimeout(() => {
      setRemove(" ");
      setIsComponentVisible(false);
    }, 500);
    return timer2;
  };
  return (
    <>
      {isComponentVisible && (
        <section className={`${style.MediaLibrary} ${isRemove}`}>
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
            <button onClick={handleClick}>Bebraaaaaaaaaaaaaa</button>
          </nav>
          {children}
        </section>
      )}
    </>
  );
};
