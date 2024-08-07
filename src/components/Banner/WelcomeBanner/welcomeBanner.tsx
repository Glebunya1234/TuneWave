"use client";
import style from "./welcomeBanner.module.scss";
import { CiWavePulse1 } from "react-icons/ci";
import { PanelTarget } from "@/components/UI/Target/PanelTarget";
import { useEffect, useState } from "react";
export const WeclomeBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);
  return (
    isVisible && (
      <div className={style.banner}>
        <div />
        <section className={style.banner__Welcome}>
          <h1 className={style.Welcome__dash}>Welcome to</h1>
        </section>
        <section className={style.banner__span}>
          <CiWavePulse1 className={style.span__dash} />
          <span className={style.span__dash}>TuneWave</span>
        </section>
        <section className={style.banner__descr}>
          <p>
            TuneWave is an innovative web application that gives users the
            ability to explore and enjoy music using the data and functionality
            of the Spotify API (Premium required).
          </p>
          <h2>
            <PanelTarget side="Bottom" />
          </h2>
        </section>
      </div>
    )
  );
};
