"use client";

import Link from "next/link";
import Image from "next/image";
import style from "../For-user-Mix/ForUserMix.module.scss";
import { BorderMarquee } from "@/components/UI/Marquee/Border-Marquee/BorderMarquee";
import { _getTopArtists } from "@/api/ApiSpotify";
import useSWR from "swr";
import { TrackArtist } from "@/types/SpotifyTypes/TrackArtist/type";

export const TopArtistMix = () => {
  const { data: topArtist } = useSWR<TrackArtist[]>(
    `getTopArtists`,
    async () => await _getTopArtists(),
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  );
  const items = topArtist?.slice(0, 5).map((data, index) => (
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
