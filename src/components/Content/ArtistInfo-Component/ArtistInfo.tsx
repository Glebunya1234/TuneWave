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
export const fetcherGetCurrentUserPlaylist = () => _getCurrentUserPlaylists(50);

export const ArtistInfo = ({ id }: { id: string }) => {
  const router = useRouter();
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
  const divs = Array.from({ length: 5 });
  return (
    <section className={style.MediaPlaylist}>
      <PlaylistComponent
        Offset={0}
        SWRKey={`artistTopTracks/${id}`}
        Params={{ id: id, list: "", genre: "" }}
        data={TopTracks}
      />
    </section>
  );
};
