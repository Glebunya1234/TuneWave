"use client";

import style from "../For-user-Mix/ForUserMix.module.scss";
import Link from "next/link";
import useSWR from "swr";

import { PanelSkeleton } from "@/components/UI/Skeleton/Panel-Skeleton/PanelSkeleton";
import { PanelPGAT } from "@/components/UI/Buttons/Panel-PlayList-Genre-Artist-Track/PanelPGAT";
import { _getFollowedArtists } from "@/api/SP-Artists/API-SP-Artists";
import { FollowedArtistType } from "@/types/SpotifyTypes/TrackArtist/type";
import { _getSavedAlbums } from "@/api/SP-Albums/API-SP-Albums";
import { SavedAlbums } from "@/types/SpotifyTypes/CurrentlyAlbum/type";

export const FollowedAlbum = () => {
  const { data, isLoading } = useSWR<SavedAlbums>(
    `FollowedAlbum`,
    async () => await _getSavedAlbums(),
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  );

  const items = data?.items
    ?.slice(0, 6)
    .map((it, index) => (
      <PanelPGAT
        key={index}
        Href={`/album/${it.album.id}`}
        FirstText={it.album.name}
        SecondText={it.album?.artists[0]?.name}
        ImageSRC={
          it.album?.images[0]?.url === undefined
            ? "/FavoriteTrack.png"
            : it.album?.images[0]?.url
        }
      />
    ));
  return (
    <section className={style.ForUserMix}>
      <div className={style.ForUserMix_Div}>
        <span className={style.Div__Span}>Followed album:</span>
        <Link href={`/section/FollowedAlbum`} className={style.Div__link}>
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
