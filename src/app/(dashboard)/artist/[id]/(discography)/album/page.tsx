"use server";

import style from "../Discography.module.scss";
import { PanelTarget } from "@/components/UI/Target/PanelTarget";
import { DiscographyList } from "@/components/DataLists/DiscographyList-Component/DiscographyList";
import { getDataCacheArtist } from "@/utils/helper/CacheHelper/cacheHLP";

const DiscographyAlbum = async ({ params }: { params: { id: string } }) => {
  const artist = await getDataCacheArtist(params.id);
  return (
    <div className={style.Discography}>
      <PanelTarget side="Top" />
      <DiscographyList
        DataArtist={artist.name}
        idForScroll={`DiscographyListAlbumPage`}
        id={params.id}
        include_groups={"album"}
      />
      <div className={style.dash}></div>
      <div className={style.squarDash}></div>
      <PanelTarget side="Bottom" />
    </div>
  );
};

export default DiscographyAlbum;
