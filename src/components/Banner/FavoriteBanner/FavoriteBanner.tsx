"use client";
import style from "./FavoriteBanner.module.scss";
import Image from "next/image";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import { CurrentlyPlaylist } from "@/types/SpotifyTypes/CurrentlyPlaylist/type";
import { fetcherGetCurrentUserPlaylist } from "@/components/Content/MediaPlaylist-Component/MediaPlaylist";

export const FavoriteBanner = () => {
  const router = useRouter();

  const { data, isLoading, mutate } = useSWR<CurrentlyPlaylist>(
    `https://api.spotify.com/v1/me/playlists`,
    fetcherGetCurrentUserPlaylist,
    {
      keepPreviousData: true,
      revalidateOnFocus: false,
    }
  );
  const divs = Array.from({ length: 5 });
  return (
    <aside className={style.FavoriteBanner}>
      <nav className={style.FavoriteBanner__Nav}>
        <button
          className={style.Btn__Left}
          onClick={() => {
            router.push("/collection/tracks");
          }}
        >
          <Image src="/FavoriteTrack.png" width={40} height={40} alt="alt" />
          <h1>Favorite tracks</h1>
        </button>
        {isLoading &&
          divs.map((_, index) => (
            <div
              key={index}
              className={
                index === 0 || index === 3
                  ? style.Btn__Center
                  : index === 1 || index === 4
                  ? style.Btn__Right
                  : style.Btn__Left
              }
            >
              <div className="animate-pulse min-w-[40px] h-[40px] ml-[2px]">
                <div className=" w-full h-full  bg-[#4e4e4e] "></div>
              </div>
              <h1>
                <div className="space-y-3 pr-5 pl-2 animate-pulse">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-2  bg-[#4e4e4e] rounded col-span-2"></div>
                    <div className="h-2  bg-[#4e4e4e]  rounded col-span-1"></div>
                  </div>
                  <div className="h-2  bg-[#4e4e4e]  rounded"></div>
                </div>
              </h1>
            </div>
          ))}
        {data?.items! !== undefined ? (
          data?.items.slice(0, 5).map((item, index) => {
            return (
              <button
                key={index}
                onClick={() => {
                  router.push(`/playlist/list${item.id}?id=${item.id}`);
                }}
                className={
                  index === 0 || index === 3
                    ? style.Btn__Center
                    : index === 1 || index === 4
                    ? style.Btn__Right
                    : style.Btn__Left
                }
              >
                <div className={style.item__img}>
                  <Image
                    src={item.images[0]?.url || "/FavoriteTrack.png"}
                    layout="fill"
                    objectFit="cover"
                    alt="alt"
                  />
                </div>
                <h1>{item.name}</h1>
              </button>
            );
          })
        ) : (
          <></>
        )}

        {/* <button className={style.Btn__Center}>
          <Image
            src="https://i.scdn.co/image/ab6761610000e5eb7ff08b2df89c415997a91aff"
            width={40}
            height={40}
            alt="alt"
            className={`${style.mask} ${style["mask-parallelogram"]}`}
          />
          <h1>ROMES</h1>
        </button>

        <button className={style.Btn__Right}>
          <Image
            src="https://i.scdn.co/image/ab6761610000e5eb7ff08b2df89c415997a91aff"
            width={40}
            height={40}
            alt="alt"
            className={`${style.mask} ${style["mask-parallelogram"]}`}
          />
          <h1> Snakes (from the series Arcane League of Legends)</h1>
        </button>
        <button className={style.Btn__Left}>
          <Image
            src="https://i.scdn.co/image/ab6761610000e5eb7ff08b2df89c415997a91aff"
            width={40}
            height={40}
            alt="alt"
          />
          <h1>The Days Grace - Pain</h1>
        </button>
        <button className={style.Btn__Center}>
          <Image
            src="https://i.scdn.co/image/ab6761610000e5eb7ff08b2df89c415997a91aff"
            width={40}
            height={40}
            alt="alt"
            className={`${style.mask} ${style["mask-parallelogram"]}`}
          />
          <h1>Need for Speed Unbound</h1>
        </button>

        <button className={style.Btn__Right}>
          <Image
            src="https://i.scdn.co/image/ab6761610000e5eb7ff08b2df89c415997a91aff"
            width={40}
            height={40}
            alt="alt"
            className={`${style.mask} ${style["mask-parallelogram"]}`}
          />
          <h1>Need for Speed Unbound</h1>
        </button> */}
      </nav>
    </aside>
  );
};
