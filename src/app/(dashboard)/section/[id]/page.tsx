"use client";
import style from "./section.module.scss";
import React from "react";
import useSWR from "swr";
import { PanelTarget } from "@/components/UI/Target/PanelTarget";
import { PanelPGAT } from "@/components/UI/Buttons/Panel-PlayList-Genre-Artist-Track/PanelPGAT";
import { SectionFetcher } from "@/utils/helper/Fetchers/Sections-Fetcher";
import { RecommendationsType } from "@/types/SpotifyTypes/RecommendationsType/type";
import { FollowedArtistType } from "@/types/SpotifyTypes/TrackArtist/type";
import { CurrentlyPlaylist } from "@/types/SpotifyTypes/CurrentlyPlaylist/type";
import {
  _isCurrentlyPlaylist,
  _isFollowedArtist,
  _IsSavedAlbums,
  _isTypeRecommendation,
} from "@/utils/TypeOfCustom/TypeOfCustom";
import { Spinner } from "@/components/UI/Spinner/spinner";
import { GridPanelPGAT } from "@/components/UI/Buttons/Panel-PlayList-Genre-Artist-Track/GridPanelPGAT";
import { SavedAlbums } from "@/types/SpotifyTypes/CurrentlyAlbum/type";

const Section = ({ params }: { params: { id: string } }) => {
  const { data, isLoading } = useSWR<
    RecommendationsType | FollowedArtistType | CurrentlyPlaylist | SavedAlbums
  >(`${params.id}`, async () => await SectionFetcher(params.id), {
    revalidateOnFocus: false,
    dedupingInterval: 60000,
  });

  const renderHeader = () => {
    switch (params.id) {
      case "TopArtists":
        return "Similar to:";
      case "FollowedArtists":
        return "Followed artists:";
      case "FollowedAlbum":
        return "Followed albums:";
      case "FollowedPlaylists":
        return "Followed playlists";
      case "TopGenre":
        return "Similar to your genres:";
      case "ListenToThis":
        return "Listen to this:";
      default:
        return "";
    }
  };

  const renderContent = () => {
    if (!data) return <></>;

    switch (params.id) {
      case "ListenToThis":
        return _isTypeRecommendation(data)
          ? data.tracks.map((it, id) => (
              <GridPanelPGAT
                key={id}
                Href={`/track/${it.id}`}
                FirstText={it.name}
                SecondText={it.artists[0].name}
                ImageSRC={it?.album?.images[0]?.url || "/RandomPL.png"}
              />
            ))
          : null;

      case "FollowedPlaylists":
        return _isCurrentlyPlaylist(data)
          ? data.items.map((it, id) => (
              <GridPanelPGAT
                key={id}
                Href={`/playlist/list${it.id}?id=${it.id}`}
                FirstText={it.name}
                SecondText={it.owner.display_name}
                ImageSRC={it?.images[0]?.url || "/RandomPL.png"}
              />
            ))
          : null;
      case "FollowedAlbum":
        return _IsSavedAlbums(data)
          ? data.items.map((it, id) => (
              <GridPanelPGAT
                key={id}
                Href={`/album/${it.album.id}`}
                FirstText={it.album.name}
                SecondText={it.album?.artists[0]?.name}
                ImageSRC={
                  it.album?.images[0]?.url === undefined
                    ? "/FavoriteTrack.png"
                    : it.album?.images[0]?.url
                }
              />
            ))
          : null;

      case "TopGenre":
        return _isFollowedArtist(data)
          ? Array.from(
              new Set(
                data.items
                  .filter((it) => it.genres[0] !== undefined)
                  .slice(0, 6)
                  .map((it) => it.genres[0])
              )
            ).map((genre, index) => (
              <GridPanelPGAT
                key={index}
                Href={`/playlist/genre?genre=${genre}`}
                FirstText={genre}
                SecondText={genre}
                ImageSRC="/DiscLogo.png"
              />
            ))
          : null;

      case "TopArtists":
      case "FollowedArtists":
        return _isFollowedArtist(data)
          ? data.items.map((it, id) => (
              <GridPanelPGAT
                key={id}
                Href={
                  params.id === "TopArtists"
                    ? `/playlist/${it.id}`
                    : `/artist/${it.id}`
                }
                FirstText={it.name}
                SecondText={it.name}
                ImageSRC={it?.images[0]?.url || "/RandomPL.png"}
              />
            ))
          : null;

      default:
        return <></>;
    }
  };

  return (
    <div className={style.Section}>
      <PanelTarget side="Top" />
      {isLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <>
          <div className={style.ForUserMix_Div}>{renderHeader()}</div>
          <aside className={style.Section__Content} id="SectionPage">
            {renderContent()}
          </aside>
        </>
      )}
      <div className={style.dash}></div>
      <div className={style.squarDash}></div>
      <PanelTarget side="Bottom" />
    </div>
  );
};

export default Section;
