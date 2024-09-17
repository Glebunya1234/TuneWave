"use client";
import style from "@components/DataLists/FavoriteTracksList-Component/FavoriteTrackComponent.module.scss";
import Image from "next/legacy/image";
import Link from "next/link";
import useSWR from "swr";
import { Suspense, useEffect, useState } from "react";
import { IoTimerSharp } from "react-icons/io5";
import { BsFillPlayFill } from "react-icons/bs";
import { PlayTrackBtn } from "@/components/UI/Buttons/PlayTrackBtn/PlayTrackBtn";
import { SaveTrackBtn } from "@/components/UI/Buttons/SaveTrackToLibBtn/SaveTrack";

import { formatDuration } from "@/utils/DurationFormatFunc";
import { _isCurrentlyPlaylistTracksItem } from "@/utils/TypeOfCustom/TypeOfCustom";
import { SpotifySearchResult } from "@/types/SpotifyTypes/SearchType/SearchType";
import { _Search } from "@/api/SP-Search/API-SP-Search";
import { Spinner } from "@/components/UI/Spinner/spinner";

export const TrackListComponent = ({
  Search,
  Offset,
  idForScroll,
}: {
  Offset?: number;
  idForScroll: string;
  Search: string;
}) => {
  const [offset, setOffset] = useState(Offset || 0);
  const [fetching, setFetching] = useState(false);
  const [hasMore, setHasMore] = useState<string | null>("");

  const { data: initialData, isLoading } = useSWR<SpotifySearchResult | null>(
    `api/search/${Search}`,
    async () => {
      return await _Search(Search);
    },
    { keepPreviousData: true, revalidateOnFocus: false }
  );

  const { data: trackData, mutate } = useSWR<SpotifySearchResult | null>(
    `api/search/${Search}/tracks`,
    null,
    {
      keepPreviousData: true,
      revalidateOnFocus: false,
    }
  );

  useEffect(() => {
    if (initialData?.tracks && !trackData) {
      mutate(initialData, false);
    }
  }, [initialData]);
  useEffect(() => {
    const fetchMoreData = async () => {
      if (fetching && hasMore !== null) {
        const newOffset = offset + 20;

        const newData = await _Search(Search, "track", newOffset);

        mutate(
          (currentData: any) => ({
            ...currentData,
            tracks: {
              ...currentData.tracks,
              items: [
                ...(currentData?.tracks?.items || []),
                ...(newData?.tracks?.items || []),
              ],
              offset: newData?.tracks?.offset,
              next: newData?.tracks?.next,
            },
          }),
          false
        );
        setOffset(newOffset);
        setHasMore(newData?.tracks?.next!);

        setFetching(false);
      }
    };

    fetchMoreData();
  }, [fetching]);

  useEffect(() => {
    const myDiv = document.getElementById(`${idForScroll}`);

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
        {isLoading && <Spinner />}
        {trackData?.tracks?.items?.map((item, index) => {
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
                href={`/album/${item?.album?.id}`}
                className={style.TrackAlbum}
              >
                <p>{item?.album?.name}</p>
              </Link>

              <div className={style.TrackDuration}>
                <SaveTrackBtn
                  id={item.id}
                  // isSave={item.isSaved}
                  isPage={true}
                />
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
