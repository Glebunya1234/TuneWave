"use server";
import style from "./album.module.scss";
import Image from "next/image";
import { _getSavedTrackUser, _getToken } from "@/api/ApiSpotify";
import { PanelTarget } from "@/components/UI/Target/PanelTarget";
import { FavoriteTrackComponent } from "@/components/Content/FavoriteTrackComponent/FavoriteTrackConteiner";

const albumPage = async () => {
  return (
    <div className={style.Album}>
      <PanelTarget side="Top" />
      <aside className={style.Album__Content} id="AlbumPage">
        <section className={style.Content__Preview}>
          <div className={style.Preview__image}>
            <Image
              src="/FavoriteTrack.png"
              layout="fill"
              objectFit="cover"
              className={style.mark}
              alt="AlbumImage"
            />
          </div>
          <h1>Album name</h1>
        </section>
      </aside>
      <div className={style.dash}></div>
      <div className={style.squarDash}></div>
      <PanelTarget side="Bottom" />
    </div>
  );
};

export default albumPage;
