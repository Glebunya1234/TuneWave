"use server";

import style from "../For-user-Mix/ForUserMix.module.scss";
import Link from "next/link";
import { BorderMarquee } from "@/components/UI/Marquee/Border-Marquee/BorderMarquee";
import Image from "next/image";
import { _getRecommendations } from "@/api/SP-Playlists/API-SP-MixPlaylist";

export const ListenToThisCmp = async () => {
  const data = await _getRecommendations();
  const items = data.tracks?.slice(0, 5).map((data, index) => (
    <Link
      href={`/track/${data.id}`}
      className={style.ForUserMix__Item}
      key={index}
    >
      <BorderMarquee shape="square" text={`${data.artists[0].name}`}>
        <aside className={style.Item__Conteiner}>
          <Image
            src={data.album?.images[0]?.url || "/FavoriteTrack.png"}
            layout="fill"
            objectFit="cover"
            alt={`Image for ListenToThisCmp #${index + 1}`}
          />
          <span>{data.name}</span>
        </aside>
      </BorderMarquee>
    </Link>
  ));
  return (
    <section className={style.ForUserMix}>
      <span className={style.ForUserMix__Span}>Listen to this: </span>
      <nav className={style.ForUserMix__Conteiner}>{items}</nav>
    </section>
  );
};
