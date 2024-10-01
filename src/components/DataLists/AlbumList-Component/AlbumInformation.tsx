"use client";

import style from "./AlbumInformation.module.scss";
import Link from "next/link";

import { CurrentlyAlbum } from "@/types/SpotifyTypes/CurrentlyAlbum/type";
import { formatDuration } from "@/utils/DurationFormatFunc";
import { IoTimerSharp } from "react-icons/io5";
import { PlayTrackBtn } from "@/components/UI/Buttons/PlayTrackBtn/PlayTrackBtn";
import { BsFillPlayFill } from "react-icons/bs";
import { SaveTrackBtn } from "@/components/UI/Buttons/SaveTrackToLibBtn/SaveTrack";
import { TrackItem } from "@/types/SpotifyTypes/CurrentlyPlayingTrack/type";
import { OpenInSpotify } from "@/components/UI/Buttons/OpenInSpotifyBtn/OpenInSpotify";

export const AlbumInformation = ({
  data,
  showSaved,
}: {
  showSaved?: boolean;
  data: TrackItem[];
}) => {
  return (
    <section className={style.AlbumInformation}>
      <aside
        className={`${style.Playlist__Track} border-[#c1c0c5]  border-b-[1px]`}
      >
        <span className={style.TrackIndex}>#</span>
        <span className={style.TrackInfo}>Name</span>
        <span>
          <IoTimerSharp className="mr-[11px]" />
        </span>
      </aside>
      {data !== undefined ? (
        data.map((item, index) => {
          return (
            <div
              key={`${item.id} - ${index}`}
              className={style.Playlist__Track}
            >
              <PlayTrackBtn
                id={item.id}
                text={index + 1}
                onHover={{
                  isTrue: true,
                  content: (
                    <BsFillPlayFill className="pl-[3px] text-xl text-center" />
                  ),
                }}
                className={style.TrackIndex}
              />

              <div className={style.TrackInfo}>
                <div className={style.TrackName}>
                  <Link href={`/track/${item.id}`}>
                    <p>{item.name}</p>
                  </Link>
                </div>
                <div className={style.TrackArtist}>
                  {item.artists.map((artist, id) => (
                    <Link
                      key={`${artist.id} - ${id}`}
                      href={`/artist/${artist.id}`}
                    >
                      <p>{artist.name}</p>
                    </Link>
                  ))}
                </div>
              </div>
              <div className={style.TrackDuration}>
                <OpenInSpotify
                  href={item?.external_urls?.spotify}
                  className="flex flex-row items-center"
                />
              </div>
              {showSaved && (
                <div className={style.TrackDuration}>
                  <SaveTrackBtn
                    id={item.id}
                    isPage={true}
                    isSave={item.isSaved}
                  />
                </div>
              )}

              <div className={style.TrackDuration}>
                {formatDuration(item.duration_ms)}
              </div>
            </div>
          );
        })
      ) : (
        <p>album not found</p>
      )}
    </section>
  );
};
