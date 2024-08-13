"use server";

import Link from "next/link";
import Image from "next/image";
import style from "../For-user-Mix/ForUserMix.module.scss";
import { BorderMarquee } from "@/components/UI/Marquee/Border-Marquee/BorderMarquee";
import { _getTopArtists } from "@/api/ApiSpotify";

export const TopArtistMix = async () => {
  const topArtist = await _getTopArtists();
  const items = topArtist.map((data, index) => (
    <Link
      href={`/playlist/${data.id}`}
      className={style.ForUserMix__Item}
      key={index}
    >
      <BorderMarquee shape="square" text={`${data.name}`}>
        <aside className={style.Item__Conteiner}>
          <Image
            src={data.images[0].url || "/FavoriteTrack.png"}
            layout="fill"
            objectFit="cover"
            alt={`Image for Mix user #${index + 1}`}
          />
          <span>{data.name}</span>
        </aside>
      </BorderMarquee>
    </Link>
  ));
  return (
    <section className={style.ForUserMix}>
      <span className={style.ForUserMix__Span}>Similar to:</span>
      <nav className={style.ForUserMix__Conteiner}>{items}</nav>
    </section>
  );
};
