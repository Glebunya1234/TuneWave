"use client";
import style from "./MediaPlaylist.module.scss";
import Image from "next/image";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import { TbRotate2 } from "react-icons/tb";
import { VscLibrary } from "react-icons/vsc";
import { CurrentlyPlaylist } from "@/types/SpotifyTypes/CurrentlyPlaylist/type";

import { _getCurrentUserPlaylists } from "@/api/SP-Playlists/API-SP-Playlists";
export const fetcherGetCurrentUserPlaylist = () => _getCurrentUserPlaylists(50);
export const MediaPlaylist = () => {
  const router = useRouter();

  const { data, isLoading, mutate } = useSWR<CurrentlyPlaylist>(
    `FollowedPlaylists`,
    fetcherGetCurrentUserPlaylist,
    {
      keepPreviousData: true,
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  );
  const divs = Array.from({ length: 5 });
  return (
    <section className={style.MediaPlaylist}>
      <nav className={style.MediaPlaylist__Nav}>
        <span className={style.Nav__Span}>
          <VscLibrary />
          <p
            onClick={() => {
              router.push("/section/FollowedPlaylists");
            }}
          >
            Media library
          </p>
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
        {isLoading &&
          divs.map((_, index) => (
            <div key={index} className={style.Content__items}>
              <div className="animate-pulse min-w-[40px] h-[40px] ml-[2px]">
                <div className=" w-full h-full  bg-[#4e4e4e] "></div>
              </div>

              <div className="space-y-3 w-full  pl-2 animate-pulse">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2  bg-[#4e4e4e] rounded col-span-2"></div>
                </div>
                <div className="h-2  bg-[#4e4e4e]  rounded"></div>
              </div>
            </div>
          ))}

        {data?.items?.slice(0, 15).map((item, index) => (
          <button
            key={index}
            className={style.Content__items}
            onClick={() => {
              router.push(`/playlist/list${item.id}?id=${item.id}`);
            }}
          >
            <div className={style.item__img}>
              <Image
                src={item.images[0]?.url || "/FavoriteTrack.png"}
                // className={style.img}
                layout="fill"
                objectFit="cover"
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
