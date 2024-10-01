"use client";
import style from "./MediaPlaylist.module.scss";
import Image from "next/image";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import { TbRotate2 } from "react-icons/tb";
import { VscLibrary } from "react-icons/vsc";
import { CurrentlyPlaylist } from "@/types/SpotifyTypes/CurrentlyPlaylist/type";

import { _getCurrentUserPlaylists } from "@/api/SP-Playlists/API-SP-Playlists";
import { ButtonSkeleton } from "@/components/UI/Skeleton/Button-Skeleton/ButtonSkeleton";
import { SavedAlbums } from "@/types/SpotifyTypes/CurrentlyAlbum/type";
import { _getSavedAlbums } from "@/api/SP-Albums/API-SP-Albums";
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
  const { data: dataAlbum, isLoading: isLoadingAlbums } = useSWR<SavedAlbums>(
    `FollowedAlbum`,
    async () => await _getSavedAlbums(),
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  );
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
        {isLoading && (
          <ButtonSkeleton className={style.Content__items} arrayLength={8} />
        )}

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
                layout="fill"
                objectFit="cover"
                alt="alt"
              />
            </div>
            <div className={style.items__Info}>
              <h1>{item.name}</h1>
              <div>
                <span className="mr-[5px] capitalize">{item.type}</span>
                <span className="mr-[5px]">•</span>
                {item.owner.display_name}
              </div>
            </div>
          </button>
        )) || <></>}
        {isLoadingAlbums && (
          <ButtonSkeleton className={style.Content__items} arrayLength={8} />
        )}
        {dataAlbum?.items?.slice(0, 15).map((it, ind) => (
          <button
            key={ind}
            className={style.Content__items}
            onClick={() => {
              router.push(`/album/${it.album.id}`);
            }}
          >
            <div className={style.item__img}>
              <Image
                src={
                  it.album.images[0]?.url === undefined
                    ? "/FavoriteTrack.png"
                    : it.album.images[0]?.url
                }
                layout="fill"
                objectFit="cover"
                alt="alt"
              />
            </div>
            <div className={style.items__Info}>
              <h1>{it.album.name}</h1>
              <div>
                <span className="mr-[5px] capitalize">{it.album.type}</span>
                <span className="mr-[5px]">•</span>
                {it.album.artists[0].name}
              </div>
            </div>
          </button>
        )) || <></>}
      </aside>
    </section>
  );
};
