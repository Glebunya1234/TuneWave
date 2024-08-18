"use client";

import style from "./BorderMarquee.module.scss";
import Marquee from "../Sound-Marquee/marquee";
import React, { FC } from "react";

type props = {
  children: React.ReactNode;
  text: string;
  shape: "rectangle" | "square";
};
export const BorderMarquee: FC<props> = ({ children, text, shape }) => {
  return (
    <nav className={style.BorderMarquee}>
      <aside
        className={
          shape === "rectangle" ? style.marq_Left : style.marq_Left_Square
        }
      >
        <Marquee text={text} />
      </aside>
      <aside
        className={
          shape === "rectangle" ? style.marq_Top : style.marq_Top_Square
        }
      >
        <Marquee text={text} />
      </aside>
      <aside className={style.marq_Bottom}>
        <Marquee text={text} />
      </aside>
      <aside
        className={
          shape === "rectangle" ? style.marq_Right : style.marq_Right_Square
        }
      >
        <Marquee text={text} />
      </aside>

      <aside className={style.BorderMarquee__Conteiner}>{children}</aside>
    </nav>
  );
};
