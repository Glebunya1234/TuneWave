"use client";

import "@devnomic/marquee/dist/index.css";
import style from "./MarqueeConteiner.module.scss";
import { useState, useEffect, useContext } from "react";
import { usePathname } from "next/navigation";
import { GlobalContext } from "@/Context";
import { BackgroundMarquee } from "../Background-Marquee/BGmarquee";

export const MarqueeContainer = () => {
  const dataContext = useContext(GlobalContext);
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
    const segments = pathname.split("/").filter(Boolean);
    const result = segments[0] || "tunewave";
    dataContext?.setTemporaryText(result);
    dataContext?.setDefaultText(result);
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
