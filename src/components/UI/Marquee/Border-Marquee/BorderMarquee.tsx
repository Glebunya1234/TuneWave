"use client";

import style from "./BorderMarquee.module.scss";
import Marquee from "../Sound-Marquee/marquee";
import React, { FC, useEffect, useState } from "react";

type props = {
  children: React.ReactNode;
  text: string;
  shape: "rectangle" | "square";
  MoveChild?: boolean;
  PGAT?: boolean;
};
export const BorderMarquee: FC<props> = ({
  children,
  text,
  shape,
  PGAT,
  MoveChild,
}) => {
  const [Move, setMove] = useState<boolean | undefined>(false);
  useEffect(() => {
    setMove(MoveChild);
  }, [MoveChild]);
  return (
    <nav className={style.BorderMarquee}>
      <aside
        className={
          shape === "rectangle" ? style.marq_Left : style.marq_Left_Square
        }
      >
        <Marquee PGAT={PGAT} move={Move} text={text} />
      </aside>
      <aside
        className={
          shape === "rectangle" ? style.marq_Top : style.marq_Top_Square
        }
      >
        <Marquee PGAT={PGAT} move={Move} text={text} />
      </aside>
      <aside className={style.marq_Bottom}>
        <Marquee PGAT={PGAT} move={Move} text={text} />
      </aside>
      <aside
        className={
          shape === "rectangle" ? style.marq_Right : style.marq_Right_Square
        }
      >
        <Marquee PGAT={PGAT} move={Move} text={text} />
      </aside>

      <aside className={style.BorderMarquee__Conteiner}>{children}</aside>
    </nav>
  );
};
