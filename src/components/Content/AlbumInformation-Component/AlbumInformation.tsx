"use server";

import style from "./AlbumInformation.module.scss";

import { CurrentlyAlbum } from "@/types/SpotifyTypes/CurrentlyAlbum/type";
import { formatDuration } from "@/utils/DurationFormatFunc";
import Link from "next/link";
import { IoTimerSharp } from "react-icons/io5";

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
              <div
                className={style.TrackIndex}
                key={index}
                //   onMouseEnter={() => handleMouseEnter(index)}
                //   onMouseLeave={() => handleMouseLeave(index)}
                //   onClick={() => {
                //     Play(item.track.uri);
                //   }}
              >
                {/* {hoverStates[index] ? (
                <BsFillPlayFill className="pl-[3px] text-xl text-center" />
                ) : ( */}
                {/* )} */}
                {index + 1}
              </div>

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
