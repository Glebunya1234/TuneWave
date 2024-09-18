"use client";
import { _Search } from "@/api/SP-Search/API-SP-Search";
import { SpotifySearchResult } from "@/types/SpotifyTypes/SearchType/SearchType";

import style from "./SearchContent.module.scss";
import styleForUserMix from "@/components/Content/Mix/For-user-Mix/ForUserMix.module.scss";
import useSWR from "swr";
import Link from "next/link";
import { PanelSkeleton } from "@/components/UI/Skeleton/Panel-Skeleton/PanelSkeleton";
import { PanelPGAT } from "@/components/UI/Buttons/Panel-PlayList-Genre-Artist-Track/PanelPGAT";
import { PlaylistComponent } from "@/components/DataLists/PlayLists-Component/PlayListComponent";
import { BestTracks } from "./BestTracks/BestTracks";
import { BestResult } from "./BestResult/BestResult";

export const SearchContent = ({ id }: { id: string }) => {
  const { data, isLoading } = useSWR<SpotifySearchResult | null>(
    `api/search/${id}`,
    async () => await _Search(id),
    {
      revalidateOnFocus: false,
    }
  );
  // if (isLoading) return <p>Loading...</p>;
  // console.log("object :>> ", data);
  // if (!data || !data.tracks) {
  //   return <p>No data available</p>;
  // }

  const itemsArtists = data?.artists?.items
    ?.slice(0, 6)
    .map((data, index) => (
      <PanelPGAT
        key={index}
        Href={`/playlist/${data.id}`}
        FirstText={data.name}
        SecondText={`${data.name}`}
        ImageSRC={data.images[0].url || "/FavoriteTrack.png"}
      />
    ));
  const itemsAlbums = data?.albums?.items
    ?.slice(0, 6)
    .map((data, index) => (
      <PanelPGAT
        key={index}
        Href={`/playlist/${data.id}`}
        FirstText={data.name}
        SecondText={`${data.name}`}
        ImageSRC={data.images[0].url || "/FavoriteTrack.png"}
      />
    ));
  const itemsPlaylists = data?.playlists?.items
    ?.slice(0, 6)
    .map((data, index) => (
      <PanelPGAT
        key={index}
        Href={`/playlist/${data.id}`}
        FirstText={data.name}
        SecondText={`${data.name}`}
        ImageSRC={data.images[0].url || "/FavoriteTrack.png"}
      />
    ));
  return (
    <aside className={style.SearchContent}>
      <section className={style.SearchContent__Section__Tracks}>
        <section
          className={`${styleForUserMix.ForUserMix} ${style.Section__Tracks__BestResult}`}
        >
          <div className={styleForUserMix.ForUserMix_Div}>
            <span className={styleForUserMix.Div__Span}>Best result</span>
          </div>
          <BestResult
            ImageSrc={data?.tracks?.items[0]?.album?.images[0]?.url}
            Name={data?.tracks?.items[0]?.name}
            Artist={data?.tracks?.items[0]?.artists[0].name}
            Album={data?.tracks?.items[0]?.album.name}
            Url={data?.tracks?.items[0]?.id}
            Type={data?.tracks?.items[0]?.type}
          />
        </section>
        <section className={styleForUserMix.ForUserMix}>
          <div className={styleForUserMix.ForUserMix_Div}>
            <span className={styleForUserMix.Div__Span}>Tracks</span>
            <Link
              href={`/search/${id}/tracks`}
              className={styleForUserMix.Div__link}
            >
              Show all
            </Link>
          </div>
          <BestTracks data={data?.tracks} />
        </section>
      </section>

      <section className={styleForUserMix.ForUserMix}>
        <div className={styleForUserMix.ForUserMix_Div}>
          <span className={styleForUserMix.Div__Span}>Artists</span>
          <Link
            href={`/search/${id}/artists`}
            className={styleForUserMix.Div__link}
          >
            Show all
          </Link>
        </div>
        <nav className={styleForUserMix.ForUserMix__Conteiner}>
          {isLoading ? (
            <PanelSkeleton className={styleForUserMix.ForUserMix__Item} />
          ) : (
            itemsArtists
          )}
        </nav>
      </section>

      <section className={styleForUserMix.ForUserMix}>
        <div className={styleForUserMix.ForUserMix_Div}>
          <span className={styleForUserMix.Div__Span}>Albums</span>
          <Link
            href={`/search/${id}/albums`}
            className={styleForUserMix.Div__link}
          >
            Show all
          </Link>
        </div>
        <nav className={styleForUserMix.ForUserMix__Conteiner}>
          {isLoading ? (
            <PanelSkeleton className={styleForUserMix.ForUserMix__Item} />
          ) : (
            itemsAlbums
          )}
        </nav>
      </section>

      <section className={styleForUserMix.ForUserMix}>
        <div className={styleForUserMix.ForUserMix_Div}>
          <span className={styleForUserMix.Div__Span}>Playlists</span>
          <Link
            href={`/search/${id}/playlists`}
            className={styleForUserMix.Div__link}
          >
            Show all
          </Link>
        </div>
        <nav className={styleForUserMix.ForUserMix__Conteiner}>
          {isLoading ? (
            <PanelSkeleton className={styleForUserMix.ForUserMix__Item} />
          ) : (
            itemsPlaylists
          )}
        </nav>
      </section>
    </aside>
  );
};
