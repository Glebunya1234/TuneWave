"use server";

import style from "./AlbumInformation.module.scss";
import Link from "next/link";

import { CurrentlyAlbum } from "@/types/SpotifyTypes/CurrentlyAlbum/type";
import { formatDuration } from "@/utils/DurationFormatFunc";
import { IoTimerSharp } from "react-icons/io5";
import { PlayTrackBtn } from "@/components/UI/Buttons/PlayTrackBtn/PlayTrackBtn";
import { BsFillPlayFill } from "react-icons/bs";
import { SaveTrackBtn } from "@/components/UI/Buttons/SaveTrackToLibBtn/SaveTrack";

export const AlbumInformation = async ({ data }: { data: CurrentlyAlbum }) => {
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
      {data?.tracks?.items !== undefined ? (
        data.tracks.items.map((item, index) => {
          return (
            <div key={index} className={style.Playlist__Track}>
              <PlayTrackBtn
                key={index}
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
                  {item.artists.map((artist) => (
                    <Link key={index} href={`/artist/${artist.id}`}>
                      <p key={artist.name}>{artist.name}</p>
                    </Link>
                  ))}
                </div>
              </div>
              <div className={style.TrackDuration}>
                <SaveTrackBtn id={item.id} isSave={item.isSaved} />
              </div>
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
