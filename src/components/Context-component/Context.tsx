"use client";
import { useState } from "react";
import { GlobalContext } from "@/Context";
import { usePathname } from "next/navigation";
import { ContextType } from "@/types/TypeContext/type";

//главный конетекст компонент что оборачивает
export const Context = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const text = pathname?.split("/").pop() || "tunewave";

  const [getTemporaryText, setTemporaryText] =
    useState<ContextType["getTemporaryText"]>(text);
  //текущий текст заднего фона

  const [getDefaultText, setDefaultText] =
    useState<ContextType["getDefaultText"]>(text);
  //дефолтный текст заднего фона, может изменятся
  const [isHiddenLeftPhoneBar, setHiddenLeftPhoneBar] =
    useState<ContextType["isHiddenLeftPhoneBar"]>(false);
  const [isHiddenLeftBar, setHiddenLeftBar] =
    useState<ContextType["isHiddenLeftBar"]>(true);
  //Состояние левого сайд бара (телефон, пк)

  const [isHiddenRightBar, setHiddenRightBar] =
    useState<ContextType["isHiddenRightBar"]>(true);
  //Состояние правого сайд бара

  const [isRemoveLeft, setRemoveLeft] =
    useState<ContextType["isRemoveLeft"]>(true);
  const [isRemovePhoneLeft, setRemovePhoneLeft] =
    useState<ContextType["isRemovePhoneLeft"]>(false);
  //Состояние для вызивания анимации удаления для левого сайд бара (телефон, пк)

  const [isRemoveRight, setRemoveRight] =
    useState<ContextType["isRemoveRight"]>(true);
  //Состояние для вызивания анимации удаления для правого сайд бара пк

  //Плеер
  const [getStatePlaying, setStatePlaying] = useState<
    ContextType["getStatePlaying"]
  >({ progress_ms: 0, is_playing: false, duration_ms: 0 });
  const [getCurrentPlaying, setCurrentPlaying] =
    useState<ContextType["getCurrentPlaying"]>();

  const [getDeviceID, setDeviceID] = useState<ContextType["getDeviceID"]>("");

  const [player, setPlayer] = useState<ContextType["player"]>(null);

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
