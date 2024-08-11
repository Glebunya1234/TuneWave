"use server";

import { BackgroundMarquee } from "@/components/UI/Marquee/Background-Marquee/BGmarquee";
import style from "./ForUserMix.module.scss";
import { BorderMarquee } from "@/components/UI/Marquee/Border-Marquee/BorderMarquee";
import Image from "next/image";
import Link from "next/link";

export const ForUserMix = async () => {
  const items = Array.from({ length: 5 }, (_, index) => (
    <Link
      href={`/playlist/randomlist${index + 1}`}
      className={style.ForUserMix__Item}
      key={index}
    >
      <BorderMarquee shape="square" text={`Random#${index + 1}`}>
        <aside className={style.Item__Conteiner}>
          <Image
            src="/FavoriteTrack.png"
            layout="fill"
            objectFit="cover"
            alt={`Image for Mix user #${index + 1}`}
          />
          <span>Random list#{index + 1}</span>
        </aside>
      </BorderMarquee>
    </Link>
  ));
  return (
    <section className={style.ForUserMix}>
      <span className={style.ForUserMix__Span}>Try your luck</span>
      <nav className={style.ForUserMix__Conteiner}>{items}</nav>
    </section>
  );
};
