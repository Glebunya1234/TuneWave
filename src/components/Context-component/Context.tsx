"use client";

import { useState } from "react";
import { GlobalContext } from "@/Context";
import { usePathname } from "next/navigation";
import { ContextType } from "@/types/TypeContext/type";
export const Context = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const text = pathname?.split("/").pop() || "tunewave";
  const [getTemporaryText, setTemporaryText] =
    useState<ContextType["getTemporaryText"]>(text);
  const [getDefaultText, setDefaultText] =
    useState<ContextType["getDefaultText"]>(text);
  const [isHiddenLeftBar, setHiddenLeftBar] =
    useState<ContextType["isHiddenLeftBar"]>(true);
  const [isHiddenRightBar, setHiddenRightBar] =
    useState<ContextType["isHiddenRightBar"]>(true);
  const [getStatePlaying, setStatePlaying] =
    useState<ContextType["getStatePlaying"]>(true);

  const valueHover = {
    getTemporaryText,
    setTemporaryText,
    getDefaultText,
    setDefaultText,
    isHiddenLeftBar,
    setHiddenLeftBar,
    isHiddenRightBar,
    setHiddenRightBar,
    getStatePlaying,
    setStatePlaying,
  };

  return (
    <GlobalContext.Provider value={valueHover}>
      {children}
    </GlobalContext.Provider>
  );
};
