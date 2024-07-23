"use client";
import { HoverTextContext } from "@/Context";
import { usePathname } from "next/navigation";
import { useContext, useEffect } from "react";

export const MarqueeUpdater = () => {
  const dataContext = useContext(HoverTextContext);
  const pathname = usePathname();

  useEffect(() => {
    const UF = () => {
      dataContext?.setTemporaryText(pathname?.split("/").pop() || "");
      dataContext?.setDefaultText(pathname?.split("/").pop() || "");
    };
    UF();
  }, [pathname]);
  // useEffect(() => {}, [dataContext?.getDefaultText]);
  return <></>;
};
