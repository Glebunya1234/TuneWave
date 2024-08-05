"use client";
import style from "./FavoriteTrackComponent.module.scss";
import Image from "next/image";
import { _getSavedTrackUser, _getToken } from "@/api/ApiSpotify";
import { formatDuration } from "@/utils/DurationFormatFunc";
import { useContext, useEffect, useState } from "react";
import { fetching } from "./FavoriteTrackComponent";
import type { SpotifyTracksResponse } from "@/types/SpotifyTypes/TrackFavoriteType/type";
import { GlobalContext } from "@/Context";

export const FavoriteTrackComponent = () => {
  const [getData, setData] = useState<SpotifyTracksResponse>({
    href: "",
    items: [],
    limit: 0,
    next: null,
    offset: 0,
    previous: null,
    total: 0,
  });
  const [getOffset, setOffset] = useState(0);
  const [getFetching, setFetching] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);
  const dataContext = useContext(GlobalContext);
  useEffect(() => {
    if (getFetching && !isLastPage) {
      fetching(getOffset)
        .then((response) => {
          setData((prevData) => ({
            ...prevData,
            items: [...prevData.items, ...response.items],
            next: response.next,
            offset: response.offset,
            total: response.total,
          }));
          setOffset(getOffset + 20);
          if (response.items.length < 20) {
            setIsLastPage(true);
          }
        })
        .finally(() => {
          setFetching(false);
        });
    }
  }, [getFetching, getOffset, isLastPage]);

  useEffect(() => {
    const myDiv = document.getElementById("FavoriteContent");
    setFetching(true);
    if (myDiv) {
      myDiv.addEventListener("scroll", scrollHandler);
      return () => {
        myDiv.removeEventListener("scroll", scrollHandler);
      };
    }
  }, []);

  const scrollHandler = () => {
    const myDiv = document.getElementById("FavoriteContent");
    if (myDiv) {
      if (
        myDiv.scrollHeight - (myDiv.scrollTop + myDiv.clientHeight) < 300 &&
        !isLastPage
      ) {
        setFetching(true);
      }
    }
  };

  return (
    <section className={style.Content__playlist}>
      {getData?.items.map((item, index) => {
        const albumImageUrl =
          item.track.album.images.length > 0
            ? item.track.album.images[0].url
            : "";

        return (
          <div key={index} className={style.Playlist__Track}>
            <div
              className={style.TrackIndex}
              onClick={() => {
                dataContext?.setStatePlaying((prevState) => !prevState);
              }}
            >
              {index + 1}
            </div>
            <div className={style.TrackImage}>
              {albumImageUrl && (
                <Image
                  src={albumImageUrl}
                  alt={item.track.album.name}
                  layout="fill"
                  objectFit="cover"
                  className={style.AlbumImage}
                />
              )}
            </div>
            <div className={style.TrackInfo}>
              <div className={style.TrackName}>{item.track.name}</div>
              <div className={style.TrackArtist}>
                {item.track.artists.map((artist) => artist.name).join(", ")}
              </div>
            </div>
            <div className={style.TrackAlbum}>{item.track.album.name}</div>
            <div className={style.TrackDuration}>
              {formatDuration(item.track.duration_ms)}
            </div>
          </div>
        );
      })}
    </section>
  );
};
