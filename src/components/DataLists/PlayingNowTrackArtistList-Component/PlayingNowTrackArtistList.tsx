"use client";

import style from "./PlayingNowTrackArtistList.module.scss";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { FollowBtn } from "@/components/UI/Buttons/SaveArtistToLibBtn/FollowOrUnArtist";
import { OpenInSpotify } from "@/components/UI/Buttons/OpenInSpotifyBtn/OpenInSpotify";
import { _getCurrentlyPlayingTrack } from "@/api/SP-Player/API-SP-Player";
import { _CheckIsFollowArtist } from "@/api/SP-Users/API-SP-Users";
import type { CurrentlyPlayingTrack } from "@/types/SpotifyTypes/CurrentlyPlayingTrack/type";
import { GlobalContext } from "@/Context";

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
  }, [dataContext.getCurrentPlaying?.current_track?.id]);

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
      <OpenInSpotify
        href={`${playingTrack?.item.external_urls.spotify}`}
        text="Open in Spotify"
        className={style.OpenSpotifyBtn}
      />
    </section>
  ) : (
    <></>
  );
};
