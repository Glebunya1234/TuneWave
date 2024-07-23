"use client";
import style from "./profile.module.scss";
import { useRouter } from "next/navigation";
import React from "react";

const Profile = () => {
  const handleMouseEnter = () => {
    document.documentElement.style.setProperty("--invertFilter", "1");
    const timer = setTimeout(() => {
      document.documentElement.style.setProperty("--invertFilter", "0");
    }, 350);

    return () => clearTimeout(timer);
  };

  // const handleMouseLeave = () => {
  //   document.documentElement.style.setProperty("--invertFilter", "0");
  // };
  return (
    <div className={style.profile}>
      <p
        className={style.outlinedText}
        onMouseEnter={handleMouseEnter}
        // onMouseLeave={handleMouseLeave}
      >
        Hello Wold
      </p>
    </div>
  );
};

export default Profile;
