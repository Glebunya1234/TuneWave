"use server";
import { _getSavedTrackUser, _getToken } from "@/api/ApiSpotify";
import style from "./tracks.module.scss";
import { PanelTarget } from "@/components/UI/Target/PanelTarget";
import Image from "next/image";
interface Artist {
  name: string;
}

interface Track {
  name: string;
  artists: Artist[];
}

interface SavedTrack {
  added_at: string;
  track: Track;
}
const tracks = async () => {
  const token = await _getToken();
  const data: SavedTrack[] = await _getSavedTrackUser(token);
  //   console.log(token);
  // console.log(data);
  return (
    <div className={style.Tracks}>
      <PanelTarget side="Top" />
      <aside className={style.Tracks__Content}>
        <section className={style.Content__Preview}>
          <div className={style.Preview__image}>
            <Image
              src="https://i.scdn.co/image/ab6761610000e5eb7ff08b2df89c415997a91aff"
              layout="fill"
              objectFit="cover"
              alt="alt"
            />
          </div>
          <h1>Favorite tracks</h1>
        </section>
        <section className={style.Content__playlist}>
          {data.map((item, index) => (
            <div key={index} className={style.Playlist__track}>
              <h2>{item.track.name}</h2>
              <p>
                {item.track.artists.map((artist) => artist.name).join(", ")}
              </p>
            </div>
          ))}
        </section>
      </aside>
      <div className={style.dash}></div>
      <div className={style.squarDash}></div>
      <PanelTarget side="Bottom" />
    </div>
  );
};

export default tracks;
