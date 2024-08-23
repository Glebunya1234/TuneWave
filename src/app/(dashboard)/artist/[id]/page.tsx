"use server";
import style from "./artist.module.scss";
import { cache } from "react";
import { PanelTarget } from "@/components/UI/Target/PanelTarget";
import { DisplayInfo } from "@/components/DisplayInfo/DisplayInfo";
import { _getArtists } from "@/api/SP-Artists/API-SP-Artists";
import { TrackArtist } from "@/types/SpotifyTypes/TrackArtist/type";
import { ArtistInfo } from "@/components/Content/ArtistInfo-Component/ArtistInfo";

const artistPage = async ({ params }: { params: { id: string } }) => {
  const data = await getData(params.id);
  return (
    <div className={style.Artist}>
      <PanelTarget side="Top" />
      <DisplayInfo
        idForScroll={"ArtistPage"}
        ImageSrc={`${data?.images[0]?.url || "/FavoriteTrack.png"}`}
        Type={data.type}
        Name={data.name}
        FollowersTotal={data.followers.total}
        FollowersText="followers   •"
      >
        <ArtistInfo id={params.id} />
      </DisplayInfo>
      <div className={style.dash}></div>
      <div className={style.squarDash}></div>
      <PanelTarget side="Bottom" />
    </div>
  );
};
// ===========================================================
const getData = cache(async (id: string) => {
  const Artist: TrackArtist[] = await _getArtists(id);
  return Artist[0];
});
export default artistPage;
