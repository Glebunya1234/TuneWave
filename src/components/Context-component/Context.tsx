"use client"
import { useState } from "react";
import { HoverTextContext, HovertextType } from "@/Context";
import { usePathname } from "next/navigation";
export const Context = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const text = pathname?.split("/").pop() || "";
  const [getTemporaryText, setTemporaryText] =
    useState<HovertextType["getTemporaryText"]>(text);
  const [getDefaultText, setDefaultText] =
    useState<HovertextType["getDefaultText"]>(text);
   

  const valueHover = {
    getTemporaryText,
    setTemporaryText,
    getDefaultText,
    setDefaultText,
  };
  // getDefaultText: "",
  // setDefaultText: () => { },
  return (
    <HoverTextContext.Provider value={valueHover}>
      {children}
    </HoverTextContext.Provider>
  );
};
