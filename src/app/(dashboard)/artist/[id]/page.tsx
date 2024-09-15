"use server";
import style from "./artist.module.scss";
import { PanelTarget } from "@/components/UI/Target/PanelTarget";
import { DisplayInfo } from "@/components/DisplayInfo/DisplayInfo";
import { ArtistInfoConteiner } from "@/components/Content/ArtistInfo-Component/ArtistInfoConteiner";
import { _getArtists } from "@/api/SP-Artists/API-SP-Artists";
import { getDataCacheArtist } from "@/utils/helper/CacheHelper/cacheHLP";

const artistPage = async ({ params }: { params: { id: string } }) => {
  const data = await getDataCacheArtist(params.id);
  return (
    <div className={style.Artist}>
      <DisplayInfo
        idForScroll={"ArtistPage"}
        ImageSrc={`${data?.images[0]?.url || "/FavoriteTrack.png"}`}
        Type={data.type}
        Name={data.name}
        FollowersTotal={data.followers.total}
        FollowersArtistPage={true}
      >
        <ArtistInfoConteiner id={params.id} />
      </DisplayInfo>
    </div>
  );
};

export default artistPage;
