"use server";
import style from "./tracks.module.scss";
import { PanelTarget } from "@/components/UI/Target/PanelTarget";
import { TrackComponent } from "@/components/DataLists/CurrentlyTrackLists-Component/TrackContent";
import { DisplayInfo } from "@/components/DisplayInfo/DisplayInfo";
import { _getArtists } from "@/api/SP-Artists/API-SP-Artists";
import { _getTrack } from "@/api/SP-Tracks/API-SP-Tracks";
import { TrackArtist } from "@/types/SpotifyTypes/TrackArtist/type";

const Track = async ({ params }: { params: { id: string } }) => {
  const { track, isSaved } = await _getTrack(params.id);

  const dataArtist: TrackArtist[] = await _getArtists(
    track?.artists?.map((artist) => {
      return artist.id;
    })
  );

  return (
    <div className={style.Tracks}>
      <PanelTarget side="Top" />

      <DisplayInfo
        idForScroll={"pageTrack"}
        ImageSrc={`${
          track.album?.images[0].url !== undefined
            ? track.album.images[0].url
            : "/FavoriteTrack.png"
        }`}
        Type={track.type}
        Name={track.name}
        Artists={track.artists}
        release_date={track.album.release_date}
        duration_ms={track.duration_ms}
      >
        <TrackComponent data={track} isSaved={isSaved[0]} artist={dataArtist} />
      </DisplayInfo>

      <div className={style.dash}></div>
      <div className={style.squarDash}></div>
      <PanelTarget side="Bottom" />
    </div>
  );
};

export default Track;
