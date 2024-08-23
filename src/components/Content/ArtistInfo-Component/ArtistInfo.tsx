"use client";
import style from "./ArtistInfo.module.scss";
import Image from "next/image";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import { TbRotate2 } from "react-icons/tb";
import { VscLibrary } from "react-icons/vsc";
import { CurrentlyPlaylist } from "@/types/SpotifyTypes/CurrentlyPlaylist/type";

import { _getCurrentUserPlaylists } from "@/api/SP-Playlists/API-SP-Playlists";
import { TrackItem } from "@/types/SpotifyTypes/CurrentlyPlayingTrack/type";
import {
  _getArtistsAlbums,
  _getArtistsTopTracks,
} from "@/api/SP-Artists/API-SP-Artists";
import { CurrentlyPlaylistTracksItem } from "@/types/SpotifyTypes/CurrentlyAlbum/type";
import { PlaylistComponent } from "@/components/DataLists/PlayLists-Component/PlayListComponent";
import { useState } from "react";
export const fetcherGetCurrentUserPlaylist = () => _getCurrentUserPlaylists(50);

export const ArtistInfo = ({ id }: { id: string }) => {
  const router = useRouter();
  const [state, setState] = useState(false);

  const { data: TopTracks, isLoading: LoadingTopTracks } = useSWR<TrackItem[]>(
    `artistTopTracks/${id}`,
    async () => await _getArtistsTopTracks(id),
    {
      keepPreviousData: true,
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  );
  // const { data: discography, isLoading: LoadingDiscography } =
  //   useSWR<CurrentlyPlaylistTracksItem>(
  //     `artistDiscography/${id}`,
  //     async () => await _getArtistsAlbums(id),
  //     {
  //       keepPreviousData: true,
  //       revalidateOnFocus: false,
  //       dedupingInterval: 60000,
  //     }
  //   );
  // console.log("discography", discography);
  // const { data: RelatedArtists, isLoading: LoadingRelatedArtists } =
  //   useSWR<CurrentlyPlaylist>(
  //     `artistRelatedArtists/${id}`,
  //     fetcherGetCurrentUserPlaylist,
  //     {
  //       keepPreviousData: true,
  //       revalidateOnFocus: false,
  //       dedupingInterval: 60000,
  //     }
  //   );

  const handleClick = () => {
    if (state) {
      document.documentElement.style.setProperty("--HiddenList", "250px");
    } else document.documentElement.style.setProperty("--HiddenList", "500px");
    setState((prevState) => !prevState);
  };

  const divs = Array.from({ length: 5 });
  return (
    <section className={style.ArtistInfo}>
      <nav
        className={`${style.TrackComponent__NavPanel} border-[#c1c0c5]  border-b-[1px]`}
      >
        popular tracks
      </nav>
      <section className={style.ArtistInfo__TopTracks}>
        <PlaylistComponent
          HiddenHeader={true}
          Offset={0}
          SWRKey={`artistTopTracks/${id}`}
          Params={{ id: id, list: "", genre: "" }}
          data={TopTracks}
        />
      </section>
      <button
        onClick={() => {
          handleClick();
        }}
      >
        Еще...
      </button>
    </section>
  );
};
