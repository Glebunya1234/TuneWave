"use server";
import style from "./tracks.module.scss";
import Image from "next/image";
import { _getSavedTrackUser, _getToken } from "@/api/ApiSpotify";
import { PanelTarget } from "@/components/UI/Target/PanelTarget";
import { FavoriteTrackComponent } from "@/components/Content/FavoriteTrackComponent/FavoriteTrackConteiner";

const tracks = async () => {
  return (
    <div className={style.Tracks}>
      <PanelTarget side="Top" />
      <aside className={style.Tracks__Content} id="FavoriteContent">
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
        <FavoriteTrackComponent />
      </aside>
      <div className={style.dash}></div>
      <div className={style.squarDash}></div>
      <PanelTarget side="Bottom" />
    </div>
  );
};

export default tracks;
