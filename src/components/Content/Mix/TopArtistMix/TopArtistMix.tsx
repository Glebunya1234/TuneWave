"use client";

import style from "../For-user-Mix/ForUserMix.module.scss";
import Link from "next/link";
import Image from "next/image";
import useSWR from "swr";
import { BorderMarquee } from "@/components/UI/Marquee/Border-Marquee/BorderMarquee";
import {
  FollowedArtistType,
  TrackArtist,
} from "@/types/SpotifyTypes/TrackArtist/type";
import { _getTopArtists } from "@/api/SP-Artists/API-SP-Artists";
import { PanelSkeleton } from "@/components/UI/Skeleton/Panel-Skeleton/PanelSkeleton";

export const TopArtistMix = () => {
  const { data: topArtist, isLoading } = useSWR<FollowedArtistType>(
    `TopArtists`,
    async () => await _getTopArtists(),
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  );
  const divs = Array.from({ length: 6 });
  const items = topArtist?.items?.slice(0, 6).map((data, index) => (
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
      <div className={style.ForUserMix_Div}>
        <span className={style.Div__Span}>Similar to:</span>
        <Link href={`/section/TopArtists`} className={style.Div__link}>
          Show all
        </Link>
      </div>

      <nav className={style.ForUserMix__Conteiner}>
        {isLoading ? (
          <PanelSkeleton className={style.ForUserMix__Item} />
        ) : (
          items
        )}
      </nav>
    </section>
  );
};
