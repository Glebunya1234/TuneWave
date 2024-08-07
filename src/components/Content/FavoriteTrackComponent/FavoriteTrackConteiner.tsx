"use client";
import style from "./FavoriteTrackComponent.module.scss";
import Image from "next/image";
import { _getPlayTrack, _getSavedTrackUser, _getToken } from "@/api/ApiSpotify";
import { formatDuration } from "@/utils/DurationFormatFunc";
import { useContext, useEffect, useState } from "react";
import { fetching } from "./FavoriteTrackComponent";
import type { SpotifyTracksResponse } from "@/types/SpotifyTypes/TrackFavoriteType/type";
import { GlobalContext } from "@/Context";
import { BsFillPlayFill } from "react-icons/bs";
import { IoTimerSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";

export const FavoriteTrackComponent = () => {
  const router = useRouter();
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
  const [hoverStates, setHoverStates] = useState<{ [key: number]: boolean }>(
    {}
  );
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
          console.log("newData", response.items);
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

  const handleMouseEnter = (index: number) => {
    setHoverStates((prev) => ({ ...prev, [index]: true }));
  };

  const handleMouseLeave = (index: number) => {
    setHoverStates((prev) => ({ ...prev, [index]: false }));
  };

  const handleClickAlbum = (id: string) => {
    router.push(`/album/${id}`);
  };
  const handleClickTrack = (id: string) => {
    router.push(`/album/${id}`);
  };
  const handleClickArtist = (id: string) => {
    router.push(`/artist/${id}`);
  };
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
  const Play = (uri: string) => {
    _getPlayTrack(uri);
    dataContext?.setStatePlaying((prevState) => !prevState);
  };

  return (
    <section className={`${style.Content__playlist}`}>
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
      {getData?.items.map((item, index) => {
        const albumImageUrl =
          item.track.album.images.length > 0
            ? item.track.album.images[0].url
            : "";

        return (
          <div key={index} className={style.Playlist__Track}>
            <div
              className={style.TrackIndex}
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
              onClick={() => {
                Play(item.track.uri);
              }}
            >
              {hoverStates[index] ? (
                <BsFillPlayFill className="pl-[3px] text-xl text-center" />
              ) : (
                index + 1
              )}
            </div>
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
              <div className={style.TrackName}>{item.track.name}</div>
              <div className={style.TrackArtist}>
                {item.track.artists.map((artist) => artist.name).join(", ")}
              </div>
            </div>
            <div
              onClick={() => {
                handleClickAlbum(item.track.album.id);
              }}
              className={style.TrackAlbum}
            >
              {item.track.album.name}
            </div>
            <div className={style.TrackDuration}>
              {formatDuration(item.track.duration_ms)}
            </div>
          </div>
        );
      })}
    </section>
  );
};
