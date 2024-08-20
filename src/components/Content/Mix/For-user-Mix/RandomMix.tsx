"use server";

import style from "./ForUserMix.module.scss";
import Link from "next/link";
import { BorderMarquee } from "@/components/UI/Marquee/Border-Marquee/BorderMarquee";

export const RandomMix = async () => {
  const items = Array.from({ length: 6 }, (_, index) => (
    <Link
      href={`/playlist/randomlist${index + 1}`}
      className={style.ForUserMix__Item}
      key={index}
    >
      <BorderMarquee shape="square" text={`Random#${index + 1}`}>
        <aside className={style.Item__Conteiner}>
          <h1 className={style.RandomTextImage}>#{index + 1}</h1>
          <span>Random list#{index + 1}</span>
        </aside>
      </BorderMarquee>
    </Link>
  ));
  return (
    <section className={style.ForUserMix}>
      <div className={style.ForUserMix_Div}>
        <span className={style.Div__Span}>Try your luck</span>
      </div>
      <nav className={style.ForUserMix__Conteiner}>{items}</nav>
    </section>
  );
};
