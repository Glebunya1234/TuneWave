"use client";
import style from "./ArtistInfo.module.scss";
import useSWR from "swr";
import Link from "next/link";
import { useState } from "react";
import { PlaylistComponent } from "@/components/DataLists/PlayLists-Component/PlayListComponent";
import { PanelPGAT } from "@/components/UI/Buttons/Panel-PlayList-Genre-Artist-Track/PanelPGAT";
import { TrackItem } from "@/types/SpotifyTypes/CurrentlyPlayingTrack/type";
import { TrackArtist } from "@/types/SpotifyTypes/TrackArtist/type";
import { _getCurrentUserPlaylists } from "@/api/SP-Playlists/API-SP-Playlists";
import {
  _getArtistsAlbums,
  _getArtistsTopTracks,
  _getRelatedArtists,
} from "@/api/SP-Artists/API-SP-Artists";
import { Spinner } from "@/components/UI/Spinner/spinner";
import { CurrentlyPlaylistTracksItem } from "@/types/SpotifyTypes/CurrentlyAlbum/type";

export const fetcherGetCurrentUserPlaylist = () => _getCurrentUserPlaylists(50);

export const ArtistInfo = ({ id }: { id: string }) => {
  const [state, setState] = useState(false);

  const [stateDiscography, setStateDiscography] = useState<"single" | "album">(
    "single"
  );

  const { data: TopTracks, isLoading: LoadingTopTracks } = useSWR<TrackItem[]>(
    `artistTopTracks/${id}`,
    async () => await _getArtistsTopTracks(id),
    {
      keepPreviousData: true,
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  );
  const { data: discography, isLoading } = useSWR<CurrentlyPlaylistTracksItem>(
    `artistDiscography/${stateDiscography}/${id}`,
    async () => await _getArtistsAlbums(id, stateDiscography),
    {
      keepPreviousData: true,
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  );

  const { data: RelatedArtists, isLoading: LoadingRelatedArtists } = useSWR<
    TrackArtist[]
  >(`artistRelatedArtists/${id}`, async () => await _getRelatedArtists(id), {
    keepPreviousData: true,
    revalidateOnFocus: false,
    dedupingInterval: 60000,
  });

  const handleClick = () => {
    if (state) {
      document.documentElement.style.setProperty("--HiddenList", "250px");
    } else document.documentElement.style.setProperty("--HiddenList", "500px");
    setState((prevState) => !prevState);
  };

  const items = discography?.items
    ?.slice(0, 6)
    .map((data, index) => (
      <PanelPGAT
        key={index}
        Href={`/album/${data.id}`}
        FirstText={data.name}
        SecondText={data.name}
        ImageSRC={data.images[0]?.url || "/FavoriteTrack.png"}
      />
    ));
  const Relateditems = RelatedArtists?.slice(0, 6).map((data, index) => (
    <PanelPGAT
      key={index}
      Href={`/artist/${data.id}`}
      FirstText={data.name}
      SecondText={data.name}
      ImageSRC={data.images[0]?.url || "/FavoriteTrack.png"}
    />
  ));

  return (
    <section className={style.ArtistInfo}>
      <section className={style.ArtistInfo__Sections}>
        <span className={`${style.ArtistInfo__Span}`}>Popular tracks</span>

        {LoadingTopTracks ? (
          <div className="w-full h-full flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          <>
            <div className={style.ArtistInfo__TopTracks}>
              <PlaylistComponent
                HiddenHeader={true}
                Offset={0}
                SWRKey={`artistTopTracks/${id}`}
                Params={{ id: id, list: "", genre: "" }}
                data={TopTracks}
              />
            </div>
            <button
              onClick={() => {
                handleClick();
              }}
            >
              Еще...
            </button>
          </>
        )}
      </section>
      <section className={style.ArtistInfo__Sections}>
        <span className={`${style.ArtistInfo__Span}  `}>
          <div className={style.radioContainer}>
            {["single", "album"].map((type) => (
              <div key={type} className={style.radioWrapper}>
                <input
                  type="radio"
                  id={type}
                  name="discography"
                  value={type}
                  checked={stateDiscography === type}
                  onChange={() =>
                    setStateDiscography(type as "single" | "album")
                  }
                  className={style.radioInput}
                />
                <label htmlFor={type} className={style.radioLabel}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </label>
              </div>
            ))}
          </div>

          <Link
            href={
              stateDiscography === "single"
                ? `/artist/${id}/single/`
                : `/artist/${id}/album/`
            }
            className={style.Div__link}
          >
            Show all
          </Link>
        </span>

        <nav className={style.ArtistInfo__Discography}>
          {isLoading
            ? Array.from({ length: 6 }).map((_, id) => (
                <div key={id} className={style.Discography__Item}>
                  <div className="w-full h-full p-4 animate-pulse bg-[#00000094]">
                    <div className="w-full h-full bg-[#4e4e4e91]"></div>
                  </div>
                </div>
              ))
            : items}
        </nav>
      </section>
      <section className={style.ArtistInfo__Sections}>
        <span className={`${style.ArtistInfo__Span} `}>
          <h1>Related Artists</h1>
          <Link href={`/section/related`} className={style.Div__link}>
            Show all
          </Link>
        </span>
        <nav className={style.ArtistInfo__Discography}>
          {LoadingRelatedArtists
            ? Array.from({ length: 6 }).map((_, id) => (
                <div key={id} className={style.Discography__Item}>
                  <div className="w-full h-full p-4 animate-pulse bg-[#00000094]">
                    <div className="w-full h-full bg-[#4e4e4e91]"></div>
                  </div>
                </div>
              ))
            : Relateditems}
        </nav>
      </section>
    </section>
  );
};
