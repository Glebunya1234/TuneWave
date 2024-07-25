import { MdOutlineHideSource } from "react-icons/md";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import style from "./CloseBarBT.module.scss";

import { GlobalContext } from "@/Context";
interface IMarqueeProps {
  text?: string;
  className?: string;

  onToggle: () => void;
}

export const CloseBarBtn: React.FC<IMarqueeProps> = ({
  className,
  onToggle,
}) => {
  return (
    <div className={style.CloseBarBtn}>
      <button
        className={`${style.CloseBarBtn__Button} ${className}`}
        onClick={onToggle}
      >
        <MdOutlineHideSource className={style.CloseBarBtn__Icon} />
      </button>
    </div>
  );
};
