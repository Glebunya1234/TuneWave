"use client";
import Image from "next/image";
import style from "./ComponentPlayingTrack.module.scss";
import type { CurrentlyPlayingTrack } from "@/types/SpotifyTypes/CurrentlyPlayingTrack/type";
import { useContext, useEffect, useRef, useState } from "react";
import { GlobalContext } from "@/Context";
import { _getCurrentlyPlayingTrack } from "@/api/SP-Player/API-SP-Player";
import { useRouter } from "next/navigation";

export const ComponentPlayingTrack = () => {
  const [playingTrack, setPlayingTrack] = useState<CurrentlyPlayingTrack>();

  const [titleOverflow, setTitleOverflow] = useState<number>(0);
  const [artistsOverflow, setArtistsOverflow] = useState<number>(0);
  const containerRef = useRef<HTMLSpanElement>(null);
  const dataContext = useContext(GlobalContext);
  const router = useRouter();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const artistsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const fetchTrack = async () => {
      const track = await _getCurrentlyPlayingTrack();

      setPlayingTrack(track);
    };

    fetchTrack();
  }, [, dataContext.getStatePlaying]);
  useEffect(() => {
    const updateOverflow = () => {
      if (titleRef.current && artistsRef.current && containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const titleWidth = titleRef.current.scrollWidth;
        const artistsWidth = artistsRef.current.scrollWidth;

        if (containerWidth < titleWidth) {
          setTitleOverflow(titleWidth - containerWidth);
        }
        if (containerWidth < artistsWidth) {
          setArtistsOverflow(artistsWidth - containerWidth);
        }
      }
    };

    updateOverflow();
    window.addEventListener("resize", updateOverflow);

    return () => {
      window.removeEventListener("resize", updateOverflow);
    };
  }, [playingTrack]);

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
      <span className={style.Preview__Span} ref={containerRef}>
        <h1
          ref={titleRef}
          style={
            {
              "--text-overflow": `${titleOverflow + 20}px`,
            } as React.CSSProperties
          }
          className={titleOverflow ? style.marquee : ""}
          onClick={() => {
            router.push(`/track/${playingTrack?.item.id}`);
          }}
        >
          {playingTrack?.item?.name || "Tunewave"}
        </h1>
        <nav
          ref={artistsRef}
          style={
            {
              "--text-overflow": `${artistsOverflow + 30}px`,
            } as React.CSSProperties
          }
          className={`${style.Span__Nav} ${
            artistsOverflow ? style.marquee : ""
          }`}
        >
          {playingTrack?.item.artists.map((artist, inx) => (
            <p
              key={inx}
              onClick={() => {
                router.push(`/artist/${artist.id}`);
              }}
            >
              {artist.name}
              {playingTrack?.item.artists.length === inx + 1 ? (
                <></>
              ) : (
                <p className="pr-[5px]">,</p>
              )}
            </p>
          )) || "By Glebunya"}
        </nav>
      </span>
    </section>
  ) : (
    <></>
  );
};
