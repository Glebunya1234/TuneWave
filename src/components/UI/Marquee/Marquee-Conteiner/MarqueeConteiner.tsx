"use client";

import "@devnomic/marquee/dist/index.css";
import style from "./MarqueeConteiner.module.scss";
import { useState, useEffect, useContext } from "react";
import { usePathname } from "next/navigation";
import { HoverTextContext } from "@/Context";
import { BackgroundMarquee } from "../Background-Marquee/BGmarquee";

export const MarqueeContainer = () => {
  const dataContext = useContext(HoverTextContext);
  const [duration, setDuration] = useState(style.duration1s);
  const pathname = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDuration("duration40s");
    }, 1450);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer2 = setTimeout(() => {
      setDuration("filter: invert(100%);");
    }, 100);

    return () => clearTimeout(timer2);
  }, []);
  useEffect(() => {
    dataContext?.setDefaultText(pathname?.split("/").pop() || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);
  return (
    <>
      <BackgroundMarquee
        text={dataContext?.getTemporaryText + " "}
        className={duration}
      />
      <BackgroundMarquee
        text={dataContext?.getTemporaryText + " "}
        isReverse={true}
        className={`${duration}`}
      />
      <BackgroundMarquee
        text={dataContext?.getTemporaryText + " "}
        className={duration}
      />
      <BackgroundMarquee
        text={dataContext?.getTemporaryText + " "}
        isReverse={true}
        className={duration}
      />
      <BackgroundMarquee
        text={dataContext?.getTemporaryText + " "}
        className={duration}
      />
      <BackgroundMarquee
        text={dataContext?.getTemporaryText + " "}
        isReverse={true}
        className={duration}
      />
      <BackgroundMarquee
        text={dataContext?.getTemporaryText + " "}
        className={duration}
      />
    </>
  );
};
