"use client";
import { useContext } from "react";
import { HoverTextContext } from "@/Context";

interface MarqueeProps {
    text: string;
    className?: string;
    children?: React.ReactNode
}
  
export const BtnRouting: React.FC<MarqueeProps> = ({text, className, children}) => {


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
    <button className={className} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {text}
      {children}
    </button>
  );
};
