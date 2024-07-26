"use client";

import { useContext, useState } from "react";
import { CloseBarBtn } from "@/components/UI/Buttons/CloseSideBarBT/CloseBarBT";
import style from "./Right-side-bar.module.scss";
import { IoMdArrowDropleft } from "react-icons/io";
import { GlobalContext } from "@/Context";
import { MdOutlineHideSource } from "react-icons/md";
export const InfoSideBar = ({ children }: { children: React.ReactNode }) => {
  const [isRemove, setRemove] = useState(" ");
  const dataCont = useContext(GlobalContext);
  const handleAction = () => {
    setRemove(style.InfoBar__remove);
    const timer2 = setTimeout(() => {
      setRemove(" ");
      dataCont?.setHiddenRightBar((prevState) => !prevState);
    }, 500);
    return timer2;
  };

  return (
    <>
      {dataCont?.isHiddenRightBar && (
        <section className={`${style.InfoBar} ${isRemove}`}>
          <aside>
            <span>
              <p>Hide window</p> <IoMdArrowDropleft />
            </span>

            <CloseBarBtn onToggle={handleAction}>
              <MdOutlineHideSource />
            </CloseBarBtn>
          </aside>

          {children}
        </section>
      )}
    </>
  );
};
