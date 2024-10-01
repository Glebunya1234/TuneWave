"use client";
import style from "@/components/DataLists/FavoriteTracksList-Component/FavoriteTrackComponent.module.scss";
import Image from "next/legacy/image";
import Link from "next/link";
import { BsFillPlayFill } from "react-icons/bs";
import { PlayTrackBtn } from "@/components/UI/Buttons/PlayTrackBtn/PlayTrackBtn";
import { formatDuration } from "@/utils/DurationFormatFunc";
import { _isCurrentlyPlaylistTracksItem } from "@/utils/TypeOfCustom/TypeOfCustom";
import { SearchTracks } from "@/types/SpotifyTypes/SearchType/SearchType";
import { SaveTrackBtn } from "@/components/UI/Buttons/SaveTrackToLibBtn/SaveTrack";
import { OpenInSpotify } from "@/components/UI/Buttons/OpenInSpotifyBtn/OpenInSpotify";

export const BestTracks = ({ data }: { data?: SearchTracks }) => {
  return (
    <section className={`${style.Content__playlist} mt-5`}>
      {data?.items?.slice(0, 4).map((item, index) => (
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
            <Image
              src={item?.album?.images[0]?.url || "/FavoriteTrack.png"}
              alt={item?.album?.name}
              layout="fill"
              className={style.AlbumImage}
            />
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
          <Link href={`/album/${item?.album?.id}`} className={style.TrackAlbum}>
            <p>{item?.album?.name}</p>
          </Link>
          <div className={style.TrackDuration}>
            <OpenInSpotify
              href={item?.external_urls?.spotify}
              className="flex flex-row items-center"
            />
          </div>
          <div className={style.TrackDuration}>
            <SaveTrackBtn id={item.id} isSave={item.isSaved} isPage={true} />
          </div>
          <div className={style.TrackDuration}>
            {formatDuration(item.duration_ms)}
          </div>
        </div>
      ))}
    </section>
  );
};
