"use client";

import style from "../For-user-Mix/ForUserMix.module.scss";
import Link from "next/link";
import { BorderMarquee } from "@/components/UI/Marquee/Border-Marquee/BorderMarquee";
import Image from "next/image";
import { _getRecommendations } from "@/api/SP-Playlists/API-SP-MixPlaylist";
import { cache } from "react";
import useSWR from "swr";
import { RecommendationsType } from "@/types/SpotifyTypes/RecommendationsType/type";
import { PanelSkeleton } from "@/components/UI/Skeleton/Panel-Skeleton/PanelSkeleton";

export const ListenToThisCmp = () => {
  const { data, isLoading } = useSWR<RecommendationsType>(
    `ListenToThis`,
    async () => await _getRecommendations(),
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  );
  const divs = Array.from({ length: 6 });
  const items = data?.tracks?.slice(0, 6).map((data, index) => (
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
      <div className={style.ForUserMix_Div}>
        <span className={style.Div__Span}>Listen to this:</span>
        <Link href={`/section/ListenToThis`} className={style.Div__link}>
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
