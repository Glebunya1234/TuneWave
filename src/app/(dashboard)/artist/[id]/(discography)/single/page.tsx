"use server";

import style from "../Discography.module.scss";
import { DiscographyList } from "@/components/DataLists/DiscographyList-Component/DiscographyList";
import { getDataCacheArtist } from "@/utils/helper/CacheHelper/cacheHLP";

const DiscographySingle = async ({ params }: { params: { id: string } }) => {
  const artist = await getDataCacheArtist(params.id);
  return (
    <div className={style.Discography}>
      <DiscographyList
        DataArtist={artist.name}
        idForScroll={`DiscographyListSinglePage`}
        id={params.id}
        include_groups={"single"}
      />
    </div>
  );
};

export default DiscographySingle;
