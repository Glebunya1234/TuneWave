"use client";

import style from "./Left-side-bar-phone.module.scss";
import Link from "next/link";
import { GlobalContext } from "@/Context";
import { useContext, useEffect, useState } from "react";

export const MediaLibraryBarPhone = () => {
  const [isRemove, setRemove] = useState(" ");
  const dataCont = useContext(GlobalContext);

  const handleAction = () => {
    setRemove(style.MediaLibrary__remove);
    const timer2 = setTimeout(() => {
      setRemove(" ");
      dataCont.setHiddenLeftPhoneBar((prevState) => !prevState);
    }, 500);
    return timer2;
  };
  useEffect(() => {
    const handleAction = () => {
      setRemove(style.MediaLibrary__remove);
      const timer2 = setTimeout(() => {
        setRemove(" ");
        dataCont?.setHiddenLeftPhoneBar(dataCont?.isRemovePhoneLeft);
      }, 500);
      return timer2;
    };
    handleAction();
  }, [dataCont?.isRemovePhoneLeft]);

  return (
    <>
      {dataCont.isHiddenLeftPhoneBar && (
        <section className={style.MediaLibrary}>
          <section className={`${style.MediaLibrary_Content} ${isRemove}`}>
            <aside className={`${style.MediaLibrary__HideWindow} `}>
              <button onClick={handleAction}>Hide window</button>
            </aside>
            <nav className={style.MediaLibrary__Navigation}>
              <Link href="/home" className={style.Btn} onClick={handleAction}>
                Home
              </Link>
              <Link href="/search" className={style.Btn} onClick={handleAction}>
                Search
              </Link>
              <Link
                href="/settings"
                className={style.Btn}
                onClick={handleAction}
              >
                Settings
              </Link>
              <Link
                href="/section/FollowedPlaylists"
                className={style.Btn}
                onClick={handleAction}
              >
                Media library
              </Link>
            </nav>
          </section>
          <button
            className={style.CloseFocusWindow}
            onClick={handleAction}
          ></button>
        </section>
      )}
    </>
  );
};
