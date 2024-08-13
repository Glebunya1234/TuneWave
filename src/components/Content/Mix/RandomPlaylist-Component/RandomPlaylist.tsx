"use server";
import style from "@components/Content/FavoriteTrackComponent/FavoriteTrackComponent.module.scss";
import Image from "next/legacy/image";
import { _setPlayTrack, _getSavedTrackUser, _getToken } from "@/api/ApiSpotify";
import { formatDuration } from "@/utils/DurationFormatFunc";
import { Suspense } from "react";

import { IoTimerSharp } from "react-icons/io5";
import { RecommendationsType } from "@/types/SpotifyTypes/RecommendationsType/type";
import Link from "next/link";
import { PlayTrackBtn } from "@/components/UI/Buttons/PlayTrackBtn/PlayTrackBtn";
import { BsFillPlayFill } from "react-icons/bs";
import { FiSave } from "react-icons/fi";
import { SaveTrackBtn } from "@/components/UI/Buttons/SaveTrackToLibBtn/SaveTrack";

export const RandomPlaylistComponent = async ({
  data,
}: {
  data?: RecommendationsType;
}) => {
  return (
    <Suspense fallback={<h2>🌀 Loading...</h2>}>
      <section className={`${style.Content__playlist}`}>
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
        {data?.tracks.map((item, index) => {
          const albumImageUrl =
            item.album.images.length > 0 ? item.album.images[0].url : "";

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
