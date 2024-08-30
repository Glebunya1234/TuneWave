"use client";

import style from "./PlayingNowTrackArtistList.module.scss";
import type { CurrentlyPlayingTrack } from "@/types/SpotifyTypes/CurrentlyPlayingTrack/type";
import { useContext, useEffect, useRef, useState } from "react";
import { GlobalContext } from "@/Context";
import { _getCurrentlyPlayingTrack } from "@/api/SP-Player/API-SP-Player";
import { useRouter } from "next/navigation";
import { FollowBtn } from "@/components/UI/Buttons/SaveArtistToLibBtn/FollowOrUnArtist";

export const PlayingNowTrackArtistList = () => {
  const [playingTrack, setPlayingTrack] = useState<CurrentlyPlayingTrack>();

  const dataContext = useContext(GlobalContext);
  const router = useRouter();

  useEffect(() => {
    const fetchTrack = async () => {
      const track = await _getCurrentlyPlayingTrack();
      setPlayingTrack(track);
    };

    fetchTrack();
  }, [, dataContext.getStatePlaying]);

  return playingTrack !== undefined || null ? (
    <section className={style.PlayingNowTrackArtistList}>
      <div className={style.PlayingNowTrackArtistList__Content}>
        <span className="mb-[5px] pb-[10px] border-b-[1px] border-white">
          Credits
        </span>
        {playingTrack?.item.artists.map((artist, inx) => (
          <nav key={inx} className={`${style.Content__Credits__Conteiner} `}>
            <span className={style.Item__Credits}>
              <p
                className={style.InfoArtist}
                onClick={() => {
                  router.push(`/artist/${artist.id}`);
                }}
              >
                {artist.name}
              </p>
              <p className={style.ArtistType}>{artist.type}</p>
            </span>
            <FollowBtn
              id={artist.id}
              className={style.Btn}
              isSave={artist.isFollow}
            />
          </nav>
        ))}
      </div>
    </section>
  ) : (
    <></>
  );
};
