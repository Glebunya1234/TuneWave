"use client";

import React, { FC } from "react";

import style from "./BorderMarquee.module.scss";
import Marquee from "../Sound-Marquee/marquee";
type props = {
  children: React.ReactNode;
  text: string;
};
export const BorderMarquee: FC<props> = ({ children, text }) => {
  return (
    <nav className={style.BorderMarquee}>
      <aside className={style.marq_Left}>
        <Marquee text={text} />
      </aside>
      <aside className={style.marq_Top}>
        <Marquee text={text} />
      </aside>
      <aside className={style.marq_Bottom}>
        <Marquee text={text} />
      </aside>
      <aside className={style.marq_Right}>
        <Marquee text={text} />
      </aside>

      <aside className={style.BorderMarquee__Conteiner}>{children}</aside>
    </nav>
  );
};
