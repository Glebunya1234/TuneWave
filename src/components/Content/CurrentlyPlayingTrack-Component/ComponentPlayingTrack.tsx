"use client";
import Image from "next/image";
import style from "./ComponentPlayingTrack.module.scss";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import { GlobalContext } from "@/Context";
import { _getCurrentlyPlayingTrack } from "@/api/SP-Player/API-SP-Player";
import { getArtistId } from "@/utils/CutedIdArtist";

export const ComponentPlayingTrack = () => {
  const [getCurrentTrack, setCurrentTrack] = useState<Spotify.Track>();
  const [titleOverflow, setTitleOverflow] = useState<number>(0);
  const [artistsOverflow, setArtistsOverflow] = useState<number>(0);
  const containerRef = useRef<HTMLSpanElement>(null);
  const dataContext = useContext(GlobalContext);
  const router = useRouter();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const artistsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentTrack(dataContext?.getCurrentPlaying?.current_track);
  }, [dataContext?.getCurrentPlaying]);

  useEffect(() => {
    const updateOverflow = () => {
      if (titleRef.current && artistsRef.current && containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const titleWidth = titleRef.current.scrollWidth;
        const artistsWidth = artistsRef.current.scrollWidth;

        if (containerWidth < titleWidth) {
          setTitleOverflow(titleWidth - containerWidth);
        } else {
          setTitleOverflow(0);
        }
        if (containerWidth < artistsWidth) {
          setArtistsOverflow(artistsWidth - containerWidth);
        } else {
          setArtistsOverflow(0);
        }
      }
    };

    updateOverflow();
    window.addEventListener("resize", updateOverflow);

    return () => {
      window.removeEventListener("resize", updateOverflow);
    };
  }, [getCurrentTrack, dataContext?.getCurrentPlaying?.current_track?.id]);

  return getCurrentTrack !== undefined || null ? (
    <section className={style.Content__Preview}>
      <div className={style.Preview__image}>
        <Image
          src={getCurrentTrack?.album?.images[0]?.url || "/FavoriteTrack.png"}
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
            router.push(`/track/${getCurrentTrack?.id}`);
          }}
        >
          {getCurrentTrack?.name || "Tunewave"}
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
          {getCurrentTrack?.artists?.map((artist, inx) => (
            <p
              key={inx}
              onClick={() => {
                router.push(`/artist/${getArtistId(artist.url)}`);
              }}
            >
              {artist.name}
              {getCurrentTrack?.artists.length === inx + 1 ? (
                <></>
              ) : (
                <p className="pr-[5px]">,</p>
              )}
            </p>
          )) || (
            <nav className={style.Span__Nav}>
              <p>By Glebunya</p>
            </nav>
          )}
        </nav>
      </span>
    </section>
  ) : (
    <></>
  );
};
