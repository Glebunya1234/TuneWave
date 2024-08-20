"use client";
import style from "../FavoriteTracksList-Component/FavoriteTrackComponent.module.scss";
import Image from "next/legacy/image";
import Link from "next/link";
import { formatDuration } from "@/utils/DurationFormatFunc";
import { Suspense, useEffect, useState } from "react";
import { IoTimerSharp } from "react-icons/io5";
import { PlayTrackBtn } from "@/components/UI/Buttons/PlayTrackBtn/PlayTrackBtn";
import { BsFillPlayFill } from "react-icons/bs";
import { SaveTrackBtn } from "@/components/UI/Buttons/SaveTrackToLibBtn/SaveTrack";
import { TrackItem } from "@/types/SpotifyTypes/CurrentlyPlayingTrack/type";
import useSWRInfinite from "swr/infinite";
import { useSWRConfig } from "swr";
import { fetcher } from "@/utils/helper/Fetchers/PlayList-Fetcher";
import {
  isCurrentlyPlaylistTracksItem,
  isTypeRecommendation,
} from "@/utils/TypeOfCustom/TypeOfCustom";
import { CurrentlyPlaylistTracksItem } from "@/types/SpotifyTypes/CurrentlyPlaylist/type";
import next from "next";

export const PlaylistComponent = ({
  data,
  SrcKey,
  Params,
  PrivatePlaylist,
  Offset,
}: {
  Offset?: number;
  PrivatePlaylist?: boolean;
  Params: { id: string; genre: string; list: string };
  data?: TrackItem[];
  SrcKey?: any;
}) => {
  const { mutate } = useSWRConfig();
  const [offset, setOffset] = useState(Offset || 0);
  const [fetching, setFetching] = useState(false);
  const [hasMore, setHasMore] = useState<string | null>("");
  useEffect(() => {
    const fetchMoreData = async () => {
      if (fetching && PrivatePlaylist && hasMore !== null) {
        const newOffset = offset + 40;
        const newData = await fetcher(
          Params.id,
          Params.genre,
          Params.list,
          newOffset
        );
        console.log("Я сработал", hasMore);
        if (isCurrentlyPlaylistTracksItem(newData)) {
          mutate(
            SrcKey,
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

        console.log("newData", newData);
        setFetching(false);
      }
    };

    fetchMoreData();
  }, [fetching]);

  useEffect(() => {
    const myDiv = document.getElementById("PlaylistPage");

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
      <section className={`${style.Content__playlist}`} id="PlaylistPage">
        <aside
          className={`${style.Playlist__Track} border-[#c1c0c5]  border-b-[1px]`}
        >
          <span className={style.TrackIndex}>#</span>
          <span></span>
          <span className={style.TrackInfo}>Name</span>
          <span className={style.TrackAlbum}>Album</span>
          <span></span>
          <span>
            <IoTimerSharp className="mr-[11px]" />
          </span>
        </aside>
        {data?.map((item, index) => {
          const albumImageUrl =
            item?.album?.images?.length > 0 ? item.album.images[0].url : "";

          return (
            <div key={index} className={style.Playlist__Track}>
              <PlayTrackBtn
                id={item.uri}
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
                    alt={item.album.name}
                    layout="fill"
                    className={style.AlbumImage}
                  />
                )}
              </div>
              <div className={style.TrackInfo}>
                <div className={style.TrackName}>
                  <Link href={`/track/${item.id}`}>
                    <p>{item.name}</p>
                  </Link>
                </div>
                <div className={style.TrackArtist}>
                  {item.artists.map((artist, index) => (
                    <Link key={index} href={`/artist/${artist.id}`}>
                      <p key={artist.name}>{artist.name}</p>
                    </Link>
                  ))}
                </div>
              </div>
              <Link
                href={`/album/${item.album.id}`}
                className={style.TrackAlbum}
              >
                <p>{item.album.name}</p>
              </Link>

              <div className={style.TrackDuration}>
                <SaveTrackBtn id={item.id} isSave={item.isSaved} />
              </div>
              <div className={style.TrackDuration}>
                {formatDuration(item.duration_ms)}
              </div>
            </div>
          );
        })}
      </section>
    </Suspense>
  );
};
