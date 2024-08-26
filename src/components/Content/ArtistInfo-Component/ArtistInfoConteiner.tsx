"use client";
import style from "./ArtistInfoConteiner.module.scss";
import { ArtistTopTrack } from "@/components/DataLists/ArtistData-Component/ArtistTopTrack-Mini-List-Component/ArtistTopTrack";
import { AlbumSingleList } from "@/components/DataLists/ArtistData-Component/Album-Single-List-Component/AlbumSingleList";
import { ArtistRelatedItemList } from "@/components/DataLists/ArtistData-Component/ArtistRelatedItemList-Component/ArtistRelatedItemList";
import { _getCurrentUserPlaylists } from "@/api/SP-Playlists/API-SP-Playlists";
import {
  _getArtistsAlbums,
  _getArtistsTopTracks,
  _getRelatedArtists,
} from "@/api/SP-Artists/API-SP-Artists";

export const fetcherGetCurrentUserPlaylist = () => _getCurrentUserPlaylists(50);

export const ArtistInfoConteiner = ({ id }: { id: string }) => {
  return (
    <section className={style.ArtistInfo}>
      <section className={style.ArtistInfo__Sections}>
        <ArtistTopTrack id={id} />
      </section>
      <section className={style.ArtistInfo__Sections}>
        <AlbumSingleList id={id} />
      </section>
      <section className={style.ArtistInfo__Sections}>
        <ArtistRelatedItemList id={id} />
      </section>
    </section>
  );
};
