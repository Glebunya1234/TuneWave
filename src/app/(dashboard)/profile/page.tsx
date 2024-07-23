// "use client";
import { BtnRouting } from "@/components/UI/Buttons/RoutingButton/RoutingBt";
import style from "./profile.module.scss";
import { useRouter } from "next/navigation";
import React from "react";
import { HoverTextContext } from "@/Context";
import { MarqueeUpdater } from "@/components/UI/Marquee/Marquee-Updater/MarqueeUpdater";

const Profile = () => {
  // const handleMouseLeave = () => {
  //   document.documentElement.style.setProperty("--invertFilter", "0");
  // };
  
  return (
    <div className={style.profile}>
       
      
      {/* <p
        className={style.outlinedText}
        onMouseEnter={handleMouseEnter}
        // onMouseLeave={handleMouseLeave}
      >
        Hello Wold
      </p> */}
    </div>
  );
};

export default Profile;
