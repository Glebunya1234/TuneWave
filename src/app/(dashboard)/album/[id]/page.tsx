"use server";
import style from "./album.module.scss";
import { AlbumInformation } from "@/components/DataLists/AlbumList-Component/AlbumInformation";
import { PanelTarget } from "@/components/UI/Target/PanelTarget";
import { _getAlbum } from "@/api/SP-Albums/API-SP-Albums";
import { DisplayInfo } from "@/components/DisplayInfo/DisplayInfo";
import { FollowOrUnPlaylist } from "@/components/UI/Buttons/SavePlaylistToLibBtn/FollowOrUnPlaylist";
import { OpenInSpotify } from "@/components/UI/Buttons/OpenInSpotifyBtn/OpenInSpotify";

const albumPage = async ({ params }: { params: { id: string } }) => {
  const data = await _getAlbum(params.id);

  return (
    <div className={style.Album}>
      <DisplayInfo
        idForScroll={"pageTrack"}
        ImageSrc={`${
          data?.images === undefined
            ? "/FavoriteTrack.png"
            : data?.images[0]?.url
        }`}
        Type={data.album_type}
        Name={data.name}
        Total={data.tracks?.items?.length}
        Artists={data.artists}
        release_date={data.release_date}
      >
        <nav className={`${style.TrackComponent__NavPanel} `}>
          <FollowOrUnPlaylist
            type="album"
            id={data?.id!}
            className={style.NavPanel__PlayTrackBtn}
            isSave={data?.isSave}
          />
          <OpenInSpotify
            className={style.NavPanel__SaveTrackBtn}
            href={data.external_urls.spotify}
          />
        </nav>
        <AlbumInformation showSaved={true} data={data.tracks.items} />
      </DisplayInfo>
    </div>
  );
};

export default albumPage;
