"use client";
import Image from "next/image";
import style from "./ComponentPlayingTrack.module.scss";
import type { CurrentlyPlayingTrack } from "@/types/SpotifyTypes/CurrentlyPlayingTrack/type";
import { useContext, useEffect, useState } from "react";
import { _getCurrentlyPlayingTrack } from "@/api/ApiSpotify";
import { GlobalContext } from "@/Context";

export const ComponentPlayingTrack = () => {
  const [playingTrack, setPlayingTrack] = useState<CurrentlyPlayingTrack>();
  const dataContext = useContext(GlobalContext);

  useEffect(() => {
    const fetchTrack = async () => {
      const track = await _getCurrentlyPlayingTrack();
      setPlayingTrack(track);
      console.log("playingTrack", track);
    };

    fetchTrack();
  }, [, dataContext.getStatePlaying]);
  return playingTrack !== undefined || null ? (
    <section className={style.Content__Preview}>
      <div className={style.Preview__image}>
        <Image
          src={playingTrack?.item?.album.images[0].url || "/FavoriteTrack.png"}
          layout="fill"
          objectFit="cover"
          className={style.image}
          alt="alt"
        />
      </div>
      <span className={style.Preview__Span}>
        <h1>{playingTrack?.item?.name || "Tunewave"}</h1>
        <p>
          {playingTrack?.item.artists.map((artist) => artist.name).join(", ") ||
            "By Glebunya"}
        </p>
      </span>
    </section>
  ) : (
    <></>
  );
};
