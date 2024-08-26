"use server";

import { DiscographyListSingle } from "@/components/DataLists/DiscographyList-Component/DiscographyListSingle";
import style from "./single.module.scss";
import { PanelTarget } from "@/components/UI/Target/PanelTarget";
import { getDataCacheArtist } from "@/utils/helper/CacheHelper/cacheHLP";

const DiscographySingle = async ({ params }: { params: { id: string } }) => {
  const artist = await getDataCacheArtist(params.id);
  return (
    <div className={style.Single}>
      <PanelTarget side="Top" />
      <DiscographyListSingle DataArtist={artist.name} idForScroll={`DiscographyListPage`} id={params.id} />
      <div className={style.dash}></div>
      <div className={style.squarDash}></div>
      <PanelTarget side="Bottom" />
    </div>
  );
};

export default DiscographySingle;
