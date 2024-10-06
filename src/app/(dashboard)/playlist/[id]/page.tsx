"use client";
import style from "./playlist.module.scss";
import useSWR from "swr/immutable";
import { useParams, useSearchParams } from "next/navigation";
import { PlaylistComponent } from "@/components/DataLists/PlayLists-Component/PlayListComponent";
import { Spinner } from "@/components/UI/Spinner/spinner";
import { RecommendationsType } from "@/types/SpotifyTypes/RecommendationsType/type";
import { DisplayInfo } from "@/components/DisplayInfo/DisplayInfo";
import { FollowOrUnPlaylist } from "@/components/UI/Buttons/SavePlaylistToLibBtn/FollowOrUnPlaylist";
import { OpenInSpotify } from "@/components/UI/Buttons/OpenInSpotifyBtn/OpenInSpotify";
import { fetcher } from "@/utils/helper/Fetchers/PlayList-Fetcher";
import {
  _isCurrentlyPlaylistTracksItem,
  _isTypeRecommendation,
} from "@/utils/TypeOfCustom/TypeOfCustom";
import { CurrentlyPlaylistTracksItem } from "@/types/SpotifyTypes/CurrentlyPlaylist/type";

const PlaylistPage = () => {
  const searchParams = useSearchParams();
  const params = useParams<{ id: string }>();
  const genre = searchParams.get("genre") || "";
  const list = searchParams.get("id") || "";

  const { data: data, isLoading } = useSWR<
    string | RecommendationsType | CurrentlyPlaylistTracksItem
  >(`playlist/${params.id}`, () => fetcher(params.id, genre, list, 0), {
    revalidateOnFocus: false,
    dedupingInterval: 60000,
  });
  if (typeof data === "string") {
    return (
      <div className={style.Playlist}>
        <Spinner />
      </div>
    );
  }
  return (
    <div className={style.Playlist}>
      {isLoading && <Spinner />}

      {data !== undefined ? (
        <DisplayInfo
          idForScroll={"PlaylistPage"}
          ImageSrc={
            data?.infoPlaylist?.images[0].url === undefined
              ? "/PlayLiskDefault.png"
              : data?.infoPlaylist.images[0].url
          }
          Type={data?.infoPlaylist?.type! || ""}
          Owner={
            _isCurrentlyPlaylistTracksItem(data)
              ? data.infoPlaylist
              : _isTypeRecommendation(data)
              ? data.infoPlaylist
              : undefined
          }
          FollowersTotal={
            _isCurrentlyPlaylistTracksItem(data)
              ? data.infoPlaylist.followers?.total
              : undefined
          }
          FollowersText="Saves"
          Total={
            _isCurrentlyPlaylistTracksItem(data)
              ? data.total
              : _isTypeRecommendation(data)
              ? data.tracks.length
              : undefined
          }
          hrefSpotify={
            _isCurrentlyPlaylistTracksItem(data)
              ? data?.infoPlaylist?.external_urls?.spotify
              : undefined
          }
          Name={
            data?.infoPlaylist?.name === undefined
              ? ""
              : data?.infoPlaylist.name
          }
        >
          {_isCurrentlyPlaylistTracksItem(data) && (
            <nav className={`${style.TrackComponent__NavPanel} `}>
              <FollowOrUnPlaylist
                type="playlist"
                id={data?.infoPlaylist?.id!}
                className={style.NavPanel__PlayTrackBtn}
                isSave={data.infoPlaylist.isSave}
              />
              <OpenInSpotify
                className={style.OpenSpotifyBtn}
                href={data?.infoPlaylist?.external_urls?.spotify || ""}
              />
            </nav>
          )}
          <PlaylistComponent
            Offset={_isCurrentlyPlaylistTracksItem(data) ? data.offset : 0}
            PrivatePlaylist={_isCurrentlyPlaylistTracksItem(data)}
            SWRKey={`playlist/${params.id}`}
            Params={{ id: params.id, list: list, genre: genre }}
            data={
              _isTypeRecommendation(data)
                ? data.tracks
                : _isCurrentlyPlaylistTracksItem(data)
                ? data.items.map((it) => it.track)
                : []
            }
          />
        </DisplayInfo>
      ) : (
        <></>
      )}
    </div>
  );
};

export default PlaylistPage;
