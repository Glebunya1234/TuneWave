"use server";

import Link from "next/link";
import Image from "next/image";
import style from "../For-user-Mix/ForUserMix.module.scss";
import { BorderMarquee } from "@/components/UI/Marquee/Border-Marquee/BorderMarquee";
import { _getTopArtists } from "@/api/ApiSpotify";

export const TopGangreMix = async () => {
  const topArtist = await _getTopArtists();

  const uniqueGenres = new Set(
    topArtist
      .filter((data) => data.genres[0] !== undefined)
      .slice(0, 5)
      .map((data) => data.genres[0])
  );

  const items = Array.from(uniqueGenres).map((data, index) => (
    <Link
      href={`/playlist/genre+${data}`}
      className={style.ForUserMix__Item}
      key={index}
    >
      <BorderMarquee shape="square" text={`${data}`}>
        <aside className={style.Item__Conteiner}>
          <Image
            src="/DiscLogo.png"
            layout="fill"
            objectFit="cover"
            alt={`Image for Mix user #${index + 1}`}
          />
          <span>{data}</span>
        </aside>
      </BorderMarquee>
    </Link>
  ));
  return (
    <section className={style.ForUserMix}>
      <span className={style.ForUserMix__Span}>Similar to your genres:</span>
      <nav className={style.ForUserMix__Conteiner}>{items}</nav>
    </section>
  );
};
