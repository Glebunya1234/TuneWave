"use client";
import { FC, useContext } from "react";
import { CloseBarBtn } from "../Buttons/CloseSideBarBT/CloseBarBT";
import { GlobalContext } from "@/Context";
import { MdOutlineCircle } from "react-icons/md";

type Props = {
  side: "Right" | "Left";
};

export const PanelBurger: FC<Props> = ({ side }) => {
  const dataCont = useContext(GlobalContext);
  
  const toggleSidebar = () => {
    if (side == "Left") dataCont?.setHiddenLeftBar((prevState) => !prevState);
    else dataCont?.setHiddenRightBar((prevState) => !prevState);
  };

  if (side === "Left" && dataCont?.isHiddenLeftBar) {
    return null;
  }

  if (side === "Right" && dataCont?.isHiddenRightBar) {
    return null;
  }

  return (
    <CloseBarBtn onToggle={toggleSidebar}>
      <MdOutlineCircle />
    </CloseBarBtn>
  );
};
