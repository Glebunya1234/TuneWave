"use server";

import style from "../Discography.module.scss";
import { PanelTarget } from "@/components/UI/Target/PanelTarget";
import { getDataCacheArtist } from "@/utils/helper/CacheHelper/cacheHLP";
import { DiscographyRelatedList } from "@/components/DataLists/DiscographyRelatedList-Component/DiscographyRelatedList";

const DiscographyRelated = async ({ params }: { params: { id: string } }) => {
  const artist = await getDataCacheArtist(params.id);
  return (
    <div className={style.Discography}>
      <PanelTarget side="Top" />
      <DiscographyRelatedList DataArtist={artist.name} id={params.id} />
      <div className={style.dash}></div>
      <div className={style.squarDash}></div>
      <PanelTarget side="Bottom" />
    </div>
  );
};

export default DiscographyRelated;
