import style from "../ArtistData.module.scss";
import useSWR from "swr";
import Link from "next/link";
import { useState } from "react";
import { PanelPGAT } from "@/components/UI/Buttons/Panel-PlayList-Genre-Artist-Track/PanelPGAT";
import { PanelSkeleton } from "@/components/UI/Skeleton/Panel-Skeleton/PanelSkeleton";
import { _getArtistsAlbums } from "@/api/SP-Artists/API-SP-Artists";
import { CurrentlyPlaylistTracksItem } from "@/types/SpotifyTypes/CurrentlyAlbum/type";

export const AlbumSingleList = ({ id }: { id: string }) => {
  const [stateDiscography, setStateDiscography] = useState<"single" | "album">(
    "single"
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
  return (
    <>
      <span className={`${style.ArtistData__Span}  `}>
        <div className={style.radioContainer}>
          {["single", "album"].map((type) => (
            <div key={type} className={style.radioWrapper}>
              <input
                type="radio"
                id={type}
                name="discography"
                value={type}
                checked={stateDiscography === type}
                onChange={() => setStateDiscography(type as "single" | "album")}
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
      <nav className={style.ArtistData__Discography}>
        {isLoading ? (
          <PanelSkeleton className={style.Discography__Item} />
        ) : (
          items
        )}
      </nav>
    </>
  );
};
