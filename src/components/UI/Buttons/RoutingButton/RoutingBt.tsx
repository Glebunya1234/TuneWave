"use client";
import { useContext, useState } from "react";
import { GlobalContext } from "@/Context";
import { useRouter } from "next/navigation";
import style from "./RoutingBt.module.scss";

interface IMarqueeProps {
  text: string;
  className?: string;
  children?: React.ReactNode;
  helpHolder?: string;
  path?: string;
}

export const BtnRouting: React.FC<IMarqueeProps> = ({
  text,
  className,
  children,
  path,
  helpHolder,
}) => {
  const router = useRouter();
  const [isVisible, setVisible] = useState(false);
  const dataContext = useContext(GlobalContext);
  const handleMouseEnter = () => {
    dataContext?.setTemporaryText(text);
    setVisible(true);
    document.documentElement.style.setProperty("--invertFilter", "1");

    const timer = setTimeout(() => {
      document.documentElement.style.setProperty("--invertFilter", "0");
    }, 250);

    return () => clearTimeout(timer);
  };
  const handleMouseLeave = () => {
    setVisible(false);
    dataContext?.setTemporaryText(dataContext.getDefaultText);
    document.documentElement.style.setProperty("--invertFilter", "1");
    const timer = setTimeout(() => {
      document.documentElement.style.setProperty("--invertFilter", "0");
    }, 250);

    return () => clearTimeout(timer);
  };
  return (
    <div className={style.RoutingBTN}>
      <button
        className={`${style.RoutingBTN__Button} ${className}`}
        onClick={() => {
          router.push(`${path}`);
          dataContext?.setDefaultText(path?.split("/").pop() || "");
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {text}
        {children}
      </button>
      <div
        className={`${
          isVisible
            ? style.RoutingBTN__Holder_Visible
            : style.RoutingBTN__Holder_UnVisible
        }`}
      >
        <span>{helpHolder}</span>
      </div>
    </div>
  );
};
