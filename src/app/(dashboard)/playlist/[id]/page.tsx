"use server";
import style from "./playlist.module.scss";
import Image from "next/image";
import {
  _getSavedTrackUser,
  _getToken,
  getRecommendations,
} from "@/api/ApiSpotify";
import { PanelTarget } from "@/components/UI/Target/PanelTarget";
import { FavoriteTrackComponent } from "@/components/Content/FavoriteTrackComponent/FavoriteTrackConteiner";
import Link from "next/link";
import { RandomPlaylistComponent } from "@/components/Content/Mix/RandomPlaylist-Component/RandomPlaylist";

const playlistPage = async ({ params }: { params: { id: string } }) => {
  let UserAllRecs;
  let NamePlayList;
  if (params.id.includes("randomlist")) {
    NamePlayList = "random playlist";
    UserAllRecs = await getRecommendations();
  }

  return (
    <div className={style.Playlist}>
      <PanelTarget side="Top" />
      <aside className={style.Playlist__Content} id="PlaylistPage">
        <section className={style.Content__Preview}>
          <div className={style.Preview__image}>
            <div className={style.Images}>
              <Image
                src={"/FavoriteTrack.png"}
                layout="fill"
                objectFit="cover"
                className={style.mark}
                alt="PlaylistImage"
              />
            </div>
          </div>
          <div className={style.Preview__Info}>
            <h3 className={style.Info__PlaylistType}>Playlist</h3>
            <h1 className={style.Info__PlaylistName}>{NamePlayList}</h1>
          </div>
        </section>
        {params.id.includes("randomlist") ? (
          <RandomPlaylistComponent data={UserAllRecs} />
        ) : (
          <></>
        )}
      </aside>
      <div className={style.dash}></div>
      <div className={style.squarDash}></div>
      <PanelTarget side="Bottom" />
    </div>
  );
};

export default playlistPage;
