"use client";

import style from "../For-user-Mix/ForUserMix.module.scss";
import Link from "next/link";
import Image from "next/image";

import { BorderMarquee } from "@/components/UI/Marquee/Border-Marquee/BorderMarquee";
import { _getFollowedArtists } from "@/api/SP-Artists/API-SP-Artists";
import { FollowedArtistType } from "@/types/SpotifyTypes/TrackArtist/type";
import useSWR from "swr";
import { PanelSkeleton } from "@/components/UI/Skeleton/Panel-Skeleton/PanelSkeleton";
import { PanelPGAT } from "@/components/UI/Buttons/Panel-PlayList-Genre-Artist-Track/PanelPGAT";

export const FollowedArtist = () => {
  const { data, isLoading } = useSWR<FollowedArtistType>(
    `FollowedArtists`,
    async () => await _getFollowedArtists(),
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  );

  const items = data?.items
    ?.slice(0, 6)
    .map((data, index) => (
      <PanelPGAT
        key={index}
        Href={`/artist/${data.id}`}
        FirstText={data.name}
        SecondText={data.name}
        ImageSRC={data.images[0].url || "/FavoriteTrack.png"}
      />
    ));
  return (
    <section className={style.ForUserMix}>
      <div className={style.ForUserMix_Div}>
        <span className={style.Div__Span}>Followed artists:</span>
        <Link href={`/section/FollowedArtists`} className={style.Div__link}>
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
