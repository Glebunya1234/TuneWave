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
  const [isHiddenLeftPhoneBar, setHiddenLeftPhoneBar] =
    useState<ContextType["isHiddenLeftPhoneBar"]>(false);
  const [isHiddenLeftBar, setHiddenLeftBar] =
    useState<ContextType["isHiddenLeftBar"]>(true);
  const [isHiddenRightBar, setHiddenRightBar] =
    useState<ContextType["isHiddenRightBar"]>(true);
  const [getStatePlaying, setStatePlaying] = useState<
    ContextType["getStatePlaying"]
  >({ progress_ms: 0, is_playing: false, duration_ms: 0 });
  const [getCurrentPlaying, setCurrentPlaying] =
    useState<ContextType["getCurrentPlaying"]>();
  const [getDeviceID, setDeviceID] = useState<ContextType["getDeviceID"]>("");
  const [player, setPlayer] = useState<ContextType["player"]>(null);
  const [isRemoveLeft, setRemoveLeft] =
    useState<ContextType["isRemoveLeft"]>(true);
  const [isRemovePhoneLeft, setRemovePhoneLeft] =
    useState<ContextType["isRemovePhoneLeft"]>(false);
  const [isRemoveRight, setRemoveRight] =
    useState<ContextType["isRemoveRight"]>(true);
  const valueHover = {
    getTemporaryText,
    setTemporaryText,
    getDefaultText,
    setDefaultText,
    isHiddenLeftPhoneBar,
    setHiddenLeftPhoneBar,
    isRemovePhoneLeft,
    setRemovePhoneLeft,
    isHiddenLeftBar,
    setHiddenLeftBar,
    isHiddenRightBar,
    setHiddenRightBar,
    isRemoveLeft,
    setRemoveLeft,
    isRemoveRight,
    setRemoveRight,
    getStatePlaying,
    setStatePlaying,
    getDeviceID,
    setDeviceID,
    player,
    setPlayer,
    getCurrentPlaying,
    setCurrentPlaying,
  };

  return (
    <GlobalContext.Provider value={valueHover}>
      {children}
    </GlobalContext.Provider>
  );
};
