"use server";
import { _getSavedTrackUser, _getToken } from "@/api/ApiSpotify";
import style from "./tracks.module.scss";
import { PanelTarget } from "@/components/UI/Target/PanelTarget";
import Image from "next/image";
interface Artist {
  name: string;
}

interface AlbumImage {
  url: string;
}

interface Album {
  images: AlbumImage[];
  name: string;
}

interface Track {
  name: string;
  artists: Artist[];
  album: Album;
}

interface SavedTrack {
  added_at: string;
  track: Track;
}
const tracks = async () => {
  const token = await _getToken();
  const data: SavedTrack[] = await _getSavedTrackUser(token);

  return (
    <div className={style.Tracks}>
      <PanelTarget side="Top" />
      <aside className={style.Tracks__Content}>
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
        <section className={style.Content__playlist}>
          {data.map((item, index) => {
            const albumImageUrl =
              item.track.album.images.length > 0
                ? item.track.album.images[0].url
                : "";

            return (
              <div key={index} className={style.Playlist__track}>
                <div className={style.TrackImage}>
                  {albumImageUrl && (
                    <Image
                      src={albumImageUrl}
                      alt={item.track.album.name}
                      layout="fill"
                      objectFit="cover"
                      className={style.AlbumImage}
                    />
                  )}
                </div>
                <div className={style.TrackInfo}>
                  <div className={style.TrackName}>{item.track.name}</div>
                  <div className={style.TrackArtist}>
                    {item.track.artists.map((artist) => artist.name).join(", ")}
                  </div>
                </div>
              </div>
            );
          })}
        </section>
      </aside>
      <div className={style.dash}></div>
      <div className={style.squarDash}></div>
      <PanelTarget side="Bottom" />
    </div>
  );
};

export default tracks;
