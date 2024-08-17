"use client";
import style from "./FavoriteTrackComponent.module.scss";
import Image from "next/legacy/image";
import Link from "next/link";
import useSWR, { useSWRConfig } from "swr";
import { _getSavedTrackUser } from "@/api/ApiSpotify";
import { formatDuration } from "@/utils/DurationFormatFunc";
import { Suspense, useEffect, useState } from "react";
import { IoTimerSharp } from "react-icons/io5";
import { PlayTrackBtn } from "@/components/UI/Buttons/PlayTrackBtn/PlayTrackBtn";
import type { SpotifyTracksResponse } from "@/types/SpotifyTypes/TrackFavoriteType/type";
import { SaveTrackBtn } from "@/components/UI/Buttons/SaveTrackToLibBtn/SaveTrack";
import { BsFillPlayFill } from "react-icons/bs";

const fetcher = (offset: number) => _getSavedTrackUser(offset);

export const FavoriteTrackComponent = () => {
  const [offset, setOffset] = useState(0);
  const [fetching, setFetching] = useState(false);

  const { data, mutate } = useSWR<SpotifyTracksResponse>(
    `https://api.spotify.com/v1/me/tracks`,
    () => fetcher(offset),
    {
      keepPreviousData: true,
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  );

  useEffect(() => {
    if (data?.next !== null && fetching) {
      setOffset((prevOffset) => {
        const newOffset = prevOffset + 20;
        mutate(async (currentData) => {
          const newData = await fetcher(newOffset);
          setFetching(false);
          return {
            ...currentData,
            items: [...(currentData?.items || []), ...newData.items],
            href: newData.href,
            limit: newData.limit,
            next: newData.next,
            offset: newData.offset,
            previous: newData.previous,
            total: newData.total,
          } as SpotifyTracksResponse;
        }, false);

        return newOffset;
      });
    }
  }, [fetching, mutate]);

  useEffect(() => {
    const myDiv = document.getElementById("FavoriteContent");
    const scrollHandler = () => {
      if (myDiv) {
        if (myDiv.scrollHeight - (myDiv.scrollTop + myDiv.clientHeight) < 300) {
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
    <Suspense fallback={<h2>🌀 Loading...</h2>}>
      <section className={`${style.Content__playlist}`} id="FavoriteContent">
        <aside
          className={`${style.Playlist__Track} border-[#c1c0c5]  border-b-[1px]`}
        >
          <span className={style.TrackIndex}>#</span>
          <span></span>
          <span className={style.TrackInfo}>Name</span>
          <span className={style.TrackAlbum}>Album</span>
          <span>
            <IoTimerSharp className="mr-[11px]" />
          </span>
        </aside>
        {data?.items?.map((item, index) => {
          const albumImageUrl =
            item.track.album.images.length > 0
              ? item.track.album.images[0].url
              : "";

          return (
            <div key={index} className={style.Playlist__Track}>
              <PlayTrackBtn
                id={item.track.uri}
                onHover={{
                  isTrue: true,
                  content: (
                    <BsFillPlayFill className="pl-[3px] text-xl text-center" />
                  ),
                }}
                text={index + 1}
                className={style.TrackIndex}
              />
              <div className={style.TrackImage}>
                {albumImageUrl && (
                  <Image
                    src={albumImageUrl}
                    alt={item.track.album.name}
                    layout="fill"
                    className={style.AlbumImage}
                  />
                )}
              </div>
              <div className={style.TrackInfo}>
                <div className={style.TrackName}>
                  <Link href={`/track/${item.track.id}`}>
                    <p>{item.track.name}</p>
                  </Link>
                </div>
                <div className={style.TrackArtist}>
                  {item.track.artists.map((artist, index) => (
                    <Link key={index} href={`/artist/${artist.id}`}>
                      <p key={artist.name}>{artist.name}</p>
                    </Link>
                  ))}
                </div>
              </div>
              <Link
                href={`/album/${item.track.album.id}`}
                className={style.TrackAlbum}
              >
                <p>{item.track.album.name}</p>
              </Link>
              <div className={style.TrackDuration}>
                <SaveTrackBtn id={item.track.id} isSave={item.track.isSaved} />
              </div>
              <div className={style.TrackDuration}>
                {formatDuration(item.track.duration_ms)}
              </div>
            </div>
          );
        })}
      </section>
    </Suspense>
  );
};
