"use client";
import Link from "next/link";
import style from "./PanelPGAT.module.scss";
import { BorderMarquee } from "../../Marquee/Border-Marquee/BorderMarquee";
import Image from "next/image";
import { useState } from "react";
type PGAT = {
  Href: string;
  FirstText: string;
  SecondText: string;
  ImageSRC: string;
};

export const PanelPGAT = ({ Href, FirstText, SecondText, ImageSRC }: PGAT) => {
  const [Move, setMove] = useState(false);
  const handleEnter = () => {
    setMove(true);
  };
  const handleLeave = () => {
    setMove(false);
  };
  return (
    <Link
      href={Href}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={style.ForUserMix__Item}
    >
      <BorderMarquee
        PGAT={true}
        MoveChild={Move}
        shape="square"
        text={`${SecondText}`}
      >
        <aside className={style.Item__Conteiner}>
          <Image
            src={ImageSRC || "/FavoriteTrack.png"}
            layout="fill"
            objectFit="cover"
            alt=""
          />
          <span className={style.Item__Span}>{FirstText}</span>
        </aside>
      </BorderMarquee>
    </Link>
  );
};
