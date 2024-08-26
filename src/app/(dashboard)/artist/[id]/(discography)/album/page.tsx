"use server";

import style from "../Discography.module.scss";
import { PanelTarget } from "@/components/UI/Target/PanelTarget";
import { DiscographyListSingle } from "@/components/DataLists/DiscographyList-Component/DiscographyListSingle";
import { getDataCacheArtist } from "@/utils/helper/CacheHelper/cacheHLP";

const DiscographyAlbum = async ({ params }: { params: { id: string } }) => {
  const artist = await getDataCacheArtist(params.id);
  return (
    <div className={style.Discography}>
      <PanelTarget side="Top" />
      <DiscographyListSingle
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
