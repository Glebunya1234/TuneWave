"use client";

import style from "./Right-side-bar.module.scss";
import { MdOutlineHideSource } from "react-icons/md";
import { IoMdArrowDropleft } from "react-icons/io";
import { useContext, useState } from "react";
import { GlobalContext } from "@/Context";
import { CloseBarBtn } from "@/components/UI/Buttons/CloseSideBarBT/CloseBarBT";

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

          <div className={style.InfoBar__Children}> {children}</div>
        </section>
      )}
    </>
  );
};
