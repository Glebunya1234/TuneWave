"use server";
import style from "./tracks.module.scss";
import { cache } from "react";
import { PanelTarget } from "@/components/UI/Target/PanelTarget";
import { TrackComponent } from "@/components/DataLists/CurrentlyTrackLists-Component/TrackContent";
import { DisplayInfo } from "@/components/DisplayInfo/DisplayInfo";
import { _getArtists } from "@/api/SP-Artists/API-SP-Artists";
import { _getTrack } from "@/api/SP-Tracks/API-SP-Tracks";
import { TrackArtist } from "@/types/SpotifyTypes/TrackArtist/type";

const Track = async ({ params }: { params: { id: string } }) => {
  const Data = await getData(params.id);

  return (
    <div className={style.Tracks}>
      <PanelTarget side="Top" />
      <DisplayInfo
        idForScroll={"pageTrack"}
        ImageSrc={`${
          Data.track.album?.images[0].url !== undefined
            ? Data.track.album.images[0].url
            : "/FavoriteTrack.png"
        }`}
        Type={Data.track.type}
        Name={Data.track.name}
        Artists={Data.track.artists}
        release_date={Data.track.album.release_date}
        duration_ms={Data.track.duration_ms}
      >
        <TrackComponent
          data={Data.track}
          isSaved={Data.isSaved[0]}
          artist={Data.dataArtist}
        />
      </DisplayInfo>

      <div className={style.dash}></div>
      <div className={style.squarDash}></div>
      <PanelTarget side="Bottom" />
    </div>
  );
};
// ===========================================================
const getData = cache(async (id: string) => {
  const { track, isSaved } = await _getTrack(id);

  const dataArtist: TrackArtist[] = await _getArtists(
    track?.artists?.map((artist) => {
      return artist.id;
    })
  );
  return { track, isSaved, dataArtist };
});
export default Track;
