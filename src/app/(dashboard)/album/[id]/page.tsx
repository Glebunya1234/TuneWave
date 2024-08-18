"use server";
import style from "./album.module.scss";
import { AlbumInformation } from "@/components/Content/AlbumInformation-Component/AlbumInformation";
import { PanelTarget } from "@/components/UI/Target/PanelTarget";
import { _getAlbum } from "@/api/SP-Albums/API-SP-Albums";
import { DisplayInfo } from "@/components/DisplayInfo/DisplayInfo";

const albumPage = async ({ params }: { params: { id: string } }) => {
  const data = await _getAlbum(params.id);

  return (
    <div className={style.Album}>
      <PanelTarget side="Top" />
      <DisplayInfo
        idForScroll={"pageTrack"}
        ImageSrc={`${data.images[0].url || "/FavoriteTrack.png"}`}
        Type={data.album_type}
        Name={data.name}
        Artists={data.artists}
        release_date={data.release_date}
      >
        <AlbumInformation data={data} />
      </DisplayInfo>

      <div className={style.dash}></div>
      <div className={style.squarDash}></div>
      <PanelTarget side="Bottom" />
    </div>
  );
};

export default albumPage;
