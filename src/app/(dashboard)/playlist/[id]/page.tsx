"use server";
import style from "./playlist.module.scss";
import Image from "next/image";
import { _getSavedTrackUser, _getToken } from "@/api/ApiSpotify";
import { PanelTarget } from "@/components/UI/Target/PanelTarget";
import { FavoriteTrackComponent } from "@/components/Content/FavoriteTrackComponent/FavoriteTrackConteiner";

const playlistPage = async ({ params }: { params: { id: string } }) => {
  return (
    <div className={style.Playlist}>
      <PanelTarget side="Top" />
      <aside className={style.Playlist__Content} id="PlaylistPage">
        <section className={style.Content__Preview}>
          <div className={style.Preview__image}>
            <Image
              src="/FavoriteTrack.png"
              layout="fill"
              objectFit="cover"
              className={style.mark}
              alt="PlaylistImage"
            />
          </div>
          <h1>Playlist Name</h1>
        </section>
        
      </aside>
      <div className={style.dash}></div>
      <div className={style.squarDash}></div>
      <PanelTarget side="Bottom" />
    </div>
  );
};

export default playlistPage;
