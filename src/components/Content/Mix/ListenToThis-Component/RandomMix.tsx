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
import { PanelPGAT } from "@/components/UI/Buttons/Panel-PlayList-Genre-Artist-Track/PanelPGAT";

export const ListenToThisCmp = () => {
  let items;
  const { data, isLoading } = useSWR<RecommendationsType | string>(
    `ListenToThis`,
    async () => await _getRecommendations(),
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  );
  if (typeof data !== "string") {
    items = data?.tracks
      ?.slice(0, 6)
      .map((data, index) => (
        <PanelPGAT
          key={index}
          Href={`/track/${data.id}`}
          FirstText={data.name}
          SecondText={`${data.artists[0].name}`}
          ImageSRC={data.album?.images[0]?.url || "/FavoriteTrack.png"}
        />
      ));
  } else items;
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
