"use server";
import style from "./TrackContent.module.scss";
import Image from "next/image";
import { CurrentlyTrack } from "@/types/SpotifyTypes/CurrentlyTrack/type";
import { TrackArtist } from "@/types/SpotifyTypes/TrackArtist/type";

import Link from "next/link";
import { PlayTrackBtn } from "@/components/UI/Buttons/PlayTrackBtn/PlayTrackBtn";
import { SaveTrackBtn } from "@/components/UI/Buttons/SaveTrackToLibBtn/SaveTrack";
export const TrackComponent = async ({
  data,
  isSaved,
  artist,
}: {
  data: CurrentlyTrack;
  isSaved: boolean;
  artist: TrackArtist[];
}) => {
  return (
    <section className={`${style.TrackComponent}`}>
      <nav
        className={`${style.TrackComponent__NavPanel} border-[#c1c0c5]  border-b-[1px]`}
      >
        <PlayTrackBtn
          id={data.id}
          onHover={{ isTrue: false }}
          text={"Play"}
          className={style.NavPanel__PlayTrackBtn}
        />
        <SaveTrackBtn
          id={data.id}
          isSave={isSaved}
          className={style.NavPanel__SaveTrackBtn}
        />
      </nav>
      <aside className={`${style.TrackComponent__Information}`}>
        <div className={style.Information__Conteiner}>
          {artist.map((artists, index) => {
            return (
              <Link
                href={`/artist/${artists.id}`}
                className={style.Information__Artist}
                key={index}
              >
                <Image
                  width={80}
                  height={80}
                  src={
                    artists?.images[0]?.url !== undefined
                      ? artists.images[0].url
                      : "/FavoriteTrack.png"
                  }
                  alt={artists.id}
                  className={style.mark}
                ></Image>
                <p> {artists.name}</p>
              </Link>
            );
          })}
        </div>
      </aside>
    </section>
  );
};
