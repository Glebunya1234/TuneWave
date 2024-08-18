"use client";

import style from "../For-user-Mix/ForUserMix.module.scss";
import Link from "next/link";
import Image from "next/image";
import useSWR from "swr";
import { BorderMarquee } from "@/components/UI/Marquee/Border-Marquee/BorderMarquee";
import { TrackArtist } from "@/types/SpotifyTypes/TrackArtist/type";
import { _getTopArtists } from "@/api/SP-Artists/API-SP-Artists";

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
