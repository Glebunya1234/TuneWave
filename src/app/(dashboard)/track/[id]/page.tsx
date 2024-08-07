"use server";
import style from "./tracks.module.scss";
import Image from "next/image";
import { _getSavedTrackUser, _getToken } from "@/api/ApiSpotify";
import { PanelTarget } from "@/components/UI/Target/PanelTarget";

const Track = async () => {
  return (
    <div className={style.Tracks}>
      <PanelTarget side="Top" />
      <aside className={style.Tracks__Content} id="pageTrack">
        <section className={style.Content__Preview}>
          <div className={style.Preview__image}>
            <Image
              src="/FavoriteTrack.png"
              layout="fill"
              objectFit="cover"
              className={style.mark}
              alt="alt"
            />
          </div>
          <h1>Favorite tracks</h1>
        </section>
      </aside>
      <div className={style.dash}></div>
      <div className={style.squarDash}></div>
      <PanelTarget side="Bottom" />
    </div>
  );
};

export default Track;
