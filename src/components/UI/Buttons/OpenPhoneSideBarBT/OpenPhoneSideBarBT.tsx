"use client";
import { BsList } from "react-icons/bs";
import style from "./OpenPhoneSideBarBT.module.scss";
import { useContext } from "react";
import { GlobalContext } from "@/Context";

export const OpenPhoneSideBarBT = () => {
  const dataCont = useContext(GlobalContext);
  return (
    <div className={style.OpenPhoneSideBarBT}>
      <button
        className={`${style.OpenPhoneSideBarBT__Button} `}
        onClick={() => {
          dataCont?.setHiddenLeftPhoneBar((prevState) => !prevState);
        }}
      >
        <BsList />
      </button>
    </div>
  );
};
