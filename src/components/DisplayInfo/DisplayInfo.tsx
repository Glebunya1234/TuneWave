import style from "./DisplayInfo.module.scss";
import Image from "next/image";
import Link from "next/link";
import { Artist } from "@/types/SpotifyTypes/CurrentlyPlayingTrack/type";
import { Playlist } from "@/types/SpotifyTypes/CurrentlyPlaylist/type";
import { formatDuration } from "@/utils/DurationFormatFunc";
import { OpenInSpotify } from "../UI/Buttons/OpenInSpotifyBtn/OpenInSpotify";

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
  FollowersArtistPage?: boolean;
  FollowersTotal?: number;
  FollowersText?: string;
  hrefSpotify?: string;
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
  FollowersArtistPage,
  FollowersTotal,
  FollowersText,
  Total,
  hrefSpotify,
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
              alt=""
            />
          </div>
        </div>
        <div className={style.Preview__Info}>
          <h3 className={style.Info__PlaylistType}>{Type}</h3>
          <h1 className={style.Info__PlaylistName}>{Name}</h1>
          <span className={style.Info__Track}>
            {Artists?.map((item) => (
              <>
                <Link href={`/artist/${item.id}`}>
                  <p>{item.name}</p>
                </Link>
                {item !== Artists[Artists.length - 1] && (
                  <span className="mr-[5px]">•</span>
                )}
              </>
            ))}

            {Owner && (
              <>
                <Image
                  src={
                    Owner.UserFullInfo?.images[0]?.url || "/DefaultUserSmall.png"
                  }
                  width={25}
                  height={25}
                  alt="User Image"
                  className={`${style.mask} ${style["mask-parallelogram"]}`}
                />
                <Link
                  target="_blank"
                  href={`https://open.spotify.com/user/${
                    Owner.owner?.id || "spotify"
                  }`}
                >
                  <p className="ml-[5px]">
                    {Owner.UserFullInfo?.display_name || "TuneWave"}
                  </p>
                </Link>
              </>
            )}

            {release_date && (
              <>
                <span className="mr-[5px]">•</span>
                <span className="mr-[5px]">{release_date}</span>
              </>
            )}

            {duration_ms && (
              <>
                <span className="mr-[5px]">•</span>
                <span className="mr-[5px]">{formatDuration(duration_ms)}</span>
              </>
            )}

            {FollowersArtistPage !== undefined && (
              <>
                <span className="mr-[5px]">Followers</span>
              </>
            )}
            {FollowersTotal !== undefined && (
              <>
                <span className="mr-[5px]">•</span>
                <span className="mr-[5px]">
                  {FollowersTotal} {FollowersText}
                </span>
              </>
            )}

            {Total !== undefined && (
              <>
                <span className="mr-[5px]">•</span>
                <span className="mr-[5px]">{Total} Tracks</span>
              </>
            )}

            {hrefSpotify && (
              <>
                <span className="mr-[5px]">•</span>
                <span className="mr-[5px]">
                  <OpenInSpotify
                    href={hrefSpotify}
                    text="Open in Spotify"
                    className="flex flex-row items-center gap-1"
                  />
                </span>
              </>
            )}
          </span>
        </div>
      </section>
      {children}
    </aside>
  );
};
