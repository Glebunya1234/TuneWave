"use server";
import style from "./artist.module.scss";
import Image from "next/image";
import { _getSavedTrackUser, _getToken } from "@/api/ApiSpotify";
import { PanelTarget } from "@/components/UI/Target/PanelTarget";

const artistPage = async ({ params }: { params: { id: string } }) => {
  return (
    <div className={style.Artist}>
      <PanelTarget side="Top" />
      <aside className={style.Artist__Content} id="ArtistPage">
        <section className={style.Content__Preview}>
          <div className={style.Preview__image}>
            <Image
              src="/FavoriteTrack.png"
              layout="fill"
              objectFit="cover"
              className={style.mark}
              alt="ArtistImage"
            />
          </div>
          <h1>Artist Name</h1>
        </section>
      </aside>
      <div className={style.dash}></div>
      <div className={style.squarDash}></div>
      <PanelTarget side="Bottom" />
    </div>
  );
};

export default artistPage;
