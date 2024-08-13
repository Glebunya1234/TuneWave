"use server";
import style from "./playlist.module.scss";
import Image from "next/image";
import {
  _getOneArtist,
  _getSavedTrackUser,
  _getToken,
  _getRecommendations,
  _getSimilarPlaylist,
} from "@/api/ApiSpotify";
import { PanelTarget } from "@/components/UI/Target/PanelTarget";
import { FavoriteTrackComponent } from "@/components/Content/FavoriteTrackComponent/FavoriteTrackConteiner";
import Link from "next/link";
import { RandomPlaylistComponent } from "@/components/Content/Mix/RandomPlaylist-Component/RandomPlaylist";
import { TrackArtist } from "@/types/SpotifyTypes/TrackArtist/type";

const playlistPage = async ({ params }: { params: { id: string } }) => {
  let UserAllRecs;
  let NamePlayList: string | TrackArtist;
  if (params.id.includes("randomlist")) {
    NamePlayList = "random playlist";
    UserAllRecs = await _getRecommendations();
  } else {
    NamePlayList = (await _getOneArtist(params.id)).name;
    UserAllRecs = await _getSimilarPlaylist(params.id);
    console.log(UserAllRecs);
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
            <h1 className={style.Info__PlaylistName}>
              Similar to: {NamePlayList}
            </h1>
          </div>
        </section>
        <RandomPlaylistComponent data={UserAllRecs} />
      </aside>
      <div className={style.dash}></div>
      <div className={style.squarDash}></div>
      <PanelTarget side="Bottom" />
    </div>
  );
};

export default playlistPage;
