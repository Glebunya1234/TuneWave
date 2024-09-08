"use client";
import style from "./Bottom-side-bar.module.scss";
import React, { useContext, useEffect, useState } from "react";
import { SpotifyPlayer } from "@/components/UI/Player/Player";
import Marquee from "@/components/UI/Marquee/Sound-Marquee/marquee";
import { test } from "@/api/SP-Tokens/API-SP-Tokens";
import { GlobalContext } from "@/Context";

export const SoundBar = () => {
  const [token, setToken] = useState<string | null>(null);
  const [getCurrentNameTrack, setCurrentNameTrack] =
    useState<string>("tunewave");
  const dataContext = useContext(GlobalContext);
  useEffect(() => {
    const fetchToken = async () => {
      const fetchedToken = await test();

      setToken(fetchedToken);
    };
    fetchToken();
  }, []);
  useEffect(() => {
    setCurrentNameTrack(dataContext?.getCurrentPlaying?.current_track?.name);
  }, [dataContext?.getCurrentPlaying]);

  return (
    <section className={style.NavigationBar}>
      <div className={style.NavigationBar__MarqueeConteiner}>
        <Marquee
          text={
            getCurrentNameTrack === undefined ? "tunewave" : getCurrentNameTrack
          }
        />
      </div>
      <nav className={style.Player}>
        {token ? <SpotifyPlayer token={token} /> : <p>Loading...</p>}
      </nav>
    </section>
  );
};
