"use client";
import { useContext } from "react";
import { HoverTextContext } from "@/Context";
import { useRouter } from "next/navigation";
import style from "./RoutingBt.module.scss";

interface IMarqueeProps {
  text: string;
  className?: string;
  children?: React.ReactNode;
  path?: string;
}

export const BtnRouting: React.FC<IMarqueeProps> = ({
  text,
  className,
  children,
  path,
}) => {
  const router = useRouter();

  const dataContext = useContext(HoverTextContext);
  const handleMouseEnter = () => {
    dataContext?.setTemporaryText(text);
    document.documentElement.style.setProperty("--invertFilter", "1");
    const timer = setTimeout(() => {
      document.documentElement.style.setProperty("--invertFilter", "0");
    }, 250);

    return () => clearTimeout(timer);
  };
  const handleMouseLeave = () => {
    dataContext?.setTemporaryText(dataContext.getDefaultText);
    document.documentElement.style.setProperty("--invertFilter", "1");
    const timer = setTimeout(() => {
      document.documentElement.style.setProperty("--invertFilter", "0");
    }, 250);

    return () => clearTimeout(timer);
  };
  return (
    <button
      className={`${className} ${style.RoutingBTN}`}
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
  );
};

