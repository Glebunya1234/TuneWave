"use server";

import style from "../Discography.module.scss";
import { getDataCacheArtist } from "@/utils/helper/CacheHelper/cacheHLP";
import { DiscographyRelatedList } from "@/components/DataLists/DiscographyRelatedList-Component/DiscographyRelatedList";

const DiscographyRelated = async ({ params }: { params: { id: string } }) => {
  const artist = await getDataCacheArtist(params.id);
  return (
    <div className={style.Discography}>
      <DiscographyRelatedList DataArtist={artist.name} id={params.id} />
    </div>
  );
};

export default DiscographyRelated;
