import style from "./DisplayInfo.module.scss";
import Image from "next/image";
import Link from "next/link";
import { ReactElement } from "react";
import { Artist } from "@/types/SpotifyTypes/CurrentlyPlayingTrack/type";
import { Playlist } from "@/types/SpotifyTypes/CurrentlyPlaylist/type";
import { formatDuration } from "@/utils/DurationFormatFunc";

type InfoType = {
  children: React.ReactNode;
  idForScroll: string;
  ImageSrc: string;
  Type: string;
  Name: string;
  Owner?: Playlist;
  Artists?: Artist[];
  duration_ms?: number;
  release_date?: string;
  Total?: number;
  FollowersTotal?: number;
};
export const DisplayInfo = ({
  children,
  ImageSrc,
  Name,
  Owner,
  idForScroll,
  Type,
  Artists,
  release_date,
  duration_ms,
  FollowersTotal,
  Total,
}: InfoType) => {
  return (
    <aside className={style.DisplayInfo__Content} id={`${idForScroll}`}>
      <section className={style.Content__Preview}>
        <div className={style.Preview__image}>
          <div className={style.Images}>
            <Image
              src={ImageSrc}
              layout="fill"
              objectFit="cover"
              className={style.mark}
              alt="PlaylistImage"
            />
          </div>
        </div>
        <div className={style.Preview__Info}>
          <h3 className={style.Info__PlaylistType}>{Type}</h3>
          <h1 className={style.Info__PlaylistName}>{Name}</h1>
          <span className={style.Info__Track}>
            {Artists !== undefined ? (
              Artists.map((item, index) => {
                return (
                  <>
                    <Link href={`/artist/${item.id}`} key={index}>
                      <p> {item.name}</p>
                    </Link>
                    {Artists.length !== index + 1 ? (
                      <span className="mr-[5px]">•</span>
                    ) : (
                      <></>
                    )}
                  </>
                );
              })
            ) : (
              <></>
            )}
            {Owner !== undefined ? (
              <>
                <Image
                  src={
                    Owner.UserFullInfo?.images[0]?.url !== undefined
                      ? Owner.UserFullInfo.images[0].url
                      : "/FavoriteTrack.png"
                  }
                  width={25}
                  height={25}
                  alt="Arrow2"
                  className={`${style.mask} ${style["mask-parallelogram"]}`}
                />
                <Link href={`/user/${Owner.owner?.id || "spotify"}`}>
                  <p className="ml-[5px]">
                    {Owner.UserFullInfo?.display_name || "TuneWave"}
                  </p>
                </Link>
              </>
            ) : (
              <></>
            )}
            {release_date !== undefined ? (
              <>
                <span className="mr-[5px]">•</span>
                <span className="mr-[5px]">{release_date}</span>
              </>
            ) : (
              <></>
            )}
            {duration_ms !== undefined ? (
              <>
                <span className="mr-[5px]">•</span>
                <span className="mr-[5px]">{formatDuration(duration_ms)}</span>
              </>
            ) : (
              <></>
            )}
            {FollowersTotal !== undefined ? (
              <>
                <span className="mr-[5px]">•</span>
                <span className="mr-[5px]">{FollowersTotal} Saves</span>
              </>
            ) : (
              <></>
            )}
            {Total !== undefined ? (
              <>
                <span className="mr-[5px]">•</span>
                <span className="mr-[5px]">{Total} Tracks</span>
              </>
            ) : (
              <></>
            )}
          </span>
        </div>
      </section>
      {children}
    </aside>
  );
};
