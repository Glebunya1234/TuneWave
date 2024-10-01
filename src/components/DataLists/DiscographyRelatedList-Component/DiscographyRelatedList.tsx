"use client";

import style from "./DiscographyRelatedList.module.scss";
import useSWR, { useSWRConfig } from "swr";
import Link from "next/link";
import { GridPanelPGAT } from "@/components/UI/Buttons/Panel-PlayList-Genre-Artist-Track/GridPanelPGAT";
import {
  _getArtistsAlbums,
  _getRelatedArtists,
} from "@/api/SP-Artists/API-SP-Artists";
import { TrackArtist } from "@/types/SpotifyTypes/TrackArtist/type";

export const DiscographyRelatedList = ({
  DataArtist,
  id,
}: {
  DataArtist: string;
  id: string;
}) => {
  const { data, isLoading } = useSWR<TrackArtist[]>(
    `artistRelatedArtists/${id}`,
    async () => await _getRelatedArtists(id),
    {
      keepPreviousData: true,
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  );

  return (
    <div className={style.DiscographySingle}>
      <span className={`${style.DiscographySingle__Span}`}>
        <Link href={`/artist/${id}`} className={style.Span__Link}>
          {DataArtist}
        </Link>
      </span>

      {isLoading ? (
        <div className="w-full h-full flex justify-center items-center"></div>
      ) : (
        <aside className={style.DiscographySingle__ContentGrid}>
          {data?.map((it, inx) => (
            <GridPanelPGAT
              key={it.id}
              Href={`/artist/${it.id}`}
              FirstText={it.name}
              SecondText={it.name}
              ImageSRC={it?.images[0]?.url || ""}
            />
          ))}
        </aside>
      )}
    </div>
  );
};
