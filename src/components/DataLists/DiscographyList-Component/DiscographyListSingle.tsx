"use client";

import style from "./DiscographyListSingle.module.scss";
import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { FaTh, FaThList } from "react-icons/fa";
import { AlbumInformation } from "../AlbumList-Component/AlbumInformation";
import { PanelPGAT } from "@/components/UI/Buttons/Panel-PlayList-Genre-Artist-Track/PanelPGAT";
import { CurrentlyPlaylistTracksItem } from "@/types/SpotifyTypes/CurrentlyAlbum/type";
import { _getArtistsAlbums } from "@/api/SP-Artists/API-SP-Artists";

export const DiscographyListSingle = ({
  DataArtist,
  id,
}: {
  DataArtist: string;
  id: string;
}) => {
  const [viewState, setViewState] = useState<"list" | "grid">("list");
  const { data, isLoading } = useSWR<CurrentlyPlaylistTracksItem>(
    `artistDiscography/single/${id}`,
    async () => await _getArtistsAlbums(id, "single"),
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

        <nav className={style.radioContainer}>
          {["list", "grid"].map((type) => (
            <div key={type} className={style.Span__View}>
              <input
                type="radio"
                id={type}
                name="View"
                value={type}
                checked={viewState === type}
                onChange={() => setViewState(type as "list" | "grid")}
                className={style.radioInput}
              />
              <label htmlFor={type} className={style.radioLabel}>
                {type === "list" ? <FaThList /> : <FaTh />}
              </label>
            </div>
          ))}
        </nav>
      </span>

      {isLoading ? (
        <div className="w-full h-full flex justify-center items-center"></div>
      ) : (
        <aside
          className={
            viewState === "list"
              ? style.DiscographySingle__Content
              : style.DiscographySingle__ContentGrid
          }
        >
          {data?.items.map((it, inx) =>
            viewState === "list" ? (
              <section key={inx} className={style.Content__items}>
                <div className={style.items}>
                  <div className={style.Preview__image}>
                    <Image
                      src={it?.images[0]?.url || ""}
                      layout="fill"
                      objectFit="cover"
                      alt=""
                    />
                  </div>
                  <div className={style.items__info}>
                    <Link href={`/album/${it.id}`} className={style.info__Link}>
                      {it.name}
                    </Link>
                    <aside>
                      {it.album_type} <span className="mx-[5px]">•</span>
                      {it.release_date}
                      <span className="mx-[5px]">•</span>
                      {it.total_tracks} tracks
                    </aside>
                    <nav></nav>
                  </div>
                </div>

                <AlbumInformation data={it.tracks.items} />
              </section>
            ) : (
              <PanelPGAT
                key={inx}
                Href={`/album/${it.id}`}
                FirstText={it.name}
                SecondText={it.name}
                ImageSRC={it?.images[0]?.url || ""}
              />
            )
          )}
        </aside>
      )}
    </div>
  );
};
