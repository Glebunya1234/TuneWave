/* eslint-disable @next/next/no-img-element */
"use client";
import style from "./MediaPlaylist.module.scss";
import Image from "next/image";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import { TbRotate2, TbRotateClockwise } from "react-icons/tb";
import { VscLibrary } from "react-icons/vsc";
import { CurrentlyPlaylist } from "@/types/SpotifyTypes/CurrentlyPlaylist/type";
import { _getCurrentUserPlaylists } from "@/api/ApiSpotify";
const fetcher = () => _getCurrentUserPlaylists();
export const MediaPlaylist = () => {
  const router = useRouter();

  const { data, isLoading, mutate } = useSWR<CurrentlyPlaylist>(
    `https://api.spotify.com/v1/me/playlists`,
    fetcher,
    {
      keepPreviousData: true,
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  );

  return (
    <section className={style.MediaPlaylist}>
      <nav className={style.MediaPlaylist__Nav}>
        <span className={style.Nav__Span}>
          <VscLibrary />
          <p>Media library</p>
        </span>
        <button
          onClick={async () => {
            await mutate();
          }}
          className={style.Nav__Button}
        >
          <TbRotate2 />
        </button>
      </nav>
      <aside className={style.MediaPlaylist__Content}>
        <button
          className={style.Content__items}
          onClick={() => {
            router.push("/collection/tracks");
          }}
        >
          <Image src="/FavoriteTrack.png" width={40} height={40} alt="alt" />
          <div className={style.items__Info}>
            <h1>Favorite Tracks</h1>
          </div>
        </button>
        {isLoading && (
          <div className="w-full h-full flex justify-center items-center">
            <TbRotateClockwise className="animate-spin text-xl" />
          </div>
        )}
        {data?.items?.map((item, index) => (
          <button
            key={index}
            className={style.Content__items}
            onClick={() => {
              router.push(`/playlist/${item.id}`);
            }}
          >
            <div className={style.item__img}>
              <img
                src={item.images[0]?.url || "/FavoriteTrack.png"}
                className={style.img}
                alt="alt"
              />
            </div>
            <div className={style.items__Info}>
              <h1>{item.name}</h1>
              <div>
                <span className="mr-[5px]">{item.type}</span>
                <span className="mr-[5px]">•</span>
                {item.owner.display_name}
              </div>
            </div>
          </button>
        )) || <></>}
      </aside>
    </section>
  );
};
