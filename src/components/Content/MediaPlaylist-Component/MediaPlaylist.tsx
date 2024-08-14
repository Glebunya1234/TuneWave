/* eslint-disable @next/next/no-img-element */
"use client";
import style from "./MediaPlaylist.module.scss";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TbRotate2 } from "react-icons/tb";
import { VscLibrary } from "react-icons/vsc";
import { CurrentlyPlaylist } from "@/types/SpotifyTypes/CurrentlyPlaylist/type";
import { _getCurrentUserPlaylists } from "@/api/ApiSpotify";

export const MediaPlaylist = () => {
  const [getPlaylist, setPlaylist] = useState<CurrentlyPlaylist>();
  const [updateState, setUpdateState] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetch = async () => {
      setPlaylist(await _getCurrentUserPlaylists());
      setUpdateState(false);
    };
    fetch();
  }, [, updateState]);
  return (
    <section className={style.MediaPlaylist}>
      <nav className={style.MediaPlaylist__Nav}>
        <span className={style.Nav__Span}>
          <VscLibrary />
          <p>Media library</p>
        </span>
        <button className={style.Nav__Button}>
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
        {getPlaylist?.items?.map((item, index) => (
          <button
            key={index}
            className={style.Content__items}
            onClick={() => {
              router.push(`/artist/${item.id}`);
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
