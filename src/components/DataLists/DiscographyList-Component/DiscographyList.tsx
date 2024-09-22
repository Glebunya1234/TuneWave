"use client";

import style from "./DiscographyList.module.scss";

import useSWR, { useSWRConfig } from "swr";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaTh, FaThList } from "react-icons/fa";
import { AlbumInformation } from "../AlbumList-Component/AlbumInformation";
import { GridPanelPGAT } from "@/components/UI/Buttons/Panel-PlayList-Genre-Artist-Track/GridPanelPGAT";
import { _getArtistsAlbums } from "@/api/SP-Artists/API-SP-Artists";
import { CurrentlyPlaylistTracksItem } from "@/types/SpotifyTypes/CurrentlyAlbum/type";
import { OpenInSpotify } from "@/components/UI/Buttons/OpenInSpotifyBtn/OpenInSpotify";
import { FollowOrUnPlaylist } from "@/components/UI/Buttons/SavePlaylistToLibBtn/FollowOrUnPlaylist";

export const DiscographyList = ({
  DataArtist,
  idForScroll,
  include_groups,
  id,
}: {
  include_groups: string;
  DataArtist: string;
  idForScroll: string;
  id: string;
}) => {
  const [viewState, setViewState] = useState<"list" | "grid">("list");
  const { data, isLoading } = useSWR<CurrentlyPlaylistTracksItem>(
    `artistDiscography/${include_groups}/${id}`,
    async () => await _getArtistsAlbums(id, include_groups),
    {
      keepPreviousData: true,
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  );
  const { mutate } = useSWRConfig();
  const [offset, setOffset] = useState(0);
  const [fetching, setFetching] = useState(false);
  const [hasMore, setHasMore] = useState<string | null>("");
  useEffect(() => {
    const fetchMoreData = async () => {
      if (fetching && hasMore !== null) {
        const newOffset = offset + 20;
        const newData = await _getArtistsAlbums(id, include_groups, newOffset);

        mutate(
          `artistDiscography/${include_groups}/${id}`,
          (currentData: any) => ({
            ...currentData,
            items: [...(currentData?.items || []), ...newData.items],
            offset: newData.offset,
            next: newData.next,
          }),
          false
        );

        setOffset(newOffset);
        setHasMore(newData.next);
      }

      setFetching(false);
    };

    fetchMoreData();
  }, [fetching]);

  useEffect(() => {
    const myDiv = document.getElementById(`${idForScroll}`);

    const scrollHandler = () => {
      if (myDiv) {
        if (myDiv.scrollHeight - (myDiv.scrollTop + myDiv.clientHeight) < 500) {
          setFetching(true);
        }
      }
    };

    if (myDiv) {
      myDiv.addEventListener("scroll", scrollHandler);
      return () => {
        myDiv.removeEventListener("scroll", scrollHandler);
      };
    }
  }, []);

  return (
    <div className={style.DiscographySingle} id={idForScroll}>
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
              <section
                key={`${it.name}-${inx}`}
                className={style.Content__items}
              >
                <div className={style.items}>
                  <div className={style.Preview__image}>
                    <Image
                      src={it?.images[0]?.url || ""}
                      width={136}
                      height={136}
                      objectFit="cover"
                      className="aspect-square"
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

                    <nav className={`${style.items__NavPanel}`}>
                      <FollowOrUnPlaylist
                        type="album"
                        id={it?.id!}
                        className={style.NavPanel__PlayTrackBtn}
                        isSave={it?.isSaved}
                      />
                      <OpenInSpotify
                        className={style.OpenSpotifyBtn}
                        href={it?.external_urls?.spotify}
                      />
                    </nav>
                  </div>
                </div>

                <AlbumInformation data={it?.tracks?.items} />
              </section>
            ) : (
              <GridPanelPGAT
                key={it.id}
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
