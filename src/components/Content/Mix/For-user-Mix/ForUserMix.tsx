"use client";

import { BackgroundMarquee } from "@/components/UI/Marquee/Background-Marquee/BGmarquee";
import style from "./ForUserMix.module.scss";
import { BorderMarquee } from "@/components/UI/Marquee/Border-Marquee/BorderMarquee";
import Image from "next/image";

export const ForUserMix = () => {
  return (
    <section className={style.ForUserMix}>
      <span className={style.ForUserMix__Span}>
        Everything for you, Glebunya
      </span>
      <nav className={style.ForUserMix__Conteiner}>
        <div className={style.ForUserMix__Item}>
          <BorderMarquee shape="square" text={"Mix user #1"}>
            <aside className={style.Item__Conteiner}>
              <Image
                src="/FavoriteTrack.png"
                layout="fill"
                objectFit="cover"
                alt="alt"
              />
              <span>Mix user #1</span>
            </aside>
          </BorderMarquee>
        </div>
        <div className={style.ForUserMix__Item}>
          <BorderMarquee shape="square" text={"Mix user #2"}>
            <aside className={style.Item__Conteiner}>
              <Image
                src="/FavoriteTrack.png"
                layout="fill"
                objectFit="cover"
                alt="alt"
              />
              <span>Mix user #2</span>
            </aside>
          </BorderMarquee>
        </div>
        <div className={style.ForUserMix__Item}>
          <BorderMarquee shape="square" text={"Mix user #3"}>
            <aside className={style.Item__Conteiner}>
              <Image
                src="/FavoriteTrack.png"
                layout="fill"
                objectFit="cover"
                alt="alt"
              />
              <span>Mix user #3</span>
            </aside>
          </BorderMarquee>
        </div>
        <div className={style.ForUserMix__Item}>
          <BorderMarquee shape="square" text={"Mix user #4"}>
            <aside className={style.Item__Conteiner}>
              <Image
                src="/FavoriteTrack.png"
                layout="fill"
                objectFit="cover"
                alt="alt"
              />
              <span>Mix user #4</span>
            </aside>
          </BorderMarquee>
        </div>
        <div className={style.ForUserMix__Item}>
          <BorderMarquee shape="square" text={"Mix user #5"}>
            <aside className={style.Item__Conteiner}>
              <Image
                src="/FavoriteTrack.png"
                layout="fill"
                objectFit="cover"
                alt="alt"
              />
              <span>Mix user #5</span>
            </aside>
          </BorderMarquee>
        </div>
      </nav>
    </section>
  );
};
